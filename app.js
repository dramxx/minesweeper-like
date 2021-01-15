let root = document.getElementById("root");
let wrapper = document.getElementById("wrapper");
let noticeBoard = document.getElementById("notice-board");

const snowmanEmoji = "&#9924;";
const skullEmoji = "&#9760;";
const hearthEmoji = "&#10084;";

let deathScreen = `<div style="font-size: 300px; font-color: #333">&#9760;</div>`;
let square = `<div class="square" style="width: 45px; height: 45px; margin: 1.5px 1.5px; border: 1px solid #333; background-color: #C0C0C0; display: flex; justify-content: center; align-items: center; font-family: Hack; font-size: 17px; cursor: pointer;" />`;
let healthBar = `<div id="health-bar" style="box-shadow: 0 2px 10px #333; width: 100%; height: 50px; background-color: red; margin-top: 50px;"/>`;
let restartButton = `<button class="text" style="font-family: Hachi Maru Pop; margin-top: 25px; cursor: pointer; width: 270px; height: 65px; font-size: 20px; background-color: whitesmoke; border-radius: 5px;" onClick="window.location.reload();">restart this shit</button>`;

let numberOfSquares = 100;
let health = 100;

// no use for these atm
let isDeath = false;
let activeSquares = [];

const messages = {
  hitBombMessages: [
    "BAAM",
    "eat it!",
    "in your face",
    "get rekt!",
    "nice try, ohohoho",
  ],
  defuseMessages: [
    "close one",
    "lucky",
    "okay",
    "whatever",
    "no chance, anyway",
  ],
  looseMessage: "LOOOSER!!",
  winMessage: "you won, looser!",
};

const generateSquares = () => {
  while (numberOfSquares) {
    root.innerHTML += square;
    let currentSquare = root.lastChild;

    currentSquare.id = 101 - numberOfSquares;
    activeSquares.push(101 - numberOfSquares);
    --numberOfSquares;

    if (numberOfSquares == 0) root.innerHTML += healthBar;
  }

  [...document.getElementsByClassName("square")].forEach((square) => {
    let isBomb = Math.random() < 0.5;

    square.onmouseover = () => (square.style.backgroundColor = "whitesmoke");
    square.onmouseleave = () => (square.style.backgroundColor = "#C0C0C0");
    square.onclick = () => openSquare(isBomb, square.id);
  });
};

const openSquare = (isBomb, id) => {
  let currentSquare = document.getElementById(id);
  let isSnowman = Math.random() < 0.05;
  let isHearth = Math.random() < 0.1;

  if (isSnowman) {
    currentHealthBar = document.getElementById("health-bar");

    noticeBoard.innerHTML = messages.winMessage;
    currentSquare.innerHTML = snowmanEmoji;
    currentSquare.style.fontSize = "35px";
    currentHealthBar.style.display = "none";
    wrapper.innerHTML += restartButton;

    [...document.getElementsByClassName("square")].forEach((square) =>
      resetSquare(square)
    );

    return;
  }

  if (isHearth) {
    currentSquare.innerHTML = hearthEmoji;
    currentSquare.style.fontSize = "35px";
    currentSquare.style.color = "red";
    activeSquares.pop(currentSquare.id);

    resetSquare(currentSquare);
    healPlayer();

    return;
  }

  if (isBomb) {
    let randomMessage = Math.floor(
      Math.random() * messages.hitBombMessages.length
    );

    noticeBoard.innerHTML = messages.hitBombMessages[randomMessage];
    currentSquare.style.backgroundColor = "orange";
    currentSquare.innerHTML = skullEmoji;
    currentSquare.style.fontSize = "35px";
    activeSquares.pop(currentSquare.id);

    resetSquare(currentSquare);
    doDamage();
  } else {
    let randomMessage = Math.floor(
      Math.random() * messages.defuseMessages.length
    );

    noticeBoard.innerHTML = messages.defuseMessages[randomMessage];
    currentSquare.style.backgroundColor = "transparent";
    currentSquare.style.border = "none";
    activeSquares.pop(currentSquare.id);

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

  if (health <= 0) {
    noticeBoard.innerHTML = messages.looseMessage;
    isDeath = true;
    root.style.display = "none";
    wrapper.innerHTML += deathScreen;
    wrapper.innerHTML += restartButton;
  }
};

const healPlayer = () => {
  currentHealthBar = document.getElementById("health-bar");

  if (health == 100) return;

  health += 15;
  currentHealthBar.style.width = health + "%";
};

generateSquares();
