import throttle from 'lodash.throttle';

const FORM_STATE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const formState = localStorage.getItem(FORM_STATE_KEY);

function handleInput() {
  const formData = new FormData(form);
  const formDataObject = {};

  for (let [key, value] of formData.entries()) {
    formDataObject[key] = value;
  }

  localStorage.setItem(FORM_STATE_KEY, JSON.stringify(formDataObject));
}

function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const formDataObject = {};

  for (let [key, value] of formData.entries()) {
    formDataObject[key] = value;
  }

  form.reset();
  localStorage.removeItem(FORM_STATE_KEY);

  console.log(formDataObject);
}

form.addEventListener('input', throttle(handleInput, 500));
form.addEventListener('submit', handleSubmit);

if (formState) {
  const formStateObject = JSON.parse(formState);

  for (let [key, value] of Object.entries(formStateObject)) {
    form.elements[key].value = value;
  }
}
