import { firebaseAuth } from '../config/config';
import { authenticatedPost } from './fetch';

export async function register({ email, pw, displayName }) {
  let user = await firebaseAuth().createUserWithEmailAndPassword(email, pw);
  await user.updateProfile({ displayName: displayName });
  user = await firebaseAuth().currentUser;
  await authenticatedPost('/user/validate', { user });
  await user.sendEmailVerification();
  return user;
}

export const socialLogin = async provider => {
  const data = await loginWithProvider(provider);
  return await authenticatedPost('/user/validate', { user: data.user });
};

export function logout() {
  return firebaseAuth().signOut()
}

export async function loginWithProvider(provider) {
  let providerInstance = fetchProviderByName(provider);
  try {
    return await firebaseAuth().signInWithPopup(providerInstance);
  } catch (err) {
    if (err.code !== 'auth/account-exists-with-different-credential') {
      throw err;
    }
    return retryWithAnotherProvider(err);
  }
}

async function retryWithAnotherProvider({ credential, email }) {
  const auth = firebaseAuth();

  const providers = await auth.fetchProvidersForEmail(email);
  if (providers[ 0 ] === 'password') {
    throw new Error('An account already exists for this email address. Please login with your email and password, or try recovering your password.');
  }

  const providerInstance = fetchProviderByName(providers[ 0 ]);
  const result = await auth.signInWithPopup(providerInstance);
  await result.user.linkWithCredential(credential);
  return result;
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
