---
sidebar_position: 1
---

# DataStore로 데이터 저장하기

**DataStore**를 사용하면 플레이어의 데이터를 영구적으로 저장할 수 있어요. 게임을 껐다 켜도 점수가 유지됩니다!

## 학습 목표

- DataStoreService의 개념을 이해한다
- 데이터를 저장하고 불러올 수 있다
- 안전하게 데이터를 관리할 수 있다

## DataStore란?

### 저장 없이 vs 저장 있이

```
❌ DataStore 없이:
   플레이어 입장 → Gold 100 획득 → 게임 종료
   다시 입장 → Gold 0... 😢

✅ DataStore 사용:
   플레이어 입장 → Gold 100 획득 → 저장 → 게임 종료
   다시 입장 → Gold 100 유지! 😊
```

### 어디에 저장되나요?

```
플레이어 컴퓨터 ❌ (해킹 가능)
로블록스 서버 ✅ (안전!)

→ 로블록스 클라우드에 저장되어 어디서든 불러올 수 있어요!
```

## 시작하기 전 설정

### Studio에서 API 접근 허용

1. File → Game Settings
2. Security 탭
3. **Enable Studio Access to API Services** 켜기
4. Save

:::caution 중요!
이 설정을 안 하면 Studio에서 DataStore 테스트가 안 돼요!
:::

## 기본 사용법

### DataStoreService 가져오기

```lua
local DataStoreService = game:GetService("DataStoreService")
local playerDataStore = DataStoreService:GetDataStore("PlayerData")
```

### 데이터 저장하기 (SetAsync)

```lua
local function saveData(player)
    local key = "Player_" .. player.UserId  -- 고유 키

    local data = {
        Gold = player.leaderstats.Gold.Value,
        Level = player.leaderstats.Level.Value,
    }

    local success, errorMessage = pcall(function()
        playerDataStore:SetAsync(key, data)
    end)

    if success then
        print(player.Name .. " 데이터 저장 성공!")
    else
        warn("저장 실패: " .. errorMessage)
    end
end
```

### 데이터 불러오기 (GetAsync)

```lua
local function loadData(player)
    local key = "Player_" .. player.UserId

    local success, data = pcall(function()
        return playerDataStore:GetAsync(key)
    end)

    if success and data then
        -- 데이터가 있으면 적용
        player.leaderstats.Gold.Value = data.Gold
        player.leaderstats.Level.Value = data.Level
        print(player.Name .. " 데이터 로드 성공!")
    else
        -- 새 플레이어 (데이터 없음)
        print(player.Name .. " 새 플레이어입니다.")
    end
end
```

## pcall이란?

```lua
-- pcall = protected call (보호된 호출)
-- 에러가 나도 게임이 멈추지 않아요!

local success, result = pcall(function()
    -- 위험할 수 있는 코드
    return playerDataStore:GetAsync(key)
end)

if success then
    -- 성공했을 때
    print("결과:", result)
else
    -- 실패했을 때 (result = 에러 메시지)
    warn("에러:", result)
end
```

:::tip 왜 pcall을 쓰나요?
DataStore는 인터넷 연결이 필요해서 실패할 수 있어요.
pcall 없이 실패하면 게임 전체가 멈춰버려요!
:::

## 완전한 예제

### 서버 스크립트 (ServerScriptService)

```lua
local Players = game:GetService("Players")
local DataStoreService = game:GetService("DataStoreService")

local playerDataStore = DataStoreService:GetDataStore("PlayerData")

-- 데이터 로드
local function loadData(player)
    local key = "Player_" .. player.UserId

    -- leaderstats 생성
    local leaderstats = Instance.new("Folder")
    leaderstats.Name = "leaderstats"
    leaderstats.Parent = player

    local gold = Instance.new("IntValue")
    gold.Name = "Gold"
    gold.Parent = leaderstats

    local level = Instance.new("IntValue")
    level.Name = "Level"
    level.Value = 1
    level.Parent = leaderstats

    -- 저장된 데이터 불러오기
    local success, data = pcall(function()
        return playerDataStore:GetAsync(key)
    end)

    if success and data then
        gold.Value = data.Gold or 0
        level.Value = data.Level or 1
        print(player.Name .. " 데이터 로드 완료!")
    else
        print(player.Name .. " 새 플레이어!")
    end
end

-- 데이터 저장
local function saveData(player)
    local key = "Player_" .. player.UserId

    local data = {
        Gold = player.leaderstats.Gold.Value,
        Level = player.leaderstats.Level.Value,
    }

    local success, errorMessage = pcall(function()
        playerDataStore:SetAsync(key, data)
    end)

    if success then
        print(player.Name .. " 데이터 저장 완료!")
    else
        warn("저장 실패: " .. errorMessage)
    end
end

-- 이벤트 연결
Players.PlayerAdded:Connect(loadData)
Players.PlayerRemoving:Connect(saveData)

-- 서버 종료 시 모든 플레이어 저장
game:BindToClose(function()
    for _, player in pairs(Players:GetPlayers()) do
        saveData(player)
    end
end)
```

