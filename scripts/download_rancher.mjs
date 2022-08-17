import path from 'path';
import os from 'os';
import fs from 'fs';
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

console.log(`The file to be installed is from: ${installMacLink}`);

const basename = path.basename(installMacLink);

const workDir = fs.mkdtempSync(path.join(os.tmpdir(), 'app-download'));
//try {
  const destPath = path.join(workDir, basename);
  download(installMacLink, destPath, { overwrite: true });
//} finally {
  // clean up the temporary directory and everything in it
  //fs.rmSync(workDir, { recursive: true });
//}
