---
sidebar_position: 2
---

# GUI 디자인

**GUI**(Graphical User Interface)는 화면에 표시되는 버튼, 텍스트, 이미지 등이에요. 플레이어와 소통하는 인터페이스를 만들어봐요!

## 학습 목표

- ScreenGui와 Frame을 생성할 수 있다
- TextLabel과 TextButton을 사용할 수 있다
- 버튼 클릭 이벤트를 처리할 수 있다

## GUI 기본 구조

```
StarterGui (플레이어에게 자동 복사됨)
└── ScreenGui
    └── Frame (컨테이너)
        ├── TextLabel (텍스트 표시)
        ├── TextButton (클릭 가능한 버튼)
        └── ImageLabel (이미지 표시)
```

## 첫 번째 GUI 만들기

### 1단계: ScreenGui 추가

1. 탐색기에서 `StarterGui` 찾기
2. 오른쪽 클릭 → Insert Object → ScreenGui
3. ScreenGui 안에 TextLabel 추가

### 2단계: TextLabel 속성 설정

| 속성 | 값 | 설명 |
|------|-----|------|
| Text | "안녕하세요!" | 표시할 텍스트 |
| Position | {0.5, 0}, {0.5, 0} | 화면 중앙 |
| AnchorPoint | 0.5, 0.5 | 중심점 |
| Size | {0.3, 0}, {0.1, 0} | 크기 |
| BackgroundColor3 | 원하는 색 | 배경색 |
| TextColor3 | 원하는 색 | 글자색 |
| TextScaled | true | 크기에 맞게 글자 조절 |

## Position과 Size 이해하기

```
Position과 Size는 두 가지 값을 가져요:
{Scale, Offset}

Scale (0~1): 화면 비율
- 0.5 = 화면의 50% 위치

Offset (픽셀): 고정 픽셀 값
- 100 = 100픽셀

예시:
Position = {0.5, 0}, {0.1, 0}
→ X: 화면 가로의 50% 위치
→ Y: 화면 세로의 10% 위치
```

## 코드로 GUI 만들기

### LocalScript 위치

GUI를 제어하는 스크립트는 **LocalScript**를 사용해요!

```
StarterGui
└── ScreenGui
    ├── TextLabel
    └── LocalScript  ← 여기에 코드 작성
```

### 기본 예제

```lua
-- LocalScript
local textLabel = script.Parent:WaitForChild("TextLabel")

-- 텍스트 변경
textLabel.Text = "환영합니다!"

-- 3초 후 텍스트 변경
task.wait(3)
textLabel.Text = "게임을 즐겨주세요!"
```

## TextButton 사용하기

### 버튼 생성

1. ScreenGui 안에 TextButton 추가
2. 속성 설정:
   - Text: "클릭!"
   - Size: {0.2, 0}, {0.1, 0}
   - Position: {0.4, 0}, {0.45, 0}

### 버튼 클릭 이벤트

```lua
-- LocalScript
local button = script.Parent:WaitForChild("TextButton")

button.MouseButton1Click:Connect(function()
    print("버튼이 클릭되었습니다!")
    button.Text = "클릭됨!"
end)
```

### 마우스 이벤트 종류

| 이벤트 | 설명 |
|--------|------|
| MouseButton1Click | 왼쪽 클릭 |
| MouseButton2Click | 오른쪽 클릭 |
| MouseEnter | 마우스가 올라감 |
| MouseLeave | 마우스가 떠남 |

## 실습: 클릭 카운터

버튼을 클릭할 때마다 숫자가 올라가는 GUI를 만들어봐요!

```lua
-- LocalScript
local button = script.Parent:WaitForChild("ClickButton")
local countLabel = script.Parent:WaitForChild("CountLabel")

local clicks = 0

button.MouseButton1Click:Connect(function()
    clicks += 1
    countLabel.Text = "클릭: " .. clicks
end)
```

## Frame 사용하기

Frame은 여러 GUI 요소를 담는 컨테이너예요.

