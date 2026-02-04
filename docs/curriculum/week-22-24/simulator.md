---
sidebar_position: 3
---

# 시뮬레이터 게임 만들기

**시뮬레이터**는 로블록스에서 가장 인기 있는 장르예요! 클릭으로 자원을 모으고, 판매하고, 펫을 키우는 게임을 만들어봐요.

## 학습 목표

- 시뮬레이터의 핵심 루프를 이해한다
- 수집-판매 시스템을 구현할 수 있다
- 펫 시스템 기초를 만들 수 있다
- 리버스(Rebirth) 시스템을 구현할 수 있다

## 시뮬레이터란?

```
시뮬레이터의 기본 루프:

    [클릭/행동] → 자원 획득
         ↓
    [가방에 저장] → 용량 제한
         ↓
    [판매 존] → 돈으로 변환
         ↓
    [업그레이드] → 더 많은 자원!
         ↓
    [펫 획득] → 자동 수집!
         ↓
    [리버스] → 처음부터 + 보너스
         ↓
    (반복)
```

## 기본 구조

### Workspace 구조

```
Workspace
├── CollectZone (자원 수집 구역)
├── SellZone (판매 구역)
├── Shop
│   ├── BackpackUpgrade
│   ├── MultiplierUpgrade
│   └── PetEgg
└── SpawnLocation

ServerScriptService
└── SimulatorSystem

ReplicatedStorage
├── Pets (펫 모델들)
└── RemoteEvents
```

## 수집 시스템

### 클릭으로 수집하기

```lua
-- LocalScript (StarterPlayerScripts)
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local UserInputService = game:GetService("UserInputService")

local player = Players.LocalPlayer
local collectEvent = ReplicatedStorage:WaitForChild("CollectEvent")

local collectZone = workspace:WaitForChild("CollectZone")

-- 수집 존 안에 있는지 확인
local function isInCollectZone()
    local character = player.Character
    if not character then return false end

    local rootPart = character:FindFirstChild("HumanoidRootPart")
    if not rootPart then return false end

    local zonePart = collectZone:FindFirstChild("Zone")
    if not zonePart then return false end

    local distance = (rootPart.Position - zonePart.Position).Magnitude
    return distance < zonePart.Size.X / 2
end

-- 클릭 감지
UserInputService.InputBegan:Connect(function(input, processed)
    if processed then return end

    if input.UserInputType == Enum.UserInputType.MouseButton1 then
        if isInCollectZone() then
            collectEvent:FireServer()
        end
    end
end)

-- 모바일 터치 지원
UserInputService.TouchTap:Connect(function(touchPositions, processed)
    if processed then return end

    if isInCollectZone() then
        collectEvent:FireServer()
    end
end)
```

### 서버에서 수집 처리

```lua
-- ServerScript (ServerScriptService)
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- RemoteEvent 생성
local collectEvent = Instance.new("RemoteEvent")
collectEvent.Name = "CollectEvent"
collectEvent.Parent = ReplicatedStorage

-- 플레이어 데이터
local playerData = {}

Players.PlayerAdded:Connect(function(player)
    -- 기본 데이터
    playerData[player.UserId] = {
        Backpack = 0,
        BackpackMax = 100,
        Multiplier = 1,
        Rebirths = 0,
    }

    -- leaderstats
    local leaderstats = Instance.new("Folder")
    leaderstats.Name = "leaderstats"
    leaderstats.Parent = player

    local coins = Instance.new("IntValue")
    coins.Name = "Coins"
    coins.Value = 0
    coins.Parent = leaderstats

    local rebirths = Instance.new("IntValue")
    rebirths.Name = "Rebirths"
    rebirths.Value = 0
    rebirths.Parent = leaderstats
end)

-- 수집 처리
collectEvent.OnServerEvent:Connect(function(player)
    local data = playerData[player.UserId]
    if not data then return end

    -- 가방에 여유 있는지 확인
    if data.Backpack < data.BackpackMax then
        -- 수집량 계산 (배율 적용)
        local amount = 1 * data.Multiplier * (1 + data.Rebirths * 0.5)

        data.Backpack = math.min(data.Backpack + amount, data.BackpackMax)

        -- 클라이언트에 업데이트
        -- (GUI 업데이트용 RemoteEvent 사용)
    end
end)
```

## 판매 시스템

### 판매 존

