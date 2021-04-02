window.onload = () => {

    class Virus{
        constructor(){
            this.img = ''
            this.sound = 0
            this.width = 80
            this.height = 80
            this.x = Math.floor(Math.random()*(ctx.canvas.width - this.width))
            this.y = Math.floor(Math.random()*(ctx.canvas.height - this.height))
        }
        renderViruses(){
            this.img = new Image()
            this.img.src = '/images/Virus2.png'
        }

        drawSelf(){
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        }
    }

    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(30, 243, 255, 0.40)'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    let gameOver = false
 
    let backgroundAudio
    let score = 0

    const arrayOfVirus = []

    //DOM MANIPULATION
    document.querySelector('#new-game').onclick = () => {
        startGame()
    }

    const startGame = () => {
        virus.renderViruses()
        loadAudios()

        updateCanvas()
    }

    const loadAudios = () => {
        backgroundAudio = new Audio('/sounds/Background-song.mp3')
        backgroundAudio.loop
        backgroundAudio.volume = 0.2

    }

    const clearCanvas = () => {
        ctx.clearRect(0, 0, ctx.canvas. width, ctx.canvas.height)
    }

    const drawBackground = () => {
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    }

    // const virus = new Virus()
    // virus.renderViruses()
    // virus.drawSelf()

}


