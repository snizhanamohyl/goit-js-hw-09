import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delayInput: document.querySelector('input[name="delay"]'),
  stepInput: document.querySelector('input[name="step"]'),
  amountInput: document.querySelector('input[name="amount"]'),
  createPromiseBtn: document.querySelector('button[type="submit"]'),
};

refs.form.addEventListener('submit', onformSubmit);

function onformSubmit(event) {
  event.preventDefault();

  const delay = Number(refs.delayInput.value);
  const step = Number(refs.stepInput.value);
  const amount = Number(refs.amountInput.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay + (i - 1) * step)
      .then(value => {
        Notify.success(value, { useIcon: false, timeout: 5000 });
      })
      .catch(value => {
        Notify.failure(value, { useIcon: false, timeout: 5000 });
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
