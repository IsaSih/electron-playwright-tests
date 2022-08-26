import path from 'path';
import os from 'os';
import fs from 'fs';
import fetch from 'node-fetch';
import { execFileSync, execFile } from 'child_process';
import util from 'util';
import { download } from './lib/download.mjs';
import pkg from 'webpack';
import { exit } from 'process';

//step 1: download latest build of Rancher Desktop
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

const workDir = fs.mkdtempSync(path.join(os.tmpdir(), 'app-download'));
const basename = path.basename(installMacLink);
const destPath = path.join(workDir, basename);
console.log(destPath);

//step 2: install Rancher Desktop
let stdout = 'string';
let volume = '';
const appPath = '/Applications/Rancher Desktop.app';

try{
   await download(installMacLink, destPath, { overwrite: true });

   execFileSync('bash', ['-c', `rm -rf '${appPath}/'`]);

  stdout = await execFileSync(
    'bash',
    ['-c', `hdiutil attach ${destPath} | grep Volumes | sed 's/^[^\t ]*[\t ]*[^\t ]*[\t ]*//'`],
    { encoding: 'utf-8' }
  );
  volume = stdout.toString().trim();
  console.log(volume);

  //execFileSync('bash', ['-c', `rm -rf '${appPath}/'`]);
  execFileSync('bash', ['-c', `cp -r '${volume}/Rancher Desktop.app' /Applications/`]);

execFileSync('bash', [ '-c', `hdiutil detach '${volume}'`], { encoding: 'utf-8' });

execFileSync('bash', ['-c', `xattr -d -r com.apple.quarantine '${appPath}'`], { encoding: 'utf-8' });
//await util.promisify(setTimeout(() => {  execFileSync('bash', ['-c', `xattr -d -r com.apple.quarantine '${appPath}'`], { encoding: 'utf-8' }); }, 70000));

fs.rmSync(volume, { recursive: true, force: true });

  try {
    fs.promises.access(`${appPath}`, fs.constants.X_OK, fs.constants.R_OK);
        console.log('Rancher Desktop sucessfully installed!');
        // step 3: Run Rancher Desktop
        execFileSync('bash', [ '-c',`open '${appPath}'`], { encoding: 'utf-8' });
        console.log(execFileSync('bash', [ '-c','rdctl version'], { encoding: 'utf-8' }));
    }
    catch (error) {
      throw error;
    }
} catch (e) {
console.log('Error: ', e);

} finally {
 fs.rmSync(destPath, { recursive: true });
 fs.rmSync(workDir, { recursive: true });

}
