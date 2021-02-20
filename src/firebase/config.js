import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzcaQsMg9-3vSzg8ekuOxdMg9OuG_oEzo",
  authDomain: "ssn-project-b13d6.firebaseapp.com",
  databaseURL: "https://ssn-project-b13d6-default-rtdb.firebaseio.com",
  projectId: "ssn-project-b13d6",
  storageBucket: "ssn-project-b13d6.appspot.com",
  messagingSenderId: "743494701844",
  appId: "1:743494701844:web:359881ba2bbb5279efa801",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectDatabase = firebase.database();
const projectAuth = firebase.auth();

const timestamp = firebase.database.serverTimestamp;

export { projectStorage, projectDatabase, timestamp, projectAuth };
