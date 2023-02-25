var block_size = 30;
var rows = 20;
var cols = 20;

//snake head
var snake = { x: block_size * 5, y: block_size * 5 };
var foodPos = {};
var velocity = { x: 0, y: 0 };
var snakeBody = [];
var game_over = false;
var score = 0
var snake_speed=block_size

window.onload = function () {
    board = document.getElementById("game_box");
    score_div = document.getElementById('score')
    
    
    board.height = rows * block_size;
    board.width = cols * block_size;
    context = board.getContext("2d");
    place_food();
    setTimeout(document.addEventListener("keyup", changeDirection), 100);
    update();

    setInterval(update, 100);
};



function update() {

    if (game_over) {
        return;
    }
    context.fillStyle = "#202124";
    context.fillRect(0, 0, board.width, board.height);    
    score_div.innerHTML= `SCORE ${score}`
    draw_food()
    draw_snake()
    set_game_over()

      
}

function draw_food() {
    context.fillStyle = "#E0144C";
    context.fillRect(foodPos.x, foodPos.y, block_size-1, block_size-1);
    if (snake.x === foodPos.x && snake.y === foodPos.y) {
        snakeBody.push([foodPos.x, foodPos.y]);
        score += 1
        place_food();
    }
}

function draw_snake() {
    for (i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snake.x, snake.y];
    }

    let border = 1
    let offset = border * 2
    context.fillStyle = "#9CFF2E";
    snake.x += velocity.x *snake_speed;
    snake.y += velocity.y *snake_speed;
    context.fillRect(snake.x, snake.y, block_size-1, block_size-1);
    
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(
            snakeBody[i][0],
            snakeBody[i][1],
            block_size-1,
            block_size-1
        );
    }
}

function place_food() {
    temp = random_num()
    foodPos.x = temp[0]
    foodPos.y = temp[1]
}

function random_num() {
    var x = Math.floor(Math.random() * cols) * block_size;
    var y = Math.floor(Math.random() * rows) * block_size;
    while ((x === snake.x && y === snake.y) || arrayAlreadyHasArray(snakeBody,[x,y])) {
        x = Math.floor(Math.random() * cols) * block_size;
        y = Math.floor(Math.random() * rows) * block_size;
    }
    temp = [x,y]
    return temp
}


function changeDirection(e) {
    if (e.code === "ArrowUp" && velocity.y !== 1 && velocity.y !== -1) {

        velocity.x = 0;
        velocity.y = -1;

    } else if (e.code === "ArrowDown" && velocity.y !== -1 && velocity.y !== 1) {

        velocity.x = 0;
        velocity.y = 1;

    } else if (e.code === "ArrowLeft" && velocity.x !== 1 && velocity.x !== -1) {

        velocity.x = -1;
        velocity.y = 0;

    } else if (e.code === "ArrowRight" && velocity.x !== -1 && velocity.x !== 1) {

        velocity.x = 1;
        velocity.y = 0;

    }
    console.log(snake.x, snake.y)
}



function set_game_over() {
    if (snake.x < 0 || snake.x >= cols*block_size || snake.y < 0 || snake.y >= rows*block_size) {
        game_over = true;
        alert('game over')
    }
    for (let i = 0; i < snakeBody.length; i++) {
        if (snake.x === snakeBody[i][0] && snake.y === snakeBody[i][1]) {
            game_over = true;
            alert('game over')
        }
    }
}






function arrayAlreadyHasArray(arr, subarr){
    for(var i = 0; i<arr.length; i++){
        let checker = false
        for(var j = 0; j<arr[i].length; j++){
            if(arr[i][j] === subarr[j]){
                checker = true
            } else {
                checker = false
                break;
            }
        }
        if (checker){
            return true
        }
    }
    return false
}