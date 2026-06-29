const video = document.getElementById("video");
const canvas = document.getElementById("canvas");

const captureBtn = document.getElementById("capture");
const switchBtn = document.getElementById("switch");

let currentCamera = "environment";
let currentStream;

// Camera Start
async function startCamera() {

    // Purana camera band karo
    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
    }

    try {

        currentStream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: currentCamera
            },
            audio: false
        });

        video.srcObject = currentStream;

    } catch (err) {
        alert("Camera Error: " + err.message);
    }
}

// Camera Switch
switchBtn.addEventListener("click", () => {

    currentCamera =
        currentCamera === "environment"
            ? "user"
            : "environment";

    startCamera();

});

// Photo Capture
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

// App Start
startCamera();
