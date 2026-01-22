---
sidebar_position: 1
---

# 킬 파트 프로젝트

닿으면 캐릭터가 사망하는 용암/함정 파트를 만들어봐요! 이 프로젝트를 통해 이벤트, 조건문, 계층 구조를 모두 학습할 수 있어요.

## 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 난이도 | ⭐⭐ 초급 |
| 학습 개념 | Touched 이벤트, if 조건문, FindFirstChild |
| 소요 시간 | 15분 |

## 엔트리 블록과 비교

| 엔트리 | 루아 |
|--------|------|
| ~에 닿았는가? | `Part.Touched:Connect()` |
| 만약 ~라면 | `if humanoid then` |
| 변수 값 정하기 | `humanoid.Health = 0` |

## 완성 코드

```lua
-- KillPart 안에 넣을 Script
local killPart = script.Parent

-- 파트 스타일 설정 (용암처럼)
killPart.BrickColor = BrickColor.new("Really red")
killPart.Material = Enum.Material.Neon
killPart.Anchored = true

-- 닿으면 실행되는 함수
local function onTouched(hit)
    -- hit = 닿은 물체 (캐릭터의 다리, 팔 등)
    -- hit.Parent = 캐릭터 전체

    -- Humanoid 찾기
    local humanoid = hit.Parent:FindFirstChild("Humanoid")

    -- Humanoid가 있으면 (= 플레이어라면)
    if humanoid then
        -- 체력을 0으로 → 즉사!
        humanoid.Health = 0
    end
end

-- Touched 이벤트 연결
killPart.Touched:Connect(onTouched)
```

## 코드 줄별 설명

### 1단계: 파트 참조

```lua
local killPart = script.Parent
```
- `script`는 이 스크립트 자신
- `script.Parent`는 스크립트가 들어있는 파트
- `local`로 변수에 저장

### 2단계: 파트 스타일

```lua
killPart.BrickColor = BrickColor.new("Really red")
killPart.Material = Enum.Material.Neon
killPart.Anchored = true
```
- 빨간색 + 네온 재질 = 용암처럼 보임!
- `Anchored = true`로 고정

### 3단계: Touched 이벤트

```lua
killPart.Touched:Connect(onTouched)
```
- 파트에 무언가 닿으면 `onTouched` 함수 실행
- `:Connect()`로 이벤트와 함수 연결

### 4단계: 닿은 대상 확인

```lua
local function onTouched(hit)
    local humanoid = hit.Parent:FindFirstChild("Humanoid")
```
- `hit` = 닿은 물체 (캐릭터의 일부분)
- `hit.Parent` = 캐릭터 전체
- `FindFirstChild("Humanoid")` = Humanoid 찾기

### 5단계: 조건 확인 및 처리

```lua
    if humanoid then
        humanoid.Health = 0
    end
end
```
- `humanoid`가 존재하면 (nil이 아니면) 실행
- `Health = 0`으로 즉사

## 응용: 디바운스 추가

여러 번 실행되는 것을 방지:

```lua
local killPart = script.Parent
local debounce = false

local function onTouched(hit)
    if debounce then return end

    local humanoid = hit.Parent:FindFirstChild("Humanoid")

    if humanoid then
        debounce = true
        humanoid.Health = 0
        task.wait(1)
        debounce = false
    end
end

killPart.Touched:Connect(onTouched)
```

## 응용: 데미지 파트

즉사가 아닌 데미지를 주는 버전:

```lua
local damagePart = script.Parent
local damage = 25  -- 데미지량
local debounce = false

damagePart.BrickColor = BrickColor.new("Bright orange")
damagePart.Material = Enum.Material.Neon

local function onTouched(hit)
    if debounce then return end

    local humanoid = hit.Parent:FindFirstChild("Humanoid")

    if humanoid then
        debounce = true

        -- 데미지 적용
        humanoid.Health = humanoid.Health - damage
        print("데미지! 남은 체력:", humanoid.Health)

        task.wait(0.5)  -- 0.5초 쿨다운
        debounce = false
    end
end

damagePart.Touched:Connect(onTouched)
```

## 응용: 움직이는 킬 파트

좌우로 움직이는 장애물:

```lua
local killPart = script.Parent
local startPos = killPart.Position
local moveDistance = 10
local moveSpeed = 0.05

killPart.BrickColor = BrickColor.new("Really red")
killPart.Material = Enum.Material.Neon
killPart.Anchored = true

-- 사망 로직
killPart.Touched:Connect(function(hit)
    local humanoid = hit.Parent:FindFirstChild("Humanoid")
    if humanoid then
        humanoid.Health = 0
    end
end)

-- 움직임 로직
local direction = 1

while true do
    killPart.Position = killPart.Position + Vector3.new(direction * 0.5, 0, 0)

    -- 범위 확인
    if killPart.Position.X >= startPos.X + moveDistance then
        direction = -1
    elseif killPart.Position.X <= startPos.X - moveDistance then
        direction = 1
    end

    task.wait(moveSpeed)
end
```

## 연습 문제

:::note 도전해보세요!
1. **슬로우 킬 파트**
   - 닿으면 3초에 걸쳐 서서히 체력이 감소
   - 힌트: 반복문으로 조금씩 체력 감소

2. **조건부 킬 파트**
   - 점수가 10 미만인 플레이어만 사망
   - 힌트: leaderstats 확인 필요

3. **부활 파트**
   - 죽은 후 이 파트에 닿으면 체력 회복
   - 힌트: `humanoid.Health = humanoid.MaxHealth`
:::

## 자주 하는 실수

| 실수 | 해결 |
|------|------|
| 스크립트가 작동 안 함 | 파트 안에 Script가 있는지 확인 |
| 플레이어가 안 죽음 | Anchored가 켜져있는지 확인 |
| 에러: attempt to index nil | FindFirstChild 결과 확인 |
