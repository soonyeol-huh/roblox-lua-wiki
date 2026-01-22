---
sidebar_position: 2
---

# 리더보드 프로젝트

플레이어의 점수를 화면에 표시하는 리더보드 시스템을 만들어봐요! 서버 스크립트, 동적 객체 생성, 이벤트 처리를 배울 수 있어요.

## 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 난이도 | ⭐⭐⭐ 중급 |
| 학습 개념 | 서버 스크립트, Instance.new, PlayerAdded |
| 소요 시간 | 20분 |

## 엔트리 블록과 비교

| 엔트리 | 루아 |
|--------|------|
| 시작하기 버튼 클릭 시 | `PlayerAdded:Connect()` |
| 변수 만들기 | `Instance.new("IntValue")` |
| 변수 값 바꾸기 | `gold.Value += 10` |

## 완성 코드

```lua
-- ServerScriptService에 넣을 Script
local Players = game:GetService("Players")

local function onPlayerAdded(player)
    -- leaderstats 폴더 생성 (이름 정확히!)
    local leaderstats = Instance.new("Folder")
    leaderstats.Name = "leaderstats"
    leaderstats.Parent = player

    -- Gold 점수 생성
    local gold = Instance.new("IntValue")
    gold.Name = "Gold"
    gold.Value = 0
    gold.Parent = leaderstats

    -- Level 점수 생성
    local level = Instance.new("IntValue")
    level.Name = "Level"
    level.Value = 1
    level.Parent = leaderstats

    print(player.Name .. "님의 리더보드 생성 완료!")
end

-- 플레이어 입장 시 함수 실행
Players.PlayerAdded:Connect(onPlayerAdded)
```

## 코드 줄별 설명

### 1단계: 서비스 가져오기

```lua
local Players = game:GetService("Players")
```
- `GetService`로 로블록스 서비스 가져오기
- `Players`는 모든 플레이어 관리 서비스

### 2단계: leaderstats 폴더 생성

```lua
local leaderstats = Instance.new("Folder")
leaderstats.Name = "leaderstats"
leaderstats.Parent = player
```
- `Instance.new("Folder")` = 새 폴더 생성
- 이름은 반드시 `"leaderstats"` (소문자!)
- 플레이어의 자식으로 설정

### 3단계: 점수 값 생성

```lua
local gold = Instance.new("IntValue")
gold.Name = "Gold"
gold.Value = 0
gold.Parent = leaderstats
```
- `IntValue` = 정수 저장 객체
- `Name`은 리더보드에 표시될 이름
- `Value`는 초기값
- `leaderstats`의 자식으로 설정

### 4단계: 이벤트 연결

```lua
Players.PlayerAdded:Connect(onPlayerAdded)
```
- 새 플레이어가 입장할 때마다 실행
- `player` 매개변수로 입장한 플레이어 정보 전달

## 점수 증가 시스템

### 코인 수집 스크립트

코인 파트에 넣을 스크립트:

```lua
local coin = script.Parent
local value = 10  -- 코인 가치
local collected = false

-- 코인 스타일
coin.Shape = Enum.PartType.Cylinder
coin.Size = Vector3.new(0.5, 2, 2)
coin.BrickColor = BrickColor.new("Bright yellow")
coin.Material = Enum.Material.Neon
coin.Anchored = true
coin.CanCollide = false

-- 회전 효과
spawn(function()
    while coin.Parent do
        coin.CFrame = coin.CFrame * CFrame.Angles(0, math.rad(5), 0)
        task.wait(0.03)
    end
end)

-- 수집 로직
coin.Touched:Connect(function(hit)
    if collected then return end

    local player = game.Players:GetPlayerFromCharacter(hit.Parent)

    if player and player:FindFirstChild("leaderstats") then
        collected = true

        -- 점수 추가
        local gold = player.leaderstats:FindFirstChild("Gold")
        if gold then
            gold.Value += value
            print(player.Name .. "님이 코인 획득! 현재 Gold:", gold.Value)
        end

        -- 코인 제거
        coin:Destroy()
    end
end)
```

