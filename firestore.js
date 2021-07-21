

var stdNo = 0;
function populateAllUsers(){
  // firebase.firestore().collection("users").get().then((querySnapshot) => {
  //   stdNo = 0;
  //   querySnapshot.forEach((doc) => {
  //       // doc.data() is never undefined for query doc snapshots
  //       firebase.firestore().collection("users").doc(doc.id)
  //   .withConverter(userConverter)
  //   .get().then((doc) => {
  //     if (doc.exists){
  //       // Convert to City object
  //       var user = doc.data();
  //       // Use a City instance method

  //       var First_Name = user.First_Name;
  //       var Last_Name =  user.Last_Name;
  //       var Email = user.Email;
  //       var Student_ID = user.Student_ID;
  //       var Account_Balance = user.Account_Balance;
  //       var Phone_Number = user.Phone_Number;
  //       var Card_Id = user.Card_Id;

  //       AddItemsToTable(First_Name,Last_Name,Email,Student_ID,Account_Balance,Phone_Number,Card_Id);
        
  //     } else {
  //       console.log("No such document!");
  //     }}).catch((error) => {
  //       console.log("Error getting document:", error);
  //     });
  //   });
  // });
}

//populateAllUsers();
    











function AddItemsToTable(First_Name,Last_Name,Email,Student_ID,Account_Balance,Phone_Number,Card_Id){
  var tbody = document.getElementById('tbody');
  var trow = document.createElement('tr');
  var td1 = document.createElement('td');
  var td2 = document.createElement('td');
  var td3 = document.createElement('td');
  var td4 = document.createElement('td');
  var td5 = document.createElement('td');
  
  var studentNumber = document.getElementById('number-of-students');

  if(Card_Id == ""){
    Card_Id = "-";
  }
                        
  ++stdNo;
  studentNumber.innerHTML = "Total : " + stdNo;
  td1.innerHTML = "<div class='d-flex px-2 py-1'><div class='d-flex flex-column justify-content-center'> <h6 class='mb-0 text-sm'>"+First_Name+ " "+Last_Name+"</h6><p class='text-xs text-secondary mb-1'>"+Email+"</p><p class='text-xs text-secondary mb-0'>"+Phone_Number+"</p></div></div>";
  td2.innerHTML = "<p class='text-xs font-weight-bold mb-0'>"+Student_ID+"</p>";
  td3.innerHTML = "<p class='text-xs font-weight-bold mb-0'> GH¢ "+Account_Balance+"</p>";
  td3.className = "align-middle text-center text-sm";
  td4.innerHTML = "<p class='text-xs font-weight-bold mb-0'> "+Card_Id+"</p>";
  td4.className = "align-middle text-center text";
  td5.innerHTML = "<button onclick='viewTransactionHistory("+Student_ID+")' class='btn bg-gradient-info w-100 mt-4 mb-0' data-toggle='tooltip' data-original-title='View Transaction History'>View Transaction History</button></td>";
  td5.className = "align-middle";
  trow.appendChild(td1); trow.appendChild(td2); trow.appendChild(td3); trow.appendChild(td4); trow.appendChild(td5);
  tbody.appendChild(trow);
}




let timeout = null;


