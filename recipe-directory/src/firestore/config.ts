import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA07j0F4oOumnCV975Lu0EvM4KnwEzEI88',
  authDomain: 'recipe-directory-a260c.firebaseapp.com',
  projectId: 'recipe-directory-a260c',
  storageBucket: 'recipe-directory-a260c.appspot.com',
  messagingSenderId: '783882141250',
  appId: '1:783882141250:web:82bd95d30627c2796af7db',
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
