---
sidebar_position: 1
---

# 첫 번째 스크립트 작성하기

드디어 코딩을 시작할 시간이에요! 루아(Lua)는 로블록스에서 사용하는 프로그래밍 언어예요. 문법이 간단해서 초등학생도 쉽게 배울 수 있답니다!

## 학습 목표

- 스크립트를 생성하고 실행할 수 있다
- print() 함수로 출력창에 메시지를 보낼 수 있다
- 부모-자식 계층 구조를 이해한다

## 스크립트란?

```
스크립트 = 컴퓨터에게 내리는 명령어 모음

엔트리에서는 블록을 쌓아서 명령을 내렸죠?
루아에서는 글자로 명령을 내려요!
```

## 첫 번째 스크립트 만들기

### 1단계: 파트 만들기

1. Model 탭에서 Part를 추가합니다
2. 파트 이름을 "MyPart"로 바꿉니다
3. Anchored를 켜세요

### 2단계: 스크립트 추가하기

1. 탐색기에서 MyPart를 오른쪽 클릭
2. `Insert Object` 선택
3. `Script` 선택

이제 파트 안에 스크립트가 생겼어요!

### 3단계: 코드 작성하기

스크립트를 더블클릭하면 코드 에디터가 열려요.

기본 코드를 지우고 이렇게 작성해보세요:

```lua
print("Hello Roblox!")
```

### 4단계: 실행하기

1. 상단의 `Play` 버튼을 클릭합니다
2. 하단의 `Output` 창을 확인합니다
3. "Hello Roblox!"가 출력되면 성공!

:::tip 출력창이 안 보인다면?
상단 View 탭에서 Output을 클릭하세요!
:::

## print() 함수 이해하기

```lua
print("출력할 내용")
```

| 부분 | 설명 |
|------|------|
| `print` | 출력하라는 명령어 (함수) |
| `()` | 함수에 값을 전달하는 괄호 |
| `" "` | 따옴표 안에 텍스트를 넣어요 |

### 다양한 출력 예제

```lua
-- 문자 출력
print("안녕하세요!")

-- 숫자 출력
print(100)

-- 계산 결과 출력
print(5 + 3)

-- 여러 값 출력
print("점수:", 100)
```

:::note 주석이란?
`--`로 시작하는 줄은 **주석**이에요.
컴퓨터가 무시하고, 메모용으로 사용해요!
:::

## 부모-자식 계층 구조

로블록스에서는 모든 물체가 폴더처럼 계층 구조로 연결되어 있어요.

```
Workspace (부모)
└── MyPart (자식)
    └── Script (MyPart의 자식)
```

### script.Parent 이해하기

스크립트에서 자신이 속한 파트를 참조하려면:

```lua
-- script = 이 스크립트 자신
-- script.Parent = 이 스크립트의 부모 (MyPart)

local myPart = script.Parent
print(myPart.Name)  -- "MyPart" 출력
```

### 부모의 부모는?

```lua
local workspace = script.Parent.Parent
print(workspace.Name)  -- "Workspace" 출력
```

## 스크립트 위치의 중요성

:::caution 중요!
스크립트는 어디에 위치하느냐에 따라 실행 방식이 달라요!
:::

| 위치 | 실행 시점 |
|------|----------|
| Workspace 안의 파트 | 게임 시작할 때 |
| ServerScriptService | 서버에서만 실행 |
| StarterPlayerScripts | 플레이어 입장할 때 |

지금은 파트 안에 스크립트를 넣는 것에 집중해요!

## 파트 속성 출력해보기

스크립트로 파트의 정보를 출력할 수 있어요:

```lua
local part = script.Parent

print("파트 이름:", part.Name)
print("파트 색깔:", part.BrickColor)
print("파트 크기:", part.Size)
print("고정 여부:", part.Anchored)
```

## 연습 문제

:::note 실습해보기
1. **인사말 출력하기**
   - 자신의 이름이 포함된 인사말을 출력해보세요
   - 예: `print("안녕! 나는 OOO야!")`

2. **계산기 만들기**
   - 다양한 수학 계산을 출력해보세요
   ```lua
   print("더하기:", 10 + 5)
   print("빼기:", 10 - 5)
   print("곱하기:", 10 * 5)
   print("나누기:", 10 / 5)
   ```

3. **파트 정보 출력**
   - 새 파트를 만들고 스크립트를 추가하세요
   - 파트의 Name, Position, Size를 출력해보세요
:::

## 자주 하는 실수

| 실수 | 올바른 코드 |
|------|------------|
| `Print("hello")` | `print("hello")` (소문자 p) |
| `print(hello)` | `print("hello")` (따옴표 필요) |
| `print "hello"` | `print("hello")` (괄호 필요) |

## 다음 단계

첫 스크립트를 성공적으로 실행했나요? 다음으로 [변수](/curriculum/week-04-06/variables)에서 데이터를 저장하고 관리하는 방법을 배울 거예요!
