/*
const visualizer = document.getElementById('visualizer');
const context = new AudioContext()
const analyzerNode = new AnalyserNode(context, { fftsize: 256 })
let mediaStream;
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
} */