import { db } from "./firebase-config.js";
import {
  ref,
  push,
  onValue,
  update,
  remove
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";

export function listenTrivia(callback) {
  const triviaRef = ref(db, "trivia");

  onValue(triviaRef, (snapshot) => {
    const data = snapshot.val();
    const triviaList = [];

    if (data) {
      for (const id in data) {
        triviaList.push({
          id,
          ...data[id]
        });
      }
    }

    callback(triviaList);
  });
}

export function addTrivia(text) {
  const triviaRef = ref(db, "trivia");

  return push(triviaRef, {
    text,
    createdAt: Date.now()
  });
}

export function updateTrivia(id, text) {
  const triviaRef = ref(db, `trivia/${id}`);

  return update(triviaRef, {
    text,
    updatedAt: Date.now()
  });
}

export function deleteTrivia(id) {
  const triviaRef = ref(db, `trivia/${id}`);
  return remove(triviaRef);
}
