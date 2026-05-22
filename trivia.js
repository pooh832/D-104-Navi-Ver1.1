import { db } from "./firebase-config.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";

const triviaText = document.getElementById("triviaText");

const triviaRef = ref(db, "trivia");

onValue(triviaRef, (snapshot) => {
  const data = snapshot.val();

  if (!data) {
    triviaText.textContent = "まだ豆知識が登録されていません。";
    return;
  }

  const triviaList = Object.values(data);

  const randomIndex = Math.floor(Math.random() * triviaList.length);
  const randomTrivia = triviaList[randomIndex];

  triviaText.textContent = randomTrivia.text;
});
