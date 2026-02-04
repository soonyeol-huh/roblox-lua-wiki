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
