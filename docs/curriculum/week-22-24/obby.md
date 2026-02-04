---
sidebar_position: 1
---

# Obby 게임 만들기

로블록스에서 가장 인기 있는 장르 중 하나인 **Obby**(장애물 코스)를 만들어봐요! 체크포인트, 스테이지 시스템을 구현합니다.

## 학습 목표

- Obby 게임의 구조를 이해한다
- 체크포인트 시스템을 구현할 수 있다
- 다양한 장애물을 만들 수 있다

## Obby란?

```
Obby = Obstacle Course (장애물 코스)

플레이어가 점프하고, 피하고, 달려서
시작점에서 끝점까지 도달하는 게임!

[시작] → [스테이지1] → [스테이지2] → ... → [끝!]
           ↓
      [체크포인트]  ← 죽으면 여기서 다시 시작
```

## 기본 구조 만들기

### Workspace 구조

```
Workspace
├── Stages
│   ├── Stage1
│   │   ├── Spawn (SpawnLocation)
│   │   ├── Platform1
│   │   ├── Platform2
│   │   └── Checkpoint
│   ├── Stage2
│   │   ├── Platform1
│   │   ├── KillPart
│   │   └── Checkpoint
│   └── Stage3
│       └── ...
├── Lobby
│   └── MainSpawn
└── Scripts
    └── CheckpointSystem
```

## 체크포인트 시스템

### 방법 1: SpawnLocation 활용

```lua
-- ServerScript (ServerScriptService)
local Players = game:GetService("Players")

-- 스테이지 정보 저장
local playerStages = {}

Players.PlayerAdded:Connect(function(player)
    -- 새 플레이어는 스테이지 1부터
    playerStages[player.UserId] = 1

    player.CharacterAdded:Connect(function(character)
        -- 현재 스테이지의 스폰으로 이동
        local stage = playerStages[player.UserId]
        local spawn = workspace.Stages:FindFirstChild("Stage" .. stage)

        if spawn then
            local spawnPart = spawn:FindFirstChild("Spawn")
            if spawnPart then
                -- 잠시 후 텔레포트 (캐릭터 로드 대기)
                task.wait(0.1)
                character:SetPrimaryPartCFrame(spawnPart.CFrame + Vector3.new(0, 3, 0))
            end
        end
    end)
end)

Players.PlayerRemoving:Connect(function(player)
    playerStages[player.UserId] = nil
end)
```

### 체크포인트 파트 스크립트

```lua
-- Script (각 Checkpoint 파트 안에)
local checkpoint = script.Parent
local stageNumber = 2  -- 이 체크포인트의 스테이지 번호

-- 서버 스크립트와 통신
local checkpointEvent = game.ReplicatedStorage:FindFirstChild("CheckpointEvent")

checkpoint.Touched:Connect(function(hit)
    local player = game.Players:GetPlayerFromCharacter(hit.Parent)

    if player then
        checkpointEvent:FireServer(stageNumber)
    end
end)
```

### 체크포인트 서버 처리

```lua
-- ServerScript (ServerScriptService)
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- RemoteEvent 생성
local checkpointEvent = Instance.new("RemoteEvent")
checkpointEvent.Name = "CheckpointEvent"
checkpointEvent.Parent = ReplicatedStorage

-- 플레이어 스테이지 저장
local playerStages = {}

Players.PlayerAdded:Connect(function(player)
    playerStages[player.UserId] = 1
end)

-- 체크포인트 도달 처리
checkpointEvent.OnServerEvent:Connect(function(player, stageNumber)
    local currentStage = playerStages[player.UserId] or 1

    -- 다음 스테이지일 때만 업데이트
    if stageNumber == currentStage + 1 then
        playerStages[player.UserId] = stageNumber
        print(player.Name .. " reached Stage " .. stageNumber)

        -- 효과음 재생 (선택)
        -- playCheckpointSound(player)
    end
end)
```

## 스테이지 표시 GUI

