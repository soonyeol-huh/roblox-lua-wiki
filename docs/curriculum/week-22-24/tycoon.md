---
sidebar_position: 2
---

# Tycoon 게임 만들기

**Tycoon**은 자원을 모으고, 시설을 업그레이드하며, 제국을 키워나가는 게임이에요! Dropper, Conveyor, 업그레이드 시스템을 만들어봐요.

## 학습 목표

- Tycoon 게임의 핵심 메커니즘을 이해한다
- Dropper와 Conveyor 시스템을 구현할 수 있다
- 업그레이드/구매 시스템을 만들 수 있다

## Tycoon이란?

```
Tycoon의 기본 루프:

    [Dropper] → 자원 생성
        ↓
    [Conveyor] → 자원 이동
        ↓
    [Collector] → 돈으로 변환
        ↓
    [업그레이드 구매] → 더 많은 자원!
        ↓
    (반복)
```

## 기본 구조 만들기

### Workspace 구조

```
Workspace
├── Tycoons
│   ├── Tycoon1
│   │   ├── Owner (StringValue, 빈 값)
│   │   ├── ClaimPad (소유권 획득)
│   │   ├── Dropper
│   │   ├── Conveyor
│   │   ├── Collector
│   │   └── Buttons
│   │       ├── UpgradeButton1
│   │       └── UpgradeButton2
│   └── Tycoon2
│       └── ...
└── Scripts
    └── TycoonSystem
```

## 소유권 시스템

### ClaimPad (타이쿤 획득)

```lua
-- Script (ClaimPad 안에)
local claimPad = script.Parent
local tycoon = claimPad.Parent  -- Tycoon1 폴더
local owner = tycoon:FindFirstChild("Owner")

local claimed = false

claimPad.Touched:Connect(function(hit)
    if claimed then return end

    local player = game.Players:GetPlayerFromCharacter(hit.Parent)
    if not player then return end

    -- 이미 다른 타이쿤을 소유한 경우 체크
    for _, t in pairs(workspace.Tycoons:GetChildren()) do
        if t:FindFirstChild("Owner") and t.Owner.Value == player.Name then
            return  -- 이미 타이쿤 보유
        end
    end

    -- 소유권 획득
    claimed = true
    owner.Value = player.Name
    claimPad.BrickColor = BrickColor.new("Bright green")

    print(player.Name .. "님이 타이쿤을 획득했습니다!")

    -- ClaimPad 숨기기
    task.wait(1)
    claimPad.Transparency = 1
    claimPad.CanCollide = false
end)
```

## Dropper 시스템

### 기본 Dropper

```lua
-- Script (Dropper 안에)
local dropper = script.Parent
local tycoon = dropper.Parent
local owner = tycoon:FindFirstChild("Owner")

local dropInterval = 2  -- 2초마다 드랍
local resourceValue = 1  -- 자원 가치

while true do
    task.wait(dropInterval)

    -- 주인이 있을 때만 작동
    if owner.Value ~= "" then
        -- 자원 생성
        local resource = Instance.new("Part")
        resource.Name = "Resource"
        resource.Size = Vector3.new(1, 1, 1)
        resource.BrickColor = BrickColor.new("Bright yellow")
        resource.Material = Enum.Material.Neon
        resource.Position = dropper.Position - Vector3.new(0, 2, 0)

        -- 가치 저장
        local value = Instance.new("IntValue")
        value.Name = "Value"
        value.Value = resourceValue
        value.Parent = resource

        resource.Parent = workspace

        -- 10초 후 자동 삭제 (수집 안 된 경우)
        game.Debris:AddItem(resource, 10)
    end
end
```

### 업그레이드 가능한 Dropper

```lua
-- Script (Dropper 안에)
local dropper = script.Parent
local tycoon = dropper.Parent
local owner = tycoon:FindFirstChild("Owner")

-- 업그레이드 레벨
local dropperLevel = Instance.new("IntValue")
dropperLevel.Name = "DropperLevel"
dropperLevel.Value = 1
dropperLevel.Parent = tycoon

local function getDropInterval()
    -- 레벨이 올라갈수록 빠르게
    return 2 / dropperLevel.Value
end

local function getResourceValue()
    -- 레벨이 올라갈수록 가치 증가
    return dropperLevel.Value * 2
end

while true do
    task.wait(getDropInterval())

    if owner.Value ~= "" then
        local resource = Instance.new("Part")
        resource.Name = "Resource"
        resource.Size = Vector3.new(1, 1, 1)
        resource.BrickColor = BrickColor.new("Bright yellow")
        resource.Material = Enum.Material.Neon
        resource.Position = dropper.Position - Vector3.new(0, 2, 0)

        local value = Instance.new("IntValue")
        value.Name = "Value"
        value.Value = getResourceValue()
        value.Parent = resource

        resource.Parent = workspace
        game.Debris:AddItem(resource, 10)
    end
end
```

