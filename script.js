const switchBtn = document.getElementById("switch");

let currentCamera = "environment";
let currentStream;

async function startCamera() {

    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
    }

    try {

        currentStream = await navigator.mediaDevices.getUserMedia({

            video: {
                facingMode: currentCamera
            },
            audio: true

        });

        video.srcObject = currentStream;

    } catch (err) {

        alert("Camera Error");

    }

}

switchBtn.addEventListener("click", () => {

    currentCamera =
        currentCamera === "environment"
            ? "user"
            : "environment";

    startCamera();

});
