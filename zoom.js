const zoomValue = document.getElementById("zoomValue");
const cameraVideo = document.getElementById("video");

let currentZoom = 1;

function updateZoom(value) {

    if (value < 1) value = 1;
    if (value > 5) value = 5;

    currentZoom = value;

    zoomValue.textContent = currentZoom.toFixed(1) + "x";

    // Digital Zoom
   cameraVideo.style.transform = `scale(${currentZoom})`;
}
