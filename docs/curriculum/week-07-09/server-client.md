---
sidebar_position: 1
---

# 서버와 클라이언트 이해하기

로블록스 게임은 **서버**와 **클라이언트**로 나뉘어져 있어요. 이 개념을 이해하면 스크립트를 어디에 넣어야 하는지 알 수 있어요!

## 학습 목표

- 서버와 클라이언트의 차이를 이해한다
- 각 스크립트 종류의 역할을 안다
- 스크립트를 올바른 위치에 배치할 수 있다

## 서버와 클라이언트란?

### 비유로 이해하기

```
🏫 학교 방송실 = 서버
   - 전교생에게 방송을 보냄
   - 모든 정보를 관리
   - 하나만 존재

📱 학생들의 스마트폰 = 클라이언트
   - 각자 방송을 받아서 봄
   - 자기 화면만 조작 가능
   - 학생 수만큼 존재
```

### 로블록스에서는

| 구분 | 서버 (Server) | 클라이언트 (Client) |
|------|--------------|-------------------|
| 위치 | 로블록스 컴퓨터 | 플레이어 컴퓨터 |
| 개수 | 게임당 1개 | 플레이어 수만큼 |
| 역할 | 게임 규칙, 점수 관리 | 화면 표시, 입력 처리 |
| 신뢰도 | 높음 (해킹 불가) | 낮음 (조작 가능) |

## 왜 나눠져 있을까?

### 이유 1: 공정한 게임

```
❌ 클라이언트에서 점수 관리하면?
   → 해커가 점수를 마음대로 조작 가능!

✅ 서버에서 점수 관리하면?
   → 서버는 플레이어가 접근 불가, 안전!
```

### 이유 2: 동기화

```
플레이어 A가 코인을 먹으면...

서버: "코인 사라짐!" → 모든 클라이언트에게 전달
클라이언트 A: 코인 사라짐 확인
클라이언트 B: 코인 사라짐 확인
클라이언트 C: 코인 사라짐 확인

→ 모든 플레이어가 같은 상황을 봄!
```

### 이유 3: 성능

```
서버: 게임 로직만 처리 (가벼움)
클라이언트: 그래픽, 소리 처리 (무거움)

→ 역할을 나눠서 효율적!
```

## 스크립트 종류

### 1. Script (서버 스크립트)

```lua
-- 서버에서 실행됨
-- 모든 플레이어에게 영향

-- 사용 예:
-- - 점수/리더보드 관리
-- - 게임 규칙 처리
-- - 데이터 저장
```

**위치:** `ServerScriptService`, `Workspace` 내 파트

### 2. LocalScript (로컬 스크립트)

```lua
-- 클라이언트(플레이어 컴퓨터)에서 실행됨
-- 해당 플레이어에게만 영향

-- 사용 예:
-- - GUI 조작
-- - 카메라 제어
-- - 키보드/마우스 입력
```

**위치:** `StarterPlayerScripts`, `StarterGui`, `StarterPack`

### 3. ModuleScript (모듈 스크립트)

```lua
-- 서버와 클라이언트 모두에서 사용 가능
-- 재사용 가능한 코드 모음

-- 사용 예:
-- - 공통 설정값
-- - 유틸리티 함수
-- - 공유 데이터
```

**위치:** `ReplicatedStorage` (공유), `ServerStorage` (서버 전용)

## 스크립트 위치 정리

```
game
├── ServerScriptService     ← 서버 스크립트 (Script)
├── ServerStorage           ← 서버 전용 저장소
├── ReplicatedStorage       ← 서버+클라이언트 공유
├── StarterGui              ← GUI + 로컬 스크립트
├── StarterPlayer
│   ├── StarterPlayerScripts ← 로컬 스크립트
│   └── StarterCharacterScripts
└── Workspace
    └── Part
        └── Script          ← 서버 스크립트
```

## 무엇을 어디서 처리할까?

### 서버에서 처리해야 하는 것

```lua
-- ✅ 서버 스크립트 (ServerScriptService)

-- 점수/재화 관리
player.leaderstats.Gold.Value += 100

-- 플레이어 데이터 저장
DataStoreService:SetAsync(key, data)

-- 게임 규칙 (킬 파트 등)
humanoid.Health = 0

-- 아이템 지급
item:Clone().Parent = player.Backpack
```

### 클라이언트에서 처리해야 하는 것

