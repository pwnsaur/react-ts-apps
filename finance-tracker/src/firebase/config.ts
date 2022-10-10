import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDpVTV2iUk3xBOj8GD2b5AcBj2h4iZww-4',
  authDomain: 'cash-moneyy.firebaseapp.com',
  projectId: 'cash-moneyy',
  storageBucket: 'cash-moneyy.appspot.com',
  messagingSenderId: '594442996728',
  appId: '1:594442996728:web:60b20b9819b56dfb0a240d',
};

firebase.initializeApp(firebaseConfig);

const projectFs = firebase.firestore();
const projectAuth = firebase.auth();

const timeStamp = firebase.firestore.Timestamp;

export { projectFs, projectAuth, timeStamp };
