// server/models/orderModel.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Direct Firebase Config (உங்க Config-ஐ இங்கே Paste பண்ணுங்க)
const firebaseConfig = {
  apiKey: "AIzaSyA0o1L1h7PIaPy1NwNDw-Y-wL1meQ3q0bM",
  authDomain: "hotel-order-system-9a08c.firebaseapp.com",
  databaseURL: "https://hotel-order-system-9a08c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hotel-order-system-9a08c",
  storageBucket: "hotel-order-system-9a08c.firebasestorage.app",
  messagingSenderId: "764235296199",
  appId: "1:764235296199:web:0b63f7fdc4892af0cbfde2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);