```lua
-- ServerScript (SellZone 안에)
local sellZone = script.Parent
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- 서버 데이터 참조 (위의 playerData)
local SimulatorSystem = require(game.ServerScriptService.SimulatorSystem)

sellZone.Touched:Connect(function(hit)
    local player = game.Players:GetPlayerFromCharacter(hit.Parent)
    if not player then return end

    local data = SimulatorSystem.GetPlayerData(player)
    if not data then return end

    -- 가방이 비어있지 않으면
    if data.Backpack > 0 then
        -- 돈으로 변환
        local coins = data.Backpack
        data.Backpack = 0

        -- leaderstats 업데이트
        local leaderstats = player:FindFirstChild("leaderstats")
        if leaderstats then
            leaderstats.Coins.Value = leaderstats.Coins.Value + coins
        end

        -- 판매 효과
        local sound = Instance.new("Sound")
        sound.SoundId = "rbxassetid://판매소리ID"
        sound.Parent = sellZone
        sound:Play()
        game.Debris:AddItem(sound, 1)
    end
end)
```

### 자동 판매 (판매 존 안에 있을 때)

```lua
-- ServerScript (SellZone 안에)
local sellZone = script.Parent
local playersInZone = {}

sellZone.Touched:Connect(function(hit)
    local player = game.Players:GetPlayerFromCharacter(hit.Parent)
    if player then
        playersInZone[player] = true
    end
end)

sellZone.TouchEnded:Connect(function(hit)
    local player = game.Players:GetPlayerFromCharacter(hit.Parent)
    if player then
        playersInZone[player] = nil
    end
end)

-- 매 초마다 자동 판매
while true do
    task.wait(0.5)

    for player, _ in pairs(playersInZone) do
        if player and player.Parent then
            -- 판매 로직 실행
            sellResources(player)
        else
            playersInZone[player] = nil
        end
    end
end
```

## 가방 & 배율 업그레이드

### 업그레이드 시스템

```lua
-- ModuleScript (ReplicatedStorage/UpgradeConfig)
local UpgradeConfig = {}

UpgradeConfig.Backpack = {
    {Level = 1, Max = 100, Price = 0},
    {Level = 2, Max = 250, Price = 100},
    {Level = 3, Max = 500, Price = 500},
    {Level = 4, Max = 1000, Price = 2000},
    {Level = 5, Max = 2500, Price = 10000},
}

UpgradeConfig.Multiplier = {
    {Level = 1, Value = 1, Price = 0},
    {Level = 2, Value = 2, Price = 200},
    {Level = 3, Value = 5, Price = 1000},
    {Level = 4, Value = 10, Price = 5000},
    {Level = 5, Value = 25, Price = 25000},
}

return UpgradeConfig
```

### 업그레이드 버튼

```lua
-- Script (BackpackUpgrade 버튼 안에)
local button = script.Parent
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local upgradeEvent = ReplicatedStorage:WaitForChild("UpgradeEvent")

local debounce = {}

button.Touched:Connect(function(hit)
    local player = game.Players:GetPlayerFromCharacter(hit.Parent)
    if not player then return end

    if debounce[player] then return end
    debounce[player] = true

    upgradeEvent:FireServer("Backpack")

    task.wait(0.5)
    debounce[player] = nil
end)
```

### 서버 업그레이드 처리

```lua
-- ServerScript
local UpgradeConfig = require(ReplicatedStorage.UpgradeConfig)

upgradeEvent.OnServerEvent:Connect(function(player, upgradeType)
    local data = playerData[player.UserId]
    if not data then return end

    local leaderstats = player:FindFirstChild("leaderstats")
    if not leaderstats then return end

    local coins = leaderstats.Coins

    if upgradeType == "Backpack" then
        local currentLevel = data.BackpackLevel or 1
        local nextLevel = currentLevel + 1
        local upgradeInfo = UpgradeConfig.Backpack[nextLevel]

        if upgradeInfo and coins.Value >= upgradeInfo.Price then
            coins.Value = coins.Value - upgradeInfo.Price
            data.BackpackLevel = nextLevel
            data.BackpackMax = upgradeInfo.Max

            print(player.Name .. " upgraded Backpack to level " .. nextLevel)
        end

    elseif upgradeType == "Multiplier" then
        local currentLevel = data.MultiplierLevel or 1
        local nextLevel = currentLevel + 1
        local upgradeInfo = UpgradeConfig.Multiplier[nextLevel]

        if upgradeInfo and coins.Value >= upgradeInfo.Price then
            coins.Value = coins.Value - upgradeInfo.Price
            data.MultiplierLevel = nextLevel
            data.Multiplier = upgradeInfo.Value

            print(player.Name .. " upgraded Multiplier to level " .. nextLevel)
        end
    end
end)
```

## 펫 시스템

### 펫 설정