```lua
-- 메뉴 패널 만들기
local frame = Instance.new("Frame")
frame.Size = UDim2.new(0.3, 0, 0.4, 0)
frame.Position = UDim2.new(0.35, 0, 0.3, 0)
frame.BackgroundColor3 = Color3.fromRGB(50, 50, 50)
frame.Parent = script.Parent  -- ScreenGui
```

### Frame 표시/숨기기

```lua
local frame = script.Parent:WaitForChild("MenuFrame")
local openButton = script.Parent:WaitForChild("OpenButton")

local isOpen = false

openButton.MouseButton1Click:Connect(function()
    isOpen = not isOpen  -- true ↔ false 전환
    frame.Visible = isOpen

    if isOpen then
        openButton.Text = "닫기"
    else
        openButton.Text = "메뉴"
    end
end)
```

## GUI 애니메이션

### Tween으로 부드러운 애니메이션

```lua
local TweenService = game:GetService("TweenService")

local frame = script.Parent:WaitForChild("Frame")

-- 애니메이션 설정
local tweenInfo = TweenInfo.new(
    0.5,  -- 지속 시간
    Enum.EasingStyle.Quad,  -- 이징 스타일
    Enum.EasingDirection.Out  -- 방향
)

-- 목표 속성
local goal = {
    Position = UDim2.new(0.35, 0, 0.3, 0),
    BackgroundTransparency = 0
}

-- Tween 생성 및 재생
local tween = TweenService:Create(frame, tweenInfo, goal)
tween:Play()
```

## 플레이어 데이터 표시하기

리더보드 점수를 GUI에 표시하는 방법:

```lua
-- LocalScript
local Players = game:GetService("Players")
local player = Players.LocalPlayer

local goldLabel = script.Parent:WaitForChild("GoldLabel")

-- leaderstats가 로드될 때까지 대기
local leaderstats = player:WaitForChild("leaderstats")
local gold = leaderstats:WaitForChild("Gold")

-- 초기 값 표시
goldLabel.Text = "Gold: " .. gold.Value

-- 값이 변할 때마다 업데이트
gold.Changed:Connect(function(newValue)
    goldLabel.Text = "Gold: " .. newValue
end)
```

## 실습: 상점 UI

```lua
-- LocalScript
local player = game.Players.LocalPlayer
local leaderstats = player:WaitForChild("leaderstats")
local gold = leaderstats:WaitForChild("Gold")

local shopFrame = script.Parent:WaitForChild("ShopFrame")
local buyButton = shopFrame:WaitForChild("BuyButton")
local priceLabel = shopFrame:WaitForChild("PriceLabel")

local itemPrice = 50
priceLabel.Text = "가격: " .. itemPrice .. " Gold"

buyButton.MouseButton1Click:Connect(function()
    if gold.Value >= itemPrice then
        -- 서버에 구매 요청 (RemoteEvent 필요)
        print("구매 성공!")
    else
        print("골드가 부족합니다!")
    end
end)
```

## 연습 문제

:::note 실습해보기
1. **인사말 GUI**
   - 화면 상단에 "게임에 오신 것을 환영합니다!" 표시
   - 3초 후 자동으로 사라지게 만드세요
   ```lua
   task.wait(3)
   label.Visible = false
   ```

2. **토글 버튼**
   - 버튼을 누르면 Frame이 보이고/안 보이고를 반복
   - 버튼 텍스트도 "열기"/"닫기"로 바뀌게

3. **체력 바**
   - Frame 안에 작은 Frame을 넣어 체력 바 만들기
   - 체력에 따라 안쪽 Frame의 Size를 조절
   ```lua
   local healthPercent = currentHealth / maxHealth
   healthBar.Size = UDim2.new(healthPercent, 0, 1, 0)
   ```

4. **카운트다운 타이머**
   - 10부터 1까지 카운트다운하는 GUI
   - 0이 되면 "시작!" 표시
:::

## 다음 단계

GUI 디자인을 마스터했나요? 다음으로 [게임 게시](/curriculum/week-10-12/publish)에서 만든 게임을 세상에 공개하는 방법을 배울 거예요!
