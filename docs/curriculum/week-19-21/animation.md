---
sidebar_position: 3
---

# 애니메이션 기초

캐릭터가 춤추고, 공격하고, 감정을 표현할 수 있어요! **Animation Editor**로 애니메이션을 만들고 스크립트로 재생해봐요.

## 학습 목표

- Animation Editor를 사용할 수 있다
- 애니메이션을 스크립트로 재생할 수 있다
- 상황에 맞는 애니메이션을 적용할 수 있다

## 애니메이션이란?

```
애니메이션 = 시간에 따라 변하는 포즈들의 연속

프레임 0: 🧍 서있음
프레임 15: 🏃 달리는 중
프레임 30: 🧍 다시 서있음

→ 부드럽게 연결되면 움직이는 것처럼 보여요!
```

## Animation Editor 열기

1. Plugins 탭 클릭
2. **Animation Editor** 클릭
3. 애니메이션을 적용할 리그(캐릭터) 선택
4. 새 애니메이션 생성

### 리그 준비하기

테스트용 리그 가져오기:
1. Toolbox 열기
2. "R15 Dummy" 또는 "R6 Dummy" 검색
3. Workspace에 추가

## Animation Editor 인터페이스

```
┌─────────────────────────────────────────┐
│ [재생] [정지] [녹화]      타임라인 ─────│
├─────────────────────────────────────────┤
│ ▼ HumanoidRootPart                      │
│   ▼ LowerTorso      ●────●────●─────    │
│     ▼ UpperTorso    ●─────────●─────    │
│       ▼ Head        ●───────────────    │
│       ▼ LeftArm     ●────●──────────    │
│       ▼ RightArm    ●────●──────────    │
│   ▼ LeftLeg         ●─────────●─────    │
│   ▼ RightLeg        ●─────────●─────    │
└─────────────────────────────────────────┘
        ● = 키프레임 (포즈 저장 지점)
```

## 애니메이션 만들기

### 1단계: 키프레임 추가

1. 타임라인에서 원하는 시간 클릭
2. 리그의 신체 부위 선택
3. 회전/이동 도구로 포즈 조절
4. 자동으로 키프레임 생성됨

### 2단계: 포즈 조절

```
팔 올리기:
1. RightArm 선택
2. 회전 도구 (R 키)
3. 위로 회전

고개 숙이기:
1. Head 선택
2. 회전 도구
3. 앞으로 회전
```

### 3단계: 미리보기

- ▶ 버튼으로 재생
- 속도 조절 가능
- 반복 재생 설정

### 4단계: 내보내기

1. 우측 상단 ⋮ 메뉴
2. **Export** 선택
3. 애니메이션 이름 입력
4. **Submit** 클릭
5. 애니메이션 ID 복사! (중요!)

## 스크립트로 애니메이션 재생

### 기본 재생

```lua
-- LocalScript (StarterCharacterScripts에 권장)
local player = game.Players.LocalPlayer
local character = player.Character or player.CharacterAdded:Wait()
local humanoid = character:WaitForChild("Humanoid")

-- Animator 가져오기
local animator = humanoid:WaitForChild("Animator")

-- Animation 객체 생성
local animation = Instance.new("Animation")
animation.AnimationId = "rbxassetid://애니메이션ID"

-- 애니메이션 로드
local animationTrack = animator:LoadAnimation(animation)

-- 재생!
animationTrack:Play()
```

### 애니메이션 제어

```lua
-- 재생
animationTrack:Play()

-- 정지
animationTrack:Stop()

-- 재생 속도 조절
animationTrack:AdjustSpeed(2)    -- 2배속
animationTrack:AdjustSpeed(0.5)  -- 절반 속도

-- 반복 설정
animationTrack.Looped = true     -- 반복 재생
animationTrack.Looped = false    -- 한 번만

-- 우선순위 설정
animationTrack.Priority = Enum.AnimationPriority.Action
```

### 애니메이션 우선순위

```lua
-- 낮음 → 높음 순서
Enum.AnimationPriority.Core       -- 기본 (걷기, 점프)
Enum.AnimationPriority.Idle       -- 대기
Enum.AnimationPriority.Movement   -- 이동
Enum.AnimationPriority.Action     -- 행동 (공격 등)
Enum.AnimationPriority.Action2    -- 더 높은 행동
Enum.AnimationPriority.Action3    -- 더 높은 행동
Enum.AnimationPriority.Action4    -- 최고 우선순위
```

## 실용적인 예제

### 춤추기 (키 입력)

```lua
-- LocalScript in StarterCharacterScripts
local UserInputService = game:GetService("UserInputService")
local player = game.Players.LocalPlayer
local character = player.Character or player.CharacterAdded:Wait()
local humanoid = character:WaitForChild("Humanoid")
local animator = humanoid:WaitForChild("Animator")

-- 춤 애니메이션 로드
local danceAnim = Instance.new("Animation")
danceAnim.AnimationId = "rbxassetid://춤애니메이션ID"
local danceTrack = animator:LoadAnimation(danceAnim)
danceTrack.Looped = true

local isDancing = false

UserInputService.InputBegan:Connect(function(input, processed)
    if processed then return end

    if input.KeyCode == Enum.KeyCode.P then  -- P키로 춤
        if isDancing then
            danceTrack:Stop()
            isDancing = false
        else
            danceTrack:Play()
            isDancing = true
        end
    end
end)
```