```lua
-- ModuleScript (ReplicatedStorage/PetConfig)
local PetConfig = {}

PetConfig.Pets = {
    {
        Name = "Dog",
        Rarity = "Common",
        Chance = 70,
        CollectBonus = 1,
        Model = "DogPet",
    },
    {
        Name = "Cat",
        Rarity = "Uncommon",
        Chance = 25,
        CollectBonus = 2,
        Model = "CatPet",
    },
    {
        Name = "Dragon",
        Rarity = "Rare",
        Chance = 4,
        CollectBonus = 5,
        Model = "DragonPet",
    },
    {
        Name = "Unicorn",
        Rarity = "Legendary",
        Chance = 1,
        CollectBonus = 10,
        Model = "UnicornPet",
    },
}

PetConfig.EggPrice = 500

return PetConfig
```

### 에그 열기

```lua
-- ServerScript
local PetConfig = require(ReplicatedStorage.PetConfig)
local openEggEvent = ReplicatedStorage:WaitForChild("OpenEggEvent")

local function rollPet()
    local roll = math.random(1, 100)
    local cumulative = 0

    for _, pet in ipairs(PetConfig.Pets) do
        cumulative = cumulative + pet.Chance
        if roll <= cumulative then
            return pet
        end
    end

    return PetConfig.Pets[1]  -- 기본값
end

openEggEvent.OnServerEvent:Connect(function(player)
    local leaderstats = player:FindFirstChild("leaderstats")
    if not leaderstats then return end

    local coins = leaderstats.Coins
    if coins.Value < PetConfig.EggPrice then return end

    -- 비용 차감
    coins.Value = coins.Value - PetConfig.EggPrice

    -- 펫 뽑기
    local pet = rollPet()

    -- 펫 저장
    local data = playerData[player.UserId]
    if not data.Pets then
        data.Pets = {}
    end
    table.insert(data.Pets, pet.Name)

    -- 클라이언트에 결과 전송
    local resultEvent = ReplicatedStorage:FindFirstChild("PetResultEvent")
    resultEvent:FireClient(player, pet)

    print(player.Name .. " got a " .. pet.Rarity .. " " .. pet.Name .. "!")
end)
```

### 펫 따라다니기

```lua
-- ServerScript (펫 소환 시)
local function spawnPet(player, petName)
    local character = player.Character
    if not character then return end

    local petModel = ReplicatedStorage.Pets:FindFirstChild(petName):Clone()
    petModel.Name = "Pet_" .. player.Name
    petModel.Parent = workspace

    -- 펫 따라다니기
    local RunService = game:GetService("RunService")
    local rootPart = character:WaitForChild("HumanoidRootPart")

    local offset = Vector3.new(3, 0, 0)  -- 옆에 위치

    local connection
    connection = RunService.Heartbeat:Connect(function()
        if not character or not character.Parent then
            connection:Disconnect()
            petModel:Destroy()
            return
        end

        local targetPos = rootPart.Position + offset
        local currentPos = petModel.PrimaryPart.Position

        -- 부드럽게 이동
        local newPos = currentPos:Lerp(targetPos, 0.1)
        petModel:SetPrimaryPartCFrame(CFrame.new(newPos))
    end)

    return petModel
end
```

## 리버스(Rebirth) 시스템

```lua
-- ServerScript
local rebirthEvent = ReplicatedStorage:WaitForChild("RebirthEvent")

local function getRebirthCost(currentRebirths)
    return 100000 * (currentRebirths + 1)
end

rebirthEvent.OnServerEvent:Connect(function(player)
    local data = playerData[player.UserId]
    if not data then return end

    local leaderstats = player:FindFirstChild("leaderstats")
    if not leaderstats then return end

    local coins = leaderstats.Coins
    local rebirths = leaderstats.Rebirths

    local cost = getRebirthCost(rebirths.Value)

    if coins.Value >= cost then
        -- 리버스 실행
        rebirths.Value = rebirths.Value + 1
        coins.Value = 0

        -- 데이터 초기화 (펫은 유지)
        data.Backpack = 0
        data.BackpackLevel = 1
        data.BackpackMax = 100
        data.MultiplierLevel = 1
        data.Multiplier = 1
        -- data.Pets는 유지!

        data.Rebirths = rebirths.Value

        print(player.Name .. " rebirthed! Total: " .. rebirths.Value)

        -- 보너스: 리버스당 50% 수집량 증가
        -- (수집 로직에서 data.Rebirths * 0.5 보너스 적용)
    end
end)
```

## GUI 시스템

### 자원 표시 GUI

