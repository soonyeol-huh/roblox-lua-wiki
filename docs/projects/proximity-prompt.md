---
sidebar_position: 3
---

# 상점 시스템 프로젝트

ProximityPrompt를 사용해서 E 키를 눌러 아이템을 구매하는 상점을 만들어봐요! 상호작용 시스템과 경제 시스템을 배울 수 있어요.

## 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 난이도 | ⭐⭐⭐⭐ 중상급 |
| 학습 개념 | ProximityPrompt, 조건문, 재화 시스템 |
| 소요 시간 | 30분 |

## ProximityPrompt란?

```
ProximityPrompt = 가까이 가면 나타나는 상호작용 버튼

예시:
- 상점에서 [E] 구매하기
- 문에서 [E] 열기
- NPC에서 [E] 대화하기
```

## 엔트리 블록과 비교

| 엔트리 | 루아 |
|--------|------|
| 신호를 받았을 때 | `Prompt.Triggered:Connect()` |
| 만약 변수 >= 값 이라면 | `if gold.Value >= price then` |
| 변수 값 바꾸기 | `gold.Value -= price` |

## 기본 ProximityPrompt 설정

### 1단계: ProximityPrompt 추가

1. 상호작용할 파트 선택
2. 파트 안에 ProximityPrompt 추가 (Insert Object)
3. 속성 설정:

| 속성 | 설명 | 예시 값 |
|------|------|--------|
| ActionText | 버튼에 표시될 텍스트 | "구매하기" |
| ObjectText | 대상 이름 | "스피드 물약" |
| KeyboardKeyCode | 사용할 키 | E (기본) |
| HoldDuration | 누르고 있을 시간 | 0.5 |
| MaxActivationDistance | 작동 거리 | 10 |

### 2단계: 기본 스크립트

```lua
local part = script.Parent
local prompt = part:FindFirstChild("ProximityPrompt")

prompt.Triggered:Connect(function(player)
    print(player.Name .. "님이 상호작용했습니다!")
end)
```

## 완성된 상점 시스템

```lua
-- 상점 파트 안에 넣을 Script
local shopPart = script.Parent
local prompt = shopPart:WaitForChild("ProximityPrompt")

-- 상품 정보
local itemName = "스피드 부스터"
local itemPrice = 50

-- 프롬프트 설정
prompt.ActionText = "구매하기"
prompt.ObjectText = itemName .. " (" .. itemPrice .. " Gold)"
prompt.HoldDuration = 0.5

-- 상점 파트 스타일
shopPart.BrickColor = BrickColor.new("Bright blue")
shopPart.Material = Enum.Material.Neon

prompt.Triggered:Connect(function(player)
    -- 플레이어의 Gold 가져오기
    local leaderstats = player:FindFirstChild("leaderstats")
    if not leaderstats then return end

    local gold = leaderstats:FindFirstChild("Gold")
    if not gold then return end

    -- 돈이 충분한지 확인
    if gold.Value >= itemPrice then
        -- 구매 성공!
        gold.Value -= itemPrice
        print(player.Name .. "님이 " .. itemName .. "을(를) 구매했습니다!")

        -- 효과 적용 (스피드 부스터)
        local character = player.Character
        if character then
            local humanoid = character:FindFirstChild("Humanoid")
            if humanoid then
                humanoid.WalkSpeed = 32  -- 속도 증가
                print("스피드 부스터 활성화!")

                -- 10초 후 원래대로
                task.delay(10, function()
                    if humanoid then
                        humanoid.WalkSpeed = 16
                        print("스피드 부스터 종료")
                    end
                end)
            end
        end
    else
        -- 돈 부족
        print(player.Name .. "님의 Gold가 부족합니다!")
        print("필요: " .. itemPrice .. " / 보유: " .. gold.Value)
    end
end)
```

## 코드 줄별 설명

### 1단계: 가격 확인

```lua
if gold.Value >= itemPrice then
```
- 플레이어의 Gold가 가격 이상인지 확인
- `>=`는 "크거나 같다"

### 2단계: 돈 차감

```lua
gold.Value -= itemPrice
```
- `gold.Value = gold.Value - itemPrice`와 같음
- 구매 금액만큼 차감

### 3단계: 효과 적용

```lua
humanoid.WalkSpeed = 32
```
- 구매한 아이템의 효과 적용
- 이 예제에서는 속도 2배

