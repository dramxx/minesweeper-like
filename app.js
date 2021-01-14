let root = document.getElementById("root");
let wrapper = document.getElementById("wrapper");
let noticeBoard = document.getElementById("notice-board");

let deathScreen = `<div style="font-size: 500px; font-color: #333">&#9760;</div>`;
let square = `<div class="square" style="width: 60px; height: 60px; margin: 0px 1.5px; border: 1px solid #333; background-color: #C0C0C0; display: flex; justify-content: center; align-items: center; font-family: Hack; font-size: 17px; cursor: pointer;" />`;
let healthBar = `<div id="health-bar" style="width: 100%; height: 50px; background-color: red; margin-top: 50px;"/>`;

let numberOfSquares = 100;
let health = 100;
let isDeath = false;

const hitBombMessages = [
  "BAAM",
  "eat it!",
  "in your face",
  "get rekt!",
  "nice try, sucker",
];
const defuseMessages = [
  "close one",
  "lucky",
  "okay",
  "whatever",
  "youll die anyway",
];
const looseMessage = "you suck, looser!";
const winMessage = "ok,you won, but you still suck";

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
    noticeBoard.innerHTML = looseMessage;
    isDeath = true;
    root.style.display = "none";
    wrapper.innerHTML += deathScreen;
  }
};

while (numberOfSquares) {
  root.innerHTML += square;
  let currentSquare = root.lastChild;

  currentSquare.id = 101 - numberOfSquares;
  --numberOfSquares;

  if (numberOfSquares == 0) root.innerHTML += healthBar;
}

[...document.getElementsByClassName("square")].forEach((square) => {
  let isBomb = Math.floor(Math.random() * 100) % 4 === 0;
  square.onmouseover = () => (square.style.backgroundColor = "whitesmoke");
  square.onmouseleave = () => (square.style.backgroundColor = "#C0C0C0");
  square.onclick = () => defuseBomb(isBomb, square.id);
});

const defuseBomb = (bomb, id) => {
  let currentSquare = document.getElementById(id);
  let isSnowman = Math.random() < 0.05;

  if (isSnowman) {
    noticeBoard.innerHTML = winMessage;
    currentSquare.innerHTML = "&#9924";
    currentSquare.style.fontSize = "35px";
    [...document.getElementsByClassName("square")].forEach((square) =>
      resetSquare(square)
    );
    return;
  }

  if (bomb) {
    let randomMessage = Math.floor(Math.random() * hitBombMessages.length);
    noticeBoard.innerHTML = hitBombMessages[randomMessage];

    currentSquare.style.backgroundColor = "orange";
    currentSquare.innerHTML = "&#9760;";
    currentSquare.style.fontSize = "35px";

    resetSquare(currentSquare);
    doDamage();
  } else {
    let randomMessage = Math.floor(Math.random() * defuseMessages.length);
    noticeBoard.innerHTML = defuseMessages[randomMessage];

    currentSquare.style.backgroundColor = "transparent";
    currentSquare.style.border = "none";

    resetSquare(currentSquare);
  }
};
