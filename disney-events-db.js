import { db } from "./firebase-config.js";
import {
  ref,
  push,
  onValue,
  update,
  remove
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";

export function listenDisneyEvents(callback) {
  const disneyRef = ref(db, "disneyEvents");

  onValue(disneyRef, (snapshot) => {
    const data = snapshot.val();
    const disneyEvents = [];

    if (data) {
      for (const id in data) {
        disneyEvents.push({
          id,
          ...data[id]
        });
      }
    }

    callback(disneyEvents);
  });
}

export function addDisneyEvent(event) {
  const disneyRef = ref(db, "disneyEvents");
  return push(disneyRef, event);
}

export function updateDisneyEvent(id, event) {
  const disneyEventRef = ref(db, `disneyEvents/${id}`);
  return update(disneyEventRef, event);
}

export function deleteDisneyEvent(id) {
  const disneyEventRef = ref(db, `disneyEvents/${id}`);
  return remove(disneyEventRef);
}
