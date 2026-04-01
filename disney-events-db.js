import { db } from "./firebase-config.js";
import {
  ref,
  onValue
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
