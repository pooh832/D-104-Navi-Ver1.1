import { db } from "./firebase-config.js";
import { auth } from "./firebase-config.js";

import {
  ref,
  push,
  set
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

const triviaInput = document.getElementById("triviaInput");
const addTriviaBtn = document.getElementById("addTriviaBtn");
const triviaMessage = document.getElementById("triviaMessage");

let currentUser = null;

onAuthStateChanged(auth, (user) => {
  if (!user) {
    location.href = "./login.html";
    return;
  }

  currentUser = user;
});

addTriviaBtn.addEventListener("click", async () => {
  const text = triviaInput.value.trim();

  if (!text) {
    triviaMessage.textContent = "豆知識を入力してください。";
    return;
  }

  const triviaRef = ref(db, "trivia");
  const newTriviaRef = push(triviaRef);

  await set(newTriviaRef, {
    text,
    createdAt: Date.now(),
    createdBy: currentUser.email
  });

  triviaInput.value = "";
  triviaMessage.textContent = "豆知識を追加しました。";
});