function searchWithName(){

  document.getElementById("search-with-id").value = '';
  
  var tbody = document.getElementById('tbody');
  var x = document.getElementById("search-with-name").value;
  var end = x.replace(/.$/, c => String.fromCharCode(c.charCodeAt(0) + 1));
  tbody.innerHTML = "";

  if(x != ""){
  clearTimeout(timeout);


  timeout = setTimeout(function () {
    firebase.firestore().collection("users").where("Last_Name", ">=", x).where("Last_Name", "<", end)
    .get()
    .then((querySnapshot) => {
      stdNo = 0;
        querySnapshot.forEach((doc) => {

        
            firebase.firestore().collection("users").doc(doc.id)
              .withConverter(userConverter)
              .get().then((doc) => {
                if (doc.exists){
                  
                  var user = doc.data();

                  var First_Name = user.First_Name;
                  var Last_Name =  user.Last_Name;
                  var Email = user.Email;
                  var Student_ID = user.Student_ID;
                  var Account_Balance = user.Account_Balance;
                  var Phone_Number = user.Phone_Number;
                  var Card_Id = user.Card_Id;

                  AddItemsToTable(First_Name,Last_Name,Email,Student_ID,Account_Balance,Phone_Number,Card_Id);
                  
                } else {
                  console.log("No such document!");
                }}).catch((error) => {
                  console.log("Error getting document:", error);
                });
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}, 500);
}
else{
  clearTimeout(timeout);

  timeout = setTimeout(function () {
  populateAllUsers();
  
}, 500);
}
  



}


function searchWithID(){

  
  document.getElementById("search-with-name").value = '';
  
  var tbody = document.getElementById('tbody');
  var x = document.getElementById("search-with-id").value;
  var end = x.replace(/.$/, c => String.fromCharCode(c.charCodeAt(0) + 1));
  tbody.innerHTML = "";

  if(x != ""){
  clearTimeout(timeout);


  timeout = setTimeout(function () {
    firebase.firestore().collection("users").where("Student_ID", ">=", x).where("Student_ID", "<", end)
    .get()
    .then((querySnapshot) => {
      stdNo = 0;
        querySnapshot.forEach((doc) => {

        
            firebase.firestore().collection("users").doc(doc.id)
              .withConverter(userConverter)
              .get().then((doc) => {
                if (doc.exists){
                  
                  var user = doc.data();

                  var First_Name = user.First_Name;
                  var Last_Name =  user.Last_Name;
                  var Email = user.Email;
                  var Student_ID = user.Student_ID;
                  var Account_Balance = user.Account_Balance;
                  var Phone_Number = user.Phone_Number;
                  var Card_Id = user.Card_Id;

                  AddItemsToTable(First_Name,Last_Name,Email,Student_ID,Account_Balance,Phone_Number,Card_Id);
                  
                } else {
                  console.log("No such document!");
                }}).catch((error) => {
                  console.log("Error getting document:", error);
                });
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}, 500);
}
else{
  clearTimeout(timeout);

  timeout = setTimeout(function () {
  populateAllUsers();
  
}, 500);
}
  



}


function viewTransactionHistory(Student_ID){

  firebase.firestore().collection("users").where("Student_ID", "==", Student_ID.toString())
    .get()
    .then((querySnapshot) => {
      if(!querySnapshot.empty){
        querySnapshot.forEach((doc) => {

          
          
          // var First_Name = user.First_Name;
          // var Last_Name =  user.Last_Name;
          // var Email = user.Email;
          // var Student_ID = user.Student_ID;
          // var Account_Balance = user.Account_Balance;
          // var Phone_Number = user.Phone_Number;
          // var Card_Id = user.Card_Id;

          // AddItemsToTable(First_Name,Last_Name,Email,Student_ID,Account_Balance,Phone_Number,Card_Id);
                  

        });


      }

      else{
        console.log("ee no dey")
      }
        
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });


}












class User {
  constructor (First_Name, Last_Name, Email, Student_ID, Account_Balance, Phone_Number, Card_Id) {
      this.First_Name = First_Name;
      this.Last_Name = Last_Name;
      this.Email = Email;
      this.Student_ID = Student_ID;
      this.Account_Balance = Account_Balance;
      this.Phone_Number = Phone_Number;
      this.Card_Id = Card_Id;
  }
  toString() {
      return this.First_Name + ', ' + this.Last_Name + ', ' + this.Email + ', ' + this.Student_ID + ', ' + this.Account_Balance + ', ' + this.Phone_Number + ', ' + this.Card_Id;
  }
}

// Firestore data converter
var userConverter = {
  toFirestore: function(user) {
      return {
          First_Name : user.First_Name,
          Last_Name : user.Last_Name,
          Email : user.Email,
          Student_ID : user.Student_ID,
          Account_Balance : user.Account_Balance,
          Phone_Number : user.Phone_Number,
          Card_Id : user.Card_Id
          };
  },
  fromFirestore: function(snapshot, options){
      const data = snapshot.data(options);
      return new User(data.First_Name, data.Last_Name, data.Email, data.Student_ID, data.Account_Balance, data.Phone_Number, data.Card_Id);
  }
};








class Transaction {
  constructor (date_time,  status,  channel,  amount_hist,  reference) {
    this.date_time = date_time;
    this.status = status;
    this.channel = channel;
    this.amount_hist = amount_hist;
    this.reference = reference;
  }
  toString() {
      return this.date_time + ', ' + this.status + ', ' + this.channel + ', ' + this.amount_hist + ', ' + this.reference;
  }
}

// Firestore data converter
var transactionConverter = {
  toFirestore: function(transaction) {
      return {
        date_time : user.date_time,
        status : user.status,
        channel : user.channel,
        amount_hist : user.amount_hist,
        reference : user.reference
          };
  },
  fromFirestore: function(snapshot, options){
      const data = snapshot.data(options);
      return new Transaction(data.date_time, data.status, data.Email, data.channel, data.amount_hist, data.reference);
  }
};