const ADMIN_EMAILS = [
  "s11502401307@toyo.jp",
  "s11502400250@toyo.jp",
  "s13202401047@toyo.jp",
  "s14102500159@toyo.jp",
  "s15402501698@toyo.jp",
  "s15502500738@toyo.jp",
  "s15502500772@toyo.jp",
  "s21402500217@toyo.jp"
];

import { auth } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

function isAdminEmail(email) {
  return ADMIN_EMAILS.includes(email);
}

window.registerUser = async function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  if (!isAdminEmail(email)) {
    message.textContent = "幹部アカウントのみ登録できます。";
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    message.textContent = "登録しました。ログインしてください。";
  } catch (error) {
    message.textContent = "登録に失敗しました: " + error.message;
  }
};

window.loginUser = async function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  if (!isAdminEmail(email)) {
    message.textContent = "幹部アカウントのみログインできます。";
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    if (!isAdminEmail(userCredential.user.email)) {
      message.textContent = "このアカウントは管理者ではありません。";
      await signOut(auth);
      return;
    }

    message.textContent = "ログイン成功";
    location.href = "admin.html";
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
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      location.href = "login.html";
      return;
    }

    if (!isAdminEmail(user.email)) {
      await signOut(auth);
      location.href = "login.html";
      return;
    }

    const userEmail = document.getElementById("userEmail");
    if (userEmail) userEmail.textContent = user.email;
  });
};
