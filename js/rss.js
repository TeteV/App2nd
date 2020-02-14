window.onload = initialize;

function initialize() {
  loadFirebase();
  document.getElementById("aqui").addEventListener("click", createAcc);
  document.getElementById("btnLogOut").addEventListener("click", logOut);
  document.getElementById("X-mdl-LO").addEventListener("click", closeLogOutModal);

}

function loadFirebase() {
  console.log("firebase loaded")
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyC0nxfGRYEuJqY6qP5BM7XJQz4tlzIoTe4",
    authDomain: "wl2020.firebaseapp.com",
    databaseURL: "https://wl2020.firebaseio.com",
    projectId: "wl2020",
    storageBucket: "wl2020.appspot.com",
    messagingSenderId: "624606537774",
    appId: "1:624606537774:web:ccc7d867e46845d44d57bf"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

function createAcc() {
  window.location.href = "create-account.html"
}

function logIn(event) {
  event.preventDefault();

  var formLogin = event.target;
  var email = formLogin.email.value;
  var password = formLogin.pwd.value;

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("Error")
    // ...
  });

}

function closeLogOutModal() {
  document.getElementById('id03').style.display = "none";
}

//Modal logout here
function abrirModal3() {
  var modal = document.getElementById('id03').style.display = "unset";

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

function logOut() {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
    console.log("ha salido correctamente")
    window.location.href = "index.html";
  }).catch(function (error) {
    // An error happened.
    console.log("error")
  });
}

function checkIfLogin() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("Ha entrado")
    } else {
      console.log("Ha salido")
    }
  });
}

//Modal login here
function abrirModal2() {
  var modal = document.getElementById('id02').style.display = "unset";

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}