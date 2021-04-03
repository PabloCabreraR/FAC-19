window.onload = () => {

    class Virus{
        constructor(){
            this.virusImg = ''
            this.virusDeathImage = ''
            this.sound = 0
            this.size = Math.floor(Math.random()*(80)) + 60
            this.x = Math.floor(Math.random()*(ctx.canvas.width - this.size))
            this.y = Math.floor(Math.random()*(ctx.canvas.height - this.size))
        }

        renderViruses(){
            this.virusImg = new Image()
            this.virusImg.src = '/images/Virus2.png'
            this.virusDeathImage = new Image()
            this.virusDeathImage.src = '/images/virus2deleted.png'
        }

        drawSelf(){
            ctx.drawImage(this.virusImg, this.x, this.y, this.size, this.size)
        }
    }

    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(30, 243, 255, 0.40)'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    let gameOver = false
 
    let backgroundAudio
    let splashAudio
    let score = 0
    let lvl = 144

    const arrayOfVirus = []
    const onScreenVirus = []

    // NEW GAME BUTTON
    let newGameButton = document.querySelector('#new-game')
    newGameButton.onclick = () => {
        startGame()
        newGameButton.disabled = true
    }

    const startGame = () => {
        loadAudios()
        backgroundAudio.play()
        splashAudio.play()        
        updateCanvas()
    }

    // LOAD AUDIOS 
    const loadAudios = () => {
        backgroundAudio = new Audio('/sounds/Background-song.mp3')
        backgroundAudio.loop
        backgroundAudio.volume = 0.1

        splashAudio = new Audio('/sounds/virusDead.mp3')
        splashAudio.volume = 0.1
    }


    // CLEAR WHOLE CANVAS
    const clearCanvas = () => {
        ctx.clearRect(0, 0, ctx.canvas. width, ctx.canvas.height)
    }

    // DRAW BLUE BACKGROUND
    const drawBackground = () => {
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    }

    // VIRUS CREATION AND DRAWING
    let virusCreationCounter = 0
    let difficulty = 0

    const createVirus = () => {
        virusCreationCounter ++
        if (virusCreationCounter === 180){
            const virus = new Virus()
            virus.renderViruses()
            arrayOfVirus.push(virus)
            virusCreationCounter = difficulty
        }
    }

    const drawVirus = () =>{
        arrayOfVirus.forEach((virus)=>{
            virus.drawSelf()
            onScreenVirus.push(virus)
        })
    }

    // CHECK CLICK ON VIRUS



    
    // GAME LOOP
    const updateCanvas = () => {
        if (!gameOver){
            clearCanvas()
            drawBackground()
            createVirus()
            drawVirus()
            // checkClick()
            onScreenVirus.forEach((virus)=>{
                virus.onclick = ()=> {

                }
            })
        }
        requestAnimationFrame(updateCanvas)
    }

    // SOUND BUTTON
    let soundButton = document.querySelector('#sound')
    soundButton.addEventListener('click', ()=>{
        soundButton.classList.toggle('muted')
        if (!soundButton.classList.contains('muted')){
            backgroundAudio.muted = false
            splashAudio.muted = false
            console.log('audio on')
        }else{
            backgroundAudio.muted = true
            splashAudio.muted = true
            console.log('audio off')
        }
    })
    
}