## Conveyor 시스템

### 기본 Conveyor

```lua
-- Script (Conveyor 안에)
local conveyor = script.Parent
local speed = 10  -- 이동 속도

-- Conveyor 표면 속성 설정
conveyor.CustomPhysicalProperties = PhysicalProperties.new(
    0.7,   -- Density
    0,     -- Friction (마찰 없음)
    0,     -- Elasticity
    1,     -- FrictionWeight
    1      -- ElasticityWeight
)

-- 속도 적용
local RunService = game:GetService("RunService")

RunService.Heartbeat:Connect(function()
    conveyor.AssemblyLinearVelocity = conveyor.CFrame.LookVector * speed
end)
```

### 또는 BodyVelocity 사용

```lua
-- Script (Conveyor 안에)
local conveyor = script.Parent
local speed = 10

conveyor.Touched:Connect(function(hit)
    -- 자원인지 확인
    if hit.Name == "Resource" then
        -- 이미 움직이고 있지 않다면
        if not hit:FindFirstChild("ConveyorVelocity") then
            local bodyVelocity = Instance.new("BodyVelocity")
            bodyVelocity.Name = "ConveyorVelocity"
            bodyVelocity.Velocity = conveyor.CFrame.LookVector * speed
            bodyVelocity.MaxForce = Vector3.new(math.huge, 0, math.huge)
            bodyVelocity.Parent = hit
        end
    end
end)

conveyor.TouchEnded:Connect(function(hit)
    if hit.Name == "Resource" then
        local bv = hit:FindFirstChild("ConveyorVelocity")
        if bv then
            bv:Destroy()
        end
    end
end)
```

## Collector 시스템

### 돈 수집기

```lua
-- Script (Collector 안에)
local collector = script.Parent
local tycoon = collector.Parent
local owner = tycoon:FindFirstChild("Owner")

collector.Touched:Connect(function(hit)
    -- 자원인지 확인
    if hit.Name ~= "Resource" then return end

    local resourceValue = hit:FindFirstChild("Value")
    if not resourceValue then return end

    -- 주인 찾기
    local ownerPlayer = game.Players:FindFirstChild(owner.Value)
    if not ownerPlayer then return end

    -- leaderstats에 돈 추가
    local leaderstats = ownerPlayer:FindFirstChild("leaderstats")
    if leaderstats then
        local cash = leaderstats:FindFirstChild("Cash")
        if cash then
            cash.Value = cash.Value + resourceValue.Value
        end
    end

    -- 자원 삭제
    hit:Destroy()

    -- 효과음 (선택)
    local sound = Instance.new("Sound")
    sound.SoundId = "rbxassetid://코인소리ID"
    sound.Parent = collector
    sound:Play()
    game.Debris:AddItem(sound, 1)
end)
```

## 업그레이드 버튼 시스템

### 구매 버튼

```lua
-- Script (UpgradeButton 안에)
local button = script.Parent
local tycoon = button.Parent.Parent  -- Buttons 폴더의 부모
local owner = tycoon:FindFirstChild("Owner")

local price = 100
local purchased = false

-- 버튼 위에 가격 표시
local billboardGui = Instance.new("BillboardGui")
billboardGui.Size = UDim2.new(0, 100, 0, 50)
billboardGui.StudsOffset = Vector3.new(0, 3, 0)
billboardGui.Parent = button

local priceLabel = Instance.new("TextLabel")
priceLabel.Size = UDim2.new(1, 0, 1, 0)
priceLabel.BackgroundTransparency = 1
priceLabel.TextColor3 = Color3.fromRGB(255, 255, 255)
priceLabel.TextStrokeTransparency = 0
priceLabel.Text = "$" .. price
priceLabel.TextSize = 20
priceLabel.Font = Enum.Font.GothamBold
priceLabel.Parent = billboardGui

button.Touched:Connect(function(hit)
    if purchased then return end

    local player = game.Players:GetPlayerFromCharacter(hit.Parent)
    if not player then return end

    -- 주인만 구매 가능
    if player.Name ~= owner.Value then return end

    local leaderstats = player:FindFirstChild("leaderstats")
    if not leaderstats then return end

    local cash = leaderstats:FindFirstChild("Cash")
    if not cash then return end

    -- 돈이 충분한지 확인
    if cash.Value >= price then
        cash.Value = cash.Value - price
        purchased = true

        -- 버튼 비활성화
        button.BrickColor = BrickColor.new("Bright green")
        priceLabel.Text = "구매 완료!"

        -- 업그레이드 적용
        local dropperLevel = tycoon:FindFirstChild("DropperLevel")
        if dropperLevel then
            dropperLevel.Value = dropperLevel.Value + 1
        end

        print(player.Name .. "님이 업그레이드를 구매했습니다!")

        -- 버튼 숨기기
        task.wait(1)
        button:Destroy()
    end
end)
```

