const video = document.getElementById("video");

async function startCamera(){

try{

const stream = await navigator.mediaDevices.getUserMedia({

video:{
facingMode:"environment"
},
audio:true

});

video.srcObject = stream;

}

catch(err){

alert("Camera Access Denied");

}

}

startCamera();
