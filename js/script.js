import { cardsArray } from "./cards.js";

const game = document.querySelector(".game");
const grid = document.createElement("section");

const scoreSpan = document.querySelector("#atemptNumOutput");
const resetBtn = document.querySelector("#startGame");

//Расширяем массив карт этим же массивом карт
let gameGrid = [...cardsArray, ...cardsArray];
// let gameGrid = cardsArray.concat(cardsArray);
let firstCard, secondCard;
let count = 0;
let score = 0;
let previousTarget = null;
let delay = 1200;

//Перемешиваем массив карт случайным образом
gameGrid.sort(() => 0.5 - Math.random());

grid.setAttribute("class", "grid");
// Добавляем секцию grid в div "game"
game.appendChild(grid);

// Для каждого item в массиве карт...
gameGrid.forEach((item) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.name = item.name;

  const front = document.createElement("div");
  front.classList.add("front");

  const back = document.createElement("div");
  back.classList.add("back");
  back.dataset.name = item.name;
  back.style.backgroundImage = `url(${item.img})`;

  // Добавляем DIV  в сетку section
  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

const match = () => {
  const selected = document.querySelectorAll(".flip");
  selected.forEach((card) => {
    card.classList.add("match");
  });
  updateScore(10);
};

const resetCards = () => {
  firstCard = "";
  secondCard = "";
  count = 0;
  previousTarget = null;

  const selected = document.querySelectorAll(".flip");

  selected.forEach((card) => {
    card.classList.remove("flip");
  });

  if (!selected[0].classList.contains("match")) {
    updateScore(-5);
  }
};

function flipCard(event) {
  let clicked = event.target;

  if (
    //блокируем переворот открытых или парных карт
    clicked.nodeName === "SECTION" ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains("flip") ||
    clicked.parentNode.classList.contains("match")
  ) {
    return;
  }
  if (count < 2) {
    count++;
    if (count === 1) {
      firstCard = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add("flip");
    } else {
      secondCard = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add("flip");
    }

    if (firstCard && secondCard) {
      if (firstCard === secondCard) {
        setTimeout(match, delay);
      }
      setTimeout(resetCards, delay);
    }
    previousTarget = clicked;
  }
}

function restart() {
  location.reload();
}

function updateScore(amount) {
  score += amount;
  scoreSpan.textContent = score;
}

grid.addEventListener("click", flipCard);
resetBtn.addEventListener("click", restart);
