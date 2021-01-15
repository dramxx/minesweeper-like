let root = document.getElementById("root");
let wrapper = document.getElementById("wrapper");
let noticeBoard = document.getElementById("notice-board");

let deathScreen = `<div style="font-size: 500px; font-color: #333">&#9760;</div>`;
let square = `<div class="square" style="width: 60px; height: 60px; margin: 0px 1.5px; border: 1px solid #333; background-color: #C0C0C0; display: flex; justify-content: center; align-items: center; font-family: Hack; font-size: 17px; cursor: pointer;" />`;
let healthBar = `<div id="health-bar" style="width: 100%; height: 50px; background-color: red; margin-top: 50px;"/>`;
let restartButton = `<button style="margin-top: 25px; cursor: pointer; width: 170px; height: 55px; font-size: 20px; background-color: whitesmoke; border-radius: 5px;" onClick="window.location.reload();">restart this shit</button>`;

let numberOfSquares = 100;
let health = 100;
let isDeath = false;

const messages = {
  hitBombMessages: [
    "BAAM",
    "eat it!",
    "in your face",
    "get rekt!",
    "nice try, sucker",
  ],
  defuseMessages: [
    "close one",
    "lucky",
    "okay",
    "whatever",
    "youll die anyway",
  ],
  looseMessage: "you suck, looser!",
  winMessage: "ok,you won, but you still suck",
};

const generateSquares = () => {
  while (numberOfSquares) {
    root.innerHTML += square;
    let currentSquare = root.lastChild;

    currentSquare.id = 101 - numberOfSquares;
    --numberOfSquares;

    if (numberOfSquares == 0) root.innerHTML += healthBar;
  }

  [...document.getElementsByClassName("square")].forEach((square) => {
    let isBomb = Math.random() < 0.25;

    square.onmouseover = () => (square.style.backgroundColor = "whitesmoke");
    square.onmouseleave = () => (square.style.backgroundColor = "#C0C0C0");
    square.onclick = () => defuseBomb(isBomb, square.id);
  });
};

const defuseBomb = (bomb, id) => {
  let currentSquare = document.getElementById(id);
  let isSnowman = Math.random() < 0.05;

  if (isSnowman) {
    currentHealthBar = document.getElementById("health-bar");

    noticeBoard.innerHTML = messages.winMessage;
    currentSquare.innerHTML = "&#9924";
    currentSquare.style.fontSize = "35px";
    currentHealthBar.style.display = "none";
    wrapper.innerHTML += restartButton;

    [...document.getElementsByClassName("square")].forEach((square) =>
      resetSquare(square)
    );
    return;
  }

  if (bomb) {
    let randomMessage = Math.floor(
      Math.random() * messages.hitBombMessages.length
    );

    noticeBoard.innerHTML = messages.hitBombMessages[randomMessage];
    currentSquare.style.backgroundColor = "orange";
    currentSquare.innerHTML = "&#9760;";
    currentSquare.style.fontSize = "35px";

    resetSquare(currentSquare);
    doDamage();
  } else {
    let randomMessage = Math.floor(
      Math.random() * messages.defuseMessages.length
    );

    noticeBoard.innerHTML = messages.defuseMessages[randomMessage];
    currentSquare.style.backgroundColor = "transparent";
    currentSquare.style.border = "none";

    resetSquare(currentSquare);
  }
};

const resetSquare = (square) => {
  square.style.cursor = "auto";
  square.onmouseover = null;
  square.onmouseleave = null;
  square.onclick = null;
};

const doDamage = () => {
  currentHealthBar = document.getElementById("health-bar");

  health -= 20;
  currentHealthBar.style.width = health + "%";

  if (health == 0) {
    noticeBoard.innerHTML = messages.looseMessage;
    isDeath = true;
    root.style.display = "none";
    wrapper.innerHTML += deathScreen;
    wrapper.innerHTML += restartButton;
  }
};

generateSquares();

//TODO: maintain array of opened squares
