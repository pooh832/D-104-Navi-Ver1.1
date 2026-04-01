import { db } from "./firebase-config.js";
import {
  ref,
  push,
  onValue,
  set
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";

export function addEvent(event) {

  const eventsRef = ref(db, "events");

  push(eventsRef, event);

}

export function listenEvents(callback) {

  const eventsRef = ref(db, "events");

  onValue(eventsRef, (snapshot) => {

    const data = snapshot.val();

    const events = [];

    for (const id in data) {
      events.push(data[id]);
    }

    callback(events);

  });

}

// disneyEvents を作成（1回だけ実行）
const disneyRef = ref(db, "disneyEvents");
set(disneyRef, {});
