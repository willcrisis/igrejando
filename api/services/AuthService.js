module.exports = {
  login: async({ email, password }) => {
    const res = await FetchService.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${sails.config.firebaseApiKey}`, {
      email,
      password,
      returnSecureToken: true
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error.message, data.error.code);
    }
    return data;
  }
};