```lua
-- LocalScript (StarterPlayerScripts)
local Players = game:GetService("Players")
local player = Players.LocalPlayer

-- GUI 생성
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "StageGui"
screenGui.Parent = player:WaitForChild("PlayerGui")

local stageLabel = Instance.new("TextLabel")
stageLabel.Name = "StageLabel"
stageLabel.Size = UDim2.new(0, 200, 0, 50)
stageLabel.Position = UDim2.new(0.5, -100, 0, 10)
stageLabel.BackgroundColor3 = Color3.fromRGB(0, 0, 0)
stageLabel.BackgroundTransparency = 0.5
stageLabel.TextColor3 = Color3.fromRGB(255, 255, 255)
stageLabel.TextSize = 24
stageLabel.Font = Enum.Font.GothamBold
stageLabel.Text = "Stage 1"
stageLabel.Parent = screenGui

-- 스테이지 업데이트 받기
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local stageUpdateEvent = ReplicatedStorage:WaitForChild("StageUpdateEvent")

stageUpdateEvent.OnClientEvent:Connect(function(stageNumber)
    stageLabel.Text = "Stage " .. stageNumber

    -- 축하 효과
    stageLabel.TextColor3 = Color3.fromRGB(255, 255, 0)
    task.wait(0.5)
    stageLabel.TextColor3 = Color3.fromRGB(255, 255, 255)
end)
```

## 다양한 장애물 만들기

### 1. 킬 파트 (떨어지면 죽음)

```lua
-- Script (KillPart 안에)
local killPart = script.Parent

killPart.Touched:Connect(function(hit)
    local humanoid = hit.Parent:FindFirstChild("Humanoid")
    if humanoid then
        humanoid.Health = 0
    end
end)
```

### 2. 움직이는 플랫폼

```lua
-- Script (MovingPlatform 안에)
local platform = script.Parent
local TweenService = game:GetService("TweenService")

local startPos = platform.Position
local endPos = startPos + Vector3.new(10, 0, 0)  -- 10 스터드 이동

local tweenInfo = TweenInfo.new(
    2,                          -- 시간
    Enum.EasingStyle.Sine,      -- 부드럽게
    Enum.EasingDirection.InOut,
    -1,                         -- 무한 반복
    true                        -- 왕복
)

local tween = TweenService:Create(platform, tweenInfo, {Position = endPos})
tween:Play()
```

### 3. 사라지는 플랫폼

```lua
-- Script (DisappearingPlatform 안에)
local platform = script.Parent
local originalTransparency = platform.Transparency
local debounce = false

platform.Touched:Connect(function(hit)
    if debounce then return end

    local humanoid = hit.Parent:FindFirstChild("Humanoid")
    if not humanoid then return end

    debounce = true

    -- 경고 (깜빡임)
    for i = 1, 3 do
        platform.Transparency = 0.5
        task.wait(0.2)
        platform.Transparency = originalTransparency
        task.wait(0.2)
    end

    -- 사라짐
    platform.Transparency = 1
    platform.CanCollide = false

    -- 3초 후 복구
    task.wait(3)
    platform.Transparency = originalTransparency
    platform.CanCollide = true
    debounce = false
end)
```

### 4. 회전하는 장애물

```lua
-- Script (SpinningObstacle 안에)
local obstacle = script.Parent
local RunService = game:GetService("RunService")

local rotationSpeed = 90  -- 초당 90도

RunService.Heartbeat:Connect(function(deltaTime)
    obstacle.CFrame = obstacle.CFrame * CFrame.Angles(0, math.rad(rotationSpeed * deltaTime), 0)
end)
```

### 5. 점프 부스터

```lua
-- Script (JumpPad 안에)
local jumpPad = script.Parent

jumpPad.Touched:Connect(function(hit)
    local humanoid = hit.Parent:FindFirstChild("Humanoid")
    local rootPart = hit.Parent:FindFirstChild("HumanoidRootPart")

    if humanoid and rootPart then
        -- 위로 튕기기
        local bodyVelocity = Instance.new("BodyVelocity")
        bodyVelocity.Velocity = Vector3.new(0, 100, 0)
        bodyVelocity.MaxForce = Vector3.new(0, math.huge, 0)
        bodyVelocity.Parent = rootPart

        -- 효과음
        local sound = Instance.new("Sound")
        sound.SoundId = "rbxassetid://점프소리ID"
        sound.Parent = jumpPad
        sound:Play()

        task.wait(0.2)
        bodyVelocity:Destroy()
        sound:Destroy()
    end
end)
```

## 스테이지 진행 저장 (DataStore)

