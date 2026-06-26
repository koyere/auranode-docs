// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'AuraNode Docs',
  tagline: 'Multi-server control with a lightweight agent — live metrics, web terminal, secure tunnels, server-to-server migrations and AI.',
  favicon: 'img/auranode-favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://docs.auranode.app',
  baseUrl: '/',

  organizationName: 'koyere',
  projectName: 'auranode-docs',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          // Serve the docs at the site root (docs.auranode.app/...).
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/koyere/auranode-docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/auranode-social-card.png',
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'AuraNode Docs',
        logo: {
          alt: 'AuraNode',
          src: 'img/auranode-mark.svg',
          srcDark: 'img/auranode-mark-dark.svg',
          width: 28,
          height: 28,
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docs',
            position: 'left',
            label: 'Docs',
          },
          {href: 'https://auranode.app', label: 'Website', position: 'right'},
          {href: 'https://panel.auranode.app', label: 'Panel', position: 'right'},
          {
            href: 'https://github.com/koyere/auranode-agent',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {label: 'Getting started', to: '/'},
              {label: 'Install the agent', to: '/agent/install'},
              {label: 'CLI', to: '/cli'},
              {label: 'REST API', to: '/api'},
            ],
          },
          {
            title: 'Open source',
            items: [
              {label: 'Agent on GitHub', href: 'https://github.com/koyere/auranode-agent'},
              {label: 'CLI on GitHub', href: 'https://github.com/koyere/auranode-cli'},
            ],
          },
          {
            title: 'AuraNode',
            items: [
              {label: 'Website', href: 'https://auranode.app'},
              {label: 'Panel', href: 'https://panel.auranode.app'},
              {label: 'Status', href: 'https://status.auranode.app'},
              {label: 'Security', href: 'https://auranode.app/en/security'},
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} AuraNode.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'json', 'go'],
      },
    }),
};

export default config;
