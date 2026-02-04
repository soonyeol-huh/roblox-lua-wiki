---
sidebar_position: 2
---

# Rojo 동기화 사용하기

Rojo를 설치했으니 이제 실제로 VS Code와 로블록스 스튜디오를 연결해봐요!

## 학습 목표

- Rojo 서버를 실행할 수 있다
- VS Code에서 작성한 코드를 스튜디오에 동기화할 수 있다
- 실시간 동기화로 작업할 수 있다

## Rojo 동기화 흐름

```
VS Code에서 코드 작성
        ↓
    Rojo 서버 실행
        ↓
  스튜디오에서 연결
        ↓
    실시간 동기화!
```

## 1단계: 서버 스크립트 작성

`src/server/` 폴더에 파일을 만들어봐요.

### HelloWorld.server.lua

```lua
-- src/server/HelloWorld.server.lua
print("Hello from Rojo!")

game.Players.PlayerAdded:Connect(function(player)
    print(player.Name .. "님이 입장했습니다!")
end)
```

:::note 파일 이름 규칙
- `.server.lua` → 서버 스크립트
- `.client.lua` → 로컬 스크립트
- `.lua` → 모듈 스크립트
:::

## 2단계: Rojo 서버 실행

터미널에서 프로젝트 폴더로 이동 후:

```bash
rojo serve
```

성공하면 다음과 같이 표시됩니다:

```
Rojo server listening:
  Address: localhost
  Port: 34872

Visit http://localhost:34872/ in your browser for more information.
```

## 3단계: 스튜디오에서 연결

1. 로블록스 스튜디오 실행
2. 새 프로젝트 또는 기존 프로젝트 열기
3. Plugins 탭에서 **Rojo** 클릭
4. **Connect** 버튼 클릭

연결 성공 시:
- Rojo 창에 "Connected" 표시
- 터미널에 연결 로그 출력

## 4단계: 실시간 동기화 확인

1. VS Code에서 `HelloWorld.server.lua` 수정
2. 저장 (Ctrl+S)
3. 스튜디오의 ServerScriptService 확인
4. 코드가 자동으로 업데이트됨!

## 파일 구조와 게임 구조 매핑

### 폴더 → 서비스 매핑

| 폴더 | 로블록스 위치 |
|------|-------------|
| `src/server/` | ServerScriptService |
| `src/client/` | StarterPlayerScripts |
| `src/shared/` | ReplicatedStorage |

### 예제 프로젝트 구조

```
my-rojo-game/
├── default.project.json
└── src/
    ├── server/
    │   ├── HelloWorld.server.lua
    │   └── Leaderboard.server.lua
    ├── client/
    │   ├── LocalUI.client.lua
    │   └── InputHandler.client.lua
    └── shared/
        ├── Config.lua
        └── Utils.lua
```

## 클라이언트 스크립트 작성

### src/client/Welcome.client.lua

```lua
-- src/client/Welcome.client.lua
local Players = game:GetService("Players")
local player = Players.LocalPlayer

-- 환영 메시지 출력
print("환영합니다, " .. player.Name .. "님!")

-- 3초 후 메시지
task.wait(3)
print("게임을 즐겨주세요!")
```

## 공유 모듈 작성

### src/shared/GameConfig.lua

```lua
-- src/shared/GameConfig.lua
local GameConfig = {
    -- 게임 설정
    GameName = "My Rojo Game",
    MaxPlayers = 10,

    -- 플레이어 설정
    StartingGold = 100,
    WalkSpeed = 16,
    JumpPower = 50,

    -- 게임 규칙
    RespawnTime = 5,
    MatchDuration = 300,
}

return GameConfig
```

### 모듈 사용하기

```lua
-- src/server/PlayerSetup.server.lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local GameConfig = require(ReplicatedStorage:WaitForChild("GameConfig"))

print("게임 이름:", GameConfig.GameName)
print("시작 골드:", GameConfig.StartingGold)
```

## 동기화 모드

### 실시간 동기화 (Live Sync)

```bash
rojo serve
```
- 파일 변경 시 자동 반영
- 개발 중 사용

### 빌드 (Build)

```bash
rojo build -o game.rbxl
```
- `.rbxl` 파일 생성
- 배포 시 사용

## 문제 해결

### 연결이 안 될 때

```
1. Rojo 서버가 실행 중인지 확인
2. 포트 번호 확인 (기본: 34872)
3. 방화벽 설정 확인
4. 스튜디오 플러그인 재설치
```

### 파일이 동기화 안 될 때

```
1. 파일 확장자 확인 (.lua, .server.lua, .client.lua)
2. default.project.json 경로 확인
3. Rojo 서버 재시작
4. 스튜디오 재연결
```

## 연습 문제

:::note 실습해보기
1. **기본 동기화**
   - Rojo 프로젝트 생성
   - 서버 스크립트 하나 작성
   - 스튜디오에 동기화 확인

2. **모듈 시스템**
   - `shared/Config.lua` 모듈 생성
   - 서버와 클라이언트에서 모듈 사용
   - 값을 변경하고 동기화 확인

3. **전체 구조**
   - 서버, 클라이언트, 공유 스크립트 각각 작성
   - 모두 정상 동기화되는지 확인
:::

## 다음 단계

Rojo 동기화를 마스터했나요? 다음으로 [Git 버전 관리](/curriculum/week-13-15/git-workflow)에서 코드를 체계적으로 관리하는 방법을 배울 거예요!