```lua
-- ServerScript (ServerScriptService)
local Players = game:GetService("Players")
local DataStoreService = game:GetService("DataStoreService")
local obbyDataStore = DataStoreService:GetDataStore("ObbyProgress")

local playerStages = {}

local function loadStage(player)
    local key = "Player_" .. player.UserId

    local success, stage = pcall(function()
        return obbyDataStore:GetAsync(key)
    end)

    if success and stage then
        playerStages[player.UserId] = stage
        print(player.Name .. " loaded at Stage " .. stage)
    else
        playerStages[player.UserId] = 1
    end
end

local function saveStage(player)
    local key = "Player_" .. player.UserId
    local stage = playerStages[player.UserId]

    local success, err = pcall(function()
        obbyDataStore:SetAsync(key, stage)
    end)

    if success then
        print(player.Name .. " saved at Stage " .. stage)
    else
        warn("Save failed: " .. err)
    end
end

Players.PlayerAdded:Connect(loadStage)
Players.PlayerRemoving:Connect(saveStage)

game:BindToClose(function()
    for _, player in pairs(Players:GetPlayers()) do
        saveStage(player)
    end
end)
```

## 완성된 Obby 구조

```lua
-- 전체 시스템 통합 예시
-- ServerScript (ServerScriptService/ObbySystem)

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local DataStoreService = game:GetService("DataStoreService")

local obbyDataStore = DataStoreService:GetDataStore("ObbyProgress")
local playerStages = {}

-- RemoteEvents 생성
local checkpointEvent = Instance.new("RemoteEvent")
checkpointEvent.Name = "CheckpointEvent"
checkpointEvent.Parent = ReplicatedStorage

local stageUpdateEvent = Instance.new("RemoteEvent")
stageUpdateEvent.Name = "StageUpdateEvent"
stageUpdateEvent.Parent = ReplicatedStorage

-- 플레이어 스폰 위치 설정
local function spawnAtStage(player, character)
    local stage = playerStages[player.UserId] or 1
    local stageFolder = workspace.Stages:FindFirstChild("Stage" .. stage)

    if stageFolder then
        local spawnPart = stageFolder:FindFirstChild("Spawn")
        if spawnPart then
            task.wait(0.1)
            character:SetPrimaryPartCFrame(spawnPart.CFrame + Vector3.new(0, 3, 0))
        end
    end

    -- GUI 업데이트
    stageUpdateEvent:FireClient(player, stage)
end

-- 플레이어 입장
Players.PlayerAdded:Connect(function(player)
    -- 데이터 로드
    local key = "Player_" .. player.UserId
    local success, stage = pcall(function()
        return obbyDataStore:GetAsync(key)
    end)

    playerStages[player.UserId] = (success and stage) or 1

    -- 캐릭터 스폰
    player.CharacterAdded:Connect(function(character)
        spawnAtStage(player, character)
    end)
end)

-- 체크포인트 도달
checkpointEvent.OnServerEvent:Connect(function(player, stageNumber)
    local currentStage = playerStages[player.UserId] or 1

    if stageNumber == currentStage + 1 then
        playerStages[player.UserId] = stageNumber
        stageUpdateEvent:FireClient(player, stageNumber)
        print(player.Name .. " reached Stage " .. stageNumber)
    end
end)

-- 저장
local function savePlayer(player)
    local key = "Player_" .. player.UserId
    local stage = playerStages[player.UserId]

    pcall(function()
        obbyDataStore:SetAsync(key, stage)
    end)
end

Players.PlayerRemoving:Connect(savePlayer)

game:BindToClose(function()
    for _, player in pairs(Players:GetPlayers()) do
        savePlayer(player)
    end
end)
```

## 연습 문제

:::note 실습해보기
1. **5 스테이지 Obby**
   - 5개의 스테이지 만들기
   - 각 스테이지에 체크포인트
   - 스테이지 진행 저장

2. **다양한 장애물**
   - 킬 파트 3개 이상
   - 움직이는 플랫폼 2개 이상
   - 사라지는 플랫폼 1개 이상

3. **보상 시스템**
   - 스테이지 클리어 시 코인 지급
   - 전체 클리어 시 특별 보상

4. **타이머 추가**
   - 게임 시작부터 클리어까지 시간 측정
   - 최고 기록 저장
:::

## 다음 단계

Obby 게임을 마스터했나요? 다음으로 [Tycoon 게임](/curriculum/week-22-24/tycoon)에서 자원 수집과 건설 시스템을 배워봐요!
