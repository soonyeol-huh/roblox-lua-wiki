---
sidebar_position: 2
---

# 변수와 속성 제어

**변수**는 정보를 담는 상자예요! 엔트리에서 "변수 만들기"로 점수를 저장했던 것처럼, 루아에서도 변수를 사용해요.

![변수로 속성 변경하기](/img/screenshots/variables-demo.png)

## 학습 목표

- 변수를 선언하고 값을 저장할 수 있다
- 파트의 속성을 코드로 변경할 수 있다
- 다양한 데이터 타입을 이해한다

## 변수 만들기

### 엔트리 vs 루아

| 엔트리 | 루아 |
|--------|------|
| 변수 만들기 → 이름: 점수 | `local 점수 = 0` |
| 변수 값 정하기 → 10 | `점수 = 10` |
| 변수 값 바꾸기 → 1씩 | `점수 = 점수 + 1` |

### local 키워드

```lua
local playerName = "홍길동"
local score = 100
local isAlive = true
```

:::tip local이 뭐예요?
`local`은 "이 변수는 여기서만 사용해요"라는 의미예요.
항상 변수 앞에 local을 붙이는 습관을 기르세요!
:::

### 변수 이름 규칙

| 올바른 예 | 잘못된 예 |
|-----------|-----------|
| `playerScore` | `player score` (공백 불가) |
| `score1` | `1score` (숫자로 시작 불가) |
| `my_name` | `my-name` (하이픈 불가) |

## 데이터 타입

변수에는 여러 종류의 데이터를 저장할 수 있어요:

### 숫자 (Number)

```lua
local level = 5
local health = 100.5
local damage = -10
```

### 문자열 (String)

```lua
local name = "로블록스"
local message = '안녕하세요!'
```

:::note 따옴표
문자열은 큰따옴표(`"`) 또는 작은따옴표(`'`) 둘 다 사용 가능해요!
:::

### 불린 (Boolean)

```lua
local isRunning = true
local isDead = false
```

참(`true`) 또는 거짓(`false`) 두 가지만 있어요.

### nil

```lua
local empty = nil  -- 아무것도 없음
```

## 파트 속성 바꾸기

이제 진짜 재미있는 부분이에요! 코드로 파트의 속성을 바꿔볼 거예요.

### 색깔 바꾸기

```lua
local part = script.Parent

-- BrickColor 사용
part.BrickColor = BrickColor.new("Really red")

-- Color3 사용 (RGB 값)
part.Color = Color3.fromRGB(255, 0, 0)  -- 빨간색
```

**자주 쓰는 BrickColor:**
- `"Really red"` - 빨간색
- `"Bright blue"` - 파란색
- `"Bright green"` - 초록색
- `"New Yeller"` - 노란색
- `"Really black"` - 검정색
- `"Institutional white"` - 흰색

### 투명도 바꾸기

```lua
local part = script.Parent

part.Transparency = 0    -- 불투명 (기본)
part.Transparency = 0.5  -- 반투명
part.Transparency = 1    -- 완전 투명 (안 보임)
```

### 재질 바꾸기

```lua
local part = script.Parent

part.Material = Enum.Material.Neon    -- 빛나는 재질
part.Material = Enum.Material.Wood    -- 나무
part.Material = Enum.Material.Glass   -- 유리
```

### 크기 바꾸기

```lua
local part = script.Parent

part.Size = Vector3.new(10, 5, 10)  -- X, Y, Z 크기
```

### 위치 바꾸기

```lua
local part = script.Parent

part.Position = Vector3.new(0, 10, 0)  -- 공중으로 이동
```

## 산술 연산자

숫자를 계산할 때 사용해요:

| 연산자 | 의미 | 예시 |
|--------|------|------|
| `+` | 더하기 | `5 + 3` → 8 |
| `-` | 빼기 | `5 - 3` → 2 |
| `*` | 곱하기 | `5 * 3` → 15 |
| `/` | 나누기 | `6 / 3` → 2 |
| `%` | 나머지 | `7 % 3` → 1 |
| `^` | 거듭제곱 | `2 ^ 3` → 8 |

### 변수 값 증가/감소

```lua
local score = 0

score = score + 10   -- 10 증가 → score는 이제 10
score = score - 5    -- 5 감소 → score는 이제 5
score = score * 2    -- 2배 → score는 이제 10
```

### 축약 연산자

```lua
local score = 0

score += 10   -- score = score + 10 과 같음
score -= 5    -- score = score - 5 와 같음
score *= 2    -- score = score * 2 와 같음
```

## 문자열 연결하기

문자열을 이어붙이려면 `..`을 사용해요:

```lua
local firstName = "로블"
local lastName = "록스"

local fullName = firstName .. lastName
print(fullName)  -- "로블록스" 출력

-- 숫자와 문자열 연결
local score = 100
print("점수: " .. score)  -- "점수: 100" 출력
```

## 실습: 마법 파트 만들기

게임을 실행하면 파트가 변하는 마법 파트를 만들어봐요!

```lua
local part = script.Parent

-- 1. 파트 이름 출력
print("마법 파트 활성화!")

-- 2. 빨간색으로 변경
part.BrickColor = BrickColor.new("Really red")

-- 3. 네온 재질로 변경 (빛남!)
part.Material = Enum.Material.Neon

-- 4. 크기 2배로
local currentSize = part.Size
part.Size = currentSize * 2

-- 5. 결과 출력
print("변신 완료!")
print("새 크기:", part.Size)
```

## 연습 문제

:::note 실습해보기
1. **색깔 변환기**
   - 파트를 만들고 스크립트를 추가하세요
   - 게임 시작 시 파란색으로 바뀌게 해보세요

2. **투명화 파트**
   - 게임 시작 시 파트가 반투명(0.5)이 되게 해보세요

3. **점수 계산기**
   ```lua
   local baseScore = 100
   local bonus = 50
   -- 두 점수를 더해서 출력해보세요
   -- "총점: ???" 형태로 출력
   ```

4. **자기소개 카드**
   ```lua
   local name = "내 이름"
   local age = 00
   local hobby = "내 취미"
   -- 위 변수들을 사용해서 자기소개를 출력해보세요
   ```
:::

## 다음 단계

변수와 속성 제어를 마스터했나요? 다음으로 [함수](/curriculum/week-04-06/functions)에서 코드를 효율적으로 정리하는 방법을 배울 거예요!
