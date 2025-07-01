const visualizer = document.getElementById('visualizer');

const hands = new Hands({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
});
hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.7
});

hands.onResults(onResults);

const cameraFeed = new Camera(camera, {
    onFrame: async () => {
        await hands.send({ image: camera });
    },
});

cameraFeed.start();

function onResults(results) {
    const ctx = visualizer.getContext('2d');
    ctx.clearRect(0, 0, visualizer.width, visualizer.height);
    if (!results.multiHandLandmarks || results.multiHandLandmarks.length === 0) return;

    const landmarks = results.multiHandLandmarks[0];
    drawAllLandmarks(landmarks);
}

function drawAllLandmarks(landmarks) {
    const ctx = visualizer.getContext('2d');
    ctx.clearRect(0, 0, visualizer.width, visualizer.height);

    for (let i = 0; i < landmarks.length; i++) {
        const x = landmarks[i].x * visualizer.width;
        const y = landmarks[i].y * visualizer.height;

        ctx.beginPath();
        ctx.arc(x, y, 6, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
    }
}