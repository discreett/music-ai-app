let camera = document.getElementById('camera-stream')
let startVid = document.getElementById('start-camera')
let endVid = document.getElementById('stop-camera')

let mediaStream;

async function startCameraEvent() {
    try {
        const constraints = {
            'video': true,
            'audio': true
        };
        mediastream = await navigator.mediaDevices.getUserMedia(constraints);
        camera.srcObject = mediastream;
        startVid.disabled = true;
        endVid.disabled = false;
    } catch (error) {
        alert(`Permission denied or no device found: ${err.message}`);
        console.error(err);
    }
}

startVid.addEventListener('click', () => startCameraEvent())
