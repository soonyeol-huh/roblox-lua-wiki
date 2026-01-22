---
sidebar_position: 2
---

# 반복문 (Loops)

**반복문**은 같은 코드를 여러 번 실행할 때 사용해요. 엔트리의 "계속 반복하기"나 "~번 반복하기" 블록과 같아요!

## 학습 목표

- while 반복문을 사용할 수 있다
- for 반복문을 사용할 수 있다
- task.wait()로 반복 속도를 조절할 수 있다

## 엔트리 vs 루아 반복문 비교

| 엔트리 | 루아 |
|--------|------|
| 계속 반복하기 | `while true do` |
| 10번 반복하기 | `for i = 1, 10 do` |
| ~까지 반복하기 | `while 조건 do` |

## while 반복문

### 무한 반복

```lua
while true do
    print("계속 실행!")
    task.wait(1)  -- 1초 대기
end
```

:::caution 중요!
`task.wait()`를 빼면 게임이 멈춰버려요!
반드시 대기 시간을 넣어주세요.
:::

### 조건부 반복

```lua
local count = 0

while count < 5 do
    print("카운트:", count)
    count = count + 1
    task.wait(0.5)
end

print("반복 끝!")
```

## for 반복문

### 기본 구조

```lua
for i = 시작값, 끝값 do
    -- 반복할 코드
end
```

### 예제: 1부터 5까지

```lua
for i = 1, 5 do
    print(i)
end

-- 출력:
-- 1
-- 2
-- 3
-- 4
-- 5
```

### 증가값 지정하기

```lua
-- 2씩 증가
for i = 0, 10, 2 do
    print(i)
end

-- 출력: 0, 2, 4, 6, 8, 10
```

### 역순 반복

```lua
-- 5부터 1까지 감소
for i = 5, 1, -1 do
    print(i)
end

-- 출력: 5, 4, 3, 2, 1
```

## 실습: 움직이는 파트 만들기

### 위아래로 움직이는 파트

```lua
local part = script.Parent
local startPosition = part.Position

while true do
    -- 위로 이동
    for i = 1, 10 do
        part.Position = startPosition + Vector3.new(0, i, 0)
        task.wait(0.1)
    end

    -- 아래로 이동
    for i = 10, 1, -1 do
        part.Position = startPosition + Vector3.new(0, i, 0)
        task.wait(0.1)
    end
end
```

### 회전하는 파트

```lua
local part = script.Parent

while true do
    part.Orientation = part.Orientation + Vector3.new(0, 5, 0)
    task.wait(0.05)
end
```

### 색깔이 변하는 파트

```lua
local part = script.Parent
local colors = {"Really red", "Bright blue", "Bright green", "New Yeller"}

while true do
    for i = 1, #colors do
        part.BrickColor = BrickColor.new(colors[i])
        task.wait(1)
    end
end
```

:::note #colors가 뭐예요?
`#`은 테이블(목록)의 길이를 알려줘요.
colors에 4개가 있으니 `#colors`는 4예요!
:::

## 반복문 제어

### break - 반복 중단

```lua
for i = 1, 10 do
    print(i)
    if i == 5 then
        break  -- 5에서 멈춤
    end
end

-- 출력: 1, 2, 3, 4, 5
```

### continue - 다음 반복으로 건너뛰기

```lua
for i = 1, 5 do
    if i == 3 then
        continue  -- 3은 건너뜀
    end
    print(i)
end

-- 출력: 1, 2, 4, 5
```

## 중첩 반복문

반복문 안에 반복문을 넣을 수 있어요:

```lua
-- 구구단 출력
for i = 2, 9 do
    print("--- " .. i .. "단 ---")
    for j = 1, 9 do
        print(i .. " x " .. j .. " = " .. i * j)
    end
end
```

## 실용적인 예제

### 카운트다운

```lua
for i = 10, 1, -1 do
    print(i .. "초 남았습니다!")
    task.wait(1)
end
print("시작!")
```

### 점점 빨라지는 회전

```lua
local part = script.Parent
local speed = 0.5

while speed > 0.01 do
    part.Orientation = part.Orientation + Vector3.new(0, 10, 0)
    task.wait(speed)
    speed = speed * 0.95  -- 점점 빨라짐
end
```

### 여러 파트 한 번에 처리

```lua
-- workspace의 모든 자식을 순회
for _, child in pairs(workspace:GetChildren()) do
    if child:IsA("Part") then
        child.BrickColor = BrickColor.new("Really red")
    end
end
```

## 연습 문제

:::note 실습해보기
1. **숫자 출력하기**
   - 1부터 10까지 출력하는 for 문을 작성하세요
   - 10부터 1까지 거꾸로 출력해보세요

2. **깜빡이는 파트**
   - while 문을 사용해서 파트가 보였다 안 보였다 하게 만드세요
   - (힌트: Transparency를 0과 1 사이로 바꿔요)
   ```lua
   local part = script.Parent

   while true do
       part.Transparency = 1  -- 투명
       task.wait(0.5)
       part.Transparency = 0  -- 불투명
       task.wait(0.5)
   end
   ```

3. **이동하는 장애물**
   - 파트가 왼쪽으로 10칸 이동했다가 오른쪽으로 10칸 이동하는 스크립트를 만드세요
   - Vector3.new(1, 0, 0)을 Position에 더하면 X축으로 이동해요

4. **점점 커지는 파트**
   ```lua
   local part = script.Parent

   for i = 1, 5 do
       -- 파트 크기를 i만큼 키워보세요
       -- 힌트: part.Size = Vector3.new(i, i, i)
   end
   ```
:::

## 다음 단계

반복문을 마스터했나요? 다음으로 [Humanoid 제어](/curriculum/week-07-09/humanoid)에서 플레이어 캐릭터를 제어하는 방법을 배울 거예요!
