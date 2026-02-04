---
sidebar_position: 1
---

# GUI 기초 심화

4단계에서 배운 GUI를 더 깊이 배워봐요. 전문적인 게임 UI를 만들 수 있게 됩니다!

## 학습 목표

- GUI 객체들의 속성을 깊이 이해한다
- UDim2와 앵커 포인트를 활용할 수 있다
- 레이아웃을 효과적으로 구성할 수 있다

## GUI 계층 구조 복습

```
StarterGui
└── ScreenGui
    ├── Frame (컨테이너)
    │   ├── TextLabel
    │   ├── TextButton
    │   └── ImageLabel
    └── BillboardGui (3D 공간 UI)
```

## UDim2 완벽 이해

### UDim2 구조

```lua
UDim2.new(ScaleX, OffsetX, ScaleY, OffsetY)
```

| 파라미터 | 설명 | 범위 |
|---------|------|------|
| ScaleX | 부모 너비의 비율 | 0 ~ 1 |
| OffsetX | 고정 픽셀 (가로) | 정수 |
| ScaleY | 부모 높이의 비율 | 0 ~ 1 |
| OffsetY | 고정 픽셀 (세로) | 정수 |

### 예제

```lua
-- 부모의 50% 크기
UDim2.new(0.5, 0, 0.5, 0)

-- 고정 200x100 픽셀
UDim2.new(0, 200, 0, 100)

-- 전체 너비, 50픽셀 높이
UDim2.new(1, 0, 0, 50)

-- 80% 너비, 마진 10픽셀씩
UDim2.new(0.8, 0, 1, -20)
```

### 축약 문법

```lua
-- fromScale: 비율만 사용
UDim2.fromScale(0.5, 0.5)  -- = UDim2.new(0.5, 0, 0.5, 0)

-- fromOffset: 픽셀만 사용
UDim2.fromOffset(200, 100)  -- = UDim2.new(0, 200, 0, 100)
```

## AnchorPoint (앵커 포인트)

앵커 포인트는 UI 요소의 기준점을 정해요.

### 앵커 포인트 값

```
(0, 0)       (0.5, 0)       (1, 0)
   ┌────────────┬────────────┐
   │            │            │
   │            │            │
(0, 0.5)    (0.5, 0.5)    (1, 0.5)
   │            │            │
   │            │            │
   └────────────┴────────────┘
(0, 1)       (0.5, 1)       (1, 1)
```

### 정중앙 배치

```lua
local frame = Instance.new("Frame")
frame.AnchorPoint = Vector2.new(0.5, 0.5)  -- 중심점 기준
frame.Position = UDim2.fromScale(0.5, 0.5)  -- 화면 중앙
frame.Size = UDim2.fromOffset(300, 200)
frame.Parent = screenGui
```

### 우측 상단 배치

```lua
local frame = Instance.new("Frame")
frame.AnchorPoint = Vector2.new(1, 0)  -- 우측 상단 기준
frame.Position = UDim2.new(1, -10, 0, 10)  -- 여백 10px
frame.Size = UDim2.fromOffset(200, 50)
```

## 주요 GUI 속성

### Frame 속성

```lua
local frame = Instance.new("Frame")

-- 기본 속성
frame.Name = "MainFrame"
frame.Size = UDim2.fromScale(0.3, 0.4)
frame.Position = UDim2.fromScale(0.5, 0.5)
frame.AnchorPoint = Vector2.new(0.5, 0.5)

-- 외관
frame.BackgroundColor3 = Color3.fromRGB(40, 40, 40)
frame.BackgroundTransparency = 0.1
frame.BorderSizePixel = 0  -- 테두리 제거

-- 모서리 둥글게 (UICorner)
local corner = Instance.new("UICorner")
corner.CornerRadius = UDim.new(0, 12)
corner.Parent = frame
```

### TextLabel 속성

