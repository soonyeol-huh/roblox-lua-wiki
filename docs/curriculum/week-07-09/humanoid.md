---
sidebar_position: 4
---

# Humanoid 제어

**Humanoid**는 플레이어 캐릭터의 핵심이에요! 체력, 이동 속도, 점프력 등을 제어할 수 있어요.

![Humanoid 속성 제어](/img/screenshots/humanoid-demo.png)

## 학습 목표

- Humanoid의 역할을 이해한다
- 캐릭터의 속성을 제어할 수 있다
- 체력 시스템을 구현할 수 있다

## Humanoid란?

```
로블록스의 모든 캐릭터에는 Humanoid가 있어요.
Humanoid가 없으면 걷지도, 점프하지도 못해요!

캐릭터 구조:
Player
└── Character
    ├── Head
    ├── Torso (HumanoidRootPart)
    ├── Left Arm
    ├── Right Arm
    ├── Left Leg
    ├── Right Leg
    └── Humanoid  ← 이게 핵심!
```

## Humanoid 가져오기

### 방법 1: 파트에서 찾기 (Touched 이벤트)

```lua
local part = script.Parent

part.Touched:Connect(function(hit)
    local humanoid = hit.Parent:FindFirstChild("Humanoid")
    if humanoid then
        -- 플레이어의 Humanoid를 찾음!
    end
end)
```

### 방법 2: 플레이어에서 찾기

```lua
local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(player)
    player.CharacterAdded:Connect(function(character)
        local humanoid = character:WaitForChild("Humanoid")
        -- 이제 humanoid 사용 가능!
    end)
end)
```

## 주요 Humanoid 속성

| 속성 | 설명 | 기본값 |
|------|------|--------|
| Health | 현재 체력 | 100 |
| MaxHealth | 최대 체력 | 100 |
| WalkSpeed | 걷기 속도 | 16 |
| JumpPower | 점프력 | 50 |
| JumpHeight | 점프 높이 | 7.2 |

## 속성 변경하기

### 체력 변경

```lua
local humanoid = -- Humanoid 참조

humanoid.Health = 50       -- 체력을 50으로
humanoid.Health = 0        -- 사망!
humanoid.MaxHealth = 200   -- 최대 체력을 200으로
humanoid.Health = humanoid.MaxHealth  -- 체력 완전 회복
```

### 이동 속도 변경

```lua
local humanoid = -- Humanoid 참조

humanoid.WalkSpeed = 16   -- 기본 속도
humanoid.WalkSpeed = 32   -- 2배 속도
humanoid.WalkSpeed = 0    -- 움직일 수 없음
humanoid.WalkSpeed = 100  -- 초고속!
```

### 점프력 변경

```lua
local humanoid = -- Humanoid 참조

humanoid.JumpPower = 50   -- 기본 점프력
humanoid.JumpPower = 100  -- 높이 점프
humanoid.JumpPower = 0    -- 점프 불가
```

## 실습: 스피드 부스터 만들기

닿으면 속도가 빨라지는 파트를 만들어봐요!

```lua
local speedPart = script.Parent
local speedBoost = 50  -- 부스트 속도
local normalSpeed = 16  -- 기본 속도
local boostDuration = 5  -- 지속 시간

speedPart.BrickColor = BrickColor.new("Bright yellow")
speedPart.Material = Enum.Material.Neon

speedPart.Touched:Connect(function(hit)
    local humanoid = hit.Parent:FindFirstChild("Humanoid")

    if humanoid and humanoid.WalkSpeed == normalSpeed then
        -- 속도 증가
        humanoid.WalkSpeed = speedBoost
        print("스피드 부스트 활성화!")

        -- 일정 시간 후 원래대로
        task.wait(boostDuration)
        humanoid.WalkSpeed = normalSpeed
        print("스피드 부스트 종료")
    end
end)
```

## 실습: 점프 파드 만들기

