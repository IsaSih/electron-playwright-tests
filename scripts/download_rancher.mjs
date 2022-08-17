import path from 'path';

import fetch from 'node-fetch';

import { download } from './lib/download.mjs';


const response = await fetch('https://rancherdesktop.io/');
  const rdHtml = await response.text();
  // eslint-disable-next-line
  const pattern = new RegExp('https:\/\/github\.com\/rancher-sandbox\/rancher-desktop\/releases\/download\/v[0-9.]+\/Rancher\.Desktop-[0-9.]+\.x86_64\.dmg');
  const match = rdHtml.match(pattern);
if (!match) {
  throw new Error(`Can't find ${ pattern } in ${ rdHtml }`);
}
const installMacLink = match[0];
console.log(match[0]);
console.log(installMacLink);
console.log(typeof installMacLink);

const basename = path.basename(installMacLink);

download(installMacLink, `/Users/isasih/Downloads/${ basename }`, { overwrite: true });
