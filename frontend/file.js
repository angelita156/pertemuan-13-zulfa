const registerForm = document.querySelector(".register form");
registerForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = registerForm.querySelector('input[type="text"]').value;
  const email = registerForm.querySelector('input[type="email"]').value;
  const password = registerForm.querySelector('input[type="password"]').value;
  localStorage.setItem("username", username);
  localStorage.setItem("email", email);
  localStorage.setItem("password", password);
  alert("Registrasi berhasil!");
  registerForm.reset();
  document.getElementById("container").classList.remove("active");
});
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.querySelector('.login input[type="text"]').value;
  const password = document.querySelector(
    '.login input[type="password"]',
  ).value;
  const savedUsername = localStorage.getItem("username");
  const savedPassword = localStorage.getItem("password");
  if (username === savedUsername && password === savedPassword) {
    alert("Login berhasil!");
    document.getElementById("loginForm").reset();
    window.location.href = "profile.html";
  } else {
    alert("Username atau password salah!");
    document.querySelector('.login input[type="password"]').value = "";
  }
});
document.querySelector(".register-btn").addEventListener("click", () => {
  document.getElementById("loginForm").reset();
});
document.querySelector(".login-btn").addEventListener("click", () => {
  document.querySelector(".register form").reset();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js");
  });
}

