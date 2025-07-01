const camera = document.getElementById('camera-stream')
const startVid = document.getElementById('start-camera')
const endVid = document.getElementById('stop-camera')

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
