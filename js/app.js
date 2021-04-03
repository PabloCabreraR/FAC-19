window.onload = () => {
    // CLASS VIRUS
    class Virus{
        constructor(){
            this.virusImg = ''
            this.virusDeathImage = ''
            this.sound = 0
            this.size = Math.floor(Math.random()*(90)) + 50
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
            return true
        }
    }
    // VARIABLES DELCARED
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    const canvasLeft = canvas.offsetLeft + canvas.clientLeft // GET CANVAS X=0 POSITION ON SCREEN
    const canvasTop = canvas.offsetTop + canvas.clientTop // GET CANVAS Y=0 POSITION ON SCREEN

    ctx.fillStyle = 'rgba(30, 243, 255, 0.40)' // COLOR OF BACKGROUND OF CANVAS
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height) // DRAW BACKGROUND

    let gameOver = false // GAME OVER CHECK VARIABLE
 
    let backgroundAudio // INITIALIZE BACKGROUND AUDIO
    let splashAudio // INITIALIZE SPLASH AUDIO
    let score = 0 // SCORE VARIABLE FOR DISPLAY AND COUNT
    let lvl = 144

    const arrayOfVirus = []

    // NEW GAME BUTTON AND FUNCTION
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
        })
    }

    // CANVAS CLICK EVENT LISTENER
    canvas.onclick = (event) => {
        let canvasX = event.pageX - canvasLeft
        let canvasY = event.pageY - canvasTop

        console.log('click screen')
        arrayOfVirus.forEach((virus, index)=>{
            let virusYandHeight = virus.y + virus.size
            let virusXandWidth = virus.x + virus.size
            // CHECK FOR VIRUS ON POSITION CLICKED
            if (canvasY > virus.y && canvasY < virusYandHeight && canvasX > virus.x && canvasX < virusXandWidth){
                splashAudio.play()
                arrayOfVirus.splice(index, 1)
                score++
            }
        })
    }
    // TRANSFORM SCORE INTO 3 DIGITS FOR DISPLAY
    const threeDigitsScore = () => {

    }

    // DISPLAY SCORE
    const renderScore = () => {
        const scoreSpan = document.querySelector('#score')
        scoreSpan.innerText = threeDigitsScore(score)
    }
    
    // GAME LOOP
    const updateCanvas = () => {
        if (!gameOver){
            clearCanvas()
            drawBackground()
            createVirus()
            drawVirus()
            renderScore()
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


