// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASC_nuFYCqWkKIhhpK7y9MbCvUdMEa9VU",
  authDomain: "tea-hung-1f885.firebaseapp.com",
  projectId: "tea-hung-1f885",
  storageBucket: "tea-hung-1f885.firebasestorage.app",
  messagingSenderId: "840346458409",
  appId: "1:840346458409:web:967b15eaea8b4a87f17f38"
};
const app = initializeApp(firebaseConfig);
console.log(app.name);
export { app }; 

