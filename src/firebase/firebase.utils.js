import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDEJQM80G_Z5GEWIU0aZhSrKrjjTIIYkO8',
  authDomain: 'crwn-clothing-db-f9ad9.firebaseapp.com',
  databaseURL: 'https://crwn-clothing-db-f9ad9.firebaseio.com',
  projectId: 'crwn-clothing-db-f9ad9',
  storageBucket: '',
  messagingSenderId: '106150962119',
  appId: '1:106150962119:web:b66730a3530b0748eeefe2'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({ displayName, email, createdAt, ...additionalData });
    } catch (error) {
      console.log('error catching: ', error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
