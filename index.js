document.addEventListener("DOMContentLoaded",()=>{
    const squares = document.querySelectorAll("div");
    const Start = document.querySelector(".start");
    const ScoreData = document.querySelector("h3");
    let appleIndex = 0;
    let currentPosition = 4;
    let width = 10;
    let score = 0;
    let On = false;

    const block = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
    ]

    const test = [block]
    let blocks = Math.floor(Math.random()*test.length)
    let current = test[blocks][0]

    function StartGame(){
        if(On === false){
        On = true;
        RandomApple()
        Start.innerHTML = "pause"
        squares[currentPosition].classList.add("character");
        }else{
            squares[appleIndex].classList.remove("block")
            Start.innerHTML = "play"
            On = false
        }
    }
    
    function ClearGame(){
        squares[appleIndex].classList.remove("block");
        current.forEach(index => {
            squares[currentPosition + index].classList.remove("character")
        })
        window.location.reload(true);
    }

    function createCharacter() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('character')
        })
    }

    function deleteCharacter() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('character')
        })
    }

    function downBarrier(){
        if( 
            StopPanel(current, squares, currentPosition)
        ){
            itIsTimeToQuitTheGame(ClearGame);
        }
    }

    function upBarrier(){
        if( 
            StopPanel(current, squares, currentPosition)
        ){
            itIsTimeToQuitTheGame(ClearGame);
        }
    }

    function StopPanel(current, squares, currentPosition) {
        return current.some(index => squares[currentPosition + index].classList.contains('end')) ||
            current.some(index => squares[currentPosition + index].classList.contains('Block'));
    }
    

    function Score(){
        if(squares[currentPosition].classList.contains("block")){
            squares[currentPosition].classList.remove("block")
            RandomApple()
            score++
            ScoreData.textContent = "score : " + score
        }
    }

    function itIsTimeToQuitTheGame(ClearGame) {
        alert("game over");
        ClearGame();
    }
    
    function moveUp(){
        if(On === true){
            deleteCharacter()
            currentPosition -= width;
            createCharacter()
            Score()
            upBarrier()
        }
    }

    function moveDown(){
        if(On  === true){
            deleteCharacter()
            currentPosition += width
            createCharacter()
            downBarrier()
            Score()
        }
    }

    function moveRight(){
        if(On === true){
            deleteCharacter()
            currentPosition+=1
            createCharacter()
            Score()
        }
        if(currentPosition % width === 0){
            itIsTimeToQuitTheGame(ClearGame);
        }
    }

    function moveLeft(){
        if(On === true){
            deleteCharacter()
            currentPosition -= 1
            createCharacter()
            Score()
        }
        if(currentPosition % width === 9){
            itIsTimeToQuitTheGame(ClearGame);
        }
    }

    function joystick(e){
        if(e.keyCode === 87){
            moveUp()
        }else if (e.keyCode === 83){
            moveDown()
        }else if(e.keyCode === 68){
            moveRight()
        }else if(e.keyCode === 65){
            moveLeft()
        }
    }

    function RandomApple(){
        const EndBlock =current.some(index => {
            squares[appleIndex + index].classList.contains('end')
        }) 
        const StBlock = current.some(index => {
            squares[appleIndex + index].classList.contains('Block')
        }) 
        appleIndex = Math.floor(Math.random() * squares.length -10);
        if(EndBlock || StBlock){
            squares[appleIndex].classList.remove("block");
        }else{
            squares[appleIndex].classList.add("block");
        }
    }

    Start.addEventListener("click" ,StartGame)
    document.addEventListener("keyup" , joystick)
})

