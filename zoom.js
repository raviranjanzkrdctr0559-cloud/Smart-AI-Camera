const zoomValue = document.getElementById("zoomValue");
const cameraVideo = document.getElementById("video");

let currentZoom = 1;
let targetZoom = 1;

function updateZoom(value) {

    if (value < 1) value = 1;
    if (value > 3) value = 3;

    targetZoom = value;
}

function animateZoom() {

    currentZoom += (targetZoom - currentZoom) * 0.45;

    zoomValue.textContent = currentZoom.toFixed(1) + "x";

    cameraVideo.style.transform = `scale(${currentZoom})`;

    requestAnimationFrame(animateZoom);
}

animateZoom();
