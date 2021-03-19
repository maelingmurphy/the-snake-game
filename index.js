// Get elements from the DOM 
const grid = document.querySelector('.grid');
const startButton = document.getElementById('start');
const scoreDisplay = document.getElementById('score');
const message = document.querySelector('.message');
const upBtn = document.querySelector('.up-btn');
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');
const downBtn = document.querySelector('.down-btn');
const selectSpeed = document.querySelector('#speed');
const selectTheme = document.querySelector('#theme');
const checkMobile = document.querySelector('#mobile');
const mobileControls = document.querySelector('.mobile-controls');
let squares = [];
let currentSnake = [2,1,0];
let direction = 1;
let width = 20;
let appleIndex = 0;
let score = 0;
let intervalTime = 500;
let speed = 0.95;
let timerId = 0;

function createGrid() {
    //create 400 of these elements with a for loop
    for (let i=0; i < width*width; i++) {
        //create element
        const square = document.createElement('div');
        //add styling to the element
        square.classList.add('square');
        //put the element into our grid
        grid.appendChild(square);
        //push it into a new squares array    
        squares.push(square);
    }
}
//create the grid for the game
createGrid();

//create the snake on the game board based on currentSnake array 
currentSnake.forEach(index => squares[index].classList.add('snake'))

function startGame() {
    switch (selectSpeed.value) {
        case 'slow':
            intervalTime = 800;
            break;
        case 'medium':
            intervalTime = 400;
            break;
        case 'fast':
            intervalTime = 200;
            break;
    }
    //hide message
    message.style.display = "none";
    //remove the snake
    currentSnake.forEach(index => squares[index].classList.remove('snake'));
    //remove the apple
    squares[appleIndex].classList.remove('apple');
    //set starter variables 
    clearInterval(timerId);
    currentSnake = [2,1,0];
    score = 0;
    
    //add score to browser
    scoreDisplay.textContent = score;
    direction = 1;
    //generate an apple on the board 
    generateApple();
    //add the class of snake to our new currentSnake
    currentSnake.forEach(index => squares[index].classList.add('snake'));
    timerId = setInterval(move, intervalTime);
}

function move() {
    if (
        (currentSnake[0] + width >= width*width && direction === width) || //if snake has hit bottom
        (currentSnake[0] % width === width-1 && direction === 1) || //if snake has hit right wall
        (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
        (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit top
        squares[currentSnake[0] + direction].classList.contains('snake')
    ) {
        //display message
        message.style.display = "block";
        return clearInterval(timerId);
    }
    
    //remove last element from our currentSnake array
    const tail = currentSnake.pop()
    //remove styling from last element
    squares[tail].classList.remove('snake')
    //add square in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction) 
    //deal with snake head gets apple
    if (squares[currentSnake[0]].classList.contains('apple')) {
        //remove the class of apple
        squares[currentSnake[0]].classList.remove('apple')
        //grow our snake by adding class of snake to it
        squares[tail].classList.add('snake')
        //grow our snake array
        currentSnake.push(tail)
        //generate new apple
        generateApple()
        //add one to the score
        score++
        //display our score
        scoreDisplay.textContent = score
        //speed up our snake
        clearInterval(timerId)
        intervalTime = intervalTime * speed
        timerId = setInterval(move, intervalTime)
    }
     
    //add styling so we can see it
    squares[currentSnake[0]].classList.add('snake')
}






function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
} 
generateApple()



// 39 is right arrow
// 38 is for the up arrow
// 37 is for the left arrow
// 40 is for the down arrow

function control(e) {
   
    if (e.keyCode === 39) {
        e.preventDefault();
        direction = 1
    } else if (e.keyCode === 38) {
        e.preventDefault();
        direction = -width
    } else if (e.keyCode === 37) {
        e.preventDefault();
        direction = -1
    } else if (e.keyCode === 40) {
        e.preventDefault();
        direction = +width
    }
}

function mobileControl(e) {
    if (e.target.classList.contains('up-btn')) {
        e.preventDefault();
        direction = -width
    }
    if (e.target.classList.contains('left-btn')) {
        e.preventDefault();
        direction = -1;
    }
    if (e.target.classList.contains('right-btn')) {
        e.preventDefault();
        direction = 1;
    }
    if (e.target.classList.contains('down-btn')) {
        e.preventDefault();
        direction = +width
    }
}

function switchTheme(e) {
    if (e.target.value === 'beachy') {
        //clear all class names
        document.body.classList = "";
        // add specific class name
        document.body.classList.add('beachy');
    }
    if (e.target.value === 'retro') {
        //clear all class names
        document.body.classList = "";
        document.body.classList.add('retro');
    }
    if (e.target.value === 'luxe') {
        //clear all class names
        document.body.classList = "";
        document.body.classList.add('luxe');
    }
}


//add event listeners
upBtn.addEventListener('click', mobileControl);
leftBtn.addEventListener('click', mobileControl);
rightBtn.addEventListener('click', mobileControl);
downBtn.addEventListener('click', mobileControl);
selectTheme.addEventListener('change', switchTheme);
document.addEventListener('keydown', control);
startButton.addEventListener('click', startGame);
checkMobile.addEventListener('click', function() {
    mobileControls.classList.toggle('display-controls');
})
