const zoomValue = document.getElementById("zoomValue");

let currentZoom = 1;

function updateZoom(value) {
    currentZoom = value;
    zoomValue.textContent = value.toFixed(1) + "x";
}
