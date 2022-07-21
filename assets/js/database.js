var uid = document.cookie.split(";")[0].split("=")[1];
//console.log(uid);
if(uid==""){
    window.location="login.php";
}
var threshold={ //enter your sensor calibrated threshold value yourself
    'humidity' : 95,
    'temparature' : 35,
    'soilmoisture' : 50,
    'sunintensity' : 600,
    'smoke':1000
};
//read data form firebase
firebase.database().ref(uid+"/sensor/").on("value",function(snapshot){
    data = snapshot.val();
   // console.log(data);
    for(var i in data){
      //  console.log(i+" : "+data[i]);
        if(i=="pump") {
            if(data[i]=="1"){
            	document.getElementById(i).innerHTML = "pump on";
                document.getElementById("pumpimg").src="assets/images/tapon.png";
            }
            else{
            	document.getElementById(i).innerHTML = "pump off";
                document.getElementById("pumpimg").src="assets/images/tapoff.png";
            }
        }
        else{
            document.getElementById(i).style.backgroundColor = "#fff";
            document.getElementById(i).style.color = "#000";
        	document.getElementById(i).innerHTML = data[i];
        }

    }
    //check threshold
    for(var i in data){
        if(i=='pump')
                continue;
        else if(data[i]>threshold[i]){
            document.getElementById(i).style.backgroundColor = "#d9534f";
            document.getElementById(i).style.color = "#fff";
            //$msg = i+" crossed the threshold value. Please check the the system. "+i+" = "+data[i];
            //window.alert($msg);
            window.location.href='sendAlert.php?param='+i+"&value="+data[i];
        }
    }
});

const btn_on = document.getElementById("buttonOn");
const btnoff = document.getElementById("buttonOff");
btn_on.addEventListener('click', e=>{
  // console.log("Button on");
   insertfb(1);
});
btnoff.addEventListener('click',e=>{
   // console.log("button off");
    insertfb(0);
});

//writing data to database
function insertfb(pumpstate){
    console.log(pumpstate);
    firebase.database().ref(uid+"/sensor/pump").set(pumpstate);
}

