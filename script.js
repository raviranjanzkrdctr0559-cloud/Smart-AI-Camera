const video = document.getElementById("video");
const canvas = document.getElementById("canvas");

const captureBtn = document.getElementById("capture");
const switchBtn = document.getElementById("switch");

let currentCamera = "user";
video.srcObject = currentStream;
await video.play();

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

// Photo Capture with Timer
captureBtn.addEventListener("click", () => {

    let count = timerSeconds;

    countdown.style.display = "block";
    countdown.innerHTML = count;

    const interval = setInterval(() => {

        count--;

        if (count > 0) {

            countdown.innerHTML = count;

        } else {

            clearInterval(interval);

            countdown.style.display = "none";

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0);

            const link = document.createElement("a");
            link.download = "photo.png";
            link.href = canvas.toDataURL("image/png");
            link.click();

        }

    },1000);

});

// App Start
startCamera();
const recordBtn = document.getElementById("record");

let mediaRecorder;
let recordedChunks = [];
let recording = false;

recordBtn.addEventListener("click", () => {

    if (!recording) {

        recordedChunks = [];

        mediaRecorder = new MediaRecorder(currentStream);

        mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
                recordedChunks.push(e.data);
            }
        };

        mediaRecorder.onstop = () => {

            const blob = new Blob(recordedChunks, {
                type: "video/webm"
            });

            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "video.webm";
            a.click();

            URL.revokeObjectURL(url);

        };

        mediaRecorder.start();

        recordBtn.innerHTML = "⏹ Stop";

        recording = true;

    } else {

        mediaRecorder.stop();

        recordBtn.innerHTML = "🎥 Record";

        recording = false;

    }

});

const timerBtn = document.getElementById("timer");
const countdown = document.getElementById("countdown");

let timerSeconds = 3;

timerBtn.addEventListener("click", () => {

    timerSeconds++;

    if (timerSeconds > 10) timerSeconds = 3;

    timerBtn.textContent = "⏱️ " + timerSeconds + "s";

});
