// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'intro',
    {
      type: 'category',
      label: 'Agent',
      collapsed: false,
      items: ['agent/overview', 'agent/install', 'agent/service', 'agent/privileged', 'agent/updates', 'agent/troubleshooting'],
    },
    'cli',
    {
      type: 'category',
      label: 'Guides',
      collapsed: false,
      items: [
        'guides/tunnels',
        'guides/migrations',
        'guides/ai',
        'guides/web-terminal',
        'guides/sharing',
      ],
    },
    'security',
    'api',
  ],
};

export default sidebars;
