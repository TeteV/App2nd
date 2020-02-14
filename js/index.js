window.onload = initialize;

const ADD = "add";
const UPDATE = "update";
var operation = ADD;
var storageRef;
var fichero;
var imagesUpRef;
var keyProdToEdit;
var email = "invitado";

function initialize() {
  console.log("Initialize")
  loadFirebase();

  showProducts();

  fichero = document.getElementById("imageProd");
  storageRef = firebase.storage().ref();
  imagesUpRef = firebase.database().ref().child("ImagenesProd");

  document.getElementById("form2").addEventListener("submit", logIn);
  document.getElementById("btnLogOut").addEventListener("click", logOut);
  document.getElementById("aqui").addEventListener("click", createAcc);
  document.getElementById("X-mdl-LO").addEventListener("click", closeLogOutModal);

  checkIfLogin();

}

function createAcc() {
  window.location.href = "create-account.html"
}

function showProducts() {
  console.log("See Products")
  var prods = firebase.database().ref("products/");
  prods.on("value", showProductsChanges);

  document.getElementById("form1").addEventListener("submit", validateForm);
  //document.getElementById("editprdct").addEventListener("click", SendEditProd);

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

function showProductsChanges(snap) {
  console.log("Show Products");
  var data = snap.val();
  var AllPrd = "";

  if (email == "admin@admin.com") {
    for (var key in data) {
      console.log("Log admin")

      AllPrd +=
        '<div class="col-sm-3">' +
        '<div class="card shadow p-4 bg-white mb-3">' +
        '<img class="card-img-top rounded" src="' + data[key].url + '" alt="Card image">' +
        '<div class="card-body">' +
        '<h4 class="card-title">' + data[key].name + '</h4>' +
        '<p class="card-text">' + data[key].shop + '</p>' +
        '<p class="card-text">' + data[key].ref + '</p>' +
        '<p class="card-text">' + data[key].price + '</p>' +
        '</div>' +
        // * Aqui
        //Aqui acaba la info de la carta y empieza los botones de abajo
        //'<div class="container">' +
        '<div class="row mt-2">' +
        '<div class="col-sm-4"></div>' +
        '<i class="far fa-edit editar" data-prod="' + key + '"></i>' +

        '<div class="col-sm-3"></div>' + //Espacio enblanco

        '<i class="far fa-trash-alt borrar" data-prod="' + key + '"></i>' +
        '</div>' +
        '</div>' + // Si quieres los botones fuera , descomenta el div de abajo y el class="container" y este div ponlo en donde * ^ 
        //'</div>' +
        '</div>'
    }
  } else {
    for (var key in data) {
      console.log("invitado")

      AllPrd +=
        '<div class="col-sm-3">' +
        '<div class="card shadow p-4 bg-white mb-3">' +
        '<img class="card-img-top rounded" src="' + data[key].url + '" alt="Card image">' +
        '<div class="card-body">' +
        '<h4 class="card-title">' + data[key].name + '</h4>' +
        '<p class="card-text">' + data[key].shop + '</p>' +
        '<p class="card-text">' + data[key].ref + '</p>' +
        '<p class="card-text">' + data[key].price + '</p>' +
        '</div>' +
        // * Aqui
        //Aqui acaba la info de la carta y empieza los botones de abajo
        //'<div class="container">' +
        '<div class="row mt-2">' +
        '<div class="col-sm-4"></div>' +
        //'<i class="far fa-edit editar" data-prod="' + key + '"></i>' +

        '<div class="col-sm-3"></div>' + //Espacio enblanco

        // '<i class="far fa-trash-alt borrar" data-prod="' + key + '"></i>' +
        '</div>' +
        '</div>' + // Si quieres los botones fuera , descomenta el div de abajo y el class="container" y este div ponlo en donde * ^ 
        //'</div>' +
        '</div>'
    }
  }


  document.getElementById("allPrdcts").innerHTML = AllPrd;

  var deleteButt = document.getElementsByClassName("borrar");
  for (var i = 0; i < deleteButt.length; i++) {
    deleteButt[i].addEventListener("click", deleteProd);
  }

  var editButtons = document.getElementsByClassName("editar");
  for (var i = 0; i < editButtons.length; i++) {
    editButtons[i].addEventListener("click", editProd);
  }

  userLogged();
}


function editProd(event) {
  console.log("Estoy en edit");

  document.getElementById("addprdct").style.display = "none";
  document.getElementById("editprdct").style.display = "unset";
  operation = UPDATE;

  var buttonClicked = event.target;

  var formProd = document.getElementById("form1");
  keyProdToEdit = buttonClicked.getAttribute("data-prod");
  var refProdToEdit = firebase.database().ref("products/" + keyProdToEdit);
  console.log("La key del producto apunto de editar es: " + keyProdToEdit)

  refProdToEdit.once("value", function (snap) {
    var data = snap.val();
    formProd.name.value = data.name;
    formProd.shop.value = data.shop;
    formProd.ref.value = data.ref;
    formProd.price.value = data.price;
  });
  abrirModal();
}

function AddProdToWL() {
  // event.preventDefault();
  console.log("Producto revisando si es edit o enviar");

  document.getElementById("addprdct").style.display = "unset";
  document.getElementById("editprdct").style.display = "none";


  var formProd = event.target;
  if (operation == ADD) {
    console.log("Revisado para enviar");

    var name = formProd.name.value;
    var shop = formProd.shop.value;
    var ref = formProd.ref.value;
    var price = formProd.price.value;


    var imagenASubir = fichero.files[0];

    var uploadTask = storageRef.child("ImagenesProd/" + imagenASubir.name).put(imagenASubir);
    uploadTask.on("state_changed",
      function (snapshot) {
        console.log("primer")
      }, function (error) {
        console.log(error);
      }, function () {
        console.log("funciona")
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log('File available at', downloadURL);
          firebase.database().ref("products/").push({
            url: downloadURL,
            name: name,
            shop: shop,
            ref: ref,
            price: price
          });
        });
      });


    operation = ADD;

    document.getElementById("id01").style.display = "none";
  } else {

    console.log("Revisado para editar")

    var refProd = firebase.database().ref("products/" + keyProdToEdit);
    console.log("La key del producto recien editado es: " + keyProdToEdit);

    refProd.update({
      name: formProd.name.value,
      shop: formProd.shop.value,
      ref: formProd.ref.value,
      price: formProd.price.value
    });

    document.getElementById("addprdct").style.display = "none";
    document.getElementById("editprdct").style.display = "unset";

    operation = ADD;
    document.getElementById("id01").style.display = "none";
  }
  formProd.reset();
}


