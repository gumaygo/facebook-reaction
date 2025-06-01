import fs from 'fs';
import { sendReaction } from './sendReaction.js';
import { log } from '../core/utils.js';

const reactionList = ['LIKE', 'LOVE', 'HAHA', 'WOW', 'SAD', 'ANGRY', 'CARE'];

function randomReaction() {
  return reactionList[Math.floor(Math.random() * reactionList.length)];
}

export async function batchReaction(videoId, delayMs = 2000) {
  const tokens = JSON.parse(fs.readFileSync('./data/tokens.json', 'utf-8'));

  for (const user of tokens) {
    const { name, token } = user;
    const reaction = randomReaction();
    log(`🚀 Kirim reaction [${reaction}] dari ${name}`);
    await sendReaction(token, videoId, reaction);
    await new Promise(resolve => setTimeout(resolve, delayMs));
  }

  log('✅ Semua reaction sudah dikirim!');
}
