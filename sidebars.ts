import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  curriculumSidebar: [
    'intro',
    {
      type: 'category',
      label: '1단계: 스튜디오 기초 (1-3주차)',
      items: [
        'curriculum/week-01-03/studio-setup',
        'curriculum/week-01-03/parts-and-tools',
        'curriculum/week-01-03/terrain',
      ],
    },
    {
      type: 'category',
      label: '2단계: 루아 기초 (4-6주차)',
      items: [
        'curriculum/week-04-06/first-script',
        'curriculum/week-04-06/variables',
        'curriculum/week-04-06/functions',
      ],
    },
    {
      type: 'category',
      label: '3단계: 이벤트/조건문 (7-9주차)',
      items: [
        'curriculum/week-07-09/server-client',
        'curriculum/week-07-09/events',
        'curriculum/week-07-09/loops',
        'curriculum/week-07-09/humanoid',
      ],
    },
    {
      type: 'category',
      label: '4단계: 시스템 구축 (10-12주차)',
      items: [
        'curriculum/week-10-12/leaderboard',
        'curriculum/week-10-12/gui',
        'curriculum/week-10-12/publish',
      ],
    },
    {
      type: 'category',
      label: '5단계: 외부 에디터 연동 (13-15주차)',
      items: [
        'curriculum/week-13-15/rojo-intro',
        'curriculum/week-13-15/rojo-sync',
        'curriculum/week-13-15/git-workflow',
      ],
    },
    {
      type: 'category',
      label: '6단계: GUI 만들기 (16-18주차)',
      items: [
        'curriculum/week-16-18/gui-basics',
        'curriculum/week-16-18/advanced-components',
        'curriculum/week-16-18/ui-animation',
      ],
    },
    {
      type: 'category',
      label: '7단계: 데이터 저장 & 효과 (19-21주차)',
      items: [
        'curriculum/week-19-21/datastore',
        'curriculum/week-19-21/sound-particles',
        'curriculum/week-19-21/animation',
      ],
    },
    {
      type: 'category',
      label: '8단계: 게임 장르 만들기 (22-24주차)',
      items: [
        'curriculum/week-22-24/obby',
        'curriculum/week-22-24/tycoon',
        'curriculum/week-22-24/simulator',
      ],
    },
    {
      type: 'category',
      label: '9단계: 블렌더 기초 (25-27주차)',
      items: [
        'curriculum/week-25-27/blender-setup',
        'curriculum/week-25-27/viewport-navigation',
        'curriculum/week-25-27/basic-objects',
      ],
    },
    {
      type: 'category',
      label: '10단계: 블렌더 3D 모델링 (28-30주차)',
      items: [
        'curriculum/week-28-30/modeling-for-roblox',
        'curriculum/week-28-30/uv-mapping',
        'curriculum/week-28-30/texturing',
      ],
    },
    {
      type: 'category',
      label: '11단계: 블렌더 → 로블록스 연동 (31-33주차)',
      items: [
        'curriculum/week-31-33/mesh-export',
        'curriculum/week-31-33/rigging',
        'curriculum/week-31-33/blender-animation',
      ],
    },
  ],
  projectsSidebar: [
    {
      type: 'category',
      label: '프로젝트',
      items: [
        'projects/kill-part',
        'projects/leaderboard',
        'projects/proximity-prompt',
      ],
    },
  ],
  referenceSidebar: [
    {
      type: 'category',
      label: '레퍼런스',
      items: [
        'reference/entry-to-lua',
        'reference/debugging',
      ],
    },
    'glossary',
  ],
};

export default sidebars;
