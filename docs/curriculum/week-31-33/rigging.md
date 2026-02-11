---
sidebar_position: 2
---

# 리깅 기초

3D 모델에 뼈대(Bone)를 넣어서 움직일 수 있게 만들어봐요! 리깅은 캐릭터나 동물 같은 모델에 관절을 만드는 작업이에요.

## 학습 목표

- 리깅의 개념을 이해한다
- 간단한 아마추어(뼈대)를 만들 수 있다
- 모델에 뼈대를 연결(스키닝)할 수 있다

## 리깅이란?

```
리깅 = 3D 모델에 뼈대를 넣는 것

사람 몸에 뼈가 있어서 움직이듯이,
3D 모델에도 뼈(Bone)를 넣으면 움직일 수 있어요!

    🦴 뼈대(Armature)
    │
    ├── Spine (척추)
    │   ├── Head (머리)
    │   ├── Arm.L (왼팔)
    │   ├── Arm.R (오른팔)
    │   ├── Leg.L (왼다리)
    │   └── Leg.R (오른다리)
    │
    → 각 뼈를 움직이면 주변 메시도 따라 움직임!
```

### 리깅 용어

```
Armature (아마추어): 뼈대 전체
Bone (본):          뼈 하나하나
Root Bone:          최상위 뼈 (보통 엉덩이)
Weight Paint:       뼈가 메시에 미치는 영향력
Skinning:           메시와 뼈대를 연결하는 작업
```

## 아마추어(뼈대) 만들기

### 기본 뼈 추가

```
1. Shift + A → Armature → Single Bone
2. 화살표 모양의 뼈가 하나 생성!

     △  ← 위쪽 (Tip, 끝)
     │
     │  ← Bone (뼈)
     │
     ●  ← 아래쪽 (Root, 뿌리)
```

### 뼈대 편집 모드

```
1. 아마추어 선택
2. Tab → 편집 모드
3. 뼈를 선택, 이동, 회전, 크기 조절 가능!

뼈 추가 방법:
  - 뼈 끝(Tip) 선택 → E 키 (Extrude)
  - 새 뼈가 연결되어 생성!
```

## 실습: 간단한 캐릭터 뼈대

### 1단계: 몸통 뼈

```
1. Shift + A → Armature → Single Bone
2. 편집 모드 진입
3. 뼈 전체 선택 → G → Z → 위로 이동 (발 위치)
4. 이름을 "Spine"으로 변경
```

### 2단계: 머리 뼈

```
1. Spine 뼈의 Tip(위쪽) 선택
2. E → Z → 위로 Extrude
3. 이름: "Head"
```

### 3단계: 팔 뼈

```
1. Spine 뼈의 Tip 선택
2. E → X → 왼쪽으로 Extrude
3. 이름: "Arm.L" (왼팔)

4. 다시 Spine의 Tip 선택
5. E → X → 오른쪽으로 Extrude
6. 이름: "Arm.R" (오른팔)
```

### 4단계: 다리 뼈

```
1. Spine 뼈의 Root(아래쪽) 선택
2. E → Z → 아래로 Extrude → X → 왼쪽
3. 이름: "Leg.L"

4. 다시 Spine의 Root 선택
5. E → Z → 아래로 Extrude → X → 오른쪽
6. 이름: "Leg.R"
```

### 완성된 뼈대 구조

```
        Head
         │
    Arm.L─Spine─Arm.R
         │
    Leg.L─┴─Leg.R
```

## 메시와 뼈대 연결 (스키닝)

### Automatic Weights (자동)

가장 쉬운 방법이에요!

```
1. 오브젝트 모드로 전환
2. 먼저 메시(캐릭터 모델) 선택
3. Shift + 클릭으로 아마추어도 선택
   (아마추어가 마지막에 선택되어야 해요!)
4. Ctrl + P → Armature Deform → With Automatic Weights

→ 블렌더가 자동으로 어떤 뼈가 어떤 부분을 움직일지 계산!
```

### 연결 확인 (포즈 모드)

```
1. 아마추어 선택
2. Ctrl + Tab → Pose Mode (포즈 모드)
3. 뼈를 선택하고 R 키로 회전
4. 메시가 따라 움직이면 성공!

되돌리기: Alt + R (회전 초기화)
          Alt + G (위치 초기화)
```

