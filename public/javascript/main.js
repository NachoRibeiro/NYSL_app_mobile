// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBNO9E46ndVdRNHGuSP6w5q5duP4Swq9dA",
    authDomain: "nysl-app-v2.firebaseapp.com",
    databaseURL: "https://nysl-app-v2.firebaseio.com",
    projectId: "nysl-app-v2",
    storageBucket: "nysl-app-v2.appspot.com",
    messagingSenderId: "348256196817",
    appId: "1:348256196817:web:69e0fb0648dbdaed3b8df0",
    measurementId: "G-DVZGCMD83L"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


var app = new Vue({
    el: "#app",
    data: {
        user: "",
        password: "",
        currentUser: null,
        name: "",
        message:"",
        messages: [],
        idGame: null,
    },
    methods: {
        register: function() {
            firebase.auth().createUserWithEmailAndPassword(app.user, app.password)
            .then(function(){
                alert("sesión iniciada correctamente");
            })
            .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
            });
        },
        login: function() {
            firebase.auth().signInWithEmailAndPassword(app.user, app.password)
            .then(function() {
                alert("login exitoso");
                
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            });
        },
        signOut: function() {
            firebase.auth().signOut();
        },
        loginGoogle: function() {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
            .catch(function(error) {
                alert(error.message)
            });
        },
        saveMessage: function() {
            var messageReference = firebase.database().ref(app.idGame);
            var infoMessage = {
                name: firebase.auth().currentUser.email,
                message: app.message
            };
            messageReference.push(infoMessage);
            
            app.message = "";
        },
        showForo: function() {
            document.getElementById("home").classList.add("d-none");
            document.getElementById("fixture").classList.add("d-none");
            document.getElementById("positions-table").classList.add("d-none");
            document.getElementById("fields-locations").classList.add("d-none");
            document.getElementById("foro").classList.remove("d-none");
        },
        selectForo: function(idGame){
            document.getElementById("nav-bar").classList.add("d-none");
            app.idGame = idGame;
            app.showForo();
            app.readForo();
        },
        readForo: function() {
            app.messages = [];
            firebase.database().ref(app.idGame).off();
            firebase.database().ref(app.idGame).on("child_added", function(childSnapshot, prevChildKey) {
                console.log(childSnapshot.val());
                app.messages.push(childSnapshot.val());
            });
        }

    }
});

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        app.currentUser = user;   
    }else {
        app.currentUser = null;
    }
});

var home = document.getElementById("home");
var fixture = document.getElementById("fixture");
var leagueTable = document.getElementById("positions-table");
var fields = document.getElementById("fields-locations");
var register = document.getElementById("register-page");

var fixtureItem = document.getElementById("nav-item-fixture");
var tableItem = document.getElementById("nav-item-table");
var fieldsItem = document.getElementById("nav-item-fields");
var infoItem = document.getElementById("nav-item-info");
var loginItem = document.getElementById("nav-item-login")

function showHome() {
    register.classList.add("d-none");
    fixture.classList.add("d-none");
    leagueTable.classList.add("d-none");
    fields.classList.add("d-none");
    home.classList.remove("d-none");
    document.getElementById("nav-item-home").classList.add("active");
    fixtureItem.classList.remove("active");
    tableItem.classList.remove("active");
    fieldsItem.classList.remove("active");
    infoItem.classList.remove("active");
    loginItem.classList.remove("active")
    document.getElementById("foro").classList.add("d-none");
    document.getElementById("nav-bar").classList.remove("d-none")
};
showHome();

function showTable() {
    register.classList.add("d-none");
    loginItem.classList.remove("active");
    home.classList.add("d-none");
    document.getElementById("nav-item-home").classList.remove("active")
    fixture.classList.add("d-none");
    fixtureItem.classList.remove("active");
    fields.classList.add("d-none");
    fieldsItem.classList.remove("active");
    infoItem.classList.remove("active");
    leagueTable.classList.remove("d-none");
    tableItem.classList.add("active");    
}

function showFixture() {
    register.classList.add("d-none");
    loginItem.classList.remove("active");
    home.classList.add("d-none");
    document.getElementById("nav-item-home").classList.remove("active")
    fields.classList.add("d-none");
    fieldsItem.classList.remove("active");
    leagueTable.classList.add("d-none");
    tableItem.classList.remove("active");
    fixture.classList.remove("d-none");
    fixtureItem.classList.add("active");
    infoItem.classList.add("active");
}

function showFields() {
    register.classList.add("d-none");
    loginItem.classList.remove("active");
    home.classList.add("d-none");
    document.getElementById("nav-item-home").classList.remove("active")
    leagueTable.classList.add("d-none");
    tableItem.classList.remove("active");
    fixture.classList.add("d-none");
    fixtureItem.classList.remove("active");
    fields.classList.remove("d-none");
    fieldsItem.classList.add("active");
    infoItem.classList.add("active");
}

function showLogin() {
    register.classList.remove("d-none");
    loginItem.classList.add("active");
    home.classList.add("d-none");
    document.getElementById("nav-item-home").classList.remove("active")
    fixture.classList.add("d-none");
    fixtureItem.classList.remove("active");
    fields.classList.add("d-none");
    fieldsItem.classList.remove("active");
    infoItem.classList.remove("active");
    leagueTable.classList.add("d-none");
    tableItem.classList.remove("active");
}

var signIn = document.getElementById("sign-in");
var login = document.getElementById("login");

function signUp() {
    login.classList.add("d-none");
    signIn.classList.remove("d-none");
}
function logIn() {
    signIn.classList.add("d-none");
    login.classList.remove("d-none");
}