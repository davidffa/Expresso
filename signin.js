import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js'

const firebaseConfig = {
  apiKey: "AIzaSyBRRWJwfZj_JW23ZwbMGJRphl-yM3bqbD0",
  authDomain: "expresso-dce77.firebaseapp.com",
  projectId: "expresso-dce77",
  storageBucket: "expresso-dce77.appspot.com",
  messagingSenderId: "836796525883",
  appId: "1:836796525883:web:2ce16d2bcaba93a2421b1e",
  measurementId: "G-0DHQEVFMFB"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();

$("#googleSignIn").click(() => {
  googleSignIn();
});

function googleSignIn() {
  signInWithPopup(auth, provider)
    .then(({ user }) => {
      const usr = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };

      const users = JSON.parse(localStorage.getItem("users")) || [];
      if (!users.some(u => u.email === usr.email)) {
        users.push({ ...usr, google: true });
        localStorage.setItem("users", JSON.stringify(users));
      } else {
        const userProfile = users.find(u => u.email === usr.email);
        usr.address = userProfile.address || "";
        usr.phone = userProfile.phone || "";
      }

      localStorage.setItem("profile", JSON.stringify(usr));
      window.location.href = "index.html";
    }).catch((error) => {
      alert("Error: " + error.message);
    });
}

function signIn() {
  const email = $("#floatingEmail").val();
  const password = $("#floatingPassword").val();
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(u => u.email === email);

  if (user && user.google) {
    Swal.fire(
      'Erro!',
      'Utilizador registado com Google!',
      'error'
    )
    return;
  }

  if (!user || user.password !== password) {
    Swal.fire(
      'Erro!',
      'Utilizador ou senha inválidos!',
      'error'
    )
    return;
  }

  delete user.password;
  localStorage.setItem("profile", JSON.stringify(user));
  window.location.href = "index.html";
}

(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault()
      event.stopPropagation()

      form.classList.add('was-validated')

      if (form.checkValidity()) {
        signIn();
      }
    }, false)
  })
})();