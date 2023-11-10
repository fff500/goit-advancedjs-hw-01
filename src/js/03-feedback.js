import throttle from 'lodash.throttle';

const FORM_STATE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const storedFormState = localStorage.getItem(FORM_STATE_KEY);

function getFormData(form) {
  const formData = new FormData(form);
  const formDataObject = {};

  for (let [key, value] of formData.entries()) {
    formDataObject[key] = value;
  }

  return formDataObject;
}

function handleInput() {
  const formDataObject = getFormData(form);

  localStorage.setItem(FORM_STATE_KEY, JSON.stringify(formDataObject));
}

function handleSubmit(event) {
  event.preventDefault();

  const formDataObject = getFormData(form);

  form.reset();
  localStorage.removeItem(FORM_STATE_KEY);

  console.log(formDataObject);
}

form.addEventListener('input', throttle(handleInput, 500));
form.addEventListener('submit', handleSubmit);

if (storedFormState) {
  const formStateObject = JSON.parse(storedFormState);

  for (let [key, value] of Object.entries(formStateObject)) {
    form.elements[key].value = value;
  }
}
