---
sidebar_position: 3
---

# 게임 게시하기

드디어 마지막 단계예요! 열심히 만든 게임을 로블록스에 게시해서 친구들과 함께 플레이해봐요!

## 학습 목표

- 게임을 로블록스에 게시할 수 있다
- 게임 설정을 구성할 수 있다
- 게임 아이콘과 썸네일을 설정할 수 있다

## 게시 전 체크리스트

게시하기 전에 확인해봐요:

- [ ] 게임이 정상적으로 작동하는가?
- [ ] 시작 지점(SpawnLocation)이 있는가?
- [ ] 킬 파트가 너무 어렵지 않은가?
- [ ] 버그는 없는가?
- [ ] 부적절한 콘텐츠가 없는가?

## 게임 저장하기

### 로컬 저장

1. File → Save to File As
2. 원하는 위치에 `.rbxl` 파일로 저장

### 로블록스에 저장

1. File → Save to Roblox As
2. 게임 이름 입력
3. Create 클릭

## 게임 게시하기

### 1단계: 게임 설정 열기

1. File → Game Settings 클릭
2. 또는 Home 탭 → Game Settings

### 2단계: 기본 정보 설정

**Basic Info 탭:**

| 설정 | 설명 |
|------|------|
| Name | 게임 이름 |
| Description | 게임 설명 (무슨 게임인지) |
| Genre | 장르 선택 (Adventure, Obby 등) |

:::tip 좋은 설명 작성하기
```
🎮 킬 파트 도전! 🎮

용암을 피해 끝까지 도달하세요!
- 10개의 스테이지
- 다양한 장애물
- 리더보드 경쟁

친구들과 함께 도전해보세요!
```
:::

### 3단계: 권한 설정

**Permissions 탭:**

| 설정 | 설명 |
|------|------|
| Playable Devices | 플레이 가능한 기기 선택 |
| Paid Access | 유료 접근 (비추천) |

### 4단계: 아이콘 설정

**Places 탭:**

1. 게임 아이콘 (512x512 픽셀 권장)
2. 썸네일 이미지 (1920x1080 픽셀 권장)

:::note 아이콘 만들기
무료 이미지 편집 도구:
- Canva (온라인)
- GIMP (무료 소프트웨어)
- Pixlr (온라인)
:::

### 5단계: 게시!

1. 모든 설정 완료 후 Save 클릭
2. File → Publish to Roblox
3. 게시 완료!

## 게임 공개 설정

### Private vs Public

| 설정 | 설명 |
|------|------|
| Private | 나만 플레이 가능 |
| Public | 모든 사람이 플레이 가능 |

### Public으로 변경하기

1. 로블록스 웹사이트 접속
2. Create (만들기) 페이지로 이동
3. 내 게임 선택
4. Configure Game 클릭
5. Privacy: Public 선택
6. Save 클릭

## 게임 링크 공유하기

1. 로블록스 웹사이트에서 내 게임 페이지로 이동
2. URL 복사
3. 친구들에게 공유!

예시 링크:
```
https://www.roblox.com/games/123456789/My-Awesome-Game
```

## 게임 업데이트하기

게임을 수정한 후:

1. 스튜디오에서 수정 작업
2. File → Publish to Roblox
3. Overwrite 선택
4. 자동으로 업데이트 완료!

## 데이터 저장 (고급)

플레이어 데이터를 저장하려면 DataStoreService를 사용해요:

```lua
local DataStoreService = game:GetService("DataStoreService")
local playerDataStore = DataStoreService:GetDataStore("PlayerData")

local function saveData(player)
    local key = "Player_" .. player.UserId
    local data = {
        Gold = player.leaderstats.Gold.Value,
        Level = player.leaderstats.Level.Value
    }

    local success, err = pcall(function()
        playerDataStore:SetAsync(key, data)
    end)

    if success then
        print("데이터 저장 성공!")
    else
        print("저장 실패:", err)
    end
end

local function loadData(player)
    local key = "Player_" .. player.UserId

    local success, data = pcall(function()
        return playerDataStore:GetAsync(key)
    end)

    if success and data then
        player.leaderstats.Gold.Value = data.Gold
        player.leaderstats.Level.Value = data.Level
        print("데이터 로드 성공!")
    end
end

-- 플레이어 입장 시 로드
game.Players.PlayerAdded:Connect(function(player)
    -- leaderstats 생성 후
    loadData(player)
end)

-- 플레이어 퇴장 시 저장
game.Players.PlayerRemoving:Connect(saveData)
```

:::caution DataStore 주의사항
- Studio에서 테스트하려면 Game Settings → Security → Enable Studio Access to API Services 활성화
- 게시된 게임에서만 정상 작동
:::

## 게임 홍보하기

### 소셜 미디어 활용

- 유튜브에 플레이 영상 올리기
- 친구들에게 링크 공유
- 로블록스 커뮤니티에 소개

### 게임 개선하기

플레이어 피드백을 받아서 계속 업데이트하세요:
- 버그 수정
- 새로운 스테이지 추가
- 밸런스 조절

## 12주 커리큘럼 완료!

축하해요! 🎉 12주 과정을 모두 마쳤어요!

이제 여러분은:
- ✅ 로블록스 스튜디오를 자유롭게 사용할 수 있어요
- ✅ 루아 스크립트로 게임 로직을 만들 수 있어요
- ✅ 이벤트와 조건문으로 상호작용을 구현할 수 있어요
- ✅ 리더보드와 GUI를 만들 수 있어요
- ✅ 게임을 게시하고 공유할 수 있어요

## 다음 단계는?

### 더 배우고 싶다면

- [프로젝트](/projects/kill-part) 섹션에서 더 많은 예제 확인
- [레퍼런스](/reference/entry-to-lua) 섹션에서 엔트리→루아 변환표 참고
- 로블록스 공식 문서 읽어보기

### 도전 과제

1. **오비(Obby) 게임** - 10개 이상의 스테이지
2. **시뮬레이터** - 클릭해서 자원 모으기
3. **타이쿤** - 돈을 모아 건물 짓기
4. **미니게임** - 여러 미니게임 모음

계속해서 창작하고, 배우고, 성장하세요! 🚀
