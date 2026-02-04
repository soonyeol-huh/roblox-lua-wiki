---
sidebar_position: 2
---

# 고급 UI 컴포넌트

스크롤 프레임, 입력창, 이미지 등 고급 UI 요소들을 배워봐요!

## 학습 목표

- ScrollingFrame을 사용할 수 있다
- TextBox로 사용자 입력을 받을 수 있다
- ImageLabel과 ImageButton을 활용할 수 있다

## ScrollingFrame (스크롤 가능한 프레임)

### 기본 설정

```lua
local scrollFrame = Instance.new("ScrollingFrame")
scrollFrame.Size = UDim2.fromScale(0.3, 0.5)
scrollFrame.Position = UDim2.fromScale(0.5, 0.5)
scrollFrame.AnchorPoint = Vector2.new(0.5, 0.5)

-- 스크롤 설정
scrollFrame.CanvasSize = UDim2.new(0, 0, 0, 1000)  -- 스크롤 영역 크기
scrollFrame.ScrollBarThickness = 8
scrollFrame.ScrollBarImageColor3 = Color3.fromRGB(100, 100, 100)

-- 스타일
scrollFrame.BackgroundColor3 = Color3.fromRGB(30, 30, 30)
scrollFrame.BorderSizePixel = 0

scrollFrame.Parent = screenGui
```

### 자동 캔버스 크기

UIListLayout과 함께 사용하면 자동으로 크기 조절:

```lua
local scrollFrame = Instance.new("ScrollingFrame")
scrollFrame.Size = UDim2.fromScale(0.3, 0.5)
scrollFrame.AutomaticCanvasSize = Enum.AutomaticSize.Y  -- 세로 자동
scrollFrame.CanvasSize = UDim2.new(0, 0, 0, 0)  -- 초기값 0

local listLayout = Instance.new("UIListLayout")
listLayout.Padding = UDim.new(0, 5)
listLayout.Parent = scrollFrame

-- 아이템 추가하면 자동으로 스크롤 영역 확장
for i = 1, 20 do
    local item = Instance.new("TextLabel")
    item.Size = UDim2.new(1, 0, 0, 50)
    item.Text = "아이템 " .. i
    item.Parent = scrollFrame
end
```

### 인벤토리 UI 예제

```lua
local function createInventory()
    local frame = Instance.new("ScrollingFrame")
    frame.Name = "Inventory"
    frame.Size = UDim2.fromScale(0.4, 0.5)
    frame.Position = UDim2.fromScale(0.5, 0.5)
    frame.AnchorPoint = Vector2.new(0.5, 0.5)
    frame.AutomaticCanvasSize = Enum.AutomaticSize.Y
    frame.CanvasSize = UDim2.new(0, 0, 0, 0)
    frame.BackgroundColor3 = Color3.fromRGB(40, 40, 40)

    local grid = Instance.new("UIGridLayout")
    grid.CellSize = UDim2.fromOffset(80, 80)
    grid.CellPadding = UDim2.fromOffset(10, 10)
    grid.Parent = frame

    local padding = Instance.new("UIPadding")
    padding.PaddingAll = UDim.new(0, 10)
    padding.Parent = frame

    -- 인벤토리 슬롯 생성
    for i = 1, 24 do
        local slot = Instance.new("ImageButton")
        slot.Name = "Slot" .. i
        slot.BackgroundColor3 = Color3.fromRGB(60, 60, 60)
        slot.Image = ""  -- 아이템 이미지

        local corner = Instance.new("UICorner")
        corner.CornerRadius = UDim.new(0, 8)
        corner.Parent = slot

        slot.Parent = frame
    end

    return frame
end
```

## TextBox (입력창)

### 기본 입력창

```lua
local textBox = Instance.new("TextBox")
textBox.Size = UDim2.fromOffset(200, 40)
textBox.Position = UDim2.fromScale(0.5, 0.3)
textBox.AnchorPoint = Vector2.new(0.5, 0.5)

-- 텍스트 설정
textBox.PlaceholderText = "이름을 입력하세요..."
textBox.PlaceholderColor3 = Color3.fromRGB(150, 150, 150)
textBox.Text = ""
textBox.TextColor3 = Color3.fromRGB(255, 255, 255)
textBox.TextSize = 18

-- 스타일
textBox.BackgroundColor3 = Color3.fromRGB(50, 50, 50)
textBox.BorderSizePixel = 0
textBox.ClearTextOnFocus = false

local corner = Instance.new("UICorner")
corner.CornerRadius = UDim.new(0, 8)
corner.Parent = textBox

textBox.Parent = screenGui
```

### 입력 이벤트 처리

```lua
-- 포커스 이벤트
textBox.Focused:Connect(function()
    textBox.BackgroundColor3 = Color3.fromRGB(70, 70, 70)
    print("입력 시작")
end)

textBox.FocusLost:Connect(function(enterPressed)
    textBox.BackgroundColor3 = Color3.fromRGB(50, 50, 50)

    if enterPressed then
        local inputText = textBox.Text
        print("입력 완료:", inputText)

        -- 입력 처리
        if inputText ~= "" then
            processInput(inputText)
        end
    end
end)
```

### 채팅 입력창 예제

