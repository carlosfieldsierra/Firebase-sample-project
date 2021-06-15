import * as firebase from "firebase"
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA4eiggfe4bUPcs7AiBerCLj5DoDqpBJD8",
    authDomain: "signal-clone-yt-build-36a6f.firebaseapp.com",
    projectId: "signal-clone-yt-build-36a6f",
    storageBucket: "signal-clone-yt-build-36a6f.appspot.com",
    messagingSenderId: "980958874923",
    appId: "1:980958874923:web:21b9132dc14d6738b9496e"
  };

let app;
if (firebase.apps.length===0){
    app= firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const db = firebase.firestore()
const auth = firebase.auth()

export {db,auth};