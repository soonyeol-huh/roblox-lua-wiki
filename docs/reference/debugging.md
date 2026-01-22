---
sidebar_position: 2
---

# 디버깅 가이드

코딩을 하다 보면 에러가 발생하는 건 당연한 일이에요! 에러를 무서워하지 말고, 해결하는 방법을 배워봐요.

## 디버깅이란?

```
디버깅 = 코드에서 버그(오류)를 찾아 고치는 과정

버그(Bug)의 유래:
옛날 컴퓨터에 실제 벌레(bug)가 들어가서
오작동을 일으킨 것에서 유래했어요!
```

## 출력창(Output) 사용하기

### 출력창 열기

1. View 탭 클릭
2. Output 클릭
3. 화면 하단에 출력창이 나타남

### 출력창 메시지 종류

| 색상 | 의미 | 예시 |
|------|------|------|
| 흰색 | 일반 메시지 | `print()` 출력 |
| 빨간색 | 에러 | 코드 오류 |
| 주황색 | 경고 | 잠재적 문제 |
| 파란색 | 정보 | 시스템 메시지 |

## print()로 디버깅하기

가장 기본적이고 효과적인 디버깅 방법!

### 코드 실행 확인

```lua
print("1단계 시작")
-- 코드...
print("1단계 완료")

print("2단계 시작")
-- 코드...
print("2단계 완료")
```

### 변수 값 확인

```lua
local health = 100
local damage = 30

print("데미지 전 체력:", health)
health = health - damage
print("데미지 후 체력:", health)
```

### 조건문 진입 확인

```lua
if health > 0 then
    print("if 블록 진입!")
    -- 코드...
else
    print("else 블록 진입!")
    -- 코드...
end
```

## 자주 발생하는 에러

### 1. attempt to index nil

```lua
-- 에러 발생 코드
local part = workspace.MyPart
part.BrickColor = BrickColor.new("Red")
-- Error: attempt to index nil with 'BrickColor'
```

**원인**: `workspace.MyPart`가 존재하지 않아서 nil

**해결**:
```lua
-- 방법 1: 존재 확인
local part = workspace:FindFirstChild("MyPart")
if part then
    part.BrickColor = BrickColor.new("Red")
else
    print("MyPart를 찾을 수 없습니다!")
end

-- 방법 2: WaitForChild 사용
local part = workspace:WaitForChild("MyPart")
part.BrickColor = BrickColor.new("Red")
```

### 2. Expected 'end'

```lua
-- 에러 발생 코드
if health > 0 then
    print("살아있음")
-- end가 없음!
```

**해결**: `end` 추가
```lua
if health > 0 then
    print("살아있음")
end  -- end 추가!
```

### 3. Expected identifier

```lua
-- 에러 발생 코드
local 1score = 100  -- 숫자로 시작하는 변수명
local my-name = "홍길동"  -- 하이픈 사용
```

**해결**: 올바른 변수명 사용
```lua
local score1 = 100
local my_name = "홍길동"  -- 언더스코어 사용
local myName = "홍길동"   -- 카멜케이스 사용
```

### 4. attempt to call a nil value

```lua
-- 에러 발생 코드
Print("Hello")  -- P가 대문자
```

**해결**: 소문자로 수정
```lua
print("Hello")  -- p 소문자
```

### 5. 'eof' expected near 'end'

```lua
-- 에러 발생 코드
if health > 0 then
    print("OK")
end
end  -- end가 하나 더 있음
```

**해결**: 불필요한 `end` 제거

## 대소문자 체크리스트

루아는 대소문자를 구분해요! 자주 틀리는 것들:

| 틀린 것 | 올바른 것 |
|---------|----------|
| `Print()` | `print()` |
| `TRUE` / `FALSE` | `true` / `false` |
| `Nil` | `nil` |
| `connect()` | `Connect()` |
| `touched` | `Touched` |
| `Parent` | `Parent` (이건 맞음) |

## WaitForChild 사용하기

객체가 로드되기 전에 접근하면 nil 에러가 발생해요.

### 문제 상황

```lua
-- 가끔 에러 발생
local humanoid = character.Humanoid
-- 캐릭터가 완전히 로드되기 전에 실행되면 nil!
```

### 해결책

```lua
-- WaitForChild로 대기
local humanoid = character:WaitForChild("Humanoid")
-- Humanoid가 생길 때까지 기다림
```

### WaitForChild 타임아웃

```lua
-- 5초까지만 대기
local humanoid = character:WaitForChild("Humanoid", 5)

if humanoid then
    print("찾음!")
else
    print("5초 내에 찾지 못함")
end
```

## 스크립트 분석 도구

로블록스 스튜디오의 내장 도구를 활용하세요!

### Script Analysis 사용법

1. View 탭 클릭
2. Script Analysis 클릭
3. 코드의 문제점을 자동으로 찾아줌

### 분석 결과 종류

- **에러 (빨간색)**: 반드시 수정해야 함
- **경고 (노란색)**: 수정 권장
- **정보 (파란색)**: 참고 사항

## 디버깅 전략

### 1. 에러 메시지 읽기

```
ServerScriptService.Script:5: attempt to index nil
```

- `ServerScriptService.Script`: 파일 위치
- `:5`: 5번째 줄
- `attempt to index nil`: 에러 내용

### 2. 범위 좁히기

에러가 어디서 발생하는지 모를 때:

```lua
print("=== 함수 시작 ===")

print("1")
-- 코드 1

print("2")
-- 코드 2

print("3")
-- 코드 3

print("=== 함수 끝 ===")
```

출력에서 마지막으로 나온 숫자 다음에 에러가 있어요!

### 3. 코드 주석 처리

의심되는 코드를 주석으로 막아서 테스트:

```lua
-- 임시로 주석 처리
--[[
local problematicCode = something
problematicCode:DoSomething()
]]--
```

### 4. 최소 재현 코드

복잡한 코드에서 에러가 나면:
1. 새 스크립트 생성
2. 문제가 되는 부분만 복사
3. 최소한의 코드로 에러 재현
4. 원인 파악 후 원본 수정

## 일반적인 실수 해결

### 무한 루프에 wait 빠뜨림

```lua
-- 잘못된 코드 (게임 멈춤!)
while true do
    print("무한!")
end

-- 올바른 코드
while true do
    print("무한!")
    task.wait(1)  -- 반드시 필요!
end
```

### 스크립트 위치 오류

| 스크립트 종류 | 올바른 위치 |
|--------------|------------|
| 서버 스크립트 | ServerScriptService |
| 로컬 스크립트 | StarterPlayerScripts, StarterGui |
| 모듈 스크립트 | ReplicatedStorage, ServerStorage |

### 서버/클라이언트 혼동

```lua
-- 서버에서만 작동
game.Players.PlayerAdded:Connect()  -- 서버 스크립트에서!

-- 클라이언트에서만 작동
local player = game.Players.LocalPlayer  -- 로컬 스크립트에서!
```

## 도움 요청하기

스스로 해결이 안 될 때:

1. **에러 메시지 복사**
2. **문제의 코드 복사**
3. **무엇을 하려고 했는지 설명**
4. **어떤 결과를 기대했는지 설명**

좋은 질문 예시:
```
"킬 파트를 만들었는데 'attempt to index nil' 에러가 나요.
[코드 붙여넣기]
플레이어가 닿으면 죽게 하고 싶은데,
hit.Parent.Humanoid가 nil이라고 해요."
```
