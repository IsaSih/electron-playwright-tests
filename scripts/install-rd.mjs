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

let output = 'string';
//step 2: install Rancher Desktop
try{
  await download(installMacLink, destPath, { overwrite: true });
  output = await execFileSync('open', [destPath], { encoding: 'utf-8'});
  const volume = output.toString().trim();
  console.log(`The output of this process is: ${volume}`);
  fs.rmSync(`/Applications/Rancher Desktop.app`, {
    force: true,
    recursive: true,
  });
  const appPath = '/Applications/Rancher Desktop.app';
  fs.mkdirSync(appPath);
  fs.cpSync(volume, appPath, { recursive: true });


      fs.promises.access(appPath, fs.constants.X_OK, fs.constants.R_OK)
        console.log('Rancher Desktop sucessfully installed!');
       // await execFileSync('open', [appPath], { encoding: 'utf-8'});

  //step 3: Get rdctl version

  //const output = exec('rdctl', ['version']);
  //console.log(output.stdout);
} catch (e) {
console.log('Error: ', e);

  //exec('rdctl version');


} finally {
 fs.rmSync(destPath, { recursive: true });
 fs.rmSync(workDir, { recursive: true });


 //fs.rmSync(appPath, {recursive:true});

}


