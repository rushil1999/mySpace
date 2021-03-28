import firebase from 'firebase'

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_DB_URL,
//     projectId: process.env.REACT_APP_PROJECTID,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_APP_ID,
//     measurementId: process.env.REACT_APP_MEASUREMENT_ID,
// }
const firebaseConfig = {
    apiKey: "AIzaSyCCvpyNNukYRpQoFpGiDBhbq2wh6PqVVkE",
	authDomain: "myspace-ec3c9.firebaseapp.com",
	databaseURL: 'https://myspace-ec3c9-default-rtdb.firebaseio.com',
	projectId: "myspace-ec3c9",
	storageBucket: "myspace-ec3c9.appspot.com",
	messagingSenderId: "767975049636",
	appId: "1:767975049636:web:d09fd032eabce318e01931",
	measurementId: "G-FQ60HV8HPS"
}
firebase.initializeApp(firebaseConfig)
firebase.analytics();
const database = firebase.database();
const storage = firebase.storage();
const firestore = firebase.firestore();

export { storage, firestore, database }