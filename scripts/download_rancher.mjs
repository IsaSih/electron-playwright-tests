import path from 'path';
import os from 'os';
import fs from 'fs';
import fetch from 'node-fetch';
import { execFile, execFileSync } from 'child_process';
//import { stdout } from 'process';
import util from 'util';
import { download } from './lib/download.mjs';

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

try{
   await download(installMacLink, destPath, { overwrite: true });

  stdout = await execFileSync(
    'bash',
    ['-c', `hdiutil attach ${destPath} | grep Volumes | sed 's/^[^\t ]*[\t ]*[^\t ]*[\t ]*//'`],
    { encoding: 'utf-8' }
  );
  volume = stdout.toString().trim();
  console.log(volume);


  //await execFile('cp', ['-rf', `${volume}.app`, '/Applications']);
  //const appPath = path.join(`${volume}.app`);
  //console.log(appPath);

  //const rdVersion = new RegExp('Rancher Desktop [0-9.]+');
  //const matcher = volume.match(rdVersion);
  //console.log(matcher[0]);

  fs.rmSync(`/Applications/Rancher Desktop.app`, {
    force: true,
    recursive: true,
  });
  const appPath = '/Applications/Rancher Desktop.app';
  await execFile('bash', [ '-c', `cp -r '${volume}/Rancher Desktop.app' /Applications/`]);
  await execFile('bash', [ '-c', `cp -r '${volume}/Rancher Desktop.app' /Applications/`]);
  await execFile('bash', ['-c', `xattr -d -r com.apple.quarantine ${appPath}`]);
  fs.rmSync(volume, { recursive: true });
  try {
      fs.promises.access(`${appPath}`, fs.constants.X_OK, fs.constants.R_OK)
        console.log('Rancher Desktop sucessfully installed!');
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
//step 3: Run Rancher Desktop


//Get rdctl version

  //const output = exec('rdctl', ['version']);
  //console.log(output.stdout);

 //fs.rmSync(appPath, {recursive:true});
