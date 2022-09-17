import { cardsArray } from "./cards.js";

//Расширяем массив карт этим же массивом карт
let gameGrid = [...cardsArray, ...cardsArray];
// let gameGrid = cardsArray.concat(cardsArray);
//Перемешиваем массив карт случайным образом
gameGrid.sort(() => 0.5 - Math.random());

const game = document.querySelector(".game");
const grid = document.createElement("section");
grid.setAttribute("class", "grid");
// Добавляем секцию grid в div "game"
game.appendChild(grid);

// Для каждого item в массива карт...
gameGrid.forEach((item) => {
  const card = document.createElement("div");
  // Применяем класс "card" для каждого div
  card.classList.add("card");
  // Устанавливаем атрибут data-name для div массива карт с атрибутом name
  card.dataset.name = item.name;
  // Применяем фоновое изображение для div массива карт с атрибутом image
  card.style.backgroundImage = `url(${item.img})`;
  // Append the div to the grid section
  grid.appendChild(card);
});

