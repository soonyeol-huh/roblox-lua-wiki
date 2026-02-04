---
sidebar_position: 1
---

# Rojo 소개 및 설치

**Rojo**는 로블록스 스튜디오와 외부 코드 에디터(VS Code 등)를 연결해주는 도구예요. 전문 개발자들이 사용하는 방식으로 코딩할 수 있어요!

## 학습 목표

- Rojo의 필요성을 이해한다
- Rojo와 VS Code를 설치할 수 있다
- 기본적인 Rojo 프로젝트를 설정할 수 있다

## 왜 Rojo를 사용할까?

### 로블록스 스튜디오의 한계

| 스튜디오 에디터 | 외부 에디터 (VS Code) |
|---------------|---------------------|
| 기본적인 자동완성 | 강력한 자동완성 (IntelliSense) |
| 제한된 테마 | 다양한 테마와 커스터마이징 |
| 단일 파일 편집 | 여러 파일 동시 편집 |
| Git 사용 어려움 | Git 버전 관리 쉬움 |
| 확장 기능 없음 | 수천 개의 확장 기능 |

### Rojo의 장점

```
✅ VS Code의 강력한 기능 사용
✅ Git으로 코드 버전 관리
✅ 팀 협업이 쉬워짐
✅ 코드 재사용성 향상
✅ 전문 개발자처럼 작업
```

## VS Code 설치하기

### 1단계: 다운로드

1. https://code.visualstudio.com 접속
2. 운영체제에 맞는 버전 다운로드
3. 설치 진행

### 2단계: 한국어 설정

1. VS Code 실행
2. 왼쪽 사이드바에서 Extensions (확장) 클릭
3. "Korean Language Pack" 검색
4. 설치 후 VS Code 재시작

### 3단계: Lua 확장 설치

Extensions에서 다음을 검색하여 설치:

- **Roblox LSP** - 로블록스 루아 자동완성
- **StyLua** - 코드 포맷터

## Rojo 설치하기

### 방법 1: Aftman 사용 (권장)

```bash
# Aftman 설치 (Rust 패키지 관리자)
# Windows: PowerShell에서
irm https://github.com/LPGhatguy/aftman/releases/latest/download/aftman-windows-x86_64.zip -OutFile aftman.zip

# Mac:
curl -L https://github.com/LPGhatguy/aftman/releases/latest/download/aftman-macos-x86_64.zip -o aftman.zip
```

### 방법 2: 직접 다운로드

1. https://github.com/rojo-rbx/rojo/releases 접속
2. 최신 버전 다운로드
3. 압축 해제 후 PATH에 추가

### Rojo 플러그인 설치

1. 로블록스 스튜디오 실행
2. Plugins 탭 → Manage Plugins
3. "Rojo" 검색 후 설치

## 첫 번째 Rojo 프로젝트

### 1단계: 프로젝트 폴더 생성

```bash
mkdir my-rojo-game
cd my-rojo-game
```

### 2단계: Rojo 초기화

```bash
rojo init
```

이 명령어가 생성하는 파일들:

```
my-rojo-game/
├── default.project.json    # Rojo 설정 파일
└── src/
    ├── server/            # 서버 스크립트
    ├── client/            # 클라이언트 스크립트
    └── shared/            # 공유 모듈
```

### 3단계: default.project.json 이해하기

```json
{
  "name": "my-rojo-game",
  "tree": {
    "$className": "DataModel",
    "ServerScriptService": {
      "$className": "ServerScriptService",
      "$path": "src/server"
    },
    "StarterPlayer": {
      "$className": "StarterPlayer",
      "StarterPlayerScripts": {
        "$className": "StarterPlayerScripts",
        "$path": "src/client"
      }
    },
    "ReplicatedStorage": {
      "$className": "ReplicatedStorage",
      "$path": "src/shared"
    }
  }
}
```

| 키 | 설명 |
|-----|------|
| `name` | 프로젝트 이름 |
| `tree` | 게임 구조 정의 |
| `$className` | 로블록스 클래스 이름 |
| `$path` | 연결할 폴더 경로 |

## 연습 문제

:::note 실습해보기
1. **VS Code 설치**
   - VS Code를 다운로드하고 설치하세요
   - Korean Language Pack을 설치하세요
   - Roblox LSP 확장을 설치하세요

2. **Rojo 설치 확인**
   - 터미널에서 `rojo --version` 실행
   - 버전이 표시되면 성공!

3. **프로젝트 생성**
   - 새 폴더를 만들고 `rojo init` 실행
   - 생성된 파일들을 확인해보세요
:::

## 다음 단계

Rojo 설치를 완료했나요? 다음으로 [Rojo 동기화](/curriculum/week-13-15/rojo-sync)에서 실제로 코드를 동기화하는 방법을 배울 거예요!
