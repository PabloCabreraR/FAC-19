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
            this.virusImg.src = './images/Virus/greenVIRUS.png'
            this.virusDeathImage = new Image()
            this.virusDeathImage.src = './images/Virus/greenVIRUSdead.png'
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
    soundButton.disabled = true
    const instructionsButton = document.querySelector('#instructions-button') // INSTRUCTIONS BUTTON SELECTOR TO DISPLAY INSTRUCTIONS
    const instructionsDiv = document.querySelector('#instructions-div') // INSTRUCTIONS DIV TO DISPLAY
    const restartButton = document.querySelector('#restart') // RESTART BUTTON TO RESTART THE GAME

    const mouseCursor = document.querySelector('#cursor') // SELECT THE IMAGE FOR THE CURSOR

    const intro = document.querySelector('#Intro') // INTRODUCTION DIV SELECTOR.
    const soundON = document.querySelector('#soundON') // SPEAKER BLACK IMG.
    const soundOFF = document.querySelector('#soundOFF') // SPEAKER GREY IMAGE.

    const gameOverScreenScore = document.querySelector('#gameOver-scoreSpan') // GAMEOVER SHOW SCORE SPAN SELECTOR.
    const gameOverScreen = document.querySelector('#game-over') // GAMEOVER DIV SELECTOR.

    const subtitleImage = document.querySelector('#subtitleImage') // GET THE SUBTITLE IMAGE DIV TO CHANGE IT WITH LVLS UP
    const skullImg = document.querySelector('#skull') // SKULL IMAGE SELECTOR FOR GAMEOVER.
    const lifesIMGs = document.querySelectorAll('#lifes img') // LIKES IMGS SELECTOR FOR LOOSING LIFES.
    const lifesArray = [...lifesIMGs] // COPY OF ALL IMG ELEMENTES OF LIFES.

    let gameOver = false // GAME OVER CHECK VARIABLE.
    let gameLoop = true
    let lifes = 5 // NUMBER OF LIFES YOU HAVE BEFORE GAMEOVER/
    let LVL = 0 // TO CHANGE VIRUS COLORS
 
    let backgroundAudio // INITIALIZE BACKGROUND AUDIO.
    let splashAudio // INITIALIZE SPLASH AUDIO.
    let gameOverAudio // INITIALIZE GAME OVER AUDIO.
    let lifeLostAudio // INITIALIZE LIFE LOST AUDIO.

    let score = 0 // SCORE VARIABLE FOR DISPLAY AND COUNT.
    let counterOfVirusOnScreen = 0  // COUNTER OF VIRUS ON SCREEN SO THAT IF ITS >= TO 5 IT STARTS LOOSING LIFES.
    let cooldownForLifeOff = 250 // ITS A COOLDOWN TIME(COUNTER) SO IT DOESNT LOOSE ALL THE LIFES AT ONCE.
    let FPStoCheck // INITIALIZE A VARIABLE TO SET THE REFRESH RATE IN.

    const arrayOfVirus = [] // ARRAY WHERE I PUSH MY VIRUS ONCE CREATED AND WHERE I GET THEM FROM TO DRAW THEM
    const arryaOfDeadVirus = []

    let virusCreationCounter = 0 // ITS A COUNTER FOR SPEED OF VIRUS CREATION
    let difficulty = 0 // A COUNTER TO ADD DIFFICULTY AS YOU PROGRESS THROUGH THE GAME

    // PAINT BACKGROUND FIRST TIME 
    ctx.fillStyle = 'rgba(30, 243, 255, 0.40)' // COLOR OF BACKGROUND OF CANVAS.
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height) // DRAW BACKGROUND.

    // FONT STYLE FOR CANVAS LVL DISPLAY
    ctx.font = '30px PIXEL'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

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
        soundButton.disabled = false
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

        lifeLostAudio = new Audio('./sounds/lifeLost.mp3')
        lifeLostAudio.volume = 0.1
    }

    // CLEAR WHOLE CANVAS
    const clearCanvas = () => {
        ctx.clearRect(0, 0, ctx.canvas. width, ctx.canvas.height)
    }

    // DRAW BLUE BACKGROUND
    const drawBackground = () => {
        ctx.fillStyle = 'rgba(30, 243, 255, 0.40)'
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    }

    // VIRUS CREATION
    const createVirus = () => {
        virusCreationCounter ++
        if (FPStoCheck >= 100){
            if (virusCreationCounter === 150){
                const virus = new Virus()
                virus.renderViruses()
                arrayOfVirus.push(virus)
                counterOfVirusOnScreen++
                virusCreationCounter = difficulty
            }
        }else if (FPStoCheck < 100){
            if (virusCreationCounter === 100){
                const virus = new Virus()
                virus.renderViruses()
                arrayOfVirus.push(virus)
                counterOfVirusOnScreen++
                virusCreationCounter = difficulty
            }
        }       
    }

    // VIRUS DRAWING ON SCREEN
    const drawVirus = () =>{
        arrayOfVirus.forEach((virus)=>{
            virus.drawSelf()       
        })
    }

    const drawDeadVirus = () =>{
        arryaOfDeadVirus.forEach((virus)=>{
            virus.drawDead()       
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
                arryaOfDeadVirus.push(virus)
                arrayOfVirus.splice(index, 1)
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
            lifeLostAudio.play()
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
        if (FPStoCheck >= 100){
            if (score >= 120){
                drawLvlOnScreen(6)
                difficulty = 145
                changeColor(6)
            }else if (score >= 100){
                drawLvlOnScreen(5)
                difficulty = 125
                changeColor(5)
            }else if (score >= 80){
                drawLvlOnScreen(4)
                difficulty = 100
                changeColor(4)
            }else if (score >= 60){
                drawLvlOnScreen(3)
                difficulty = 75
                changeColor(3)
            }else if (score >=40){
                drawLvlOnScreen(2)
                difficulty = 50
                changeColor(2)
            }else if (score >= 20){
                drawLvlOnScreen(1)
                difficulty = 25
                changeColor(1)
            }else{
                drawLvlOnScreen(0)
                difficulty = 0
                changeColor(0)
            }
        }else if (FPStoCheck < 100){
            if (score >= 120){
                drawLvlOnScreen(6)
                difficulty = 95
                changeColor(6)
            }else if (score >= 100){
                difficulty = 85
                drawLvlOnScreen(5)
                changeColor(5)
            }else if (score >= 80){
                difficulty = 70
                drawLvlOnScreen(4)
                changeColor(4)
            }else if (score >= 60){
                difficulty = 45
                drawLvlOnScreen(3)
                changeColor(3)
            }else if (score >=40){
                difficulty = 30
                drawLvlOnScreen(2)
                changeColor(2)
            }else if (score >= 20){
                difficulty = 20
                drawLvlOnScreen(1)
                changeColor(1)
            }else{
                difficulty = 0
                drawLvlOnScreen(0)
                changeColor(0)
            }
        }          
    }

    // CHANGE COLOR OF VIRUS WHEN LVL UP 
    const changeColor = (lvl) =>{
        switch(lvl) {
            case 6:
                subtitleImage.src = './images/Virus/blackVIRUS6.png'
                arrayOfVirus.forEach((virus)=>{
                    virus.virusImg.src = './images/Virus/blackVIRUS6.png'
                    virus.virusDeathImage.src = './images/Virus/blackVIRUSdead6.png'
                })
                break
            case 5:
                subtitleImage.src = './images/Virus/purpleVIRUS5.png'
                arrayOfVirus.forEach((virus)=>{
                    virus.virusImg.src = './images/Virus/purpleVIRUS5.png'
                    virus.virusDeathImage.src = './images/Virus/purpleVIRUSdead5.png'
                })
                break
            case 4:
                subtitleImage.src = './images/Virus/pinkVIRUS4.png'
                arrayOfVirus.forEach((virus)=>{
                    virus.virusImg.src = './images/Virus/pinkVIRUS4.png'
                    virus.virusDeathImage.src = './images/Virus/pinkVIRUSdead4.png'
                })
                break
            case 3:
                subtitleImage.src = './images/Virus/redVIRUS3.png'
                arrayOfVirus.forEach((virus)=>{
                    virus.virusImg.src = './images/Virus/redVIRUS3.png'
                    virus.virusDeathImage.src = './images/Virus/redVIRUSdead3.png'
                })
                break
            case 2:
                subtitleImage.src = './images/Virus/orangeVIRUS2.png'
                arrayOfVirus.forEach((virus)=>{
                    virus.virusImg.src = './images/Virus/orangeVIRUS2.png'
                    virus.virusDeathImage.src = './images/Virus/orangeVIRUSdead2.png'
                })
                break
            case 1:
                subtitleImage.src = './images/Virus/yellowVIRUS1.png'
                arrayOfVirus.forEach((virus)=>{
                    virus.virusImg.src = './images/Virus/yellowVIRUS1.png'
                    virus.virusDeathImage.src = './images/Virus/yellowVIRUSdead1.png'
                })
                break
            default:
                subtitleImage.src = './images/Virus/greenVIRUS.png'
                arrayOfVirus.forEach((virus)=>{
                    virus.virusImg.src = './images/Virus/greenVIRUS.png'
                    virus.virusDeathImage.src = './images/Virus/greenVIRUSdead.png'
                })
          }
    }

    // LVL DISPLAY ON SCREEN
    const drawLvlOnScreen = (num) => {
        if(num === 6){
            ctx.fillStyle = 'rgba(79, 79, 79, 0.40)'
            ctx.fillText("LVL MAX", ctx.canvas.width/2, 35)
        }else{
            ctx.fillStyle = 'rgba(79, 79, 79, 0.40)'
            ctx.fillText(`LVL: ${num}`, ctx.canvas.width/2, 35)
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
            drawDeadVirus()
            drawVirus()
            checkNumberOfVirusOnScreen()
            renderScore()
            checkScoreLevelUp()
            checkLifes()
        }else{
            gameLoop = false
            gameOverScreen.classList.remove('display-none')
            gameOverScreenScore.innerText = threeDigitsScore(score)
            restartButton.disabled = true
            soundButton.disabled = true
            backgroundAudio.pause()
            splashAudio.muted = true
            gameOverAudio.play()
            setTimeout (()=>{
                restartButton.disabled = false
            }, 3000)
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
            lifeLostAudio.muted = false
            gameOverAudio.muted = false
            soundOFF.classList.add("display-none")
            soundON.classList.remove("display-none")
        }else{
            backgroundAudio.muted = true
            splashAudio.muted = true
            lifeLostAudio.muted = true
            gameOverAudio.muted = true
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

    // CURSOR IMAGE
    window.addEventListener('mousemove', (event)=>{
        mouseCursor.style.top = event.pageY + 'px';
        mouseCursor.style.left = event.pageX + 'px';
    })

    // CHANGING CURSOR IMAGE ONCLICK AND PLAYING CLICK SOUND
    window.addEventListener('mousedown',() => {
        mouseCursor.src ='images/syringeCLICKED.png';
        splashAudio.play()
    }) 
    window.addEventListener('mouseup',() => {
        mouseCursor.src ='images/syringeUNCLICKED.png';
    })

    // TO CHECK THE REFRESH RATE OF THE MONITOR LIVE (Implementation of a post on the internet by Carlos Delgado)
    function getScreenRefreshRate(callback, runIndefinitely){
        let requestId = null
        let callbackTriggered = false
        runIndefinitely = runIndefinitely || false

        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame
        }
        
        let DOMHighResTimeStampCollection = []

        let triggerAnimation = (DOMHighResTimeStamp)=>{
            DOMHighResTimeStampCollection.unshift(DOMHighResTimeStamp)
            
            if (DOMHighResTimeStampCollection.length > 10) {
                let t0 = DOMHighResTimeStampCollection.pop()
                let fps = Math.floor(1000 * 10 / (DOMHighResTimeStamp - t0))

                if(!callbackTriggered){
                    callback.call(undefined, fps, DOMHighResTimeStampCollection)
                }

                if(runIndefinitely){
                    callbackTriggered = false
                }else{
                    callbackTriggered = true
                }
            }
        
            requestId = window.requestAnimationFrame(triggerAnimation)
        };
        
        window.requestAnimationFrame(triggerAnimation)

        if(!runIndefinitely){
            window.setTimeout(()=>{
                window.cancelAnimationFrame(requestId)
                requestId = null
            }, 500)
        }
    }
    getScreenRefreshRate((FPS)=>{
        FPStoCheck = FPS
    })
}

window.addEventListener('mousedown',() => {
    splashAudio.play()
    mouseCursor.src ='images/syringeCLICKED.png';
}) 
window.addEventListener('mouseup',() => {
    mouseCursor.src ='images/syringeUNCLICKED.png';
})