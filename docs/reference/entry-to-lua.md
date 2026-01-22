---
sidebar_position: 1
---

# 엔트리 → 루아 변환표

엔트리에서 배운 블록들이 루아에서는 어떻게 표현되는지 알아봐요! 이미 알고 있는 개념을 새로운 언어로 번역하는 것뿐이에요.

## 시작 블록

| 엔트리 블록 | 루아 코드 | 설명 |
|------------|----------|------|
| 시작하기 버튼 클릭 시 | 스크립트가 자동 실행됨 | 로블록스는 게임 시작 시 자동 실행 |
| 신호를 받았을 때 | `Event:Connect(function)` | 이벤트 연결 |

## 흐름 제어

### 반복문

| 엔트리 블록 | 루아 코드 |
|------------|----------|
| 계속 반복하기 | `while true do ... task.wait() end` |
| 10번 반복하기 | `for i = 1, 10 do ... end` |
| ~까지 반복하기 | `while 조건 do ... end` |

```lua
-- 계속 반복하기
while true do
    print("계속!")
    task.wait(1)
end

-- 10번 반복하기
for i = 1, 10 do
    print(i)
end

-- 조건까지 반복하기
local count = 0
while count < 5 do
    print(count)
    count = count + 1
end
```

### 조건문

| 엔트리 블록 | 루아 코드 |
|------------|----------|
| 만약 ~라면 | `if 조건 then ... end` |
| 아니면 | `else` |
| 아니고 만약 ~라면 | `elseif 조건 then` |

```lua
-- 만약 ~라면
if score >= 100 then
    print("통과!")
end

-- 만약 ~라면 / 아니면
if health > 0 then
    print("생존")
else
    print("사망")
end

-- 만약 / 아니고 만약 / 아니면
if score >= 90 then
    print("A")
elseif score >= 80 then
    print("B")
else
    print("C")
end
```

## 변수

| 엔트리 블록 | 루아 코드 |
|------------|----------|
| 변수 만들기 | `local 변수이름 = 값` |
| 변수 값 정하기 | `변수이름 = 새값` |
| 변수 값 ~만큼 바꾸기 | `변수이름 = 변수이름 + 값` 또는 `변수이름 += 값` |

```lua
-- 변수 만들기
local score = 0
local name = "플레이어"
local isAlive = true

-- 변수 값 정하기
score = 100

-- 변수 값 바꾸기
score = score + 10  -- 또는
score += 10
```

## 연산자

### 산술 연산자

| 엔트리 | 루아 | 예시 |
|--------|------|------|
| + (더하기) | `+` | `5 + 3` → 8 |
| - (빼기) | `-` | `5 - 3` → 2 |
| × (곱하기) | `*` | `5 * 3` → 15 |
| ÷ (나누기) | `/` | `6 / 3` → 2 |
| 나머지 | `%` | `7 % 3` → 1 |

### 비교 연산자

| 엔트리 | 루아 | 예시 |
|--------|------|------|
| = (같다) | `==` | `x == 5` |
| ≠ (같지 않다) | `~=` | `x ~= 5` |
| > (크다) | `>` | `x > 5` |
| < (작다) | `<` | `x < 5` |
| ≥ (크거나 같다) | `>=` | `x >= 5` |
| ≤ (작거나 같다) | `<=` | `x <= 5` |

### 논리 연산자

| 엔트리 | 루아 | 예시 |
|--------|------|------|
| 그리고 | `and` | `x > 0 and x < 10` |
| 또는 | `or` | `x < 0 or x > 10` |
| ~이(가) 아니다 | `not` | `not isAlive` |

## 이벤트

| 엔트리 블록 | 루아 코드 | 로블록스 활용 |
|------------|----------|-------------|
| ~에 닿았는가? | `Part.Touched:Connect()` | 킬 파트, 코인 수집 |
| 신호 보내기 | `RemoteEvent:FireServer()` | 클라이언트→서버 통신 |
| 신호 받았을 때 | `RemoteEvent.OnServerEvent:Connect()` | 서버에서 처리 |

```lua
-- ~에 닿았는가?
part.Touched:Connect(function(hit)
    print("뭔가 닿았어요!")
end)

-- 플레이어 입장 시
game.Players.PlayerAdded:Connect(function(player)
    print(player.Name .. " 입장!")
end)
```

## 함수

| 엔트리 블록 | 루아 코드 |
|------------|----------|
| 함수 정의하기 | `local function 이름() ... end` |
| 함수 실행하기 | `함수이름()` |
| 값 돌려주기 | `return 값` |

```lua
-- 함수 정의
local function sayHello(name)
    print("안녕, " .. name .. "!")
end

-- 함수 호출
sayHello("철수")

-- 값 돌려주기
local function add(a, b)
    return a + b
end

local result = add(5, 3)  -- result = 8
```

## 모양/움직임

| 엔트리 블록 | 루아 코드 | 설명 |
|------------|----------|------|
| 이동하기 | `part.Position = Vector3.new(x, y, z)` | 위치 변경 |
| 회전하기 | `part.Orientation = Vector3.new(x, y, z)` | 각도 변경 |
| 크기 바꾸기 | `part.Size = Vector3.new(x, y, z)` | 크기 변경 |
| 모양 바꾸기 | `part.BrickColor = BrickColor.new("색상")` | 색깔 변경 |
| 보이기/숨기기 | `part.Transparency = 0 또는 1` | 투명도 |

```lua
local part = script.Parent

-- 위치 이동
part.Position = Vector3.new(0, 10, 0)

-- 회전
part.Orientation = Vector3.new(0, 45, 0)

-- 크기
part.Size = Vector3.new(5, 5, 5)

-- 색깔
part.BrickColor = BrickColor.new("Really red")

-- 투명도
part.Transparency = 0.5  -- 반투명
```

## 대기

| 엔트리 블록 | 루아 코드 |
|------------|----------|
| 1초 기다리기 | `task.wait(1)` |
| 0.5초 기다리기 | `task.wait(0.5)` |

```lua
print("시작")
task.wait(2)  -- 2초 대기
print("2초 후")
```

## 출력

| 엔트리 블록 | 루아 코드 |
|------------|----------|
| 말하기 | `print("메시지")` |
| 생각하기 | `print("메시지")` (동일) |

```lua
print("안녕하세요!")
print("점수:", score)
print("이름: " .. name .. ", 나이: " .. age)
```

## 리스트 (테이블)

| 엔트리 블록 | 루아 코드 |
|------------|----------|
| 리스트 만들기 | `local list = {}` |
| 항목 추가 | `table.insert(list, 값)` |
| 항목 가져오기 | `list[번호]` |
| 리스트 길이 | `#list` |

```lua
-- 리스트 만들기
local fruits = {"사과", "바나나", "오렌지"}

-- 항목 추가
table.insert(fruits, "포도")

-- 항목 가져오기 (1부터 시작!)
print(fruits[1])  -- "사과"

-- 리스트 길이
print(#fruits)  -- 4

-- 모든 항목 순회
for i, fruit in ipairs(fruits) do
    print(i, fruit)
end
```

## 빠른 참조 카드

```lua
-- 변수
local x = 10

-- 조건문
if x > 5 then
    print("크다")
end

-- 반복문
for i = 1, 10 do
    print(i)
end

-- 함수
local function greet(name)
    return "안녕, " .. name
end

-- 이벤트
part.Touched:Connect(function(hit)
    print("닿음!")
end)

-- 대기
task.wait(1)
```