### 4단계: 시간 제한

```lua
task.delay(10, function()
    humanoid.WalkSpeed = 16
end)
```
- 10초 후에 함수 실행
- 효과를 원래대로 되돌림

## 다양한 상점 아이템

### 점프력 부스터

```lua
local itemPrice = 30

prompt.Triggered:Connect(function(player)
    local gold = player.leaderstats.Gold

    if gold.Value >= itemPrice then
        gold.Value -= itemPrice

        local humanoid = player.Character:FindFirstChild("Humanoid")
        if humanoid then
            humanoid.JumpPower = 100

            task.delay(15, function()
                if humanoid then
                    humanoid.JumpPower = 50
                end
            end)
        end
    end
end)
```

### 체력 회복

```lua
local itemPrice = 20

prompt.Triggered:Connect(function(player)
    local gold = player.leaderstats.Gold

    if gold.Value >= itemPrice then
        gold.Value -= itemPrice

        local humanoid = player.Character:FindFirstChild("Humanoid")
        if humanoid then
            humanoid.Health = humanoid.MaxHealth
            print("체력 완전 회복!")
        end
    end
end)
```

### 무기 지급 (Tool)

```lua
local itemPrice = 100
local weaponTemplate = game.ServerStorage:WaitForChild("Sword")

prompt.Triggered:Connect(function(player)
    local gold = player.leaderstats.Gold

    if gold.Value >= itemPrice then
        gold.Value -= itemPrice

        -- 무기 복제해서 지급
        local weapon = weaponTemplate:Clone()
        weapon.Parent = player.Backpack

        print(player.Name .. "님에게 검 지급!")
    end
end)
```

## 여러 상품 상점

하나의 스크립트로 여러 상품 관리:

```lua
-- ServerScriptService에 넣을 스크립트
local items = {
    {name = "스피드 부스터", price = 50, effect = "speed"},
    {name = "점프 부스터", price = 30, effect = "jump"},
    {name = "체력 회복", price = 20, effect = "heal"},
}

local function applyEffect(player, effect)
    local humanoid = player.Character:FindFirstChild("Humanoid")
    if not humanoid then return end

    if effect == "speed" then
        humanoid.WalkSpeed = 32
        task.delay(10, function()
            if humanoid then humanoid.WalkSpeed = 16 end
        end)
    elseif effect == "jump" then
        humanoid.JumpPower = 100
        task.delay(15, function()
            if humanoid then humanoid.JumpPower = 50 end
        end)
    elseif effect == "heal" then
        humanoid.Health = humanoid.MaxHealth
    end
end

-- 각 상점 파트에 대해 설정
for i, item in ipairs(items) do
    local shopPart = workspace:FindFirstChild("Shop" .. i)
    if shopPart then
        local prompt = shopPart:FindFirstChild("ProximityPrompt")

        prompt.ObjectText = item.name .. " (" .. item.price .. "G)"

        prompt.Triggered:Connect(function(player)
            local gold = player.leaderstats.Gold

            if gold.Value >= item.price then
                gold.Value -= item.price
                applyEffect(player, item.effect)
                print(player.Name .. "님이 " .. item.name .. " 구매!")
            else
                print("Gold 부족!")
            end
        end)
    end
end
```

## 연습 문제

:::note 도전해보세요!
1. **쿨다운 시스템**
   - 같은 아이템은 30초에 한 번만 구매 가능
   - 힌트: 플레이어별 마지막 구매 시간 저장

2. **할인 시스템**
   - 레벨이 높으면 가격 할인
   - 힌트: level.Value에 따라 가격 조정

3. **영구 아이템**
   - 한 번 사면 계속 효과가 유지되는 아이템
   - 힌트: BoolValue로 구매 여부 저장

4. **상점 GUI**
   - ProximityPrompt 대신 GUI로 상점 만들기
   - 힌트: TextButton과 Frame 활용
:::

## 자주 하는 실수

| 실수 | 해결 |
|------|------|
| 프롬프트 안 나타남 | MaxActivationDistance 확인 |
| 돈이 안 빠짐 | `-=` 사용했는지 확인 |
| 효과 안 적용됨 | Character, Humanoid nil 체크 |
| 여러 번 구매됨 | 디바운스 추가 |
