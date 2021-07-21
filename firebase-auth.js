firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      if(window.location.pathname != "/AdminWeb/pages/dashboard.php" && window.location.pathname != "/AdminWeb/pages/tables.php"){
        console.log(window.location)
       window.location.pathname = "/AdminWeb/pages/dashboard.php"
      }
      // ...
    } else {
      // User is signed out
      if(window.location.pathname != "/AdminWeb/pages/sign-in.php"){
        console.log(window.location)
        window.location.pathname = "/AdminWeb/pages/sign-in.php"
      }
      // ...
    }
  });





//login
function login(){
    // get user info
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value;

    if(email != null){
        document.getElementById('errorMsg').innerHTML='';


        firebase.firestore().collection("users").where("Email", "==", email)
    .get()
    .then((querySnapshot) => {
      if(!querySnapshot.empty){

              querySnapshot.forEach((doc) => {
                firebase.auth().signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
              // Signed in 
              var user = userCredential.user;
              // ...
          })
          .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              document.getElementById('errorMsg').innerHTML = errorMessage;
              // ..
          });


          });

      }

      else{
        document.getElementById('errorMsg').innerHTML = "Invalid Email";
      }
        
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });



        





    }
    else{
      document.getElementById('errorMsg').innerHTML='Please Enter Email';
  }
    
}
    
//login


function logout(){
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });

}
//logout


//reset password
function resetPassword(){
  
  const email = document.getElementById('email').value
  firebase.auth().sendPasswordResetEmail(email)
  .then(() => {
    // Password reset email sent!
    
    document.getElementById('errorMsg').innerHTML= 'Reset Email Sent';
    // ..
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    document.getElementById('errorMsg').innerHTML= errorMessage;
    // ..
  });
}

