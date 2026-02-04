---
sidebar_position: 2
---

# 사운드 & 파티클 효과

게임에 **소리**와 **시각 효과**를 추가하면 훨씬 재미있어져요! 코인 먹을 때 효과음, 폭발할 때 파티클 등을 배워봐요.

## 학습 목표

- Sound 객체를 사용할 수 있다
- ParticleEmitter로 파티클 효과를 만들 수 있다
- Beam과 Trail로 선 효과를 만들 수 있다

## 사운드 (Sound)

### Sound 추가하기

1. 파트 또는 Workspace 선택
2. Insert Object → Sound
3. Properties에서 SoundId 설정

### SoundId 찾기

로블록스 라이브러리에서:
1. Toolbox 열기
2. Audio 탭 선택
3. 원하는 소리 검색
4. 에셋 ID 복사

```lua
sound.SoundId = "rbxassetid://123456789"
```

### 기본 Sound 속성

```lua
local sound = Instance.new("Sound")
sound.SoundId = "rbxassetid://123456789"  -- 사운드 ID
sound.Volume = 0.5        -- 볼륨 (0~1)
sound.PlaybackSpeed = 1   -- 재생 속도 (1 = 기본)
sound.Looped = false      -- 반복 재생 여부
sound.Parent = workspace  -- 위치
```

### 사운드 재생하기

```lua
-- 한 번 재생
sound:Play()

-- 정지
sound:Stop()

-- 일시정지
sound:Pause()

-- 재개
sound:Resume()
```

### 3D 사운드 (위치 기반)

파트 안에 Sound를 넣으면 3D 사운드가 됩니다:

```lua
local part = workspace.SoundPart
local sound = Instance.new("Sound")
sound.SoundId = "rbxassetid://123456789"
sound.RollOffMaxDistance = 50   -- 들리는 최대 거리
sound.RollOffMinDistance = 10   -- 볼륨 감소 시작 거리
sound.Parent = part

sound:Play()  -- 파트 근처에서만 들림!
```

### 효과음 함수 만들기

```lua
local function playSound(soundId, parent, volume)
    local sound = Instance.new("Sound")
    sound.SoundId = soundId
    sound.Volume = volume or 0.5
    sound.Parent = parent or workspace

    sound:Play()

    -- 재생 끝나면 자동 삭제
    sound.Ended:Connect(function()
        sound:Destroy()
    end)
end

-- 사용
playSound("rbxassetid://코인소리", coinPart, 0.8)
```

### 코인 수집 효과음

```lua
local coin = script.Parent
local collectSound = "rbxassetid://6895079853"  -- 예시 ID

coin.Touched:Connect(function(hit)
    local player = game.Players:GetPlayerFromCharacter(hit.Parent)

    if player then
        -- 효과음 재생
        local sound = Instance.new("Sound")
        sound.SoundId = collectSound
        sound.Parent = workspace
        sound:Play()

        -- 코인 제거
        coin:Destroy()

        -- 사운드 정리
        sound.Ended:Wait()
        sound:Destroy()
    end
end)
```

## 파티클 (ParticleEmitter)

### ParticleEmitter 추가하기

1. 파트 선택
2. Insert Object → ParticleEmitter
3. 속성 조절

### 기본 속성

```lua
local particle = Instance.new("ParticleEmitter")
particle.Parent = part

-- 파티클 이미지
particle.Texture = "rbxassetid://123456789"

-- 발사 설정
particle.Rate = 20           -- 초당 파티클 수
particle.Lifetime = NumberRange.new(1, 2)  -- 수명 (초)
particle.Speed = NumberRange.new(5, 10)    -- 속도

-- 크기
particle.Size = NumberSequence.new({
    NumberSequenceKeypoint.new(0, 1),    -- 시작 크기
    NumberSequenceKeypoint.new(1, 0),    -- 끝 크기
})

-- 투명도
particle.Transparency = NumberSequence.new({
    NumberSequenceKeypoint.new(0, 0),    -- 시작 (불투명)
    NumberSequenceKeypoint.new(1, 1),    -- 끝 (투명)
})
```

### 색상 설정

```lua
-- 단일 색상
particle.Color = ColorSequence.new(Color3.fromRGB(255, 200, 0))

-- 그라데이션
particle.Color = ColorSequence.new({
    ColorSequenceKeypoint.new(0, Color3.fromRGB(255, 255, 0)),   -- 시작: 노랑
    ColorSequenceKeypoint.new(1, Color3.fromRGB(255, 100, 0)),   -- 끝: 주황
})
```

### 방향과 퍼짐

```lua
particle.EmissionDirection = Enum.NormalId.Top  -- 위로 발사
particle.SpreadAngle = Vector2.new(30, 30)      -- 퍼지는 각도
```

### 파티클 활성화/비활성화

```lua
-- 파티클 켜기
particle.Enabled = true

-- 파티클 끄기
particle.Enabled = false

-- 한 번만 발사 (burst)
particle:Emit(50)  -- 50개 파티클 한번에
```

## 프리셋 파티클 효과

### 불꽃 효과

