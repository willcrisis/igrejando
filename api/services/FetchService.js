const fetch = require('node-fetch');

module.exports = {
  post: (url, body, headers) => {
    if (!url) {
      throw new Error('URL is required');
    }

    return fetch(url, {
      method: 'POST',
      headers: Object.assign({ 'Content-Type': 'application/json' }, headers),
      body: body ? JSON.stringify(body) : null
    })
  }
};
