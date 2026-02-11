---
sidebar_position: 3
---

# 텍스처와 머티리얼

모델에 색과 질감을 입혀서 진짜 게임 에셋처럼 만들어봐요! 블렌더의 머티리얼 시스템과 텍스처 페인팅을 배웁니다.

## 학습 목표

- 블렌더에서 머티리얼을 만들고 적용할 수 있다
- 텍스처 페인팅으로 직접 색칠할 수 있다
- 로블록스에 적합한 텍스처를 만들 수 있다

## 머티리얼(Material)이란?

```
머티리얼 = 오브젝트의 겉모습을 결정하는 설정

색깔:     빨간색, 파란색, 금색...
질감:     반짝반짝, 거친, 투명...
텍스처:   나무 무늬, 돌 무늬, 그림...

🎨 물감 = 머티리얼
🖼️ 그림 = 텍스처
```

## 머티리얼 기본 설정

### 머티리얼 만들기

```
1. 오브젝트 선택
2. 속성 패널 → 🔴 (구 아이콘) = Material Properties
3. "New" 버튼 클릭
4. 머티리얼 이름 입력 (예: "Sword_Blade")
```

### 기본 색상 (Base Color) 변경

```
Principled BSDF 셰이더:

Base Color: [■ 색상 선택]  ← 클릭해서 색 바꾸기!
Metallic:   0.0 ──────── 1.0  (금속 느낌)
Roughness:  0.0 ──────── 1.0  (거칠기)

예시 설정:
  금속 칼날:  Base Color 은색, Metallic 1.0, Roughness 0.3
  나무 손잡이: Base Color 갈색, Metallic 0.0, Roughness 0.8
  보석:       Base Color 빨간색, Metallic 0.0, Roughness 0.1
```

### 여러 머티리얼 적용하기

하나의 오브젝트에 여러 색을 입히려면:

```
1. 편집 모드 (Tab)
2. 면 모드 (3 키)
3. 색칠할 면들 선택

4. Material Properties에서:
   + 버튼 → 새 머티리얼 추가
   "New" → 색상 설정
   "Assign" 버튼 클릭!

예: 칼 모델
  [머티리얼 1] Blade_Silver → 칼날 면에 Assign
  [머티리얼 2] Guard_Gold   → 가드 면에 Assign
  [머티리얼 3] Handle_Brown → 손잡이 면에 Assign
```

## 뷰포트 셰이딩 모드

머티리얼을 확인하려면 셰이딩 모드를 바꿔야 해요:

```
뷰포트 오른쪽 상단 4개 구 아이콘:

○ Wireframe:      뼈대만 보임
◑ Solid:          기본 (회색)
◕ Material Preview: 머티리얼 미리보기 ← 여기서 확인!
● Rendered:        최종 렌더 (느림)

단축키: Z 키 → 파이 메뉴에서 선택
```

## 텍스처 페인팅

### Texture Paint 모드

```
UV가 있는 모델에 직접 그림을 그릴 수 있어요!

1. 오브젝트 선택
2. 상단 모드를 "Texture Paint"로 변경
3. 왼쪽 도구에서 브러시 선택
4. 3D 모델 위에 직접 그리기!

💡 UV 매핑이 되어 있어야 가능해요!
```

### 텍스처 이미지 생성

```
Texture Paint 모드 진입 시:

1. "Add Paint Slot" 또는 속성에서 이미지 추가
2. Image → New
3. 이름: "Sword_Texture"
4. 크기: 512 × 512
5. Color: 원하는 기본 색
6. OK

이제 모델 위에 직접 칠할 수 있어요!
```

### 브러시 설정

```
도구 설정 (상단 바):

Radius:   브러시 크기      (F 키로 조절)
Strength: 색 진하기        (Shift + F로 조절)
Color:    브러시 색상      (하단 색상 바)

브러시 종류:
  🖌️ Draw:    기본 그리기
  🔵 Soften:  부드럽게 (블러)
  💧 Smear:   문지르기
  🪣 Fill:    채우기
```

## 로블록스용 텍스처 제작

### 방법 1: 블렌더에서 직접 페인팅

```
1. UV 매핑 완료
2. Texture Paint에서 색칠
3. Image → Save As → PNG로 저장
4. 로블록스 스튜디오에서 MeshPart의 TextureID에 업로드
```

### 방법 2: 외부 프로그램 활용

```
1. 블렌더에서 UV Layout 내보내기
   (UV 에디터 → UV → Export UV Layout)
2. 그림판/포토샵 등에서 UV 위에 그림 그리기
3. PNG로 저장
4. 블렌더에서 텍스처로 로드하여 확인
5. 로블록스에 업로드
```

### 방법 3: 색상만 사용 (가장 간단!)

```
텍스처 없이 머티리얼 색상만 사용!

로블록스 MeshPart에서:
  Color → 원하는 색 선택
  Material → 원하는 질감 선택

💡 초보자에게 가장 추천하는 방법이에요!
   블렌더에서는 모양만 만들고,
   색은 로블록스에서 입히는 거예요.
```

## 실습: 보물 상자 꾸미기

### 1단계: 머티리얼 준비

```
머티리얼 3개 만들기:
  1. Chest_Wood:  Base Color 갈색(#8B4513), Roughness 0.9
  2. Chest_Metal: Base Color 금색(#FFD700), Metallic 1.0, Roughness 0.4
  3. Chest_Lock:  Base Color 회색(#808080), Metallic 0.8, Roughness 0.5
```

### 2단계: 면에 머티리얼 적용

```
1. 편집 모드 → 면 모드
2. 상자 본체 면 전체 선택 → Chest_Wood Assign
3. 모서리 금속 장식 면 선택 → Chest_Metal Assign
4. 자물쇠 면 선택 → Chest_Lock Assign
```

### 3단계: 텍스처 페인팅 (선택)

```
1. Texture Paint 모드
2. 나무 결 느낌으로 갈색 줄무늬 그리기
3. 금속 부분에 하이라이트 추가
4. Image → Save As → chest_texture.png
```

## 텍스처 저장 & 내보내기

```
⚠️ 블렌더에서 텍스처를 그린 뒤 반드시 저장하세요!

UV 에디터 또는 Image Editor:
  Image → Save As Image
  형식: PNG
  이름: 알아보기 쉽게!

저장하지 않으면 블렌더를 닫을 때 사라져요!
```

## 연습 문제

:::note 실습해보기
1. **머티리얼 기초**
   - 큐브에 빨간색 머티리얼 적용
   - Metallic과 Roughness 값을 바꿔보며 차이 확인
   - Material Preview 모드에서 결과 확인

2. **여러 머티리얼 적용**
   - 큐브의 각 면에 다른 색 머티리얼 적용 (주사위처럼!)
   - 이전에 만든 칼에 칼날/가드/손잡이 별로 다른 머티리얼

3. **텍스처 페인팅**
   - 큐브에 UV 매핑 후 Texture Paint로 그림 그려보기
   - 그린 텍스처를 PNG로 저장

4. **보물 상자 꾸미기**
   - 위 실습을 따라 보물 상자에 머티리얼 적용
   - 나무/금속/자물쇠 질감 구분
:::

## 10단계 완료!

축하해요! 10단계를 모두 마쳤어요. 이제:
- ✅ 로블록스에 적합한 로우 폴리 모델링
- ✅ UV 매핑으로 텍스처 좌표 설정
- ✅ 머티리얼과 텍스처로 색과 질감 표현

다음 [11단계: 블렌더 → 로블록스 연동](/curriculum/week-31-33/mesh-export)에서 만든 모델을 로블록스에 가져오는 방법을 배워요!
