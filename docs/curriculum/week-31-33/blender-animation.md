---
sidebar_position: 3
---

# 블렌더 애니메이션과 로블록스 연동

블렌더에서 만든 애니메이션을 로블록스에 가져오는 방법을 배워봐요! 키프레임 애니메이션의 기초부터 로블록스 임포트까지 전체 워크플로우를 다룹니다.

## 학습 목표

- 블렌더에서 키프레임 애니메이션을 만들 수 있다
- 리깅된 모델에 애니메이션을 적용할 수 있다
- 애니메이션을 로블록스로 가져올 수 있다

## 블렌더 애니메이션 기초

### 키프레임이란?

```
키프레임 = 특정 시점의 포즈를 저장한 것

프레임 1:  🧍 서있음     (키프레임 A)
프레임 15: 🙋 손 올림    (키프레임 B)
프레임 30: 🧍 다시 서있음 (키프레임 C)

블렌더가 A↔B↔C 사이를 자동으로 부드럽게 연결!
이것을 "보간(Interpolation)"이라고 해요.
```

### 타임라인

```
화면 하단의 타임라인:

  ◀ ▶ ⏸ ⏹         프레임: [1] / 250
  ├─●──────●──────●─────────────────┤
  1  15     30     60              250

  ● = 키프레임이 있는 위치
  파란 막대 = 현재 프레임 위치

  재생: Space 바
  처음으로: Shift + ← (왼쪽 화살표)
```

## 오브젝트 애니메이션 (기본)

뼈대 없이도 오브젝트를 움직일 수 있어요!

### 키프레임 추가하기

```
1. 프레임 1로 이동
2. 오브젝트 선택
3. 원하는 위치/회전/크기 설정
4. I 키 → 키프레임 삽입 메뉴:
   - Location:           위치만
   - Rotation:           회전만
   - Scale:              크기만
   - LocRotScale:        전부 다 (가장 많이 사용!)

5. 프레임 30으로 이동 (타임라인 클릭 또는 화살표 키)
6. 위치/회전 변경
7. I 키 → LocRotScale

→ 1~30프레임 동안 부드럽게 움직이는 애니메이션 완성!
```

### 실습: 회전하는 보석

```
1. Ico Sphere 추가 (보석 모양으로 편집)
2. 프레임 1: 회전 (0, 0, 0) → I → Rotation
3. 프레임 60: R → Z → 360 → Enter → I → Rotation
4. Space 바로 재생!

→ 보석이 한 바퀴 도는 애니메이션!
```

### 반복 애니메이션 만들기

```
타임라인에서 키프레임 우클릭 → Interpolation Mode:

Linear:      일정한 속도 ─── (기계적)
Bezier:      부드럽게 ╭─╮ (기본값)
Constant:    뚝뚝 끊김 ┌┐ (프레임 애니메이션)

무한 반복:
  Graph Editor 열기 → Channel → Extrapolation Mode →
  Make Cyclic (F-Modifier)
```

## 포즈 애니메이션 (리깅 모델)

### 포즈 모드에서 애니메이션

```
1. 아마추어 선택
2. Ctrl + Tab → Pose Mode
3. 프레임 1로 이동
4. 모든 뼈 선택 (A 키) → I → LocRotScale
   (기본 포즈 키프레임)

5. 프레임 15로 이동
6. 팔 뼈 선택 → R → 위로 회전
7. I → LocRotScale

8. Space 바로 재생!
→ 캐릭터가 팔을 올리는 애니메이션!
```

### 실습: 인사 애니메이션 만들기

```
프레임 1  (시작 포즈):
  모든 뼈 기본 위치 → I → LocRotScale

프레임 10 (팔 올리기):
  Arm.R 선택 → R → 위로 올리기
  I → LocRotScale

프레임 15 (손 흔들기 1):
  Arm.R → R → Z → 약간 회전
  I → LocRotScale

프레임 20 (손 흔들기 2):
  Arm.R → R → Z → 반대로 회전
  I → LocRotScale

프레임 25 (손 흔들기 3):
  프레임 15의 포즈 복사 (복사/붙여넣기)

프레임 35 (팔 내리기):
  프레임 1의 포즈 복사

→ 손 흔들어 인사하는 애니메이션 완성!
```

### 포즈 복사 & 붙여넣기

```
키프레임 복사 단축키:
  Ctrl + C: 현재 포즈 복사
  Ctrl + V: 포즈 붙여넣기 (현재 프레임에)
  Ctrl + Shift + V: 좌우 반전 붙여넣기

💡 걷기 애니메이션 만들 때:
   오른발 앞으로 포즈 → 복사 → 반전 붙여넣기
   = 왼발 앞으로 포즈가 자동으로!
```

## 걷기 애니메이션 만들기

### 기본 걷기 사이클

