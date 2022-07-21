var uid = document.cookie.split(";")[0].split("=")[1];
//console.log(uid);
if(uid==""){
    window.location="login.php";
}

function getWeatherData(){
	//call the api
	const url = " enter weather api url"; // accuweather url to get json data 
	var request = new XMLHttpRequest();
	var weatherData;
	// Open a new connection, using the GET request on the URL endpoint
	request.open('GET', url, true);

	request.onload = function () {
	  // Begin accessing JSON data here
	  var data = JSON.parse(this.response);

	  if (request.status >= 200 && request.status < 400) {
		weatherData = data[0];
		var date = new Date().toDateString();
		console.log("I am getWeatherData");
		//console.log(date);
		//console.log(weatherData);
		firebase.database().ref(uid+'/weather/date').set(date);
		firebase.database().ref(uid+'/weather/weatherData').set(weatherData);

	  } else {
		weatherData = "error";
		console.log('error');
	  }
	}

	// Send request
	request.send();
	//return data
    return weatherData;
}
console.log(uid);
// noinspection JSUnusedAssignment
// noinspection JSUnusedAssignment
// noinspection JSUnusedAssignment
firebase.database().ref(uid+"/weather").on("value",function(snapshot){
    var obj = snapshot.val();

    console.log("object=",uid);
    
    if(!(obj && obj !== 'null' && obj !== 'undefined')){
    	console.log("Undefined called");
    	getWeatherData();
    }
    else{
	    var key = obj['date'];
	    //console.log(key);
	    var date = new Date().toDateString();
	    //console.log(date);
	    
	    if(key!=date){
	    	console.log("date is not matched");
	    	getWeatherData();
	    }
	}
}); 