```lua
-- LocalScript (StarterPlayerScripts)
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

-- GUI 생성
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "SimulatorGui"
screenGui.Parent = playerGui

-- 가방 표시
local backpackFrame = Instance.new("Frame")
backpackFrame.Size = UDim2.new(0, 200, 0, 30)
backpackFrame.Position = UDim2.new(0.5, -100, 0, 10)
backpackFrame.BackgroundColor3 = Color3.fromRGB(50, 50, 50)
backpackFrame.Parent = screenGui

local backpackBar = Instance.new("Frame")
backpackBar.Name = "Bar"
backpackBar.Size = UDim2.new(0, 0, 1, 0)
backpackBar.BackgroundColor3 = Color3.fromRGB(255, 200, 0)
backpackBar.Parent = backpackFrame

local backpackLabel = Instance.new("TextLabel")
backpackLabel.Size = UDim2.new(1, 0, 1, 0)
backpackLabel.BackgroundTransparency = 1
backpackLabel.TextColor3 = Color3.fromRGB(255, 255, 255)
backpackLabel.Text = "0 / 100"
backpackLabel.TextSize = 16
backpackLabel.Font = Enum.Font.GothamBold
backpackLabel.Parent = backpackFrame

-- 업데이트 받기
local updateEvent = ReplicatedStorage:WaitForChild("UpdateEvent")

updateEvent.OnClientEvent:Connect(function(backpack, backpackMax)
    local percent = backpack / backpackMax
    backpackBar.Size = UDim2.new(percent, 0, 1, 0)
    backpackLabel.Text = math.floor(backpack) .. " / " .. backpackMax
end)
```

## 완전한 시스템 (ModuleScript)

```lua
-- ModuleScript (ServerScriptService/SimulatorSystem)
local SimulatorSystem = {}

local Players = game:GetService("Players")
local DataStoreService = game:GetService("DataStoreService")
local dataStore = DataStoreService:GetDataStore("SimulatorData")

local playerData = {}

function SimulatorSystem.GetPlayerData(player)
    return playerData[player.UserId]
end

function SimulatorSystem.Init()
    Players.PlayerAdded:Connect(function(player)
        -- 데이터 로드
        local key = "Player_" .. player.UserId
        local success, data = pcall(function()
            return dataStore:GetAsync(key)
        end)

        if success and data then
            playerData[player.UserId] = data
        else
            playerData[player.UserId] = {
                Backpack = 0,
                BackpackMax = 100,
                BackpackLevel = 1,
                Multiplier = 1,
                MultiplierLevel = 1,
                Rebirths = 0,
                Pets = {},
            }
        end

        -- leaderstats 생성
        local leaderstats = Instance.new("Folder")
        leaderstats.Name = "leaderstats"
        leaderstats.Parent = player

        local coins = Instance.new("IntValue")
        coins.Name = "Coins"
        coins.Value = playerData[player.UserId].Coins or 0
        coins.Parent = leaderstats

        local rebirths = Instance.new("IntValue")
        rebirths.Name = "Rebirths"
        rebirths.Value = playerData[player.UserId].Rebirths or 0
        rebirths.Parent = leaderstats
    end)

    Players.PlayerRemoving:Connect(function(player)
        SimulatorSystem.SaveData(player)
        playerData[player.UserId] = nil
    end)

    game:BindToClose(function()
        for _, player in pairs(Players:GetPlayers()) do
            SimulatorSystem.SaveData(player)
        end
    end)
end

function SimulatorSystem.SaveData(player)
    local data = playerData[player.UserId]
    if not data then return end

    local leaderstats = player:FindFirstChild("leaderstats")
    if leaderstats then
        data.Coins = leaderstats.Coins.Value
        data.Rebirths = leaderstats.Rebirths.Value
    end

    local key = "Player_" .. player.UserId
    pcall(function()
        dataStore:SetAsync(key, data)
    end)
end

return SimulatorSystem
```

## 연습 문제

:::note 실습해보기
1. **기본 시뮬레이터**
   - 수집 존에서 클릭으로 자원 모으기
   - 판매 존에서 돈으로 변환
   - 가방 용량 제한

2. **업그레이드 시스템**
   - 가방 업그레이드 (5단계)
   - 배율 업그레이드 (5단계)
   - 가격표 GUI

3. **펫 시스템**
   - 4종류 펫 (Common, Uncommon, Rare, Legendary)
   - 에그 열기
   - 펫 따라다니기

4. **리버스 시스템**
   - 10만 코인으로 리버스
   - 리버스 보너스 적용
   - 펫은 유지
:::

## 8단계 완료!

축하해요! 8단계를 모두 마쳤어요. 이제:
- Obby 게임의 체크포인트 시스템
- Tycoon의 Dropper/Conveyor 시스템
- 시뮬레이터의 수집-판매 루프

**24주 커리큘럼을 모두 완료했습니다!**

이제 여러분은 로블록스의 인기 게임 장르들을 직접 만들 수 있어요!
