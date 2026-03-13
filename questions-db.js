import { db } from "./firebase-config.js";
import {
  ref,
  push,
  onValue
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";

const questionsRef = ref(db, "questions");

export function addQuestion(question) {
  push(questionsRef, question);
}

export function listenQuestions(callback) {
  onValue(questionsRef, (snapshot) => {
    const data = snapshot.val();
    const questions = data ? Object.values(data) : [];
    callback(questions);
  });
}
