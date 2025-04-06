import iziToast from 'izitoast';
const formGroup = document.querySelector('.form');

const onFeedbackFormSubmit = event => {
  event.preventDefault();
  const form = event.target;
  const radioChecked = form.elements.state.value;
  const formInputValue = Number(form.elements.delay.value);

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (radioChecked === 'fulfilled') {
        resolve(formInputValue);
      } else {
        reject(formInputValue);
      }
    }, formInputValue);
  });
  promise
    .then(result => {
      iziToast.success({
        title: 'OK',
        theme: 'dark',
        titleSize: '16px',
        timeout: 4000,
        iconUrl: './img/success-icon.svg',
        iconColor: '#FFFFFF',
        position: 'topRight',
        color: '#59A10D',
        titleColor: '#FFFFFF',
        messageColor: '#FFFFFF',
        message: `Fulfilled promise in ${result}ms`,
      });
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        theme: 'dark',
        titleSize: '16px',
        timeout: 4000,
        iconUrl: './img/bi_x-octagon.svg',
        iconColor: '#FFFFFF',
        position: 'topRight',
        color: '#EF4040',
        titleColor: '#FFFFFF',
        messageColor: '#FFFFFF',
        message: `Rejected promise in ${error}ms`,
      });
    });

  const { currentTarget: formIn } = event;
  formIn.reset();
};

formGroup.addEventListener('submit', onFeedbackFormSubmit);
