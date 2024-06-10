let formData = {
  firstName: '',
  lastName: '',
  email: '',
  queryType: '',
  message: '',
  consent: '',
};

const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const generalEnquiry = document.getElementById('generalEnquiry');
const generalEnquiryDiv = document.getElementById('generalEnquiryDiv');
const supportRequest = document.getElementById('supportRequest');
const supportRequestDiv = document.getElementById('supportRequestDiv');
const message = document.getElementById('message');
const consent = document.getElementById('consent');
const submitButton = document.getElementById('submit-button');
const errors = Array.from(document.querySelectorAll('.error'));
const successMessage = document.getElementById('successMessage');

firstName.addEventListener('input', (e) => {
  const firstNameError = errors.find((error) => error.id === 'firstNameError');
  firstNameError.hidden = true;
  firstName.classList.remove('error-input');
  formData.firstName = e.target.value;
});

lastName.addEventListener('input', (e) => {
  const lastNameError = errors.find((error) => error.id === 'lastNameError');
  lastNameError.hidden = true;
  lastName.classList.remove('error-input');
  formData.lastName = e.target.value;
});

email.addEventListener('input', (e) => {
  const emailError = errors.find((error) => error.id === 'emailError');
  emailError.hidden = true;
  email.classList.remove('error-input');
  formData.email = e.target.value;
});

generalEnquiry.addEventListener('click', (e) => {
  supportRequestDiv.classList.remove('selected');
  generalEnquiryDiv.classList.add('selected');
  const queryTypeError = errors.find((error) => error.id === 'queryTypeError');
  queryTypeError.hidden = true;
  if (e.target.value) formData.queryType = 'general';
});

supportRequest.addEventListener('click', (e) => {
  generalEnquiryDiv.classList.remove('selected');
  supportRequestDiv.classList.add('selected');
  const queryTypeError = errors.find((error) => error.id === 'queryTypeError');
  queryTypeError.hidden = true;
  if (e.target.value) formData.queryType = 'support';
});

message.addEventListener('input', (e) => {
  const messageError = errors.find((error) => error.id === 'messageError');
  messageError.hidden = true;
  message.classList.remove('error-input');
  formData.message = e.target.value;
});

consent.addEventListener('click', (e) => {
  const consentError = errors.find((error) => error.id === 'consentError');
  consentError.hidden = true;
  consent.classList.remove('error-input');
  if (e.target.checked) {
    formData.consent = e.target.value;
  }
});

submitButton.addEventListener('click', () => {
  console.log('Hello', formData);
  //display error elements
  Object.values(formData).forEach((value, index) => {
    if (!value) {
      errors[index].hidden = false;

      let inputId = Object.keys(formData)[index];

      if (inputId !== 'queryType') {
        document.getElementById(inputId).classList.add('error-input');
      }
    }
  });

  if (!validateEmail(formData.email)) {
    const emailError = errors.find((error) => error.id === 'emailError');
    emailError.hidden = false;
    email.classList.add('error-input');
  }
    console.log(document.querySelectorAll('.error-input'));
    
  if (document.querySelectorAll('.error-input').length === 0) {
    successMessage.hidden = false;
    firstName.value = '';
    lastName.value = '';
    email.value = '';
    generalEnquiry.value = '';
    supportRequest.value = '';
    message.value = '';
  }
});

//to do:
//reset check and radio buttons
//radio button color
//form reset  on page reload
//refactor
//success message on top

function validateEmail(email) {
  // Regular expression for basic email validation
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
}
