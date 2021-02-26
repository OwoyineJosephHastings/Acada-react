import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyDlFylUccbt6sdSMSo77-nFR1Z8lTM-C4w",
  authDomain: "acade-2ffba.firebaseapp.com",
  projectId: "acade-2ffba",
  storageBucket: "acade-2ffba.appspot.com",
  messagingSenderId: "501697640872",
  appId: "1:501697640872:web:494d28473745738ea2c59d",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectDatabase = firebase.database();
const projectAuth = firebase.auth();
const timestamp = firebase.database.ServerValue.TIMESTAMP;
const TaskState = projectStorage.TaskState;

export { projectStorage, projectDatabase, timestamp, projectAuth, TaskState };
