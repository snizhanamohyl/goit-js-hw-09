import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  daysValue: document.querySelector('span[data-days]'),
  hoursValue: document.querySelector('span[data-hours]'),
  minutesValue: document.querySelector('span[data-minutes]'),
  secondsValue: document.querySelector('span[data-seconds]'),
};

let intervalId;

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= Date.now()) {
      Notify.failure('Please choose a date in the future');
      return;
    }

    refs.startBtn.disabled = false;
    refs.startBtn.addEventListener('click', () => {
      onStartBtnClick(selectedDate);
    });
  },
};

flatpickr('#datetime-picker', options);

function onStartBtnClick(ms) {
  refs.startBtn.disabled = true;

  updateCountdown(ms);
  intervalId = setInterval(() => {
    updateCountdown(ms);
  }, 1000);
}

function updateCountdown(ms) {
  if (ms - Date.now() <= 0) {
    clearInterval(intervalId);
    return;
  }

  const { days, hours, minutes, seconds } = addLeadingZero(
    convertMs(ms - Date.now())
  );

  refs.daysValue.textContent = days;
  refs.hoursValue.textContent = hours;
  refs.minutesValue.textContent = minutes;
  refs.secondsValue.textContent = seconds;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero({ days, hours, minutes, seconds }) {
  days = days.toString().padStart(2, '0');
  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  seconds = seconds.toString().padStart(2, '0');

  return { days, hours, minutes, seconds };
}
