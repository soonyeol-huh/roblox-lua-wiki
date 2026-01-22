# 로블록스 루아 교육 Wiki

초등학생을 위한 로블록스 루아 스크립트 학습 사이트입니다.

## 주요 기능

- 12주 커리큘럼 (스튜디오 기초 → 루아 기초 → 이벤트/조건문 → 시스템 구축)
- 3개의 실습 프로젝트 (킬 파트, 리더보드, 상점 시스템)
- 엔트리 → 루아 변환표
- 디버깅 가이드
- 용어집

## 기술 스택

- [Docusaurus 3](https://docusaurus.io/) - React 기반 문서 사이트 프레임워크
- TypeScript
- Lua 코드 구문 하이라이팅

## 설치

```bash
npm install
```

## 개발 서버 실행

```bash
npm run start
```

http://localhost:3000 에서 사이트를 확인할 수 있습니다.

## 빌드

```bash
npm run build
```

`build` 폴더에 정적 파일이 생성됩니다.

## 빌드된 사이트 미리보기

```bash
npm run serve
```

## 배포

### GitHub Pages

```bash
GIT_USER=<GitHub 사용자명> npm run deploy
```

### 기타 호스팅

`build` 폴더의 내용을 정적 호스팅 서비스에 업로드합니다.

## 프로젝트 구조

```
docs/
├── intro.md                    # 소개 페이지
├── curriculum/
│   ├── week-01-03/            # 1단계: 스튜디오 기초
│   ├── week-04-06/            # 2단계: 루아 기초
│   ├── week-07-09/            # 3단계: 이벤트/조건문
│   └── week-10-12/            # 4단계: 시스템 구축
├── projects/
│   ├── kill-part.md           # 킬 파트 프로젝트
│   ├── leaderboard.md         # 리더보드 프로젝트
│   └── proximity-prompt.md    # 상점 시스템 프로젝트
├── reference/
│   ├── entry-to-lua.md        # 엔트리→루아 변환표
│   └── debugging.md           # 디버깅 가이드
└── glossary.md                # 용어집
```

## 라이선스

MIT
