/**Removes The Title Page And Starts The Game*/
function removeTitle() {
  document.getElementById("titlePage").classList.add("hide");
  document.getElementById("bird").classList.add("showBird");
  setTimeout(main, 1000);
}

let pipeRightPos = 0;

/**
 * Makes a pair of top and bottom pipe and displays it
 * @param {boolean} inverted Tells if the pipe is to be made on top or bottom of screen
 * @param {number} height height of the pipe
 */
function makePipe(inverted = false, height = undefined) {
  pipe = document.createElement("img");
  pipe.src = "./assets/pipe.png";
  pipe.classList.add("pipe");

  inverted == true
    ? pipe.classList.add("pipeTop")
    : pipe.classList.add("pipeDown");

  // Checks if the value to height is given and if not,then genrates a random value
  // And also generates a random value for distance between the pipes
  let distBwPipes;
  if (height == undefined) {
    height = Math.floor(Math.random() * (70 - 17 + 1)) + 17;
    distBwPipes = Math.floor(Math.random() * (60 - 45 + 1)) + 45;
  }
  height < 0
    ? (pipe.style.height = "0vh")
    : (pipe.style.height = `${height}vh`);

  document.getElementById("mainGamePage").appendChild(pipe);

  // Checks if the opposite pipe has to be made and if yes ,then makes the pipe
  if (inverted == false) {
    makePipe(true, (height = 100 - (distBwPipes + height)));
  }
}

/**
 * Moves the bird upward
 * @param {number} velocity how much distance bird wil move up when spacebar is presses
 */
function birdMoveUp(velocity = 70) {
  let birdTopOffset = document.getElementById("bird").offsetTop;

  document.getElementById("bird").style.top = `${birdTopOffset - velocity}px`;
}

/**
 * Removes the pipe from parent incase it touches the end of screen.
 * Done for better performance
 */
function removePipe() {
  let pipe_arr = document.getElementsByClassName("pipe");
  for (let index = 0; index < pipe_arr.length; index++) {
    const pipe = pipe_arr[index];
    if (pipe.offsetLeft <= -49) {
      document.getElementById("mainGamePage").removeChild(pipe);
    }
  }
}

/**
 * Checks if the bird is collided with the pipe
 */
function checkCollision() {
  let pipes = document.getElementsByClassName("pipe");

  if (bird.offsetTop <= 0 || bird.offsetTop >= 528) {
    gameOver();
  }

  for (let index = 0; index < pipes.length; index++) {
    const pipe = pipes[index];

    // Checks the X pos

    //      LEFT LIMIT                     RIGHT LIMIT
    if (
      pipe.offsetLeft + pipe.width >= bird.offsetLeft &&
      pipe.offsetLeft <= bird.offsetLeft + bird.width
    ) {
      // Checks the Y pos of top pipe
      if (
        pipe.classList.contains("pipeTop") &&
        pipe.offsetTop + pipe.height >= bird.offsetTop
      ) {
        gameOver();
      }
      // Checks the Y pos of bottom pipe
      if (
        pipe.classList.contains("pipeDown") &&
        pipe.offsetTop <= bird.offsetTop + bird.height
      ) {
        gameOver();
      }
    }
  }
}

function restart() {
  location.reload();
}

function gameOver() {
  game = false;
  document.getElementById("mainGamePage").style.visibility = "hidden";
  document.getElementById("gameOver").style.visibility = "visible";
  totScore = document.getElementById("score");
  totScore.style.top = "50%";
  totScore.style.left = "47%";
  document.getElementById("gameOver").appendChild(totScore);
  setTimeout(restart, 1500);
}

/**
 * @param {number}gravity-add param in px/s
 */
function doGravityOnBird(gravity = 160) {
  // Dividing by 3 because the function is to be called 33 times a second
  gravity = Number((gravity / 33).toFixed(2));

  let birdTopOffset = document.getElementById("bird").offsetTop;
  document.getElementById("bird").style.top = `${birdTopOffset + gravity}px`;
}

function scoreAdd() {
  if (game == true) {
    score++;
    document.getElementById("score").innerText = `Score:${score}`;
  }
}

/**
 * Main function.
 *Executes after the start button is clicked
 */
function main() {
  setInterval(makePipe, 1200);
  setTimeout(setInterval(doGravityOnBird, 30), 3000);
  setInterval(removePipe, 4000);
  setInterval(checkCollision, 300);
  setInterval(scoreAdd, 800);

  document.addEventListener("keypress", (e) => {
    e.preventDefault();
    if (e.code === "Space") {
      birdMoveUp();
    }
  });
}
let score = 0;
let bird = document.getElementById("bird");
let game = true;

document.getElementById("StartButton").addEventListener("click", removeTitle);
