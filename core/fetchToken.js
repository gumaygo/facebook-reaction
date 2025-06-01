import fetch from 'node-fetch';
import { loadCookie, saveToken, log } from './utils.js';

export async function getToken() {
  const cookie = loadCookie();
  const url = 'https://business.facebook.com/business_locations';

  try {
    const res = await fetch(url, {
      headers: {
        'cookie': cookie,
        'user-agent': 'Mozilla/5.0 (Linux; Android 11; RMX2144) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/103.0.5060.71 Mobile Safari/537.36'
      }
    });

    const body = await res.text();
    const match = body.match(/EAAG\w+/);

    if (match) {
      const token = match[0];
      saveToken(token);
      log(`Token found: ${token}`);
      return token;
    } else {
      log('Token not found. Check your cookie.');
    }

  } catch (err) {
    console.error('[!] Error fetching token:', err);
  }
}
