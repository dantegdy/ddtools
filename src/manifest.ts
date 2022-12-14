import packageJson from '../package.json';
import { ManifestType } from '@src/manifest-type';
const manifest: ManifestType = {
  manifest_version: 3,
  name: packageJson.cname,
  version: packageJson.version,
  description: packageJson.description,
  background: { service_worker: 'src/pages/background/index.js', type: 'module' },
  action: {
    default_popup: 'src/pages/popup/index.html',
    default_icon: 'notice_avatar.png',
  },
  permissions: ['storage', 'activeTab', 'scripting'],
  icons: {
    '128': 'notice_avatar.png',
  },
  content_scripts: [
    {
      matches: ['https://y.tuwan.com/*', 'http://y.tuwan.com/*'],
      // matches: ['http://*/*', 'https://*/*', '<all_urls>'],
      js: ['src/pages/content/index.js'],
      // css: ["assets/css/contentStyle.chunk.css"],
    },
  ],
  web_accessible_resources: [
    {
      resources: ['assets/js/*.js', 'assets/css/*.css', 'notice_avatar.png', '.png'],
      matches: ['*://*/*'],
    },
  ],
};

export default manifest;
