// Import SDK Firebase dari CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// ===== CONFIG FIREBASE PUNYA ANDRE =====
const firebaseConfig = {
  apiKey: "AIzaSyBAyYx72FLwlr3am18bVKcdKNH7sk8wKq4",
  authDomain: "sistem-booking1.firebaseapp.com",
  projectId: "sistem-booking1",
  storageBucket: "sistem-booking1.firebasestorage.app",
  messagingSenderId: "109107348461",
  appId: "1:109107348461:web:a0a64094e5577325995de4",
  measurementId: "G-2FDNT02M77",
};

// Inisialisasi Firebase dan Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fungsi untuk menyimpan data booking ke Firestore
async function saveBooking(data) {
  try {
    await addDoc(collection(db, "bookings"), {
      ...data,
      createdAt: serverTimestamp(),
    });
    console.log("✅ Booking berhasil disimpan:", data);
  } catch (error) {
    console.error("❌ Gagal menyimpan booking:", error);
  }
}

// Supaya bisa dipanggil dari file HTML utama
window.saveBooking = saveBooking;
