// actions/sendReaction.js
import { fbPost } from '../core/fbApi.js';
import { log, writeLog } from '../core/utils.js';

export async function sendReaction(token, videoId, reactionType = 'LIKE') {
  const response = await fbPost(`/${videoId}/reactions`, token, { type: reactionType });

  if (response.success) {
    const msg = `✅ Reaction ${reactionType} sent to video ${videoId}`;
    log(msg); writeLog(msg);
  } else {
    const msg = `❌ Failed reaction: ${JSON.stringify(response)}`;
    log(msg); writeLog(msg);
  }
}
