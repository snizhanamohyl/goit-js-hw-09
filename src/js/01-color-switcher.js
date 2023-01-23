const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

let intervalId;

refs.stopBtn.disabled = true;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  if (!refs.startBtn.disabled) {
    changeBodyBgColor();

    intervalId = setInterval(changeBodyBgColor, 1000);

    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
  }
}

function onStopBtnClick() {
  if (!refs.stopBtn.disabled) {
    clearInterval(intervalId);

    refs.stopBtn.disabled = true;
    refs.startBtn.disabled = false;
  }
}

function changeBodyBgColor() {
  const randomColor = getRandomHexColor();

  refs.body.style.backgroundColor = randomColor;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
