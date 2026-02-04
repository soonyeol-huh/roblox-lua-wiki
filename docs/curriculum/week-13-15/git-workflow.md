---
sidebar_position: 3
---

# Git 버전 관리

**Git**은 코드의 변경 이력을 관리하는 도구예요. 실수로 코드를 망쳐도 이전 버전으로 돌아갈 수 있어요!

## 학습 목표

- Git의 기본 개념을 이해한다
- 기본적인 Git 명령어를 사용할 수 있다
- GitHub에 프로젝트를 업로드할 수 있다

## Git이 필요한 이유

### Git 없이 개발하면...

```
my-game/
├── main_final.lua
├── main_final2.lua
├── main_final_real.lua
├── main_final_real_v2.lua
└── main_진짜최종.lua   😫
```

### Git으로 개발하면...

```
my-game/
└── main.lua   😊

Git이 모든 버전을 기억해요!
- 1시간 전 버전으로 돌아가기
- 누가 언제 수정했는지 확인
- 여러 기능을 동시에 개발
```

## Git 설치

### Windows

1. https://git-scm.com 접속
2. Windows용 다운로드
3. 설치 (기본 옵션 유지)

### Mac

```bash
# Homebrew로 설치
brew install git

# 또는 Xcode Command Line Tools
xcode-select --install
```

### 설치 확인

```bash
git --version
# git version 2.x.x 출력되면 성공!
```

## Git 초기 설정

```bash
# 이름 설정
git config --global user.name "내 이름"

# 이메일 설정
git config --global user.email "내이메일@example.com"
```

## 기본 Git 명령어

### 저장소 초기화

```bash
cd my-rojo-game
git init
```

### 현재 상태 확인

```bash
git status
```

출력 예시:
```
On branch main
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        default.project.json
        src/
```

### 파일 추가 (스테이징)

```bash
# 특정 파일 추가
git add default.project.json

# 모든 파일 추가
git add .
```

### 커밋 (저장)

```bash
git commit -m "첫 번째 커밋: 프로젝트 초기화"
```

:::tip 좋은 커밋 메시지
```
✅ "리더보드 시스템 추가"
✅ "킬 파트 버그 수정"
✅ "플레이어 속도 16에서 20으로 변경"

❌ "수정"
❌ "ㅇㅇ"
❌ "asdf"
```
:::

### 커밋 기록 보기

```bash
git log --oneline
```

출력 예시:
```
a1b2c3d 리더보드 시스템 추가
e4f5g6h 킬 파트 구현
i7j8k9l 첫 번째 커밋: 프로젝트 초기화
```

## .gitignore 설정

Git이 무시할 파일들을 지정:

```bash
# .gitignore 파일 생성
```

```gitignore
# Roblox 파일
*.rbxl
*.rbxlx
*.rbxm
*.rbxmx

# 빌드 결과물
/build

# 에디터 설정
.vscode/
*.sublime-*

# OS 파일
.DS_Store
Thumbs.db
```

## GitHub에 업로드

### 1단계: GitHub 저장소 생성

1. https://github.com 접속
2. New repository 클릭
3. 이름 입력 후 Create

### 2단계: 원격 저장소 연결

```bash
git remote add origin https://github.com/사용자명/저장소명.git
```

### 3단계: 푸시

```bash
git push -u origin main
```

## 이전 버전으로 돌아가기

### 특정 파일만 복원

```bash
# 마지막 커밋 상태로 복원
git checkout -- src/server/Main.server.lua
```

### 특정 커밋으로 이동

```bash
# 커밋 ID 확인
git log --oneline

# 해당 커밋으로 이동 (보기만)
git checkout a1b2c3d

# 다시 최신으로
git checkout main
```

## VS Code에서 Git 사용

VS Code는 Git을 시각적으로 사용할 수 있어요!

### Source Control 패널

1. 왼쪽 사이드바에서 Source Control 아이콘 클릭
2. 변경된 파일 목록 확인
3. + 버튼으로 스테이징
4. 메시지 입력 후 ✓ 버튼으로 커밋

### GitLens 확장 (추천)

- 각 줄의 마지막 수정자 표시
- 커밋 히스토리 시각화
- 파일 변경 비교

## 실전 워크플로우

```bash
# 1. 작업 시작 전 최신 코드 받기
git pull

# 2. 코드 작성...

# 3. 변경 사항 확인
git status

# 4. 변경 파일 추가
git add .

# 5. 커밋
git commit -m "새 기능: 상점 시스템"

# 6. GitHub에 푸시
git push
```

## 연습 문제

:::note 실습해보기
1. **Git 초기화**
   - Rojo 프로젝트에서 `git init` 실행
   - `.gitignore` 파일 생성
   - 첫 번째 커밋 만들기

2. **변경 이력 만들기**
   - 코드를 수정하고 커밋
   - 다시 수정하고 커밋
   - `git log`로 이력 확인

3. **GitHub 연동**
   - GitHub에 새 저장소 생성
   - 로컬 프로젝트 연결
   - 푸시 후 GitHub에서 확인
:::

## 5단계 완료!

축하해요! 5단계를 모두 마쳤어요. 이제:
- ✅ VS Code로 전문적인 개발 환경 구축
- ✅ Rojo로 실시간 코드 동기화
- ✅ Git으로 버전 관리

다음 [6단계: GUI 만들기](/curriculum/week-16-18/gui-basics)에서는 고급 UI를 만드는 방법을 배울 거예요!
