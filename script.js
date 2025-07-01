const circleContainer = document.getElementById("circleContainer");
const numberCircles = document.getElementById("numberCircles");
const displayNumber = document.getElementById("displayNumber");
const widthRem = document.getElementById("widthRem");
const widthRemDisplay = document.getElementById("widthRemDisplay");
const start = document.getElementById("start");
let startClick = 0;
let isOddTurn = true;
let intervalId = null;

function creatCircles() {
  const quantity = parseInt(numberCircles.value);
  displayNumber.textContent = quantity;
  circleContainer.innerHTML = "";

  for (let i = 0; i < quantity; i++) {
    const circles = document.createElement("div");
    circles.className = "circle";
    circles.id = `circle-${i}`;
    circleContainer.appendChild(circles);
  }
}

function changeColor(circls_id, color_id) {
  const inputColor = document.getElementById(color_id);
  const circle = document.getElementById(circls_id);
  const color = inputColor.value;
  circle.style.backgroundColor = inputColor.value;
  circle.style.boxShadow = `0 0 15px ${color}`;
}

function toggleOddEven() {
  const circles = document.querySelectorAll(".circle");

  circles.forEach((circle, index) => {
    if (isOddTurn) {
      if (index % 2 === 0) {
        circle.classList.remove("circleoff");
      } else {
        circle.classList.add("circleoff");
      }
    } else {
      if (index % 2 !== 0) {
        circle.classList.remove("circleoff");
      } else {
        circle.classList.add("circleoff");
      }
    }
  });

  isOddTurn = !isOddTurn;
}

let currentIndex = 0;
function toggleAll() {
  const circles = document.querySelectorAll(".circle");

  circles.forEach((circle) => {
    if (isOddTurn) {
      circle.classList.add("circleoff");
    } else {
      circle.classList.remove("circleoff");
    }
  });
  isOddTurn = !isOddTurn
}


document.addEventListener("DOMContentLoaded", () => {
  creatCircles();
  for (let i = 0; i < 8; i++) {
    changeColor(`circle-${i}`, i + 1);
  }
});

numberCircles.addEventListener("input", () => {
  creatCircles();
  for (let i = 0; i < 8; i++) {
    changeColor(`circle-${i}`, i + 1);
  }
});

widthRem.addEventListener("input", () => {
  for (let i = 0; i < 8; i++) {
    const circle = document.getElementById(`circle-${i}`);
    circle.style.width = widthRem.value + "rem";
    circle.style.height = widthRem.value + "rem";
    widthRemDisplay.textContent = widthRem.value;
  }
});

start.addEventListener("click", () => {
  startClick++;

  if (intervalId) {
    clearInterval(intervalId);
  }

  let intervalTime = 400;

  if (startClick === 1) {
    intervalId = setInterval(toggleOddEven, intervalTime);
    console.log("Padrão: Alternado (ímpar/par)");
  } else if (startClick === 2) {
    intervalId = setInterval(toggleOddEven, 1000);
    console.log("Padrão: Sequencial");
  } else if (startClick === 3) {
    intervalId = setInterval(toggleAll, intervalTime);
    console.log("Padrão: Todas piscando juntas");
  } else if (startClick === 4) {
    intervalTime = 1000
    intervalId = setInterval(toggleAll, intervalTime)
  } else {
    startClick = 0;
    const circles = document.querySelectorAll(".circle");

  circles.forEach((circle) => { 
    circle.classList.remove('circleoff')
  })
    console.log("Parado");
  }
});
