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
const canvas = document.getElementById("canvas");
const captureBtn = document.getElementById("capture");

captureBtn.addEventListener("click", () => {

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const link = document.createElement("a");
    link.download = "photo.png";
    link.href = canvas.toDataURL("image/png");
    link.click();

});
