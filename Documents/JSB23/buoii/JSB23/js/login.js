import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

// Lấy thẻ input từ file HTML
let emailElement = document.getElementById("email");
let passElement = document.getElementById("password");

// Lấy thẻ hiển thị lỗi
let emailErrorElement = document.getElementById("email-error");
let passErrorElement = document.getElementById("pass-error");

// Lấy thẻ button
let loginButton = document.getElementById("login-btn");
let googleLoginButton = document.getElementById("google-login-btn");

// Hàm xử lý đăng nhập bằng email & password
function handleLoginClick(event) {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của button

  let email = emailElement.value;
  let password = passElement.value;

  if (validate(email, password) === true) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Login successful:", user);
        window.location.href = "index.html"; // Redirect to home
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error("Error during login:", errorMessage);
        passErrorElement.textContent = "(*) " + errorMessage;
      });
  }
}

// Hàm xử lý đăng nhập bằng Google
function handleGoogleLogin(event) {
  event.preventDefault();

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("Google Login successful:", user);
      alert("Xin chào " + user.displayName);
      window.location.href = "index.html"; // Redirect to home
    })
    .catch((error) => {
      console.error("Error during Google login:", error);
      alert("Đăng nhập Google thất bại: " + error.message);
    });
}

// Hàm kiểm tra dữ liệu nhập
function validate(email, password) {
  let isValid = true;
  let email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  emailErrorElement.textContent = "";
  passErrorElement.textContent = "";

  if (!email_regex.test(email)) {
    emailErrorElement.textContent = "(*) Invalid email format.";
    isValid = false;
  }
  if (password.length < 6) {
    passErrorElement.textContent = "(*) Password must be at least 6 characters.";
    isValid = false;
  }

  return isValid;
}

// Gắn sự kiện click cho các nút
loginButton.addEventListener("click", handleLoginClick);
googleLoginButton.addEventListener("click", handleGoogleLogin);
