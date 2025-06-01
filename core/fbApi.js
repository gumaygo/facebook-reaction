import fetch from 'node-fetch';


export async function fbGet(endpoint, token) {
  const url = `https://graph.facebook.com/v19.0${endpoint}`;
  const res = await fetch(`${url}?access_token=${token}`);
  return res.json();
}

export async function fbPost(endpoint, token, data) {
  const url = `https://graph.facebook.com/v19.0${endpoint}`;
  const params = new URLSearchParams({ access_token: token, ...data });
  const res = await fetch(url, { method: 'POST', body: params });
  return res.json();
}
