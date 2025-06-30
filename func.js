let camera = document.getElementById('camera-stream')
let startVid = document.getElementById('start-camera')
let endVid = document.getElementById('stop-camera')


const visualizer = document.getElementById('visualizer');

const context = new AudioContext()
const analyzerNode = new AnalyserNode(context, { fftsize: 256 })

setupContext()
drawVisualizer()

async function setupContext() {
    const instrument = await getInstrument()
    if (context.state === 'suspended') {
        await context.resume()
    }
    const source = context.createMediaStreamSource()
    source
        .connect(analyzerNode)
        .connect(context.destination)
}

function getInstrument() {
    return navigator.mediaDevices.getUserMedia({
        audio: {
            echoCancellation: false,
            autoGainControl: false,
            noiseSuppression: false,
            latency: 0
        }
    })
}

function drawVisualizer() {
    requestAnimationFrame(drawVisualizer)
    const bufferLength = analyzerNode.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)
    analyzerNode.getByteFrequencyData(dataArray)
    const width = visualizer.width
    const height = visualizer.height
    const barWidth = width / bufferLength
    const canvasContext = visualizer.getContext('2d')
    canvasContext.clearRect(0, 0, width, height)

    dataArray.forEach((item, index) => {
        const y = item / 255 * height / 2
        const x = barWidth * index

        canvasContext.fillStyle = 'rgb(0,0,0)'
        canvasContext.fillRect(x, height - y, barWidth, y)
    })
}

let mediaStream;

startVid.addEventListener('click', async () => {
    try {
        const constraints = {
            audio: {
                echoCancellation: true,
                noiseSuppression: true
            },
            video: {
                width: {
                    ideal: 1280
                },
                height: {
                    ideal: 720
                }
            }
        };
        mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        camera.srcObject = mediaStream;
        startVid.disabled = true;
        endVid.disabled = false;
    } catch (error) {
        alert(`Permission denied or no device found: ${err.message}`);
        console.error(err);
    }
})

endVid.addEventListener('click', async () => {
    if (!mediaStream) return;
    mediaStream.getTracks().forEach((track) => {
        track.stop();
    });

    camera.srcObject = null;
    startVid.disabled = false;
    endVid.disabled = true;
}); 


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

camera.addEventListener('loadedmetadata', () => {
  visualizer.width = camera.videoWidth;
  visualizer.height = camera.videoHeight;
});

cameraFeed.start();
function onResults(results) {
  if (!results.multiHandLandmarks || results.multiHandLandmarks.length === 0) return;

  const landmarks = results.multiHandLandmarks[0];
  drawAllLandmarks(landmarks); // <== draw all 21 dots
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