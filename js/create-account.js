window.onload = initialize;

function initialize(){
    document.getElementById("form-singup").addEventListener("submit", signUp);
    document.getElementById("initCD").addEventListener("click", countDown);
    loadFirebase();
}

function countDown(){
  setTimeout(goToX, 5000)
}

function goToX() {
    window.location = "index.html";
  }

function loadFirebase(){
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

function signUp(event){
    event.preventDefault();
    var email = event.target.emailSI.value;
    var password = event.target.pwdSI.value;

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        
      });   

      document.getElementById("myModal3").style.display ="unset";
    
}