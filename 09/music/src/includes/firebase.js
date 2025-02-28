import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAGb4eQNjA15RcBFMefbM8n_0MqPyDr_QQ',
  authDomain: 'music-9b459.firebaseapp.com',
  projectId: 'music-9b459',
  storageBucket: 'music-9b459.appspot.com',
  // messagingSenderId: "876955793088",
  appId: '1:876955793088:web:5cf02e6367d25787d81f25'
}
firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()

const usersCollection = db.collection('users')

export { auth, db, usersCollection }