## 자동 저장

일정 시간마다 자동 저장:

```lua
local AUTO_SAVE_INTERVAL = 60  -- 60초마다

spawn(function()
    while true do
        task.wait(AUTO_SAVE_INTERVAL)

        for _, player in pairs(Players:GetPlayers()) do
            saveData(player)
        end

        print("자동 저장 완료!")
    end
end)
```

## UpdateAsync 사용하기

여러 서버에서 동시에 데이터를 수정할 때 안전하게 업데이트:

```lua
local function addGold(player, amount)
    local key = "Player_" .. player.UserId

    local success, newData = pcall(function()
        return playerDataStore:UpdateAsync(key, function(oldData)
            oldData = oldData or {Gold = 0, Level = 1}
            oldData.Gold = oldData.Gold + amount
            return oldData
        end)
    end)

    if success then
        player.leaderstats.Gold.Value = newData.Gold
        print(amount .. " Gold 추가!")
    end
end
```

## 데이터 구조 설계

### 단순한 구조

```lua
local data = {
    Gold = 100,
    Level = 5,
    Exp = 250,
}
```

### 복잡한 구조

```lua
local data = {
    Stats = {
        Gold = 100,
        Level = 5,
        Exp = 250,
    },
    Inventory = {
        "Sword",
        "Shield",
        "Potion",
    },
    Settings = {
        Music = true,
        SFX = true,
    },
    LastLogin = os.time(),
}
```

## 주의사항

### DataStore 제한

| 제한 | 값 |
|------|-----|
| 키 최대 길이 | 50자 |
| 값 최대 크기 | 4MB |
| 요청 간격 | 6초에 60회 (서버당) |

### 자주 하는 실수

```lua
-- ❌ 너무 자주 저장
player.leaderstats.Gold.Changed:Connect(function()
    saveData(player)  -- Gold 바뀔 때마다 저장 = 제한 초과!
end)

-- ✅ 적절한 간격으로 저장
-- - 플레이어 퇴장 시
-- - 자동 저장 (60초마다)
-- - 중요한 이벤트 시
```

## 데이터 초기화 방지

```lua
-- ❌ 위험한 코드
local data = playerDataStore:GetAsync(key)
player.leaderstats.Gold.Value = data.Gold  -- data가 nil이면 에러!

-- ✅ 안전한 코드
local success, data = pcall(function()
    return playerDataStore:GetAsync(key)
end)

if success and data then
    player.leaderstats.Gold.Value = data.Gold or 0  -- 기본값 설정
else
    player.leaderstats.Gold.Value = 0  -- 새 플레이어
end
```

## 연습 문제

:::note 실습해보기
1. **기본 저장 시스템**
   - Gold와 Level을 저장하고 불러오는 시스템 구현
   - 게임 종료 후 다시 시작해서 데이터 유지 확인

2. **인벤토리 저장**
   - 테이블로 아이템 목록 저장
   - 불러올 때 인벤토리 복원

3. **자동 저장**
   - 30초마다 자동 저장 구현
   - 저장할 때 채팅으로 알림

4. **플레이 시간 저장**
   - 총 플레이 시간 기록
   - 접속할 때마다 누적
:::

## 다음 단계

DataStore를 마스터했나요? 다음으로 [사운드 & 파티클](/curriculum/week-19-21/sound-particles)에서 게임에 효과를 추가하는 방법을 배울 거예요!
