---
sidebar_position: 100
---

# 용어집

로블록스와 루아 프로그래밍에서 자주 사용되는 용어들을 정리했어요.

## ㄱ

### 객체 (Object)
게임 안에 존재하는 모든 것. 파트, 스크립트, 플레이어 등이 모두 객체예요.

### 게임 패스 (Game Pass)
플레이어가 로벅스로 구매할 수 있는 특별한 아이템이나 능력.

## ㄴ

### 네온 (Neon)
빛나는 재질. 킬 파트나 강조하고 싶은 파트에 자주 사용해요.

### 닷 표기법 (Dot Notation)
`workspace.Part.Script`처럼 점(.)으로 계층 구조를 표현하는 방법.

## ㄷ

### 데이터 타입 (Data Type)
변수에 저장되는 데이터의 종류. 숫자(number), 문자열(string), 불린(boolean) 등이 있어요.

### 데이터스토어 (DataStore)
플레이어의 데이터를 서버에 저장하는 서비스. 게임을 나갔다 들어와도 데이터가 유지돼요.

### 디바운스 (Debounce)
같은 이벤트가 너무 자주 실행되는 것을 방지하는 기술.

```lua
local debounce = false
if not debounce then
    debounce = true
    -- 작업 수행
    task.wait(1)
    debounce = false
end
```

## ㄹ

### 로컬 스크립트 (LocalScript)
플레이어의 컴퓨터에서 실행되는 스크립트. GUI 조작에 주로 사용해요.

### 루프 (Loop)
코드를 반복 실행하는 구조. `while`, `for` 등이 있어요.

### 리더보드 (Leaderboard)
플레이어들의 점수를 화면에 표시하는 시스템.

## ㅁ

### 매개변수 (Parameter)
함수에 전달되는 값. `function greet(name)`에서 `name`이 매개변수예요.

### 메서드 (Method)
객체에 속한 함수. `part:Destroy()`, `player:Kick()` 등.

### 모듈 스크립트 (ModuleScript)
다른 스크립트에서 불러와서 사용할 수 있는 재사용 가능한 코드 모음.

## ㅂ

### 반환값 (Return Value)
함수가 작업을 마치고 돌려주는 값. `return`으로 반환해요.

### 변수 (Variable)
데이터를 저장하는 이름이 붙은 공간. `local score = 0`

### 불린 (Boolean)
참(`true`) 또는 거짓(`false`) 두 가지 값만 가지는 데이터 타입.

## ㅅ

### 서버 스크립트 (Server Script)
로블록스 서버에서 실행되는 스크립트. 리더보드, 게임 로직에 사용해요.

### 속성 (Property)
객체의 특성. `part.Color`, `humanoid.Health` 등.

### 스튜디오 (Studio)
로블록스 게임을 만드는 프로그램.

### 스폰 (Spawn)
플레이어가 게임에 입장할 때 나타나는 위치. `SpawnLocation` 파트로 지정해요.

## ㅇ

### 앵커 (Anchor)
파트를 공중에 고정시키는 속성. 켜면 중력의 영향을 받지 않아요.

### 엔진 (Engine)
게임이 실행되는 기반 시스템. 로블록스 엔진은 물리, 렌더링 등을 처리해요.

### 연산자 (Operator)
계산이나 비교를 수행하는 기호. `+`, `-`, `==`, `>` 등.

### 이벤트 (Event)
게임에서 발생하는 사건. 파트에 닿음, 플레이어 입장 등.

## ㅈ

### 조건문 (Conditional)
조건에 따라 다른 코드를 실행하는 구조. `if`, `elseif`, `else`.

### 주석 (Comment)
코드에 남기는 메모. 컴퓨터가 무시하고, 개발자만 볼 수 있어요.

```lua
-- 한 줄 주석
--[[
여러 줄 주석
]]--
```

## ㅊ

### 충돌 (Collision)
두 물체가 서로 부딪히는 것. `CanCollide` 속성으로 제어해요.

## ㅋ

### 캐릭터 (Character)
플레이어가 게임에서 조종하는 아바타 모델.

### 클라이언트 (Client)
플레이어의 컴퓨터. 로컬 스크립트가 실행되는 곳.

### 클래스 (Class)
객체의 종류. `Part`, `Script`, `Humanoid` 등이 클래스예요.

## ㅌ

### 탐색기 (Explorer)
게임의 모든 객체를 트리 구조로 보여주는 패널.

### 터레인 (Terrain)
산, 물, 땅 등 자연 지형을 만드는 시스템.

### 투명도 (Transparency)
물체가 얼마나 투명한지. 0이면 불투명, 1이면 완전 투명.

## ㅍ

### 파트 (Part)
로블록스에서 가장 기본적인 3D 물체.

### 프레임 (Frame)
GUI에서 여러 요소를 담는 컨테이너.

### 프롬프트 (Prompt)
플레이어에게 상호작용을 요청하는 UI. `ProximityPrompt` 등.

### 함수 (Function)
특정 작업을 수행하는 코드 블록. 재사용 가능해요.

```lua
local function sayHello()
    print("안녕!")
end
```

## 영어 용어

### API
Application Programming Interface. 로블록스가 제공하는 기능들의 모음.

### CFrame
좌표계 프레임. 위치와 회전 정보를 함께 저장하는 데이터 타입.

### GUI
Graphical User Interface. 화면에 표시되는 버튼, 텍스트 등.

### Humanoid
캐릭터의 핵심 컴포넌트. 체력, 이동 속도 등을 제어해요.

### Instance
로블록스에서 객체를 생성할 때 사용하는 클래스.

```lua
local part = Instance.new("Part")
```

### nil
"아무것도 없음"을 나타내는 값.

### Parent
객체의 부모. 계층 구조에서 상위 객체를 가리켜요.

### Touched
파트에 무언가 닿았을 때 발생하는 이벤트.

### Workspace
게임 세계에서 보이는 모든 객체가 들어있는 서비스.

### Vector3
3D 좌표를 나타내는 데이터 타입. `Vector3.new(x, y, z)`

## 데이터 타입 정리

| 타입 | 설명 | 예시 |
|------|------|------|
| number | 숫자 | `100`, `3.14`, `-5` |
| string | 문자열 | `"안녕"`, `'hello'` |
| boolean | 참/거짓 | `true`, `false` |
| nil | 없음 | `nil` |
| table | 테이블/배열 | `{1, 2, 3}` |
| function | 함수 | `function() end` |
| Vector3 | 3D 벡터 | `Vector3.new(0,0,0)` |
| CFrame | 좌표 프레임 | `CFrame.new(0,0,0)` |
| Color3 | RGB 색상 | `Color3.new(1,0,0)` |
| BrickColor | 브릭 색상 | `BrickColor.new("Red")` |
