import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: '로블록스 루아 교육',
  tagline: '초등학생을 위한 로블록스 루아 스크립트 학습',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://roblox-lua-wiki.example.com',
  baseUrl: '/',

  organizationName: 'roblox-lua-edu',
  projectName: 'roblox-lua-wiki',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/roblox-lua-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: '로블록스 루아 교육',
      logo: {
        alt: '로블록스 루아 로고',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'curriculumSidebar',
          position: 'left',
          label: '커리큘럼',
        },
        {
          type: 'docSidebar',
          sidebarId: 'projectsSidebar',
          position: 'left',
          label: '프로젝트',
        },
        {
          type: 'docSidebar',
          sidebarId: 'referenceSidebar',
          position: 'left',
          label: '레퍼런스',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '커리큘럼',
          items: [
            {
              label: '1단계: 스튜디오 기초',
              to: '/curriculum/week-01-03/studio-setup',
            },
            {
              label: '2단계: 루아 기초',
              to: '/curriculum/week-04-06/first-script',
            },
            {
              label: '3단계: 이벤트/조건문',
              to: '/curriculum/week-07-09/events',
            },
            {
              label: '4단계: 시스템 구축',
              to: '/curriculum/week-10-12/leaderboard',
            },
          ],
        },
        {
          title: '프로젝트',
          items: [
            {
              label: '킬 파트',
              to: '/projects/kill-part',
            },
            {
              label: '리더보드',
              to: '/projects/leaderboard',
            },
            {
              label: '상점 시스템',
              to: '/projects/proximity-prompt',
            },
          ],
        },
        {
          title: '레퍼런스',
          items: [
            {
              label: '엔트리→루아 변환표',
              to: '/reference/entry-to-lua',
            },
            {
              label: '디버깅 가이드',
              to: '/reference/debugging',
            },
            {
              label: '용어집',
              to: '/glossary',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} 로블록스 루아 교육. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['lua'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
