const ADMIN_EMAIL = "exsample@toyo.jp";
import { auth } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

window.registerUser = async function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    message.textContent = "登録しました。管理ページへ移動します。";
    location.href = "admin.html";
  } catch (error) {
    message.textContent = "登録に失敗しました: " + error.message;
  }
};

window.loginUser = async function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  try {
    await signInWithEmailAndPassword(auth, email, password);
    message.textContent = "ログイン成功";
    window.location.href = "admin.html";
  } catch (error) {
    console.error("login error:", error);
    message.textContent = `ログイン失敗: ${error.code} / ${error.message}`;
  }
};

window.logoutUser = async function () {
  await signOut(auth);
  location.href = "login.html";
};

window.protectAdminPage = function () {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      location.href = "login.html";
      return;
    }
    const userEmail = document.getElementById("userEmail");
    if (userEmail) userEmail.textContent = user.email;
  });
};
