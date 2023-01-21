// шо зі стилями???

const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

let isInterval = false;
let intervalId;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  if (!isInterval) {
    changeBodyBgColor();

    intervalId = setInterval(changeBodyBgColor, 1000);
    isInterval = true;
  }
}

function onStopBtnClick() {
  if (isInterval) {
    clearInterval(intervalId);
    isInterval = false;
  }
}

function changeBodyBgColor() {
  const randomColor = getRandomHexColor();

  refs.body.style.backgroundColor = randomColor;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
