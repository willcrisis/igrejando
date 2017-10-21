import { firebaseAuth } from '../config/config';

const defaultHeaders = {
  'Content-Type': 'application/json'
};

export function get(url, headers) {
  return fetch(url, {
    method: 'GET',
    headers: {...defaultHeaders, ...headers}
  })
}

export function post(url, body, headers) {
  return fetch(url, {
    method: 'POST',
    headers: {...defaultHeaders, ...headers},
    body: body ? JSON.stringify(body) : null
  })
}

export async function authenticatedGet(url, headers) {
  const token = await firebaseAuth().currentUser.getIdToken(true);
  return fetch(url, {
    method: 'GET',
    headers: {'Authorization': token, ...defaultHeaders, ...headers}
  })
}

export async function authenticatedPost(url, body, headers) {
  const token = await firebaseAuth().currentUser.getIdToken(true);
  return fetch(url, {
    method: 'POST',
    headers: {'Authorization': token, ...defaultHeaders, ...headers},
    body: body ? JSON.stringify(body) : null
  })
}
