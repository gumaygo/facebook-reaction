import { fbPost } from '../core/fbApi.js';
import { log, writeLog } from '../core/utils.js';

export async function postComment(token, targetId, message) {
  const response = await fbPost(`/${targetId}/comments`, token, { message });

  if (response.id) {
    const msg = `✅ Komentar terkirim: ${message} (ID: ${response.id})`;
    log(msg); writeLog(msg);
  } else {
    const msg = `❌ Gagal kirim komentar: ${JSON.stringify(response)}`;
    log(msg); writeLog(msg);
  }
}
