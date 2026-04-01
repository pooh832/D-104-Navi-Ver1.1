import { db } from "./firebase-config.js";
import {
  ref,
  push,
  onValue,
  update,
  remove
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";

export function addEvent(event) {
  const eventsRef = ref(db, "events");
  return push(eventsRef, event);
}

export function listenEvents(callback) {
  const eventsRef = ref(db, "events");

  onValue(eventsRef, (snapshot) => {
    const data = snapshot.val();
    const events = [];

    if (data) {
      for (const id in data) {
        events.push({
          id,
          ...data[id]
        });
      }
    }

    callback(events);
  });
}

export function updateEvent(id, event) {
  const eventRef = ref(db, `events/${id}`);
  return update(eventRef, event);
}

export function deleteEvent(id) {
  const eventRef = ref(db, `events/${id}`);
  return remove(eventRef);
}
