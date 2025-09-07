import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// =============================================================================
// TODO: PASTE YOUR FIREBASE CONFIGURATION OBJECT HERE
// =============================================================================
// You can get this from:
// Firebase Console > Project Settings > General > Your apps > Web app > SDK setup and configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwbxTcIKyqbvZnTMU98Eb_VRZDMFCTe1Y",
  authDomain: "challan-11b93.firebaseapp.com",
  databaseURL: "https://challan-11b93-default-rtdb.firebaseio.com",
  projectId: "challan-11b93",
  storageBucket: "challan-11b93.firebasestorage.app",
  messagingSenderId: "549710182652",
  appId: "1:549710182652:web:9737b0c70afe8745703f79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service and export it for use elsewhere
export const database = getDatabase(app);
