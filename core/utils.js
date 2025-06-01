import fs from 'fs';

export function loadCookie() {
  return fs.readFileSync('./data/cookie.txt', 'utf-8').trim();
}

export function saveToken(token) {
  fs.writeFileSync('./data/token.txt', token);
  console.log('[+] Token saved to token.txt');
}

export function log(msg) {
  console.log(`[LOG] ${msg}`);
}

export function writeLog(content) {
  const logPath = './data/reaction_log.txt';
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] ${content}\n`;
  fs.appendFileSync(logPath, logLine);
}