```lua
local function createChatInput()
    local container = Instance.new("Frame")
    container.Size = UDim2.new(0.4, 0, 0, 40)
    container.Position = UDim2.new(0.5, 0, 1, -50)
    container.AnchorPoint = Vector2.new(0.5, 1)
    container.BackgroundColor3 = Color3.fromRGB(40, 40, 40)

    local input = Instance.new("TextBox")
    input.Size = UDim2.new(1, -60, 1, -10)
    input.Position = UDim2.fromOffset(10, 5)
    input.PlaceholderText = "메시지 입력..."
    input.BackgroundTransparency = 1
    input.TextColor3 = Color3.white
    input.Parent = container

    local sendBtn = Instance.new("TextButton")
    sendBtn.Size = UDim2.fromOffset(50, 30)
    sendBtn.Position = UDim2.new(1, -55, 0.5, 0)
    sendBtn.AnchorPoint = Vector2.new(0, 0.5)
    sendBtn.Text = "전송"
    sendBtn.Parent = container

    sendBtn.MouseButton1Click:Connect(function()
        if input.Text ~= "" then
            -- 메시지 전송 로직
            print("전송:", input.Text)
            input.Text = ""
        end
    end)

    return container
end
```

## ImageLabel & ImageButton

### 이미지 표시

```lua
local imageLabel = Instance.new("ImageLabel")
imageLabel.Size = UDim2.fromOffset(100, 100)
imageLabel.Position = UDim2.fromScale(0.5, 0.5)
imageLabel.AnchorPoint = Vector2.new(0.5, 0.5)

-- 이미지 설정
imageLabel.Image = "rbxassetid://123456789"  -- 에셋 ID
imageLabel.ImageColor3 = Color3.white
imageLabel.ImageTransparency = 0

-- 이미지 크기 조절
imageLabel.ScaleType = Enum.ScaleType.Fit  -- Fit, Crop, Stretch, Tile

-- 배경 투명
imageLabel.BackgroundTransparency = 1

imageLabel.Parent = screenGui
```

### 이미지 버튼

```lua
local imageButton = Instance.new("ImageButton")
imageButton.Size = UDim2.fromOffset(60, 60)
imageButton.Image = "rbxassetid://123456789"
imageButton.BackgroundTransparency = 1

-- 호버 효과
imageButton.HoverImage = "rbxassetid://987654321"
imageButton.PressedImage = "rbxassetid://111111111"

imageButton.MouseButton1Click:Connect(function()
    print("이미지 버튼 클릭!")
end)
```

### 아이콘 버튼 예제

```lua
local function createIconButton(iconId, callback)
    local button = Instance.new("ImageButton")
    button.Size = UDim2.fromOffset(50, 50)
    button.Image = iconId
    button.BackgroundColor3 = Color3.fromRGB(60, 60, 60)

    local corner = Instance.new("UICorner")
    corner.CornerRadius = UDim.new(0, 10)
    corner.Parent = button

    -- 호버 효과
    button.MouseEnter:Connect(function()
        button.BackgroundColor3 = Color3.fromRGB(80, 80, 80)
    end)

    button.MouseLeave:Connect(function()
        button.BackgroundColor3 = Color3.fromRGB(60, 60, 60)
    end)

    button.MouseButton1Click:Connect(callback)

    return button
end

-- 사용
local settingsBtn = createIconButton("rbxassetid://설정아이콘", function()
    print("설정 열기")
end)
```

## ViewportFrame (3D 미리보기)

게임 오브젝트를 UI에 3D로 표시:

```lua
local viewportFrame = Instance.new("ViewportFrame")
viewportFrame.Size = UDim2.fromOffset(200, 200)
viewportFrame.Position = UDim2.fromScale(0.5, 0.5)
viewportFrame.AnchorPoint = Vector2.new(0.5, 0.5)
viewportFrame.BackgroundColor3 = Color3.fromRGB(30, 30, 30)

-- 카메라 설정
local camera = Instance.new("Camera")
camera.CFrame = CFrame.new(Vector3.new(0, 2, 5), Vector3.new(0, 0, 0))
viewportFrame.CurrentCamera = camera
camera.Parent = viewportFrame

-- 모델 복제해서 표시
local itemModel = game.ReplicatedStorage.Items.Sword:Clone()
itemModel.Parent = viewportFrame

viewportFrame.Parent = screenGui

-- 회전 애니메이션
local angle = 0
game:GetService("RunService").RenderStepped:Connect(function(dt)
    angle = angle + dt * 30
    itemModel:SetPrimaryPartCFrame(CFrame.Angles(0, math.rad(angle), 0))
end)
```

## 연습 문제

:::note 실습해보기
1. **스크롤 목록**
   - ScrollingFrame으로 30개 아이템 목록 생성
   - UIListLayout으로 정렬
   - 자동 캔버스 크기 설정

2. **로그인 폼**
   - 이름, 비밀번호 TextBox 생성
   - 로그인 버튼 추가
   - 입력 검증 구현

3. **아이템 카드**
   - 이미지 + 이름 + 설명이 있는 카드 UI
   - 클릭하면 상세 정보 표시
:::

## 다음 단계

고급 UI 컴포넌트를 마스터했나요? 다음으로 [UI 애니메이션](/curriculum/week-16-18/ui-animation)에서 부드러운 애니메이션을 배울 거예요!
