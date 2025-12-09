import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js";
import FirebaseAuthService from "./authService.js";

// CONFIG FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyAQfLHIjFd6nmfUCsBD11s3n_9ZBK5AF-w",
  authDomain: "pwa-pam.firebaseapp.com",
  projectId: "pwa-pam",
  storageBucket: "pwa-pam.firebasestorage.app",
  messagingSenderId: "824966685183",
  appId: "1:824966685183:web:48854bf74618176e4dc7ca",
  measurementId: "G-7LPERFZPGM"
};

// Inicializa Firebase
const fbApp = initializeApp(firebaseConfig);
getAnalytics(fbApp);

const authService = new FirebaseAuthService(fbApp);

// CADASTRO
const formCadastro = document.getElementById("cadastroForm");

if (formCadastro) {
  formCadastro.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const resultado = await authService.criarUsuarioComEmailESenha(email, senha);

    if (resultado.sucesso) {
      window.location.href = `profile.html?email=${encodeURIComponent(email)}`;
    } else {
      alert("Erro ao cadastrar usuário: " + resultado.erro.message);
    }
  });
}

// LOGIN
const formLogin = document.getElementById("loginForm");

if (formLogin) {
  formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {
      const cred = await authService.login(email, senha);
      window.location.href = `profile.html?email=${encodeURIComponent(email)}`;
    } catch (erro) {
      alert("Erro ao fazer login: " + erro.message);
      console.error(erro);
    }
  });
}

// LOGOUT
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      await authService.logout();
      window.location.href = "index.html";
    } catch (erro) {
      alert("Erro ao sair: " + erro.message);
    }
  });
}
