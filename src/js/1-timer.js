import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

const buttonStart = document.querySelector('.button-start');

buttonStart.setAttribute('disabled', true);

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.error({
        theme: 'dark',
        timeout: 4000,
        iconUrl: './img/bi_x-octagon.svg',
        iconColor: '#FFFFFF',
        position: 'topRight',
        color: '#EF4040',
        titleColor: '#FFFFFF',
        messageColor: '#FFFFFF',
        title: 'Error',
        message: 'Please choose a date in the future',
      });

      return;
    }
    userSelectedDate = selectedDate;
    buttonStart.removeAttribute('disabled');
  },
};

const timet = {
  intervalId: null,
  elements: {
    days: document.querySelector('.js-timer_days'),
    hours: document.querySelector('.js-timer_hours'),
    minutes: document.querySelector('.js-timer_minutes'),
    seconds: document.querySelector('.js-timer_seconds'),
  },

  start() {
    if (!userSelectedDate) {
    }

    this.intervalId = setInterval(() => {
      const diff = userSelectedDate - Date.now();

      if (diff <= 0) {
        this.stop();
        return;
      }
      const timeComponents = this.convertMs(diff);

      this.elements.days.textContent = this.pad(timeComponents.days);
      this.elements.hours.textContent = this.pad(timeComponents.hours);
      this.elements.minutes.textContent = this.pad(timeComponents.minutes);
      this.elements.seconds.textContent = this.pad(timeComponents.seconds);
    }, 1000);
  },
  convertMs(ms) {
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
  },
  pad(value) {
    return String(value).padStart(2, '0');
  },

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  },
};

buttonStart.addEventListener('click', () => {
  timet.start();
  buttonStart.setAttribute('disabled', true);
});

flatpickr('#datetime-picker', options);

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
