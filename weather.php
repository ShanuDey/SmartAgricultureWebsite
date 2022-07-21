<?php include("header.php"); ?>
<script type="text/javascript">
    var uid;
    firebase.auth().onAuthStateChanged(function (user) {
    if(user){
    //console.log("Login Successful");
    uid = user['uid'];
    }
    else{
    console.log("No logged in");
    window.location = "login.php";
    }
    });
</script>
<div class="container">
<table class="table table-sm table-light" align="center">
  <thead>
    <tr>
      <th scope="col">Parameter</th>
      <th scope="col">Value</th>
      <th scope="col">Unit</th>
    </tr>
  </thead>
  <tbody id="tableBody">
  <script type="text/javascript" src="assets/js/weatherApi.js"></script>

  <script type="text/javascript">
      firebase.database().ref(uid+"/weather/weatherData").once("value").then(function(snapshot){
          data = snapshot.val();
          //console.log(snapshot);
          var tb = document.getElementById("tableBody");
          var count=0;
          for (var i in data){
              if(typeof data[i]=='object'){
                  if(typeof data[i]['Metric']=='object'){
                      var tr = tableBody.insertRow(count++);
                      tr.insertCell(0).innerHTML = i;
                      tr.insertCell(1).innerHTML = data[i]['Metric']['Value'];
                      tr.insertCell(2).innerHTML = data[i]['Metric']['Unit'];
                      console.log(i,data[i]['Metric']['Value']);
                  }
              }
          }
      });

  </script>
  </tbody>
</table>


  </div>


    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
  </body>
</html>