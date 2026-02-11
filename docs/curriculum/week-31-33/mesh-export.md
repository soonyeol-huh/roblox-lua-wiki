---
sidebar_position: 1
---

# 메시 익스포트와 임포트

블렌더에서 만든 3D 모델을 로블록스 스튜디오에 가져오는 방법을 배워봐요! FBX 형식으로 내보내고 MeshPart로 불러오는 전체 과정을 다룹니다.

## 학습 목표

- 블렌더에서 모델을 FBX로 내보낼 수 있다
- 로블록스 스튜디오에서 메시를 임포트할 수 있다
- 텍스처를 메시에 적용할 수 있다

## 내보내기 전 체크리스트

로블록스에 가져가기 전에 꼭 확인하세요!

```
✅ 체크리스트:

□ 폴리곤 수 10,000 Tris 이하?
□ 크기가 적당한가? (너무 크거나 작지 않은지)
□ 원점(Origin) 위치가 올바른가?
□ Ctrl + A → All Transforms 적용했는가?
□ 불필요한 오브젝트는 삭제했는가?
□ 머티리얼/텍스처를 저장했는가?
```

### Transform 초기화 (필수!)

```
⚠️ 가장 많이 하는 실수!

내보내기 전에 반드시:
1. 오브젝트 선택
2. Ctrl + A → All Transforms

이유:
  블렌더 Scale (2, 3, 1) → 로블록스에서 찌그러짐!
  Ctrl + A 후 (1, 1, 1) → 로블록스에서 정상!
```

### 오브젝트 합치기

```
여러 파트로 된 모델은 하나로 합쳐주세요:

1. 모든 파트 선택 (A 키)
2. Ctrl + J (Join)

예: 칼날 + 가드 + 손잡이 → 하나의 "Sword" 오브젝트
```

## FBX로 내보내기

### 기본 내보내기

```
1. File → Export → FBX (.fbx)
2. 파일 이름 입력 (예: sword.fbx)
3. 오른쪽 설정 패널에서 확인:
```

### 내보내기 설정

```
FBX Export 설정:

┌─ Include ─────────────────┐
│ Selected Objects: ✅ 체크   │ ← 선택한 것만 내보내기
│ Object Types: Mesh만 체크  │ ← 카메라, 라이트 제외
└───────────────────────────┘

┌─ Transform ───────────────┐
│ Scale: 1.00               │
│ Apply Scalings: All Local │
│ Forward: -Z Forward       │
│ Up: Y Up                  │
└───────────────────────────┘

┌─ Geometry ────────────────┐
│ Smoothing: Face           │
│ Apply Modifiers: ✅ 체크   │ ← 수정자 적용
└───────────────────────────┘
```

:::tip 간단 설정
복잡하다면 기본 설정 그대로 내보내도 대부분 잘 작동해요! **Selected Objects**만 체크하는 것을 추천합니다.
:::

## 로블록스 스튜디오에서 임포트

### 방법 1: 3D Importer (권장)

```
1. 로블록스 스튜디오 열기
2. Home 탭 → "Import 3D" 클릭
3. 내보낸 FBX 파일 선택
4. Import Settings 확인:
   - Anchored: ✅ (고정)
   - Insert with correct scale: ✅
5. Import 클릭!

→ Workspace에 MeshPart가 생성됩니다!
```

### 방법 2: MeshPart 직접 생성

```
1. Explorer에서 Workspace 오른쪽 클릭
2. Insert Object → MeshPart
3. Properties에서:
   - MeshId 옆의 폴더 아이콘 클릭
   - FBX 파일 선택
4. 메시가 로드됩니다!
```

### 방법 3: Asset Manager

```
1. View → Asset Manager 열기
2. Meshes 폴더 선택
3. "Import" 버튼 클릭
4. FBX 파일 선택
5. 이름 입력 후 Import
6. 에셋 ID가 생성됨!
```

## 텍스처 적용하기

### MeshPart에 텍스처 입히기

```
블렌더에서 텍스처를 만들었다면:

1. MeshPart 선택
2. Properties → TextureID
3. 폴더 아이콘 클릭 → 텍스처 이미지(PNG) 선택
4. 자동으로 업로드 & 적용!

또는:
1. MeshPart 안에 SurfaceAppearance 추가
2. ColorMap에 텍스처 이미지 설정
```

### 색상만 사용하기 (텍스처 없이)