```lua
-- ✅ 로컬 스크립트 (StarterPlayerScripts, StarterGui)

-- GUI 표시/숨기기
frame.Visible = true

-- 키보드 입력
UserInputService.InputBegan:Connect(function(input)
    if input.KeyCode == Enum.KeyCode.E then
        -- E키 눌림
    end
end)

-- 카메라 조작
camera.CFrame = newCFrame

-- 소리 재생 (로컬)
sound:Play()
```

## 서버와 클라이언트 통신

서버와 클라이언트는 직접 변수를 공유할 수 없어요. **RemoteEvent**를 사용해야 해요!

### 클라이언트 → 서버

```lua
-- ReplicatedStorage에 RemoteEvent 생성 (이름: BuyItem)

-- 클라이언트 (LocalScript)
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local buyEvent = ReplicatedStorage:WaitForChild("BuyItem")

button.MouseButton1Click:Connect(function()
    buyEvent:FireServer("Sword", 100)  -- 서버에 요청
end)
```

```lua
-- 서버 (Script in ServerScriptService)
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local buyEvent = ReplicatedStorage:WaitForChild("BuyItem")

buyEvent.OnServerEvent:Connect(function(player, itemName, price)
    -- player는 자동으로 전달됨
    print(player.Name .. "이(가) " .. itemName .. " 구매 요청")

    -- 서버에서 처리
    local gold = player.leaderstats.Gold
    if gold.Value >= price then
        gold.Value -= price
        print("구매 성공!")
    end
end)
```

### 서버 → 클라이언트

```lua
-- 서버 (Script)
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local notifyEvent = ReplicatedStorage:WaitForChild("Notify")

-- 특정 플레이어에게만
notifyEvent:FireClient(player, "아이템을 획득했습니다!")

-- 모든 플레이어에게
notifyEvent:FireAllClients("게임이 시작됩니다!")
```

```lua
-- 클라이언트 (LocalScript)
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local notifyEvent = ReplicatedStorage:WaitForChild("Notify")

notifyEvent.OnClientEvent:Connect(function(message)
    print("알림:", message)
    -- GUI에 표시 등
end)
```

## 자주 하는 실수

### 실수 1: 잘못된 위치에 스크립트

```lua
-- ❌ LocalScript를 ServerScriptService에 넣음
-- → 실행 안 됨!

-- ❌ Script를 StarterGui에 넣음
-- → GUI 조작 안 됨!
```

### 실수 2: 클라이언트에서 서버 데이터 변경

```lua
-- ❌ LocalScript에서 직접 변경 시도
player.leaderstats.Gold.Value += 100
-- → 서버에서 무시됨, 해킹 방지!

-- ✅ RemoteEvent로 서버에 요청
buyEvent:FireServer()
```

### 실수 3: LocalPlayer를 서버에서 사용

```lua
-- ❌ 서버 스크립트에서
local player = game.Players.LocalPlayer
-- → nil! 서버에는 LocalPlayer가 없음

-- ✅ 이벤트에서 player 받기
event.OnServerEvent:Connect(function(player)
    -- player 사용 가능
end)
```

## 정리 표

| 작업 | 스크립트 종류 | 위치 |
|------|-------------|------|
| 리더보드 생성 | Script | ServerScriptService |
| 킬 파트 | Script | 파트 안 또는 ServerScriptService |
| 코인 수집 | Script | ServerScriptService |
| GUI 버튼 클릭 | LocalScript | StarterGui |
| 카메라 조작 | LocalScript | StarterPlayerScripts |
| 키보드 입력 | LocalScript | StarterPlayerScripts |
| 공유 설정값 | ModuleScript | ReplicatedStorage |

## 연습 문제

:::note 실습해보기
1. **스크립트 분류하기**
   다음 기능은 어디에 스크립트를 넣어야 할까요?
   - 플레이어 점수 증가
   - 메뉴 열기/닫기
   - 데이터 저장
   - 버튼 호버 효과

2. **RemoteEvent 실습**
   - 버튼을 누르면 서버에 메시지 전송
   - 서버에서 받아서 출력

3. **틀린 코드 찾기**
   ```lua
   -- StarterGui > LocalScript
   local player = game.Players.LocalPlayer
   player.leaderstats.Gold.Value += 50
   ```
   무엇이 문제일까요?
:::

## 다음 단계

서버와 클라이언트를 이해했나요? 다음으로 [이벤트](/curriculum/week-07-09/events)에서 게임 상호작용을 만드는 방법을 배울 거예요!
