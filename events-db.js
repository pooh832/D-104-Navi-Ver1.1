import { db } from "./firebase-config.js";
import { ref, push, onValue } 
from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";

const eventsRef = ref(db, "events");

export function addEvent(event){
  push(eventsRef, event);
}

export function listenEvents(callback){
  onValue(eventsRef, (snapshot)=>{
    const data = snapshot.val();
    const events = data ? Object.values(data) : [];
    callback(events);
  });
}
