import { db } from "./firebase-config.js";
import {
  ref,
  push,
  onValue,
  update
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";

const questionsRef = ref(db, "questions");

export function addQuestion(question) {
  push(questionsRef, question);
}

export function listenQuestions(callback) {
  onValue(questionsRef, (snapshot) => {
    const data = snapshot.val();
    const questions = data
      ? Object.entries(data).map(([id, value]) => ({ id, ...value }))
      : [];
    callback(questions);
  });
}

export function answerQuestion(id, answer) {
  update(ref(db, `questions/${id}`), {
    answer,
    answeredAt: new Date().toISOString()
  });
}
