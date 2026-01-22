---
sidebar_position: 1
---

# 이벤트 (Events)

**이벤트**는 게임에서 일어나는 "사건"이에요. 플레이어가 파트에 닿거나, 버튼을 클릭하거나, 게임에 입장하는 것 모두 이벤트예요!

## 학습 목표

- 이벤트의 개념을 이해한다
- Touched 이벤트를 활용할 수 있다
- 조건문(if)으로 유효성을 검사할 수 있다

## 엔트리 vs 루아 이벤트 비교

| 엔트리 | 루아 |
|--------|------|
| 시작하기 버튼을 클릭했을 때 | `game.Players.PlayerAdded:Connect()` |
| ~에 닿았는가? | `Part.Touched:Connect()` |
| 신호를 받았을 때 | `Event:Connect()` |

## 이벤트 기본 구조

```lua
물체.이벤트이름:Connect(function()
    -- 이벤트 발생 시 실행할 코드
end)
```

### 간단한 예제

```lua
local part = script.Parent

part.Touched:Connect(function()
    print("뭔가 닿았어요!")
end)
```

## Touched 이벤트 상세

Touched는 가장 많이 사용하는 이벤트예요!

### 기본 사용법

```lua
local part = script.Parent

part.Touched:Connect(function(hit)
    print(hit.Name .. "이(가) 닿았습니다!")
end)
```

:::note hit이 뭐예요?
`hit`은 파트에 닿은 물체예요.
플레이어가 닿으면 플레이어 캐릭터의 일부분(다리, 팔 등)이 됩니다.
:::

### 문제점: 너무 많이 실행됨!

```lua
-- 이 코드는 문제가 있어요
part.Touched:Connect(function(hit)
    print("닿음!")  -- 한 번 닿아도 수십 번 출력됨!
end)
```

### 해결책: 디바운스

```lua
local part = script.Parent
local debounce = false  -- 잠금 변수

part.Touched:Connect(function(hit)
    if debounce == false then
        debounce = true  -- 잠금!
        print("닿음!")
        task.wait(1)  -- 1초 대기
        debounce = false  -- 잠금 해제
    end
end)
```

## 조건문 (if 문)

### 엔트리 vs 루아

| 엔트리 | 루아 |
|--------|------|
| 만약 ~라면 | `if 조건 then` |
| 아니면 | `else` |
| ~이고 | `and` |
| ~이거나 | `or` |

### if 문 기본 구조

```lua
if 조건 then
    -- 조건이 참이면 실행
end
```

### if-else 구조

```lua
if 조건 then
    -- 조건이 참이면 실행
else
    -- 조건이 거짓이면 실행
end
```

### if-elseif-else 구조

```lua
local score = 85

if score >= 90 then
    print("A등급!")
elseif score >= 80 then
    print("B등급!")
elseif score >= 70 then
    print("C등급!")
else
    print("더 노력해요!")
end
```

## 비교 연산자

| 연산자 | 의미 | 예시 |
|--------|------|------|
| `==` | 같다 | `score == 100` |
| `~=` | 같지 않다 | `name ~= "적"` |
| `>` | 크다 | `health > 0` |
| `<` | 작다 | `speed < 10` |
| `>=` | 크거나 같다 | `level >= 5` |
| `<=` | 작거나 같다 | `coins <= 0` |

:::caution 주의!
`=`는 값을 저장하는 것이고, `==`는 비교하는 것이에요!
```lua
local x = 5      -- x에 5를 저장
if x == 5 then   -- x가 5와 같은지 비교
```
:::

## 플레이어인지 확인하기

게임에서 닿은 것이 플레이어인지 확인하는 것은 매우 중요해요!

### Humanoid 확인 방법

```lua
local part = script.Parent

part.Touched:Connect(function(hit)
    -- 닿은 것의 부모에서 Humanoid 찾기
    local humanoid = hit.Parent:FindFirstChild("Humanoid")

    if humanoid then
        print("플레이어가 닿았어요!")
    else
        print("플레이어가 아니에요")
    end
end)
```

### FindFirstChild란?

```lua
-- 자식 중에서 "Humanoid"라는 이름을 가진 것을 찾아요
-- 있으면 그 객체를 반환, 없으면 nil을 반환
local humanoid = hit.Parent:FindFirstChild("Humanoid")
```

## 킬 파트 만들기

닿으면 죽는 용암 파트를 만들어봐요!

```lua
local killPart = script.Parent

killPart.Touched:Connect(function(hit)
    local humanoid = hit.Parent:FindFirstChild("Humanoid")

    if humanoid then
        humanoid.Health = 0  -- 체력을 0으로!
    end
end)
```

### 킬 파트 꾸미기

```lua
local killPart = script.Parent

-- 용암처럼 보이게 설정
killPart.BrickColor = BrickColor.new("Really red")
killPart.Material = Enum.Material.Neon
killPart.Anchored = true

-- 닿으면 사망
killPart.Touched:Connect(function(hit)
    local humanoid = hit.Parent:FindFirstChild("Humanoid")

    if humanoid then
        humanoid.Health = 0
    end
end)
```

## 기타 유용한 이벤트

### TouchEnded (떨어졌을 때)

```lua
part.TouchEnded:Connect(function(hit)
    print("파트에서 떨어졌어요!")
end)
```

### PlayerAdded (플레이어 입장)

```lua
game.Players.PlayerAdded:Connect(function(player)
    print(player.Name .. "님이 입장했습니다!")
end)
```

### PlayerRemoving (플레이어 퇴장)

```lua
game.Players.PlayerRemoving:Connect(function(player)
    print(player.Name .. "님이 퇴장했습니다!")
end)
```

## 연습 문제

:::note 실습해보기
1. **색깔 변경 파트**
   - 플레이어가 닿으면 파트 색깔이 바뀌는 스크립트를 만드세요
   - 디바운스를 사용해서 1초에 한 번만 바뀌게 하세요

2. **점프 파트**
   - 플레이어가 닿으면 "점프했어요!" 메시지 출력
   - Humanoid가 있는지 확인하세요

3. **조건문 연습**
   ```lua
   local health = 50

   -- health 값에 따라 다른 메시지를 출력하세요
   -- 100 이상: "완벽해요!"
   -- 50 이상: "괜찮아요"
   -- 0 초과: "위험해요!"
   -- 0 이하: "게임 오버"
   ```
:::

## 다음 단계

이벤트와 조건문을 마스터했나요? 다음으로 [반복문](/curriculum/week-07-09/loops)에서 코드를 반복 실행하는 방법을 배울 거예요!