```lua
local label = Instance.new("TextLabel")

-- 텍스트
label.Text = "게임 제목"
label.TextColor3 = Color3.fromRGB(255, 255, 255)
label.TextSize = 24
label.Font = Enum.Font.GothamBold

-- 텍스트 정렬
label.TextXAlignment = Enum.TextXAlignment.Center
label.TextYAlignment = Enum.TextYAlignment.Center

-- 자동 크기 조절
label.TextScaled = true
label.TextWrapped = true

-- 배경 투명
label.BackgroundTransparency = 1
```

### TextButton 속성

```lua
local button = Instance.new("TextButton")

-- 기본
button.Text = "시작하기"
button.TextColor3 = Color3.fromRGB(255, 255, 255)
button.BackgroundColor3 = Color3.fromRGB(0, 170, 255)

-- 자동 버튼 색상 변화 비활성화
button.AutoButtonColor = false

-- 커스텀 호버 효과
button.MouseEnter:Connect(function()
    button.BackgroundColor3 = Color3.fromRGB(0, 200, 255)
end)

button.MouseLeave:Connect(function()
    button.BackgroundColor3 = Color3.fromRGB(0, 170, 255)
end)
```

## 레이아웃 컴포넌트

### UIListLayout (리스트 정렬)

```lua
local frame = Instance.new("Frame")
frame.Size = UDim2.fromScale(0.3, 0.5)

local listLayout = Instance.new("UIListLayout")
listLayout.FillDirection = Enum.FillDirection.Vertical
listLayout.HorizontalAlignment = Enum.HorizontalAlignment.Center
listLayout.Padding = UDim.new(0, 10)  -- 간격 10px
listLayout.Parent = frame

-- 버튼들 추가
for i = 1, 5 do
    local btn = Instance.new("TextButton")
    btn.Size = UDim2.new(1, -20, 0, 40)
    btn.Text = "버튼 " .. i
    btn.LayoutOrder = i  -- 순서 지정
    btn.Parent = frame
end
```

### UIGridLayout (그리드 정렬)

```lua
local frame = Instance.new("Frame")
frame.Size = UDim2.fromScale(0.4, 0.4)

local gridLayout = Instance.new("UIGridLayout")
gridLayout.CellSize = UDim2.fromOffset(80, 80)
gridLayout.CellPadding = UDim2.fromOffset(10, 10)
gridLayout.FillDirection = Enum.FillDirection.Horizontal
gridLayout.Parent = frame

-- 아이템들 추가
for i = 1, 9 do
    local item = Instance.new("Frame")
    item.BackgroundColor3 = Color3.fromHSV(i/9, 0.8, 0.9)
    item.Parent = frame
end
```

### UIPadding (내부 여백)

```lua
local padding = Instance.new("UIPadding")
padding.PaddingTop = UDim.new(0, 20)
padding.PaddingBottom = UDim.new(0, 20)
padding.PaddingLeft = UDim.new(0, 20)
padding.PaddingRight = UDim.new(0, 20)
padding.Parent = frame
```

## 반응형 디자인

### 화면 크기에 따른 조절

```lua
local camera = workspace.CurrentCamera

local function updateUI()
    local viewportSize = camera.ViewportSize

    if viewportSize.X < 800 then
        -- 모바일 레이아웃
        mainFrame.Size = UDim2.fromScale(0.9, 0.8)
    else
        -- 데스크톱 레이아웃
        mainFrame.Size = UDim2.fromScale(0.5, 0.6)
    end
end

camera:GetPropertyChangedSignal("ViewportSize"):Connect(updateUI)
updateUI()
```

## 연습 문제

:::note 실습해보기
1. **정중앙 팝업**
   - 화면 정중앙에 300x200 크기의 Frame 생성
   - AnchorPoint와 Position 활용

2. **버튼 리스트**
   - UIListLayout으로 버튼 5개 세로 정렬
   - 각 버튼 클릭 시 텍스트 변경

3. **아이템 그리드**
   - UIGridLayout으로 3x3 아이템 슬롯 생성
   - 각 슬롯에 번호 표시
:::

## 다음 단계

GUI 기초를 마스터했나요? 다음으로 [고급 UI 컴포넌트](/curriculum/week-16-18/advanced-components)에서 스크롤, 입력창 등을 배울 거예요!