닿으면 높이 점프하는 파드!

```lua
local jumpPad = script.Parent

jumpPad.BrickColor = BrickColor.new("Lime green")
jumpPad.Material = Enum.Material.Neon

jumpPad.Touched:Connect(function(hit)
    local humanoid = hit.Parent:FindFirstChild("Humanoid")

    if humanoid then
        -- 높이 점프!
        humanoid.JumpPower = 150
        humanoid.Jump = true  -- 강제 점프

        task.wait(0.1)
        humanoid.JumpPower = 50  -- 원래대로
    end
end)
```

## 실습: 체력 회복 파트

닿으면 체력이 회복되는 힐 존!

```lua
local healPart = script.Parent
local healAmount = 25
local debounce = false

healPart.BrickColor = BrickColor.new("Bright green")
healPart.Material = Enum.Material.Neon

healPart.Touched:Connect(function(hit)
    if debounce then return end

    local humanoid = hit.Parent:FindFirstChild("Humanoid")

    if humanoid and humanoid.Health < humanoid.MaxHealth then
        debounce = true

        -- 체력 회복
        local newHealth = humanoid.Health + healAmount
        if newHealth > humanoid.MaxHealth then
            newHealth = humanoid.MaxHealth
        end
        humanoid.Health = newHealth

        print("체력 회복! 현재 체력:", humanoid.Health)

        task.wait(2)  -- 쿨다운
        debounce = false
    end
end)
```

## Humanoid 이벤트

### Died (사망)

```lua
local humanoid = -- Humanoid 참조

humanoid.Died:Connect(function()
    print("캐릭터가 사망했습니다!")
end)
```

### HealthChanged (체력 변화)

```lua
local humanoid = -- Humanoid 참조

humanoid.HealthChanged:Connect(function(newHealth)
    print("체력 변화:", newHealth)

    if newHealth <= 20 then
        print("체력이 낮습니다!")
    end
end)
```

### Running (달리기)

```lua
local humanoid = -- Humanoid 참조

humanoid.Running:Connect(function(speed)
    if speed > 0 then
        print("달리는 중! 속도:", speed)
    else
        print("멈춤")
    end
end)
```

## 상태 확인하기

Humanoid의 현재 상태를 확인할 수 있어요:

```lua
local humanoid = -- Humanoid 참조

-- 현재 상태 가져오기
local state = humanoid:GetState()
print("현재 상태:", state)

-- 특정 상태인지 확인
if humanoid:GetState() == Enum.HumanoidStateType.Jumping then
    print("점프 중!")
end
```

**주요 상태들:**
- `Running`: 달리기
- `Jumping`: 점프
- `Freefall`: 낙하
- `Swimming`: 수영
- `Dead`: 사망

## 연습 문제

:::note 실습해보기
1. **데미지 존**
   - 닿으면 체력이 10씩 감소하는 파트를 만드세요
   - 1초 쿨다운을 넣어서 연속 데미지를 방지하세요

2. **무적 존**
   - 닿으면 5초간 무적이 되는 파트를 만드세요
   - (힌트: MaxHealth를 매우 크게 설정)

3. **슬로우 존**
   - 닿으면 속도가 느려지고, 떨어지면 원래대로 돌아오는 파트를 만드세요
   - TouchEnded 이벤트를 사용하세요

4. **점프 금지 존**
   - 닿으면 점프를 못하게 하는 파트를 만드세요
   - JumpPower를 0으로 설정하세요
:::

## 3단계 완료!

축하해요! 3단계를 모두 마쳤어요. 이제:
- 이벤트를 활용해 상호작용을 만들 수 있어요
- 반복문으로 움직이는 장애물을 만들 수 있어요
- Humanoid를 제어해 다양한 효과를 줄 수 있어요

다음 [4단계: 시스템 구축](/curriculum/week-10-12/leaderboard)에서는 게임의 완성도를 높이는 시스템을 만들 거예요!