## Weight Paint (가중치 페인팅)

자동 가중치가 완벽하지 않을 때 수동으로 조정해요.

### Weight Paint 모드

```
1. 메시 선택
2. Ctrl + Tab → Weight Paint
3. 빨간색 = 영향 많이 받음 (1.0)
   파란색 = 영향 안 받음 (0.0)

    🔴 빨강: 이 뼈를 움직이면 많이 따라감
    🟡 노랑: 중간
    🟢 초록: 조금
    🔵 파랑: 안 움직임
```

### 가중치 수정

```
브러시 도구:
  Draw:  가중치 칠하기 (Weight 값 조절)
  Blur:  가중치 부드럽게

Weight: 0.0 (파랑) ~ 1.0 (빨강)

예: 팔 뼈(Arm.L)를 선택하고
    팔 부분은 빨갛게, 몸통 부분은 파랗게!
```

## 로블록스용 리깅 주의사항

### R15 호환 뼈대

```
로블록스 캐릭터(R15)의 뼈대 구조:

HumanoidRootPart
└── LowerTorso
    ├── UpperTorso
    │   ├── Head
    │   ├── LeftUpperArm
    │   │   └── LeftLowerArm
    │   │       └── LeftHand
    │   └── RightUpperArm
    │       └── RightLowerArm
    │           └── RightHand
    ├── LeftUpperLeg
    │   └── LeftLowerLeg
    │       └── LeftFoot
    └── RightUpperLeg
        └── RightLowerLeg
            └── RightFoot

💡 커스텀 캐릭터를 만들 때
   이 이름과 구조를 맞추면
   로블록스 애니메이션이 바로 적용돼요!
```

### 단순한 리깅으로 충분!

```
로블록스 소품/무기는 리깅이 필요 없어요!
리깅이 필요한 경우:
  - 커스텀 캐릭터
  - NPC
  - 움직이는 동물/몬스터
  - 애니메이션이 있는 오브젝트

리깅이 필요 없는 경우:
  - 칼, 방패 같은 소품
  - 건물, 가구
  - 보석, 코인 같은 아이템
```

## 실습: 간단한 로봇 리깅

### 1단계: 로봇 모델 만들기

```
간단한 상자 로봇:
  - Cube → 몸통
  - Cube 2개 → 팔
  - Cube 2개 → 다리
  - Cube → 머리

각 파트를 Ctrl+J로 합치기
```

### 2단계: 뼈대 만들기

```
1. Shift + A → Armature
2. 편집 모드에서 뼈 추가:
   Root → Spine → Head
              ├→ Arm.L
              ├→ Arm.R
   Root ←→ Leg.L
       ←→ Leg.R
```

### 3단계: 연결

```
1. 메시 선택 → Shift + 아마추어 선택
2. Ctrl + P → With Automatic Weights
3. Pose Mode에서 확인!
```

### 4단계: 가중치 수정

```
자동 가중치가 이상하면:
1. 메시 선택 → Weight Paint 모드
2. 뼈 선택 후 영역 확인
3. 브러시로 수정
```

## 연습 문제

:::note 실습해보기
1. **뼈대 만들기 연습**
   - Single Bone으로 시작
   - Extrude로 5개 이상의 뼈 연결
   - 이름을 각각 지어주기

2. **스키닝 연습**
   - 간단한 원기둥 모델에 뼈대 2개 연결
   - Automatic Weights로 스키닝
   - Pose Mode에서 구부려보기

3. **로봇 리깅**
   - 위 실습을 따라 상자 로봇 만들기
   - 뼈대 연결 후 포즈 잡아보기
   - Weight Paint로 수정

4. **포즈 연습**
   - 리깅된 모델에서 다양한 포즈 만들기
   - 인사, 걷기, 앉기 포즈 시도
:::

## 다음 단계

리깅 기초를 배웠나요? 다음으로 [블렌더 애니메이션](/curriculum/week-31-33/blender-animation)에서 뼈대를 움직여 애니메이션을 만들고 로블록스에 적용하는 법을 배워요!
