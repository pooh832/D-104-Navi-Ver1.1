import { db } from "./firebase-config.js";
import {
  ref,
  push,
  onValue
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

    if (data) {
      for (const id in data) {
        events.push(data[id]);
      }
    }

    callback(events);
  });
}
