---
sidebar_position: 1
---

# 리더보드 시스템

**리더보드**는 플레이어의 점수를 화면에 표시하는 시스템이에요. 모든 로블록스 게임에서 볼 수 있는 그 점수판을 직접 만들어볼 거예요!

![리더보드와 코인 수집](/img/screenshots/leaderboard-demo.png)

## 학습 목표

- leaderstats의 구조를 이해한다
- 서버 스크립트를 작성할 수 있다
- 점수를 저장하고 업데이트할 수 있다

## 리더보드의 구조

```
리더보드가 작동하려면 정확한 구조가 필요해요!

Player
└── leaderstats (폴더, 이름 정확히!)
    ├── Gold (IntValue)
    ├── Points (IntValue)
    └── Level (IntValue)
```

:::caution 중요!
`leaderstats`는 **반드시 소문자**로 써야 해요!
`LeaderStats`나 `Leaderstats`는 작동하지 않아요!
:::

## 기본 리더보드 만들기

### 1단계: 서버 스크립트 생성

1. 탐색기에서 `ServerScriptService` 찾기
2. 오른쪽 클릭 → Insert Object → Script
3. 이름을 "LeaderboardScript"로 변경

### 2단계: 코드 작성

```lua
local Players = game:GetService("Players")

local function onPlayerAdded(player)
    -- leaderstats 폴더 생성
    local leaderstats = Instance.new("Folder")
    leaderstats.Name = "leaderstats"
    leaderstats.Parent = player

    -- Gold 값 생성
    local gold = Instance.new("IntValue")
    gold.Name = "Gold"
    gold.Value = 0
    gold.Parent = leaderstats
end

-- 플레이어가 입장할 때마다 실행
Players.PlayerAdded:Connect(onPlayerAdded)
```

### 3단계: 테스트

1. Play 버튼을 눌러 게임 실행
2. 화면 오른쪽 상단에 리더보드가 나타나면 성공!

## 여러 개의 점수 추가하기

```lua
local Players = game:GetService("Players")

local function onPlayerAdded(player)
    local leaderstats = Instance.new("Folder")
    leaderstats.Name = "leaderstats"
    leaderstats.Parent = player

    -- 골드
    local gold = Instance.new("IntValue")
    gold.Name = "Gold"
    gold.Value = 0
    gold.Parent = leaderstats

    -- 레벨
    local level = Instance.new("IntValue")
    level.Name = "Level"
    level.Value = 1
    level.Parent = leaderstats

    -- 킬 수
    local kills = Instance.new("IntValue")
    kills.Name = "Kills"
    kills.Value = 0
    kills.Parent = leaderstats
end

Players.PlayerAdded:Connect(onPlayerAdded)
```

## 점수 업데이트하기

### 점수 증가시키기

```lua
-- 플레이어의 점수 찾기
local player = game.Players:FindFirstChild("플레이어이름")
local gold = player.leaderstats.Gold

-- 점수 증가
gold.Value = gold.Value + 10
-- 또는
gold.Value += 10
```

### 코인 수집 시스템

```lua
-- 코인 파트에 넣을 스크립트
local coin = script.Parent
local coinValue = 10

coin.Touched:Connect(function(hit)
    local player = game.Players:GetPlayerFromCharacter(hit.Parent)

    if player then
        -- 점수 추가
        local gold = player.leaderstats.Gold
        gold.Value += coinValue

        -- 코인 제거
        coin:Destroy()
    end
end)
```

## GetPlayerFromCharacter 이해하기

```lua
-- hit.Parent = 캐릭터 (Head, Torso 등의 부모)
-- GetPlayerFromCharacter = 캐릭터로부터 Player 객체를 가져옴

local player = game.Players:GetPlayerFromCharacter(hit.Parent)

if player then
    -- player가 존재하면 실행
    print(player.Name .. "님이 닿았습니다!")
end
```

## 실습: 완전한 코인 수집 게임

### 서버 스크립트 (ServerScriptService)

```lua
local Players = game:GetService("Players")

local function onPlayerAdded(player)
    local leaderstats = Instance.new("Folder")
    leaderstats.Name = "leaderstats"
    leaderstats.Parent = player

    local coins = Instance.new("IntValue")
    coins.Name = "Coins"
    coins.Value = 0
    coins.Parent = leaderstats
end

Players.PlayerAdded:Connect(onPlayerAdded)
```

### 코인 스크립트 (각 코인 파트에)

```lua
local coin = script.Parent
local value = 1
local debounce = false

-- 코인 스타일 설정
coin.Shape = Enum.PartType.Cylinder
coin.Size = Vector3.new(0.5, 2, 2)
coin.BrickColor = BrickColor.new("Bright yellow")
coin.Material = Enum.Material.Neon
coin.Anchored = true
coin.CanCollide = false

-- 코인 회전
spawn(function()
    while coin do
        coin.CFrame = coin.CFrame * CFrame.Angles(0, math.rad(5), 0)
        task.wait(0.05)
    end
end)

-- 수집 로직
coin.Touched:Connect(function(hit)
    if debounce then return end

    local player = game.Players:GetPlayerFromCharacter(hit.Parent)

    if player then
        debounce = true

        -- 점수 추가
        local coins = player.leaderstats:FindFirstChild("Coins")
        if coins then
            coins.Value += value
        end

        -- 코인 제거
        coin:Destroy()
    end
end)
```

## IntValue vs NumberValue

| 타입 | 설명 | 사용 |
|------|------|------|
| IntValue | 정수 (1, 2, 100) | 코인, 레벨, 킬 수 |
| NumberValue | 소수 (1.5, 3.14) | 배율, 퍼센트 |
| StringValue | 문자열 ("VIP") | 등급, 칭호 |
| BoolValue | true/false | ON/OFF 상태 |

## 연습 문제

:::note 실습해보기
1. **기본 리더보드**
   - "Points"와 "Deaths" 두 개의 점수를 표시하는 리더보드를 만드세요

2. **킬 파트 점수 시스템**
   - 킬 파트에 닿아서 죽으면 Deaths가 1 증가하도록 만드세요
   ```lua
   -- 힌트: Humanoid.Died 이벤트 사용
   humanoid.Died:Connect(function()
       -- Deaths 증가
   end)
   ```

3. **레벨업 시스템**
   - Points가 100이 되면 자동으로 Level이 1 오르고 Points가 0이 되는 시스템
   ```lua
   points.Changed:Connect(function(newValue)
       if newValue >= 100 then
           -- 레벨업 로직
       end
   end)
   ```
:::

## 다음 단계

리더보드를 마스터했나요? 다음으로 [GUI 디자인](/curriculum/week-10-12/gui)에서 화면에 버튼과 텍스트를 표시하는 방법을 배울 거예요!
