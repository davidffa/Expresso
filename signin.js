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
      }

      localStorage.setItem("profile", JSON.stringify(usr));
      window.location.href = "index.html";
    }).catch((error) => {
      alert("Error: " + error.message);
    });
}

function signIn() {
  const email = $("#floatingEmail").val();

  localStorage.setItem("profile", JSON.stringify({ email }));
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
        window.location.href = "index.html";
      }
    }, false)
  })
})();