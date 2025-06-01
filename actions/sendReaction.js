import fetch from 'node-fetch';
import { log, writeLog } from '../core/utils.js';

export async function sendReaction(token, videoId, reactionType = 'LIKE') {
  const url = `https://graph.facebook.com/v19.0/${videoId}/reactions`;
  const params = new URLSearchParams();
  params.append('access_token', token);
  params.append('type', reactionType);

  try {
    const res = await fetch(url, { method: 'POST', body: params });
    const data = await res.json();

    if (data.success) {
      const msg = `✅ Reaction ${reactionType} sent to video ${videoId}`;
      log(msg);
      writeLog(msg);
    } else {
      const msg = `❌ Failed reaction on ${videoId}: ${JSON.stringify(data)}`;
      log(msg);
      writeLog(msg);
    }
  } catch (err) {
    const msg = `[!] Error sending reaction: ${err}`;
    console.error(msg);
    writeLog(msg);
  }
}
