window.onload = () => {
    // CLASS VIRUS.
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
            this.virusImg.src = './images/greenVIRUS.png'
            this.virusDeathImage = new Image()
            this.virusDeathImage.src = './images/greenVIRUSdead.png'
        }

        drawSelf(){
            ctx.drawImage(this.virusImg, this.x, this.y, this.size, this.size)
        }

        drawDead(){
            ctx.drawImage(this.virusDeathImage, this.x, this.y, this.size, this.size)
        }
    }

    // VARIABLES DELCARED.
    const canvas = document.getElementById('canvas') // CANVAS SELECTOR.
    const ctx = canvas.getContext('2d') // SETTING 2D ENVIROMENT.
    const canvasLeft = canvas.offsetLeft + canvas.clientLeft // GET CANVAS X=0 POSITION ON SCREEN.
    const canvasTop = canvas.offsetTop + canvas.clientTop // GET CANVAS Y=0 POSITION ON SCREEN.

    const newGameButton = document.querySelector('#new-game') // NEW GAME BUTTON SELECTOR
    const soundButton = document.querySelector('#sound') // SOUND BUTTON SELECTOR FOR MUTE OR UNMUTE
    const instructionsButton = document.querySelector('#instructions-button') // INSTRUCTIONS BUTTON SELECTOR TO DISPLAY INSTRUCTIONS
    const instructionsDiv = document.querySelector('#instructions-div') // INSTRUCTIONS DIV TO DISPLAY
    const restartButton = document.querySelector('#restart') // RESTART BUTTON TO RESTART THE GAME


    const intro = document.querySelector('#Intro') // INTRODUCTION DIV SELECTOR.
    const soundON = document.querySelector('#soundON') // SPEAKER BLACK IMG.
    const soundOFF = document.querySelector('#soundOFF') // SPEAKER GREY IMAGE.

    const gameOverScreenScore = document.querySelector('#gameOver-scoreSpan') // GAMEOVER SHOW SCORE SPAN SELECTOR.
    const gameOverScreen = document.querySelector('#game-over') // GAMEOVER DIV SELECTOR.

    const skullImg = document.querySelector('#skull') // SKULL IMAGE SELECTOR FOR GAMEOVER.
    const lifesIMGs = document.querySelectorAll('#lifes img') // LIKES IMGS SELECTOR FOR LOOSING LIFES.
    const lifesArray = [...lifesIMGs] // COPY OF ALL IMG ELEMENTES OF LIFES.

    let gameOver = false // GAME OVER CHECK VARIABLE.
    let gameLoop = true
    let lifes = 5 // NUMBER OF LIFES YOU HAVE BEFORE GAMEOVER/
 
    let backgroundAudio // INITIALIZE BACKGROUND AUDIO.
    let splashAudio // INITIALIZE SPLASH AUDIO.
    let gameOverAudio // INITIALIZE GAME OVER AUDIO.
    let lifeLost // INITIALIZE LIFE LOST AUDIO.

    let score = 0 // SCORE VARIABLE FOR DISPLAY AND COUNT.
    let counterOfVirusOnScreen = 0  // COUNTER OF VIRUS ON SCREEN SO THAT IF ITS >= TO 5 IT STARTS LOOSING LIFES.
    let cooldownForLifeOff = 250 // ITS A COOLDOWN TIME(COUNTER) SO IT DOESNT LOOSE ALL THE LIFES AT ONCE.

    const arrayOfVirus = [] // ARRAY WHERE I PUSH MY VIRUS ONCE CREATED AND WHERE I GET THEM FROM TO DRAW THEM

    let virusCreationCounter = 0 // ITS A COUNTER FOR SPEED OF VIRUS CREATION
    let difficulty = 0 // A COUNTER TO ADD DIFFICULTY AS YOU PROGRESS THROUGH THE GAME

    // PAINT BACKGROUND FIRST TIME 
    ctx.fillStyle = 'rgba(30, 243, 255, 0.40)' // COLOR OF BACKGROUND OF CANVAS.
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height) // DRAW BACKGROUND.

    // NEW GAME BUTTON
    newGameButton.onclick = () => {
        startGame()
        newGameButton.disabled = true
        instructionsButton.disabled = true
    }

    // START GAME FUNCTION ON CLICK
    const startGame = () => {
        intro.classList.add('display-none')
        instructionsDiv.classList.add("display-none")
        loadAudios()
        backgroundAudio.play()       
        updateCanvas()
    }

    // LOAD AUDIOS 
    const loadAudios = () => {
        backgroundAudio = new Audio('./sounds/Background-song.mp3')
        backgroundAudio.loop
        backgroundAudio.volume = 0.1

        splashAudio = new Audio('./sounds/virusDeath.mp3')
        splashAudio.volume = 0.1

        gameOverAudio = new Audio('./sounds/gameover.mp3')
        gameOverAudio.volume = 0.5

        lifeLost = new Audio('./sounds/lifeLost.mp3')
        lifeLost.volume = 0.1
    }

    // CLEAR WHOLE CANVAS
    const clearCanvas = () => {
        ctx.clearRect(0, 0, ctx.canvas. width, ctx.canvas.height)
    }

    // DRAW BLUE BACKGROUND
    const drawBackground = () => {
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    }

    // VIRUS CREATION
    const createVirus = () => {
        virusCreationCounter ++
        if (virusCreationCounter === 170){
            const virus = new Virus()
            virus.renderViruses()
            arrayOfVirus.push(virus)
            counterOfVirusOnScreen++
            virusCreationCounter = difficulty
        }
    }

    // VIRUS DRAWING ON SCREEN
    const drawVirus = () =>{
        arrayOfVirus.forEach((virus)=>{
            virus.drawSelf()       
        })
    }

    // CANVAS CLICK EVENT LISTENER
    canvas.onclick = (event) => {
        let canvasX = event.pageX - canvasLeft
        let canvasY = event.pageY - canvasTop

        arrayOfVirus.forEach((virus, index)=>{
            let virusYandHeight = virus.y + virus.size
            let virusXandWidth = virus.x + virus.size
            // CHECK FOR VIRUS ON POSITION CLICKED
            if (canvasY > virus.y && canvasY < virusYandHeight && canvasX > virus.x && canvasX < virusXandWidth){
                arrayOfVirus.splice(index, 1)
                splashAudio.play()
                score++
                counterOfVirusOnScreen--
            }
        })
    }

    // CHECK NUMBER OF VIRUS ON SCREEN TO LOOSE LIFES
    const checkNumberOfVirusOnScreen = () => {
        cooldownForLifeOff++
        if (cooldownForLifeOff >= 250){
            if (counterOfVirusOnScreen >= 5){
            lifesArray[lifes].classList.add('display-none')
            lifeLost.play()
            lifes--
            cooldownForLifeOff = 0
            }
        }
    }

    // TRANSFORM SCORE INTO 3 DIGITS FOR DISPLAY
    const threeDigitsScore = (score) => {
        if(score < 10){
            return `00${score}`
        }else if(score < 100){
            return `0${score}`
        }else{
            return `${score}`
        }
    }

    // DISPLAY SCORE
    const renderScore = () => {
        const scoreSpan = document.querySelector('#score')
        scoreSpan.innerText = threeDigitsScore(score)
    }

    // CHECK SCORE FOR LVL UP
    const checkScoreLevelUp = () => {
        if (score >= 170){
            difficulty = 170
        }else if (score >= 140){
            difficulty = 140
            console.log('lvl up. LVL MAX')
        }else if (score >= 110){
            difficulty = 110
            console.log('lvl up. LVL 4')
        }else if (score >= 90){
            difficulty = 90
            console.log('lvl up. LVL 3')
        }else if (score >=60){
            difficulty = 60
            console.log('lvl up. LVL 2')
        }else if (score >= 30){
            difficulty = 30
            console.log('lvl up. LVL 1')
        }else{
            difficulty = 0
        }
    }

    // CHECK NUMBER OF LIFES TO CHECK GAME OVER
    const checkLifes = () => {
        if (lifes === 0){
            gameOver = true
            skullImg.className = ''
        }
    }

    // GAME LOOP
    const updateCanvas = () => {
        if (!gameOver){
            clearCanvas()
            drawBackground()
            createVirus()
            drawVirus()
            checkNumberOfVirusOnScreen()
            renderScore()
            checkScoreLevelUp()
            checkLifes()
        }else{
            gameLoop = false
            gameOverScreen.classList.remove('display-none')
            gameOverScreenScore.innerText = threeDigitsScore(score)
            backgroundAudio.pause()
            gameOverAudio.play()
        }
        if(gameLoop){
            requestAnimationFrame(updateCanvas)
        }  
    }

    // SOUND BUTTON EVENT LISTENER
    soundButton.addEventListener('click', ()=>{
        soundButton.classList.toggle('muted')
        if (!soundButton.classList.contains('muted')){
            backgroundAudio.muted = false
            splashAudio.muted = false
            soundOFF.classList.add("display-none")
            soundON.classList.remove("display-none")

        }else{
            backgroundAudio.muted = true
            splashAudio.muted = true
            soundON.classList.add("display-none")
            soundOFF.classList.remove("display-none")
        }
    })

    // INSTRUCTIONS BUTTON EVENT LISTENER   
    instructionsButton.onclick = ()=>{
        instructionsDiv.classList.toggle('display-none')
        if (!instructionsDiv.classList.contains('display-none')){
            instructionsDiv.classList.remove('display-none')
            intro.classList.add('display-none')
        }else{
            instructionsDiv.classList.add("display-none")
            intro.classList.remove('display-none')
        }
    }

    // RESTART BUTTON
    restartButton.addEventListener('click', () => {
        location.reload()
    })
}