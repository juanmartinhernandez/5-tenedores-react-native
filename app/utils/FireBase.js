import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCdyS97R4zZWAT9k-AopOgQ9R4WnIMIU_I",
  authDomain: "tenedores-169fc.firebaseapp.com",
  databaseURL: "https://tenedores-169fc.firebaseio.com",
  projectId: "tenedores-169fc",
  storageBucket: "tenedores-169fc.appspot.com",
  messagingSenderId: "642731610123",
  appId: "1:642731610123:web:7e69208df25ce972de370e"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