### 공격 애니메이션 (도구)

```lua
-- Tool 안의 LocalScript
local tool = script.Parent
local player = game.Players.LocalPlayer

local attackAnim = Instance.new("Animation")
attackAnim.AnimationId = "rbxassetid://공격애니메이션ID"

local attackTrack = nil

tool.Equipped:Connect(function()
    local character = player.Character
    local humanoid = character:WaitForChild("Humanoid")
    local animator = humanoid:WaitForChild("Animator")
    attackTrack = animator:LoadAnimation(attackAnim)
end)

tool.Activated:Connect(function()
    if attackTrack then
        attackTrack:Play()
    end
end)
```

### 감정 표현 시스템

```lua
-- LocalScript
local emotes = {
    Wave = "rbxassetid://인사애니ID",
    Cheer = "rbxassetid://환호애니ID",
    Laugh = "rbxassetid://웃음애니ID",
    Dance = "rbxassetid://춤애니ID",
}

local player = game.Players.LocalPlayer
local character = player.Character or player.CharacterAdded:Wait()
local humanoid = character:WaitForChild("Humanoid")
local animator = humanoid:WaitForChild("Animator")

local loadedEmotes = {}

-- 모든 감정 미리 로드
for name, id in pairs(emotes) do
    local anim = Instance.new("Animation")
    anim.AnimationId = id
    loadedEmotes[name] = animator:LoadAnimation(anim)
end

-- 감정 재생 함수
local function playEmote(emoteName)
    local track = loadedEmotes[emoteName]
    if track then
        track:Play()
    end
end

-- 사용 예시
playEmote("Wave")   -- 인사
playEmote("Dance")  -- 춤
```

### NPC 애니메이션

```lua
-- ServerScript (NPC 안)
local npc = script.Parent
local humanoid = npc:WaitForChild("Humanoid")
local animator = humanoid:WaitForChild("Animator")

-- 대기 애니메이션
local idleAnim = Instance.new("Animation")
idleAnim.AnimationId = "rbxassetid://대기애니ID"
local idleTrack = animator:LoadAnimation(idleAnim)
idleTrack.Looped = true
idleTrack:Play()

-- 플레이어가 가까이 오면 인사
local greetAnim = Instance.new("Animation")
greetAnim.AnimationId = "rbxassetid://인사애니ID"
local greetTrack = animator:LoadAnimation(greetAnim)

local hasGreeted = {}

while true do
    task.wait(1)

    for _, player in pairs(game.Players:GetPlayers()) do
        if player.Character then
            local distance = (player.Character.HumanoidRootPart.Position - npc.HumanoidRootPart.Position).Magnitude

            if distance < 10 and not hasGreeted[player] then
                greetTrack:Play()
                hasGreeted[player] = true
            elseif distance > 20 then
                hasGreeted[player] = nil
            end
        end
    end
end
```

## 애니메이션 이벤트

애니메이션 특정 시점에 이벤트 발생:

```lua
-- Animation Editor에서 이벤트 마커 추가 가능

animationTrack:GetMarkerReachedSignal("Footstep"):Connect(function()
    -- 발소리 재생
    footstepSound:Play()
end)

animationTrack:GetMarkerReachedSignal("Attack"):Connect(function()
    -- 공격 판정
    dealDamage()
end)
```

## 기본 애니메이션 ID (무료)

로블록스 기본 애니메이션:

| 애니메이션 | ID |
|-----------|-----|
| 걷기 | rbxassetid://180426354 |
| 달리기 | rbxassetid://180426354 |
| 점프 | rbxassetid://125750702 |
| 떨어지기 | rbxassetid://180436148 |
| 앉기 | rbxassetid://178130996 |

## 연습 문제

:::note 실습해보기
1. **간단한 애니메이션 만들기**
   - Animation Editor로 손 흔들기 만들기
   - 내보내기 후 ID 저장
   - 스크립트로 재생

2. **키 입력 애니메이션**
   - G키를 누르면 인사 애니메이션 재생
   - 재생 중에는 다시 실행 안 되게

3. **도구 애니메이션**
   - 검 도구 만들기
   - 클릭하면 휘두르기 애니메이션
   - 애니메이션 끝나면 데미지 판정

4. **NPC 반응**
   - NPC가 평소엔 대기 애니메이션
   - 플레이어 접근 시 손 흔들기
:::

## 7단계 완료!

축하해요! 7단계를 모두 마쳤어요. 이제:
- ✅ DataStore로 영구 데이터 저장
- ✅ 사운드와 파티클로 효과 추가
- ✅ 애니메이션으로 생동감 부여

**21주 커리큘럼을 모두 완료했습니다!** 🎉

이제 여러분은 완성도 높은 로블록스 게임을 만들 수 있어요!
