import { getToken } from './core/fetchToken.js';
import { sendReaction } from './actions/sendReaction.js';
import { batchReaction } from './actions/batchReaction.js';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

(async () => {
  console.log('🔥 Facebook Automation Tool');
  console.log('[1] Get Token from Cookie');
  console.log('[2] Send Reaction (1 Akun)');
  console.log('[3] Batch Reaction (Multi-Akun, Random Reaction)');

  rl.question('Pilih menu: ', async (menu) => {
    if (menu === '1') {
      await getToken();
      rl.close();
    } else if (menu === '2') {
      rl.question('Masukkan ID Video Live: ', (videoId) => {
        rl.question('Pilih Reaction (LIKE, LOVE, HAHA, WOW, SAD, ANGRY, CARE): ', (reactionType) => {
          getToken().then(token => {
            sendReaction(token, videoId, reactionType.toUpperCase());
            rl.close();
          });
        });
      });
    } else if (menu === '3') {
      rl.question('Masukkan ID Video Live: ', (videoId) => {
        batchReaction(videoId, 2000); // 2 detik delay per akun
        rl.close();
      });
    } else {
      console.log('Menu tidak valid!');
      rl.close();
    }
  });
})();