## 레벨업 시스템

Gold가 100이 되면 레벨업:

```lua
-- ServerScriptService에 추가
local Players = game:GetService("Players")

local function setupLevelSystem(player)
    local leaderstats = player:WaitForChild("leaderstats")
    local gold = leaderstats:WaitForChild("Gold")
    local level = leaderstats:WaitForChild("Level")

    local goldPerLevel = 100

    gold.Changed:Connect(function(newValue)
        -- 레벨업 조건 확인
        while gold.Value >= goldPerLevel do
            gold.Value -= goldPerLevel
            level.Value += 1
            print(player.Name .. "님 레벨업! Lv." .. level.Value)
        end
    end)
end

Players.PlayerAdded:Connect(function(player)
    -- 기존 리더보드 생성 코드...

    -- 레벨업 시스템 설정
    setupLevelSystem(player)
end)
```

## 킬/데스 카운터

킬 파트와 연동:

```lua
-- 리더보드 생성 시 추가
local deaths = Instance.new("IntValue")
deaths.Name = "Deaths"
deaths.Value = 0
deaths.Parent = leaderstats

-- 사망 감지
player.CharacterAdded:Connect(function(character)
    local humanoid = character:WaitForChild("Humanoid")

    humanoid.Died:Connect(function()
        deaths.Value += 1
        print(player.Name .. "님 사망! 총 Deaths:", deaths.Value)
    end)
end)
```

## 완전한 예제

모든 기능이 포함된 완전한 리더보드:

```lua
-- ServerScriptService > LeaderboardScript
local Players = game:GetService("Players")

local function onPlayerAdded(player)
    -- leaderstats 생성
    local leaderstats = Instance.new("Folder")
    leaderstats.Name = "leaderstats"
    leaderstats.Parent = player

    -- Gold
    local gold = Instance.new("IntValue")
    gold.Name = "Gold"
    gold.Value = 0
    gold.Parent = leaderstats

    -- Level
    local level = Instance.new("IntValue")
    level.Name = "Level"
    level.Value = 1
    level.Parent = leaderstats

    -- Deaths
    local deaths = Instance.new("IntValue")
    deaths.Name = "Deaths"
    deaths.Value = 0
    deaths.Parent = leaderstats

    -- 레벨업 시스템
    local goldPerLevel = 100

    gold.Changed:Connect(function()
        while gold.Value >= goldPerLevel do
            gold.Value -= goldPerLevel
            level.Value += 1
        end
    end)

    -- 사망 카운터
    player.CharacterAdded:Connect(function(character)
        local humanoid = character:WaitForChild("Humanoid")
        humanoid.Died:Connect(function()
            deaths.Value += 1
        end)
    end)

    print(player.Name .. "님 입장!")
end

Players.PlayerAdded:Connect(onPlayerAdded)
```

## 연습 문제

:::note 도전해보세요!
1. **킬 카운터**
   - 다른 플레이어를 죽이면 Kills 증가
   - 힌트: 누가 죽였는지 추적 필요

2. **시간 기반 점수**
   - 10초마다 Gold가 1씩 증가
   - 힌트: while 루프 사용

3. **최고 점수 표시**
   - 역대 최고 Gold를 별도로 저장
   - 힌트: NumberValue 추가

4. **VIP 보너스**
   - 특정 플레이어는 Gold 2배 획득
   - 힌트: player.UserId 확인
:::

## 자주 하는 실수

| 실수 | 해결 |
|------|------|
| 리더보드 안 나타남 | "leaderstats" 철자 확인 (소문자!) |
| 점수 안 올라감 | .Value 빼먹었는지 확인 |
| 에러 발생 | ServerScriptService에 있는지 확인 |
| 모든 플레이어 점수 같음 | player 매개변수 사용 확인 |
