import fs from 'fs';
import { postComment } from './postComment.js';
import { log } from '../core/utils.js';

export async function batchComment(targetId, message, delayMs = 2000) {
  const tokens = JSON.parse(fs.readFileSync('./data/tokens.json', 'utf-8'));

  for (const user of tokens) {
    const { name, token } = user;
    log(`🚀 Kirim komentar dari ${name}`);
    await postComment(token, targetId, message);
    await new Promise(resolve => setTimeout(resolve, delayMs));
  }

  log('✅ Semua komentar sudah dikirim!');
}
