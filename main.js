import { getToken } from './core/fetchToken.js';
import { sendReaction } from './actions/sendReaction.js';
import { batchReaction } from './actions/batchReaction.js';
import { postComment } from './actions/postComment.js';
import { batchComment } from './actions/batchComment.js';
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
  console.log('[4] Send Comment (1 Akun)');
  console.log('[5] Batch Comment (Multi-Akun)');

  rl.question('Pilih menu: ', async (menu) => {
    if (menu === '1') {
      await getToken();
      rl.close();
    } else if (menu === '2') {
      rl.question('ID Video Live: ', (videoId) => {
        rl.question('Reaction (LIKE, LOVE, HAHA, WOW, SAD, ANGRY, CARE): ', (reactionType) => {
          getToken().then(token => {
            sendReaction(token, videoId, reactionType.toUpperCase());
            rl.close();
          });
        });
      });
    } else if (menu === '3') {
      rl.question('ID Video Live: ', (videoId) => {
        batchReaction(videoId, 2000);
        rl.close();
      });
    } else if (menu === '4') {
      rl.question('ID Target (Video/Grup): ', (targetId) => {
        rl.question('Komentar: ', (message) => {
          getToken().then(token => {
            postComment(token, targetId, message);
            rl.close();
          });
        });
      });
    } else if (menu === '5') {
      rl.question('ID Target (Video/Grup): ', (targetId) => {
        rl.question('Komentar: ', (message) => {
          batchComment(targetId, message, 2000);
          rl.close();
        });
      });
    } else {
      console.log('Menu tidak valid!');
      rl.close();
    }
  });
})();
