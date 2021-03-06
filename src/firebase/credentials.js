import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var config = {
  apiKey: process.env.VUE_APP_APIKEY,
  appId: process.env.VUE_APP_APPID,
  authDomain: process.env.VUE_APP_AUTHDOMAIN,
  messagingSenderId: process.env.VUE_APP_MESSAGINGSENDERID,
  projectId: process.env.VUE_APP_PROJECTID,
  storageBucket: process.env.VUE_APP_STORAGEBUCKET,
};


firebase.initializeApp(config);
// firebase.firestore().settings({ experimentalForceLongPolling: true, merge: true });

const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

const launchesCollection = db.collection("launches");
const launchCollection = db.collection("product");
const productsCollection = db.collection("products");
const notificationsCollection = db.collection("notifications");
const usersCollection = db.collection("users");
const dropDownsCollection = db.collection("dropdowns");

export {
  db,
  launchesCollection,
  launchCollection,
  productsCollection,
  notificationsCollection,
  usersCollection,
  dropDownsCollection,
  storage,
  auth,
  provider,
};
