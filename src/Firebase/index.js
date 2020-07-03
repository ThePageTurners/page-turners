import firebase from "firebase/app";
import "firebase/database";

// Initialize Firebase
const config = {
    apiKey: "AIzaSyB-DIOv_lUD2FzybntDXIZ4dfkNPbAQx4E",
    authDomain: "page-turners-77a93.firebaseapp.com",
    databaseURL: "https://page-turners-77a93.firebaseio.com",
    projectId: "page-turners-77a93",
    storageBucket: "page-turners-77a93.appspot.com",
    messagingSenderId: "307533137550",
    appId: "1:307533137550:web:ea7f05d270d236f4966bdf"
  };
firebase.initializeApp(config);

export default firebase;

