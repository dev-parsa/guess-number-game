"use strict";
//TEXT ANIMATION-------------------------------
var textWrapper = document.querySelector(".ml9 .letters");
textWrapper.innerHTML = textWrapper.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);
var textWrapper = document.querySelector(".ml8 .letters");
textWrapper.innerHTML = textWrapper.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);

anime.timeline({ loop: false }).add({
  targets: ".ml9 .letter",
  scale: [0, 1],
  duration: 1500,
  elasticity: 600,
  delay: (el, i) => 45 * (i + 1),
});
function animation() {
  anime.timeline({ loop: false }).add({
    targets: ".ml8 .letter",
    translateY: ["1.1em", 0],
    translateX: ["0.55em", 0],
    translateZ: 0,
    rotateZ: [180, 0],
    duration: 750,
    easing: "easeOutExpo",
    delay: (el, i) => 50 * i,
  });
}

//----------------------------------------------
const howBtn = document.querySelector(".how-btn");
const checkBtn = document.querySelector(".check-btn");
const againBtn = document.querySelector(".again-btn");
const massage = document.querySelector(".massage");
const input = document.querySelector(".guess");
const overlay = document.querySelector(".overlay");
const lableScore = document.querySelector(".lable-score");
const lableHigh = document.querySelector(".lable-high");
const overlayText = document.querySelector(".overlay-text");
//random number generator
const randomNum = Math.floor(Math.random() * 21);
let score = 20;
let highscore = 0;
//highscore functionality
function highScoreCalc() {
  if (highscore < score) highscore = score;
  lableHigh.innerText = `🏆Highscore: ${highscore}`;
}
//replacing text
function displayMassage(textMassage) {
  massage.innerText = textMassage;
}
//main game logic
function check() {
  const inputValue = Number(input.value);
  if (!inputValue) displayMassage("⛔no number");
  else if (inputValue === randomNum) {
    overlay.style.display = "grid";
    highScoreCalc();
    overlay.style.pointerEvents = "unset";
  } else if ((inputValue > randomNum || inputValue < randomNum) && score != 0) {
    if (inputValue > randomNum) {
      displayMassage("📈number is too high");
    } else if (inputValue < randomNum) displayMassage("📉number is too low");
    score--;
    lableScore.innerText = `🏅Score: ${score}`;
  } else if (score === 0) {
    overlayText.innerText = "you lost";
    overlay.style.display = "grid";
    overlay.style.background = "red";
    overlay.style.pointerEvents = "unset";
  }
  console.log(randomNum);
}
//event listeners
checkBtn.addEventListener("click", check);
checkBtn.addEventListener("click", animation);
//creating how to play overlay
howBtn.addEventListener("mouseenter", () => {
  document.querySelector(".how-overlay").style.display = "flex";
});

howBtn.addEventListener("mouseout", () => {
  document.querySelector(".how-overlay").style.display = "none";
});
//try again functionality
againBtn.addEventListener("click", () => {
  overlay.style.display = "none";
  overlay.style.pointerEvents = "none";
  score = 20; //reseting score back to the original
  lableScore.innerText = `🏅Score: ${score}`; //reseting score shown on the page
});
