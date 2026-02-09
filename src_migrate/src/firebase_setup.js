import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'your-api-key',
  authDomain: 'your-auth-domain',
  projectId: 'your-project-id',
  storageBucket: 'your-storage-bucket',
  messagingSenderId: 'your-sender-id',
  appId: 'your-app-id',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const signInWithEmailPassword = async (email, password) => {
  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    console.log(user);
    // Redirect user or set session as needed
  } catch (error) {
    console.error(error.message);
  }
};
