import { initializeApp } from 'firebase/app'

let config = {
  apiKey: "AIzaSyCFyFa-Zb-gbdSTXD_txH2BsgnBf2j-zy",
  authDomain: "techzai.firebaseapp.com",
  databaseURL: "https://techzai-default-rtdb.firebaseio.com",
  projectId: "techzai",
  storageBucket: "techzai.appspot.com",
  messagingSenderId: "533839743307",
  appId: "1:533839743307:web:dd96c6cce6ae4d4f8440ce",
};

export const firebaseApp = initializeApp(config)