```
텍스처 없이도 충분히 예뻐요!

1. MeshPart 선택
2. Properties에서:
   - Color: 원하는 색 선택
   - Material: Enum.Material에서 선택
     예: SmoothPlastic, Metal, Wood, Neon...

💡 로블록스 머티리얼만으로도 멋진 느낌을 줄 수 있어요!
```

## 자주 발생하는 문제 해결

### 모델이 너무 크거나 작음

```
원인: 블렌더와 로블록스의 단위 차이

해결:
  로블록스에서 MeshPart 선택 →
  Properties → Size 조절

  또는 블렌더에서 내보내기 전:
  오브젝트 선택 → S → 원하는 크기 → Ctrl + A
```

### 모델이 찌그러져 보임

```
원인: Transform을 Apply 안 했음

해결:
  블렌더에서:
  1. 오브젝트 선택
  2. Ctrl + A → All Transforms
  3. 다시 FBX 내보내기
```

### 텍스처가 안 보임

```
원인 1: UV 매핑이 안 되어 있음
  → 블렌더에서 UV 매핑 후 다시 내보내기

원인 2: 텍스처 파일을 따로 업로드 안 했음
  → TextureID에 이미지 파일 설정

원인 3: 텍스처 크기가 너무 큼
  → 1024×1024 이하로 줄이기
```

### 면이 뒤집혀 보임 (검은색)

```
원인: 노멀(Normal) 방향이 반대

해결:
  블렌더 편집 모드에서:
  1. A (전체 선택)
  2. Mesh → Normals → Recalculate Outside
     (또는 Shift + N)
  3. 다시 내보내기
```

### 폴리곤 제한 초과

```
로블록스 제한: 메시당 10,000 Tris

폴리곤 줄이는 방법:
  1. Decimate Modifier 사용
     - 속성 → 🔧 → Add Modifier → Decimate
     - Ratio 값을 줄이기 (0.5 = 절반)
     - Apply

  2. 수동으로 정리
     - 편집 모드에서 불필요한 면 삭제
     - 안 보이는 면(내부) 삭제
```

## 실습: 칼을 로블록스에 가져오기

### 전체 워크플로우

```
[블렌더]
  1. 칼 모델 완성
  2. Ctrl + A → All Transforms
  3. 원점 설정 (손잡이 아래)
  4. File → Export → FBX
     ↓
[로블록스 스튜디오]
  5. Home → Import 3D → sword.fbx
  6. MeshPart 크기 조절
  7. Color / Material 설정
  8. Tool로 만들기 (선택)
```

### Tool로 만들기

```lua
-- 칼을 Tool로 만들어 캐릭터가 들 수 있게!

-- Workspace 구조:
-- Tool
--   ├── Handle (MeshPart, 이름을 "Handle"로!)
--   └── Script

-- Tool 설정:
-- 1. 칼 MeshPart의 이름을 "Handle"로 변경
-- 2. Insert → Tool
-- 3. Handle을 Tool 안으로 이동
-- 4. Tool을 StarterPack에 이동

-- 칼 스크립트 (ServerScript)
local tool = script.Parent

tool.Activated:Connect(function()
    -- 공격 애니메이션이나 데미지 로직
    print(tool.Parent.Name .. " swings the sword!")
end)
```

## 연습 문제

:::note 실습해보기
1. **기본 임포트**
   - 블렌더에서 간단한 큐브를 FBX로 내보내기
   - 로블록스 스튜디오에서 Import 3D로 불러오기
   - 크기와 색상 조절해보기

2. **칼 가져오기**
   - 이전에 만든 칼을 FBX로 내보내기
   - 로블록스에 임포트
   - Tool로 만들어 캐릭터가 들게 하기

3. **텍스처 적용**
   - 블렌더에서 텍스처를 만든 모델 내보내기
   - 로블록스에서 TextureID로 텍스처 적용
   - 색상만 사용하는 방법과 비교

4. **문제 해결 연습**
   - 일부러 Ctrl+A 없이 내보내서 문제 확인
   - 노멀 뒤집힌 모델 내보내서 확인
   - 각각 해결해보기
:::

## 다음 단계

메시 익스포트를 마스터했나요? 다음으로 [리깅 기초](/curriculum/week-31-33/rigging)에서 모델에 뼈대를 넣어 움직이게 만드는 법을 배워요!