```
프레임 1 (접촉 포즈 - Contact):
  왼발 앞, 오른발 뒤
  팔은 반대 (오른팔 앞, 왼팔 뒤)

프레임 8 (통과 포즈 - Passing):
  오른발이 지나가는 중
  몸이 살짝 아래로

프레임 15 (접촉 포즈 - 반대):
  오른발 앞, 왼발 뒤
  팔은 반대

프레임 22 (통과 포즈 - 반대):
  왼발이 지나가는 중

프레임 30 = 프레임 1 (반복!)

💡 접촉→통과→접촉→통과 의 반복이
   자연스러운 걷기가 됩니다!
```

## 로블록스로 애니메이션 가져오기

### 방법 1: FBX로 내보내기 (권장)

```
블렌더에서:
1. 아마추어 + 메시 선택
2. File → Export → FBX (.fbx)
3. 설정:
   - Selected Objects: ✅
   - Object Types: Armature, Mesh 체크
   - Bake Animation: ✅ 체크
   - NLA Strips / All Actions 체크
4. Export

로블록스에서:
1. Animation Editor 열기 (Plugins → Animation Editor)
2. 리그 선택 (R15 Dummy)
3. ⋮ 메뉴 → Import → From FBX
4. FBX 파일 선택
5. 애니메이션이 로드됨!
6. 필요시 타이밍 조정
7. Export로 애니메이션 ID 발급
```

### 방법 2: 로블록스 Animation Editor에서 직접

```
블렌더 없이 로블록스에서 직접 만드는 방법도 있어요!
(7단계에서 배운 Animation Editor)

블렌더 장점:
  - 더 정밀한 제어
  - 포즈 복사/반전이 쉬움
  - 여러 애니메이션 한 번에 관리
  - Graph Editor로 곡선 조절

로블록스 장점:
  - 설정이 간단
  - 바로 테스트 가능
  - R15/R6 리그가 준비되어 있음
```

### 애니메이션 스크립트로 재생

```lua
-- LocalScript (StarterCharacterScripts)
local player = game.Players.LocalPlayer
local character = player.Character or player.CharacterAdded:Wait()
local humanoid = character:WaitForChild("Humanoid")
local animator = humanoid:WaitForChild("Animator")

-- 블렌더에서 가져온 애니메이션
local customAnim = Instance.new("Animation")
customAnim.AnimationId = "rbxassetid://여기에_애니메이션_ID"

local animTrack = animator:LoadAnimation(customAnim)

-- 재생
animTrack:Play()

-- 반복 재생
animTrack.Looped = true
animTrack:Play()
```

## NLA Editor (여러 애니메이션 관리)

블렌더에서 여러 애니메이션을 관리할 때:

```
NLA Editor = Non-Linear Animation Editor

Action 1: "Idle"     대기 포즈
Action 2: "Walk"     걷기
Action 3: "Wave"     인사
Action 4: "Attack"   공격

각각 따로 만들고, 필요한 것만 골라서 내보낼 수 있어요!

사용법:
1. 상단 Editor Type → Dope Sheet → Action Editor
2. "New" 버튼으로 새 Action 생성
3. 이름 입력 (예: "Walk")
4. 애니메이션 만들기
5. 방패 아이콘(Fake User) 클릭 → 저장 보호
```

## 전체 워크플로우 정리

```
[블렌더]
  1. 모델링 (9-10단계)
  2. UV 매핑 & 텍스처 (10단계)
  3. 리깅 (11단계)
  4. 애니메이션 (11단계)
  5. FBX 내보내기
       ↓
[로블록스 스튜디오]
  6. 메시 임포트 (MeshPart)
  7. 텍스처 적용 (TextureID)
  8. 애니메이션 임포트 (Animation Editor)
  9. 스크립트로 애니메이션 재생
  10. 게임에 배치!
```

## 연습 문제

:::note 실습해보기
1. **오브젝트 애니메이션**
   - 보석이 위아래로 떠다니는 애니메이션 만들기
   - 회전하면서 떠다니게 조합
   - 무한 반복 설정

2. **인사 애니메이션**
   - 리깅된 모델에서 인사 애니메이션 만들기
   - 위 실습을 참고하여 30프레임 이내로

3. **걷기 애니메이션 (도전)**
   - 기본 걷기 사이클 만들기
   - 포즈 반전 기능 활용
   - 반복 재생되게 설정

4. **로블록스 연동**
   - 만든 애니메이션을 FBX로 내보내기
   - 로블록스 Animation Editor에서 임포트
   - 스크립트로 재생해보기
:::

## 11단계 완료! 전 과정 완료!

축하해요! 11단계를 모두 마쳤어요. 이제:
- ✅ 메시를 FBX로 내보내고 로블록스에 임포트
- ✅ 리깅으로 모델에 뼈대를 넣어 움직이게
- ✅ 키프레임 애니메이션을 만들고 로블록스에 적용

**33주 전체 커리큘럼을 완료했습니다!**

여러분은 이제:
- 로블록스 스튜디오로 게임을 만들 수 있고
- 루아 스크립트로 게임 로직을 짤 수 있고
- 블렌더로 나만의 3D 에셋을 만들어 게임에 넣을 수 있어요!

이 모든 것을 조합하면 정말 멋진 로블록스 게임을 만들 수 있습니다!
