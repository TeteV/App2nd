window.onload = initialize;

function initialize(){

  document.getElementById("aqui").addEventListener("click", createAcc);

}

function createAcc(){
  window.location.href = "create-account.html"
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