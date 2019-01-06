import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDGk0uk_jPYZFxUbQxjTSj_ChO1GZ3aess",
    authDomain: "basics-df4a7.firebaseapp.com",
    databaseURL: "https://basics-df4a7.firebaseio.com/",
    projectId: "basics-df4a7",
    storageBucket: "basics-df4a7.appspot.com",
    //messagingSenderId: ""
};

const firebaseInstance = firebase.initializeApp(firebaseConfig);

export default firebaseInstance;