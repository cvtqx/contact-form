let formData = {
  firstName: '',
  lastName: '',
  email: '',
  queryType: '',
  message: '',
  consent: '',
};

document.addEventListener('DOMContentLoaded', function () {
  const elements = {
    firstName: document.getElementById('firstName'),
    lastName: document.getElementById('lastName'),
    email: document.getElementById('email'),
    generalEnquiry: document.getElementById('generalEnquiry'),
    generalEnquiryDiv: document.getElementById('generalEnquiryDiv'),
    supportRequest: document.getElementById('supportRequest'),
    supportRequestDiv: document.getElementById('supportRequestDiv'),
    message: document.getElementById('message'),
    consent: document.getElementById('consent'),
    submitButton: document.getElementById('submit-button'),
    successMessage: document.getElementById('successMessage'),
    errors: Array.from(document.querySelectorAll('.error')),
  };

  const resetForm = () => {
    elements.firstName.value = '';
    elements.lastName.value = '';
    elements.email.value = '';
    elements.generalEnquiry.checked = false;
    elements.supportRequest.checked = false;
    elements.message.value = '';
    elements.consent.checked = false;
    elements.generalEnquiryDiv.classList.remove('selected');
    elements.supportRequestDiv.classList.remove('selected');
  };

  resetForm();

  const hideError = (element, errorId) => {
    const errorElement = elements.errors.find((error) => error.id === errorId);
    errorElement.hidden = true;
    element.classList.remove('error-input');
  };

  const addInputListener = (element, field, errorId) => {
    element.addEventListener('input', (e) => {
      elements.successMessage.hidden = true;
      hideError(element, errorId);
      formData[field] = e.target.value;
    });
  };

  addInputListener(elements.firstName, 'firstName', 'firstNameError');
  addInputListener(elements.lastName, 'lastName', 'lastNameError');
  addInputListener(elements.email, 'email', 'emailError');
  addInputListener(elements.message, 'message', 'messageError');

  const handleQueryTypeClick = (
    element,
    queryType,
    divToShow,
    divToHide,
    errorId
  ) => {
    element.addEventListener('click', (e) => {
      elements.successMessage.hidden = true;
      divToHide.classList.remove('selected');
      divToShow.classList.add('selected');
      hideError(element, errorId);
      formData.queryType = queryType;
    });
  };

  handleQueryTypeClick(
    elements.generalEnquiry,
    'general',
    elements.generalEnquiryDiv,
    elements.supportRequestDiv,
    'queryTypeError'
  );
  handleQueryTypeClick(
    elements.supportRequest,
    'support',
    elements.supportRequestDiv,
    elements.generalEnquiryDiv,
    'queryTypeError'
  );

  elements.consent.addEventListener('click', (e) => {
    elements.successMessage.hidden = true;
    hideError(elements.consent, 'consentError');
    formData.consent = e.target.checked ? e.target.value : '';
  });

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const displayErrors = () => {
    Object.keys(formData).forEach((key, index) => {
      if (!formData[key]) {
        elements.errors[index].hidden = false;
        if (key !== 'queryType') {
          document.getElementById(key).classList.add('error-input');
        }
      }
    });
    if (!validateEmail(formData.email)) {
      const emailError = elements.errors.find(
        (error) => error.id === 'emailError'
      );
      emailError.hidden = false;
      elements.email.classList.add('error-input');
    }
  };

  elements.submitButton.addEventListener('click', () => {
    displayErrors();
    if (document.querySelectorAll('.error-input').length === 0) {
      elements.successMessage.hidden = false;
      resetForm();
    }
    setTimeout(() => {
      elements.successMessage.hidden = true;
    }, 5000);
  });
});
