---
sidebar_position: 3
---

# UI 애니메이션

**TweenService**로 부드러운 UI 애니메이션을 만들어봐요! 전문적인 게임처럼 보이게 됩니다.

## 학습 목표

- TweenService의 사용법을 익힌다
- 다양한 Easing 스타일을 활용할 수 있다
- 실전 UI 애니메이션을 구현할 수 있다

## TweenService 기초

### 기본 구조

```lua
local TweenService = game:GetService("TweenService")

-- 1. TweenInfo 생성
local tweenInfo = TweenInfo.new(
    1,                              -- 시간 (초)
    Enum.EasingStyle.Quad,          -- 이징 스타일
    Enum.EasingDirection.Out,       -- 이징 방향
    0,                              -- 반복 횟수 (0 = 반복 안함)
    false,                          -- 역재생 여부
    0                               -- 딜레이 (초)
)

-- 2. 목표 속성
local goal = {
    Position = UDim2.fromScale(0.5, 0.5),
    BackgroundTransparency = 0
}

-- 3. Tween 생성 및 재생
local tween = TweenService:Create(frame, tweenInfo, goal)
tween:Play()
```

### TweenInfo 파라미터

| 파라미터 | 설명 | 기본값 |
|---------|------|--------|
| time | 애니메이션 시간 | 1 |
| easingStyle | 이징 스타일 | Quad |
| easingDirection | 이징 방향 | Out |
| repeatCount | 반복 횟수 (-1 = 무한) | 0 |
| reverses | 역재생 여부 | false |
| delayTime | 시작 전 대기 | 0 |

## Easing 스타일

### 자주 사용하는 스타일

```lua
-- 부드러운 시작/끝
Enum.EasingStyle.Quad
Enum.EasingStyle.Sine

-- 탄력 있는 움직임
Enum.EasingStyle.Back
Enum.EasingStyle.Elastic

-- 튕기는 효과
Enum.EasingStyle.Bounce

-- 일정한 속도
Enum.EasingStyle.Linear

-- 빠른 가속
Enum.EasingStyle.Exponential
```

### Easing 방향

```lua
Enum.EasingDirection.In    -- 천천히 시작
Enum.EasingDirection.Out   -- 천천히 끝남
Enum.EasingDirection.InOut -- 양쪽 다 천천히
```

## 실전 애니메이션 예제

### 페이드 인/아웃

```lua
local function fadeIn(guiObject, duration)
    guiObject.BackgroundTransparency = 1

    local tween = TweenService:Create(
        guiObject,
        TweenInfo.new(duration or 0.3, Enum.EasingStyle.Quad),
        {BackgroundTransparency = 0}
    )
    tween:Play()
    return tween
end

local function fadeOut(guiObject, duration)
    local tween = TweenService:Create(
        guiObject,
        TweenInfo.new(duration or 0.3, Enum.EasingStyle.Quad),
        {BackgroundTransparency = 1}
    )
    tween:Play()
    return tween
end
```

### 슬라이드 인/아웃

```lua
local function slideIn(guiObject, direction, duration)
    local startPos, endPos

    if direction == "left" then
        startPos = UDim2.new(-0.5, 0, 0.5, 0)
        endPos = UDim2.new(0.5, 0, 0.5, 0)
    elseif direction == "right" then
        startPos = UDim2.new(1.5, 0, 0.5, 0)
        endPos = UDim2.new(0.5, 0, 0.5, 0)
    elseif direction == "top" then
        startPos = UDim2.new(0.5, 0, -0.5, 0)
        endPos = UDim2.new(0.5, 0, 0.5, 0)
    elseif direction == "bottom" then
        startPos = UDim2.new(0.5, 0, 1.5, 0)
        endPos = UDim2.new(0.5, 0, 0.5, 0)
    end

    guiObject.Position = startPos
    guiObject.Visible = true

    local tween = TweenService:Create(
        guiObject,
        TweenInfo.new(duration or 0.5, Enum.EasingStyle.Back, Enum.EasingDirection.Out),
        {Position = endPos}
    )
    tween:Play()
    return tween
end
```

### 스케일 애니메이션 (팝업)

```lua
local function popIn(guiObject, duration)
    guiObject.Size = UDim2.fromScale(0, 0)
    guiObject.Visible = true

    local targetSize = UDim2.fromScale(0.3, 0.4)  -- 원래 크기

    local tween = TweenService:Create(
        guiObject,
        TweenInfo.new(duration or 0.3, Enum.EasingStyle.Back, Enum.EasingDirection.Out),
        {Size = targetSize}
    )
    tween:Play()
    return tween
end

local function popOut(guiObject, duration)
    local tween = TweenService:Create(
        guiObject,
        TweenInfo.new(duration or 0.2, Enum.EasingStyle.Back, Enum.EasingDirection.In),
        {Size = UDim2.fromScale(0, 0)}
    )
    tween:Play()
    tween.Completed:Connect(function()
        guiObject.Visible = false
    end)
    return tween
end
```

### 버튼 호버 효과

