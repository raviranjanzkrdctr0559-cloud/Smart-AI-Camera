// Smart AI Camera Gesture System

const statusBox = document.getElementById("status");
const videoElement = document.getElementById("video");

statusBox.innerHTML = "🤖 AI Loading...";

const hands = new Hands({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    }
});

hands.setOptions({
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.7
});

hands.onResults(onResults);

function onResults(results) {

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        statusBox.innerHTML = "✋ Hand Detected";
    } else {
        statusBox.innerHTML = "🤖 AI Ready";
    }

}

const camera = new Camera(videoElement, {
    onFrame: async () => {
        await hands.send({ image: videoElement });
    },
    width: 640,
    height: 480
});

camera.start();

console.log("Gesture.js Loaded");
