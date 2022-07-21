var config = {   //get this tokens from firebase console
    apiKey: "auth key",
    authDomain: "auth Domain",
    databaseURL: "database url",
    projectId: "project id",
    storageBucket: "storage Bucket",
    messagingSenderId: "sender id"
};
firebase.initializeApp(config);
//firebase auth logout
const btnlogout = document.getElementById("logout");
btnlogout.addEventListener('click',e=>{
    firebase.auth().signOut();
    document.cookie="username=;";
    window.location = "login.php";
});

/*var uid = document.cookie.split(";")[0].split("=")[1];
console.log(uid);
if(uid==""){
    window.location="login.php";
}
*/
var uid;
firebase.auth().onAuthStateChanged(function (user) {
    if(user){
        //console.log("Login Successfull");
        uid = user['uid'];
    }
    else{
        console.log("No logged in");
        window.location = "login.php";
    }
});