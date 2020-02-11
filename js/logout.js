window.onload = initialize;

function initialize() {
    loadFirebase();
    console.log("Initialize");
    document.getElementById("logout").addEventListener("click", logOut);
    checkIfLogin();
    document.getElementById("aqui").addEventListener("click", createAcc);

  }
  
  function createAcc(){
    window.location.href = "create-account.html"
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

function checkIfLogin(){
    firebase.auth().onAuthStateChanged(function(user){
        if(user){
            console.log("Ha entrado")
        }else{
            console.log("Ha salido")
        }
      });
}

function logIn(event){
  event.preventDefault();

  var formLogin = event.target;
  var email = formLogin.email.value;
  var password = formLogin.pwd.value;

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Error")
      // ...
    });
    
    if( email == "admin@admin.com"){
      window.location.href = "admin-index.html";
    }else{
      window.location.href = "index.html";  
    }
  
}

function checkIfLogin(){
  firebase.auth().onAuthStateChanged(function(user){
      if(user){
          console.log("Ha entrado")
      }else{
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

function logOut(){
  firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log("ha salido correctamente")
      window.location.href = "index.html";
    }).catch(function(error) {
      // An error happened.
      console.log("error")
    });
}


//Esto es aparte del crud que es el modal <3
function openModal() {
    var modal = document.getElementById('id01');
  
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }
  
  function myFunction() {
    var x = document.getElementById("myNavbar");
    if (x.className === "navbar") {
      x.className += " responsive";
    } else {
      x.className = "navbar";
    }
  }