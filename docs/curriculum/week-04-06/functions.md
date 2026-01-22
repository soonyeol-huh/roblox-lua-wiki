---
sidebar_position: 3
---

# 함수 (Functions)

**함수**는 여러 명령어를 하나로 묶어서 재사용할 수 있게 해줘요. 엔트리의 "함수 정의하기" 블록과 같은 개념이에요!

## 학습 목표

- 함수를 정의하고 호출할 수 있다
- 매개변수와 반환값을 이해한다
- 코드를 효율적으로 구조화할 수 있다

## 왜 함수가 필요할까?

### 함수 없이 코드 작성

```lua
-- 파트 A를 빨간색으로 바꾸기
local partA = workspace.PartA
partA.BrickColor = BrickColor.new("Really red")
partA.Material = Enum.Material.Neon

-- 파트 B를 빨간색으로 바꾸기
local partB = workspace.PartB
partB.BrickColor = BrickColor.new("Really red")
partB.Material = Enum.Material.Neon

-- 파트 C를 빨간색으로 바꾸기
local partC = workspace.PartC
partC.BrickColor = BrickColor.new("Really red")
partC.Material = Enum.Material.Neon
```

같은 코드가 계속 반복되네요! 😫

### 함수로 정리하면

```lua
-- 함수 정의
local function makeRed(part)
    part.BrickColor = BrickColor.new("Really red")
    part.Material = Enum.Material.Neon
end

-- 함수 호출
makeRed(workspace.PartA)
makeRed(workspace.PartB)
makeRed(workspace.PartC)
```

훨씬 깔끔해졌어요! 😄

## 함수 기본 구조

```lua
local function 함수이름()
    -- 실행할 코드
end
```

### 간단한 예제

```lua
-- 함수 정의
local function sayHello()
    print("안녕하세요!")
    print("로블록스 세계에 오신 것을 환영합니다!")
end

-- 함수 호출
sayHello()
```

:::tip 함수 정의 vs 호출
- **정의**: 함수가 무엇을 하는지 설명 (한 번만)
- **호출**: 함수를 실제로 실행 (여러 번 가능)
:::

## 매개변수 (Parameters)

함수에 값을 전달할 수 있어요:

```lua
local function greet(name)
    print("안녕, " .. name .. "!")
end

greet("철수")   -- "안녕, 철수!" 출력
greet("영희")   -- "안녕, 영희!" 출력
greet("민수")   -- "안녕, 민수!" 출력
```

### 여러 개의 매개변수

```lua
local function introduce(name, age)
    print("이름: " .. name)
    print("나이: " .. age .. "살")
end

introduce("홍길동", 12)
```

### 엔트리와 비교

| 엔트리 | 루아 |
|--------|------|
| 함수 정의하기 (숫자 입력받기) | `function add(a, b)` |
| 숫자 1 + 숫자 2 | `a + b` |

## 반환값 (Return)

함수가 계산 결과를 돌려줄 수 있어요:

```lua
local function add(a, b)
    return a + b
end

local result = add(5, 3)
print(result)  -- 8 출력
```

### return 이해하기

```lua
local function calculateDamage(baseDamage, multiplier)
    local totalDamage = baseDamage * multiplier
    return totalDamage
end

local damage = calculateDamage(10, 2)
print("총 데미지:", damage)  -- "총 데미지: 20" 출력
```

:::caution return 이후의 코드
return 문 이후의 코드는 실행되지 않아요!
```lua
local function test()
    return "끝!"
    print("이 줄은 실행 안 됨")  -- 실행되지 않음
end
```
:::

## 실용적인 함수 예제

### 1. 파트 색깔 바꾸기 함수

```lua
local function changeColor(part, color)
    part.BrickColor = BrickColor.new(color)
end

local myPart = script.Parent
changeColor(myPart, "Really red")
changeColor(myPart, "Bright blue")
```

### 2. 데미지 계산 함수

```lua
local function calculateHealth(currentHealth, damage)
    local newHealth = currentHealth - damage
    if newHealth < 0 then
        newHealth = 0
    end
    return newHealth
end

local health = 100
health = calculateHealth(health, 30)
print("남은 체력:", health)  -- "남은 체력: 70" 출력
```

### 3. 파트 생성 함수

```lua
local function createPart(name, position, color)
    local newPart = Instance.new("Part")
    newPart.Name = name
    newPart.Position = position
    newPart.BrickColor = BrickColor.new(color)
    newPart.Anchored = true
    newPart.Parent = workspace
    return newPart
end

local myPart = createPart("MyPart", Vector3.new(0, 10, 0), "Bright green")
```

## 로블록스 내장 함수

로블록스에는 이미 만들어진 유용한 함수들이 있어요:

### wait() / task.wait()

```lua
print("1초 후에...")
task.wait(1)  -- 1초 대기
print("안녕!")
```

### Instance.new()

```lua
local part = Instance.new("Part")  -- 새 파트 생성
local sound = Instance.new("Sound")  -- 새 소리 생성
```

### math 함수들

```lua
print(math.random(1, 10))  -- 1~10 사이 랜덤 숫자
print(math.floor(3.7))      -- 3 (내림)
print(math.ceil(3.2))       -- 4 (올림)
print(math.abs(-5))         -- 5 (절댓값)
```

## 연습 문제

:::note 실습해보기
1. **인사 함수 만들기**
   ```lua
   -- 이름을 받아서 "OOO님 환영합니다!" 를 출력하는 함수를 만드세요
   local function welcome(name)
       -- 여기에 코드 작성
   end

   welcome("홍길동")
   ```

2. **사각형 넓이 계산기**
   ```lua
   -- 가로와 세로를 받아서 넓이를 반환하는 함수를 만드세요
   local function getArea(width, height)
       -- 여기에 코드 작성
   end

   local area = getArea(5, 10)
   print("넓이:", area)  -- "넓이: 50" 이 나와야 해요
   ```

3. **랜덤 색깔 함수**
   ```lua
   -- 파트를 받아서 랜덤 색깔로 바꾸는 함수를 만드세요
   local colors = {"Really red", "Bright blue", "Bright green", "New Yeller"}

   local function randomColor(part)
       -- math.random()을 사용해서 랜덤 색깔을 골라보세요
   end
   ```
:::

## 2단계 완료!

축하해요! 2단계를 모두 마쳤어요. 이제:
- 스크립트를 작성하고 실행할 수 있어요
- 변수로 데이터를 저장하고 관리할 수 있어요
- 함수로 코드를 효율적으로 구조화할 수 있어요

다음 [3단계: 이벤트/조건문](/curriculum/week-07-09/events)에서는 게임에 상호작용을 추가하는 방법을 배울 거예요!
