// Import SDK Firebase dari CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  onSnapshot,
  deleteDoc,
  doc,
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

// ===== 1️⃣ FUNGSI HAPUS DATA BOOKING =====
export async function deleteBooking(bookingId) {
  try {
    await deleteDoc(doc(db, "bookings", bookingId));
    console.log("🗑️ Booking berhasil dihapus:", bookingId);
  } catch (error) {
    console.error("❌ Gagal menghapus booking:", error);
  }
}

// ===== 2️⃣ FUNGSI SIMPAN DATA BOOKING =====
export async function saveBooking(data) {
  try {
    const ref = await addDoc(collection(db, "bookings"), {
      ...data,
      createdAt: serverTimestamp(),
    });
    console.log("✅ Booking berhasil disimpan:", data);
    return ref.id; // HARUS ADA INI
  } catch (error) {
    console.error("❌ Gagal menyimpan booking:", error);
  }
}
// ===== 3️⃣ FUNGSI REALTIME UPDATE =====
export function subscribeBookings(callback) {
  const q = query(collection(db, "bookings"));
  return onSnapshot(q, (snapshot) => {
    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(list);
  });
}
