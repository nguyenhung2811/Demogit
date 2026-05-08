import {
   getAuth,
   createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";
// Get input elements
let emailElement = document.getElementById("email");
let passwordElement = document.getElementById("password");
let cfPasswordElement = document.getElementById("cf-password");
let registerBtn = document.getElementById("register-btn");

// Error elements
let emailError = document.getElementById("email-error");
let passError = document.getElementById("password-error");
let cfPassError = document.getElementById("cf-password-error");

function handleRegister(event) {
event.preventDefault()
   // Lấy giá trị từ thẻ input

   let email = emailElement.value;
   let password = passwordElement.value;
   let cfpassword = cfPasswordElement.value;

    if (registerValidate(email, password, cfpassword)) {
        const auth = getAuth();
              createUserWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                 // signed in
                 const user = userCredential.user;
                 console.log("Login successful:", user);
                 window.location.href = "index.html"; // Redirect to food.html
              }) //báo đăng nhập thành công và quay về trang chủ
              .catch((error) => {
                 const errorCode = error.code;
                 const errorMessage = error.message;
                 console.error("Error during login:", errorCode, errorMessage);
                 passErrorElement.textContent = "(*) " + errorMessage;
              }); // bắt lỗi mà hệ thống đang lỗi
    }
}
function registerValidate(email, password, cfPassword) {
    let isValid = true;
    let email_regex = "(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$)";

    // Reset error messages
    emailError.textContent = "";
    passError.textContent = "";
    cfPassError.textContent = "";

    // Validation
    if (email.match(email_regex) == null) {
        emailError.textContent = "(*) Invalid email format.";
        isValid = false;
    }

    if (password.length < 6) {
        passworderror.textContent = "(*) Password must be at least 6 characters.";
        isValid = false;
    }

    if (password !== cfPassword || cfPassword === "") {
        cfPassError.textContent = "(*) Passwords do not match.";
        isValid = false;
    }

    return isValid;
}

registerBtn.addEventListener("click", handleRegister)