### 건물 해금 버튼

```lua
-- Script (UnlockButton 안에)
local button = script.Parent
local tycoon = button.Parent.Parent
local owner = tycoon:FindFirstChild("Owner")

local price = 500
local unlockTarget = "Factory2"  -- 해금할 건물 이름

-- 건물은 처음에 숨겨져 있음
local building = tycoon:FindFirstChild(unlockTarget)
if building then
    building.Transparency = 0.8
    building.CanCollide = false
end

button.Touched:Connect(function(hit)
    local player = game.Players:GetPlayerFromCharacter(hit.Parent)
    if not player or player.Name ~= owner.Value then return end

    local cash = player.leaderstats.Cash
    if cash.Value >= price then
        cash.Value = cash.Value - price

        -- 건물 활성화
        if building then
            building.Transparency = 0
            building.CanCollide = true
        end

        button:Destroy()
    end
end)
```

## leaderstats 설정

```lua
-- ServerScript (ServerScriptService)
local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(player)
    local leaderstats = Instance.new("Folder")
    leaderstats.Name = "leaderstats"
    leaderstats.Parent = player

    local cash = Instance.new("IntValue")
    cash.Name = "Cash"
    cash.Value = 0
    cash.Parent = leaderstats
end)
```

## 리버스(Rebirth) 시스템

```lua
-- Script (RebirthButton 안에)
local button = script.Parent
local rebirthCost = 10000

button.Touched:Connect(function(hit)
    local player = game.Players:GetPlayerFromCharacter(hit.Parent)
    if not player then return end

    local leaderstats = player:FindFirstChild("leaderstats")
    if not leaderstats then return end

    local cash = leaderstats:FindFirstChild("Cash")
    local rebirths = leaderstats:FindFirstChild("Rebirths")

    if not rebirths then
        rebirths = Instance.new("IntValue")
        rebirths.Name = "Rebirths"
        rebirths.Value = 0
        rebirths.Parent = leaderstats
    end

    if cash.Value >= rebirthCost then
        -- 리버스!
        rebirths.Value = rebirths.Value + 1
        cash.Value = 0

        -- 보너스: 리버스 횟수만큼 수입 증가
        -- (Dropper에서 rebirths.Value를 곱해주면 됨)

        print(player.Name .. "님이 리버스했습니다! (총 " .. rebirths.Value .. "회)")
    end
end)
```

## 완전한 Tycoon 템플릿

```lua
-- ServerScript (ServerScriptService/TycoonSystem)
local Players = game:GetService("Players")
local DataStoreService = game:GetService("DataStoreService")
local tycoonDataStore = DataStoreService:GetDataStore("TycoonData")

-- leaderstats 설정
Players.PlayerAdded:Connect(function(player)
    local leaderstats = Instance.new("Folder")
    leaderstats.Name = "leaderstats"
    leaderstats.Parent = player

    local cash = Instance.new("IntValue")
    cash.Name = "Cash"
    cash.Parent = leaderstats

    local rebirths = Instance.new("IntValue")
    rebirths.Name = "Rebirths"
    rebirths.Parent = leaderstats

    -- 데이터 로드
    local key = "Player_" .. player.UserId
    local success, data = pcall(function()
        return tycoonDataStore:GetAsync(key)
    end)

    if success and data then
        cash.Value = data.Cash or 0
        rebirths.Value = data.Rebirths or 0
    end
end)

-- 데이터 저장
local function saveData(player)
    local key = "Player_" .. player.UserId
    local leaderstats = player:FindFirstChild("leaderstats")

    if leaderstats then
        local data = {
            Cash = leaderstats.Cash.Value,
            Rebirths = leaderstats.Rebirths.Value,
        }

        pcall(function()
            tycoonDataStore:SetAsync(key, data)
        end)
    end
end

Players.PlayerRemoving:Connect(saveData)

game:BindToClose(function()
    for _, player in pairs(Players:GetPlayers()) do
        saveData(player)
    end
end)
```

## 연습 문제

:::note 실습해보기
1. **기본 Tycoon**
   - Dropper, Conveyor, Collector 만들기
   - 소유권 시스템 구현
   - Cash 리더스탯 표시

2. **업그레이드 시스템**
   - 3단계 Dropper 업그레이드
   - 각 업그레이드마다 가격 증가
   - 드롭 속도/가치 증가

3. **건물 해금**
   - 2번째 Dropper 해금
   - 특별한 Collector 해금
   - 장식 건물 해금

4. **리버스 시스템**
   - 10,000 Cash로 리버스
   - 리버스 후 2배 수입 보너스
   - 리버스 횟수 저장
:::

## 다음 단계

Tycoon 게임을 마스터했나요? 다음으로 [시뮬레이터 게임](/curriculum/week-22-24/simulator)에서 수집-판매 루프와 펫 시스템을 배워봐요!
