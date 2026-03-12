import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAU_CjOafyVtoJK9t29b-reMlFuCvoB0nk",
  authDomain: "d104-navi.firebaseapp.com",
  projectId: "d104-navi",
  storageBucket: "d104-navi.firebasestorage.app",
  messagingSenderId: "967406609529",
  appId: "1:967406609529:web:a6e7b06550f6071a33e0a8",
  databaseURL: "https://d104-navi-default-rtdb.firebaseio.com"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
