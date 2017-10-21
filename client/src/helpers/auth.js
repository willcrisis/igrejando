import { firebaseAuth } from '../config/config'

export async function register(email, pw) {
  const user = await firebaseAuth().createUserWithEmailAndPassword(email, pw);
  return saveUser(user);
}

export function logout() {
  return firebaseAuth().signOut()
}

export async function loginWithProvider(provider) {
  const auth = firebaseAuth();

  let providerInstance = fetchProviderByName(provider);
  try {
    return await auth.signInWithPopup(providerInstance);
  } catch (err) {
    if (err.code !== 'auth/account-exists-with-different-credential') {
      throw err;
    }

    const {
      credential,
      email
    } = err;

    const providers = await auth.fetchProvidersForEmail(email);
    if (providers[0] === 'password') {
      //TODO do something
    }

    providerInstance = fetchProviderByName(providers[0]);
    const result = await auth.signInWithPopup(providerInstance);
    await result.user.linkWithCredential(credential);
    return result;
  }
}

function fetchProviderByName(provider) {
  let providerInstance;
  if (provider === 'facebook.com') {
    providerInstance = new firebaseAuth.FacebookAuthProvider();
    providerInstance.addScope('email');
  } else if (provider === 'twitter.com') {
    providerInstance = new firebaseAuth.TwitterAuthProvider();
  } else if (provider === 'google.com') {
    providerInstance = new firebaseAuth.GoogleAuthProvider();
    providerInstance.addScope('email');
  } else {
    throw new Error('Unknown provider');
  }

  return providerInstance;
}

export function loginWithEmail(email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function resetPassword(email) {
  return firebaseAuth().sendPasswordResetEmail(email)
}

export function saveUser(user) {
  //TODO save user in API
  console.log(user);
  return user;
}