function deleteProd(event) {
  var buttClick = event.target;

  var keyProdToDelete = buttClick.getAttribute("data-prod");
  var refProdToDelete = firebase.database().ref("products/" + keyProdToDelete);
  refProdToDelete.remove();
}

function abrirModal() {
  console.log("Modal open")
  document.getElementById('id01').style.display = 'block';
  ButtnCancel();
}

function ButtnCancel() {
  console.log("Cargado el cancelar");
  var cancelButt = document.getElementById("cancelprdct");
  cancelButt.addEventListener("click", resetForm);
}

function resetForm() {
  console.log("formulario reseteado");
  var formRes = document.getElementById("form1");
  formRes.reset();
  document.getElementById("addprdct").style.display = "unset";
  document.getElementById("editprdct").style.display = "none";
  document.getElementById("p1").style.display = "none";
  document.getElementById("p2").style.display = "none";
  document.getElementById("p3").style.display = "none";
  document.getElementById("p4").style.display = "none";
  operation = ADD;
}

function validateForm(event) {
  event.preventDefault();
  var n = document.forms["form1"]["name"].value;
  if (n == "") {
    document.getElementById("p1").style.display = "unset";
    //return false;
  }
  var sh = document.forms["form1"]["shop"].value;
  if (sh == "") {
    document.getElementById("p2").style.display = "unset";
    //return false;
  }
  var ref = document.forms["form1"]["ref"].value;
  if (ref == "") {
    document.getElementById("p3").style.display = "unset";
    // return false;
  }
  var pr = document.forms["form1"]["price"].value;
  if (pr == "") {
    document.getElementById("p4").style.display = "unset";
    // return false;
  }
  AddProdToWL();
}

function logIn(event) {
  event.preventDefault();

  var formLogin = event.target;
  email = formLogin.email.value;
  var password = formLogin.pwd.value;

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("Error")
    // ...
  });
  document.getElementById('id02').style.display = "none";
showProducts();
}

function checkIfLogin() {
  //event.preventDefault();
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("Ha entrado como: " + email)
      document.getElementById('id02').style.display = "none";

    } else {
      console.log("Ha salido")
    }
  });
}

function userLogged(){
  document.getElementById("email-user").innerHTML = email;
}

function createAcc() {
  window.location.href = "create-account.html"
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

function closeLogOutModal(){
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

//Esto es aparte del crud que es el modal <3
function openModal() {
  console.log("Hooo")
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