```lua
local function setupButtonHover(button)
    local originalSize = button.Size
    local hoverSize = UDim2.new(
        originalSize.X.Scale * 1.1,
        originalSize.X.Offset,
        originalSize.Y.Scale * 1.1,
        originalSize.Y.Offset
    )

    button.MouseEnter:Connect(function()
        TweenService:Create(
            button,
            TweenInfo.new(0.15, Enum.EasingStyle.Quad),
            {Size = hoverSize}
        ):Play()
    end)

    button.MouseLeave:Connect(function()
        TweenService:Create(
            button,
            TweenInfo.new(0.15, Enum.EasingStyle.Quad),
            {Size = originalSize}
        ):Play()
    end)
end
```

### 버튼 클릭 효과

```lua
local function setupButtonClick(button)
    local originalColor = button.BackgroundColor3
    local clickColor = Color3.fromRGB(255, 255, 255)

    button.MouseButton1Down:Connect(function()
        TweenService:Create(
            button,
            TweenInfo.new(0.1),
            {
                BackgroundColor3 = clickColor,
                Size = button.Size - UDim2.fromOffset(4, 4)
            }
        ):Play()
    end)

    button.MouseButton1Up:Connect(function()
        TweenService:Create(
            button,
            TweenInfo.new(0.1),
            {
                BackgroundColor3 = originalColor,
                Size = button.Size + UDim2.fromOffset(4, 4)
            }
        ):Play()
    end)
end
```

## 연속 애니메이션

### Tween 체이닝

```lua
local function chainedAnimation(frame)
    -- 1단계: 나타나기
    frame.BackgroundTransparency = 1
    frame.Position = UDim2.fromScale(0.5, -0.5)
    frame.Visible = true

    local tween1 = TweenService:Create(
        frame,
        TweenInfo.new(0.3, Enum.EasingStyle.Quad),
        {Position = UDim2.fromScale(0.5, 0.5), BackgroundTransparency = 0}
    )

    -- 2단계: 크기 변화
    local tween2 = TweenService:Create(
        frame,
        TweenInfo.new(0.2, Enum.EasingStyle.Back),
        {Size = UDim2.fromScale(0.35, 0.45)}
    )

    -- 3단계: 원래 크기로
    local tween3 = TweenService:Create(
        frame,
        TweenInfo.new(0.15, Enum.EasingStyle.Quad),
        {Size = UDim2.fromScale(0.3, 0.4)}
    )

    -- 체이닝
    tween1:Play()
    tween1.Completed:Connect(function()
        tween2:Play()
    end)
    tween2.Completed:Connect(function()
        tween3:Play()
    end)
end
```

### 여러 요소 순차 애니메이션

```lua
local function staggeredAnimation(elements, delay)
    for i, element in ipairs(elements) do
        task.delay((i - 1) * (delay or 0.1), function()
            element.Position = element.Position - UDim2.fromOffset(0, 20)
            element.BackgroundTransparency = 1

            TweenService:Create(
                element,
                TweenInfo.new(0.3, Enum.EasingStyle.Back, Enum.EasingDirection.Out),
                {
                    Position = element.Position + UDim2.fromOffset(0, 20),
                    BackgroundTransparency = 0
                }
            ):Play()
        end)
    end
end
```

## 무한 반복 애니메이션

### 깜빡이는 효과

```lua
local function pulseAnimation(guiObject)
    local tween = TweenService:Create(
        guiObject,
        TweenInfo.new(
            0.5,
            Enum.EasingStyle.Sine,
            Enum.EasingDirection.InOut,
            -1,  -- 무한 반복
            true -- 역재생
        ),
        {BackgroundTransparency = 0.5}
    )
    tween:Play()
    return tween
end
```

### 회전 애니메이션

```lua
local function rotateAnimation(guiObject)
    local tween = TweenService:Create(
        guiObject,
        TweenInfo.new(2, Enum.EasingStyle.Linear, Enum.EasingDirection.In, -1),
        {Rotation = 360}
    )
    tween:Play()
    return tween
end
```

## 연습 문제

:::note 실습해보기
1. **팝업 메뉴**
   - 버튼 클릭 시 메뉴가 팝업으로 나타남
   - 닫기 버튼 클릭 시 사라짐
   - Back 이징 스타일 사용

2. **알림 토스트**
   - 화면 상단에서 슬라이드로 나타남
   - 3초 후 자동으로 사라짐
   - 여러 알림 순차 표시

3. **로딩 스피너**
   - 무한 회전하는 로딩 아이콘
   - 로딩 완료 시 페이드 아웃

4. **메뉴 버튼들**
   - 5개 버튼이 순차적으로 나타남
   - 각 버튼에 호버 효과 적용
:::

## 6단계 완료!

축하해요! 6단계를 모두 마쳤어요. 이제:
- ✅ 전문적인 UI 레이아웃 구성
- ✅ 다양한 입력 컴포넌트 활용
- ✅ 부드러운 애니메이션 구현

**18주 커리큘럼을 모두 완료했습니다!** 🎉

이제 여러분은 로블록스 게임 개발의 전문가예요!