```lua
local function createFire(part)
    local fire = Instance.new("ParticleEmitter")
    fire.Texture = "rbxassetid://243660364"
    fire.Rate = 50
    fire.Lifetime = NumberRange.new(0.5, 1)
    fire.Speed = NumberRange.new(3, 5)
    fire.SpreadAngle = Vector2.new(15, 15)
    fire.EmissionDirection = Enum.NormalId.Top

    fire.Size = NumberSequence.new({
        NumberSequenceKeypoint.new(0, 2),
        NumberSequenceKeypoint.new(1, 0),
    })

    fire.Color = ColorSequence.new({
        ColorSequenceKeypoint.new(0, Color3.fromRGB(255, 200, 0)),
        ColorSequenceKeypoint.new(0.5, Color3.fromRGB(255, 100, 0)),
        ColorSequenceKeypoint.new(1, Color3.fromRGB(100, 0, 0)),
    })

    fire.LightEmission = 1
    fire.Parent = part

    return fire
end
```

### 폭발 효과

```lua
local function createExplosion(position)
    local part = Instance.new("Part")
    part.Anchored = true
    part.CanCollide = false
    part.Transparency = 1
    part.Position = position
    part.Parent = workspace

    local explosion = Instance.new("ParticleEmitter")
    explosion.Texture = "rbxassetid://243660364"
    explosion.Rate = 0  -- 자동 발사 안 함
    explosion.Lifetime = NumberRange.new(0.5, 1)
    explosion.Speed = NumberRange.new(20, 40)
    explosion.SpreadAngle = Vector2.new(180, 180)  -- 모든 방향

    explosion.Size = NumberSequence.new({
        NumberSequenceKeypoint.new(0, 3),
        NumberSequenceKeypoint.new(1, 0),
    })

    explosion.Color = ColorSequence.new({
        ColorSequenceKeypoint.new(0, Color3.fromRGB(255, 255, 0)),
        ColorSequenceKeypoint.new(1, Color3.fromRGB(255, 50, 0)),
    })

    explosion.Parent = part

    -- 폭발!
    explosion:Emit(100)

    -- 폭발음
    local sound = Instance.new("Sound")
    sound.SoundId = "rbxassetid://폭발음ID"
    sound.Parent = part
    sound:Play()

    -- 정리
    task.delay(2, function()
        part:Destroy()
    end)
end
```

### 반짝이 효과

```lua
local function createSparkle(part)
    local sparkle = Instance.new("ParticleEmitter")
    sparkle.Texture = "rbxassetid://2273224484"
    sparkle.Rate = 10
    sparkle.Lifetime = NumberRange.new(1, 2)
    sparkle.Speed = NumberRange.new(0, 2)
    sparkle.SpreadAngle = Vector2.new(360, 360)

    sparkle.Size = NumberSequence.new({
        NumberSequenceKeypoint.new(0, 0),
        NumberSequenceKeypoint.new(0.5, 1),
        NumberSequenceKeypoint.new(1, 0),
    })

    sparkle.Transparency = NumberSequence.new({
        NumberSequenceKeypoint.new(0, 1),
        NumberSequenceKeypoint.new(0.5, 0),
        NumberSequenceKeypoint.new(1, 1),
    })

    sparkle.LightEmission = 1
    sparkle.Parent = part

    return sparkle
end
```

## Trail (궤적 효과)

캐릭터나 물체 뒤에 남는 선 효과:

```lua
-- Attachment 2개 필요
local attachment0 = Instance.new("Attachment")
attachment0.Position = Vector3.new(0, 1, 0)
attachment0.Parent = part

local attachment1 = Instance.new("Attachment")
attachment1.Position = Vector3.new(0, -1, 0)
attachment1.Parent = part

-- Trail 생성
local trail = Instance.new("Trail")
trail.Attachment0 = attachment0
trail.Attachment1 = attachment1
trail.Lifetime = 0.5
trail.FaceCamera = true

trail.Color = ColorSequence.new({
    ColorSequenceKeypoint.new(0, Color3.fromRGB(0, 200, 255)),
    ColorSequenceKeypoint.new(1, Color3.fromRGB(100, 0, 255)),
})

trail.Transparency = NumberSequence.new({
    NumberSequenceKeypoint.new(0, 0),
    NumberSequenceKeypoint.new(1, 1),
})

trail.Parent = part
```

## 조명 효과

### PointLight

```lua
local light = Instance.new("PointLight")
light.Brightness = 2
light.Range = 20
light.Color = Color3.fromRGB(255, 200, 100)
light.Parent = part
```

### SpotLight

```lua
local spotlight = Instance.new("SpotLight")
spotlight.Brightness = 5
spotlight.Range = 30
spotlight.Angle = 45
spotlight.Face = Enum.NormalId.Front
spotlight.Parent = part
```

## 연습 문제

:::note 실습해보기
1. **코인 효과**
   - 코인 수집 시 효과음 재생
   - 반짝이 파티클 추가
   - 수집하면 파티클 burst 후 사라짐

2. **불 파트**
   - 파트에 불꽃 파티클 추가
   - 타닥타닥 소리 반복 재생
   - PointLight로 빛나게

3. **스피드 부스터**
   - 밟으면 Trail이 캐릭터에 추가
   - 부스트 소리 재생
   - 5초 후 Trail 제거

4. **폭발 버튼**
   - 버튼 클릭 시 폭발 효과
   - 파티클 + 소리 + 빛 조합
:::

## 다음 단계

사운드와 파티클을 마스터했나요? 다음으로 [애니메이션](/curriculum/week-19-21/animation)에서 캐릭터 애니메이션을 만드는 방법을 배울 거예요!
