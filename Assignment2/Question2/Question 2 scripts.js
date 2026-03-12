
  // EMAIL REGEX 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // HELPER: show/hide error using Constraint Validation API 
  function showError(inputEl, errorElId, message) {
    const errorEl = document.getElementById(errorElId);
    inputEl.setCustomValidity(message);   // Constraint Validation API
    errorEl.textContent = message;
    errorEl.classList.add('visible');
  }

  function clearError(inputEl, errorElId) {
    inputEl.setCustomValidity('');        // Constraint Validation API - clear
    document.getElementById(errorElId).classList.remove('visible');
  }

  // PAYMENT METHOD — enable/disable card fields
  const paymentRadios = document.querySelectorAll('input[name="payment"]');
  const cardFields    = document.getElementById('cardFields');
  const cardInputs    = ['cardNumber', 'expiry', 'cvv'];

  function updateCardFields() {
    const selected = document.querySelector('input[name="payment"]:checked').value;
    const isPayPal = selected === 'paypal';

    cardInputs.forEach(id => {
      const el = document.getElementById(id);
      el.disabled = isPayPal;       // disable the field
      if (isPayPal) clearError(el, id + 'Error');
    });

    // visually grey out the card section
    cardFields.classList.toggle('disabled-section', isPayPal);
  }

  paymentRadios.forEach(r => r.addEventListener('change', updateCardFields));
  updateCardFields(); // run on load (PayPal is default)

  //SHIPPING TOGGLE 
  const sameAsBilling   = document.getElementById('sameAsBilling');
  const shippingFields  = document.getElementById('shippingFields');

  sameAsBilling.addEventListener('change', function () {
    if (this.checked) {
      shippingFields.classList.remove('open');  // hide with transition
    } else {
      shippingFields.classList.add('open');     // reveal with transition
    }
  });

  // CARD NUMBER FORMATTING (auto spaces)
  document.getElementById('cardNumber').addEventListener('input', function () {
    let v = this.value.replace(/\D/g, '').substring(0, 16);
    this.value = v.replace(/(.{4})/g, '$1 ').trim();
  });

  // EXPIRY FORMATTING (MM / YY) 
  document.getElementById('expiry').addEventListener('input', function () {
    let v = this.value.replace(/\D/g, '').substring(0, 4);
    if (v.length >= 3) v = v.substring(0, 2) + ' / ' + v.substring(2);
    this.value = v;
  });

  // FORM VALIDATION ON SUBMIT
  document.getElementById('paymentForm').addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    // Required billing text fields
    const required = [
      { id: 'name',       errId: 'nameError',       msg: 'Please enter your full name.' },
      { id: 'address',    errId: 'addressError',    msg: 'Please enter your address.' },
      { id: 'city',       errId: 'cityError',       msg: 'Please enter your city.' },
      { id: 'state',      errId: 'stateError',      msg: 'Please enter your state or province.' },
      { id: 'postalCode', errId: 'postalCodeError', msg: 'Please enter your postal code.' },
    ];

    required.forEach(({ id, errId, msg }) => {
      const el = document.getElementById(id);
      if (!el.value.trim()) {
        showError(el, errId, msg);
        valid = false;
      } else {
        clearError(el, errId);
      }
    });

    // Email validation using regex
    const emailEl = document.getElementById('email');
    if (!emailEl.value.trim()) {
      showError(emailEl, 'emailError', 'Please enter your email address.');
      valid = false;
    } else if (!emailRegex.test(emailEl.value.trim())) {
      showError(emailEl, 'emailError', 'Please enter a valid email (e.g. name@example.com).');
      valid = false;
    } else {
      clearError(emailEl, 'emailError');
    }

    // Country select
    const countryEl = document.getElementById('country');
    if (!countryEl.value) {
      showError(countryEl, 'countryError', 'Please select your country.');
      valid = false;
    } else {
      clearError(countryEl, 'countryError');
    }

    // Card fields — only validate if a card method is selected
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    if (paymentMethod !== 'paypal') {
      const cardEl = document.getElementById('cardNumber');
      if (!cardEl.value.trim()) {
        showError(cardEl, 'cardNumberError', 'Please enter your card number.');
        valid = false;
      } else {
        clearError(cardEl, 'cardNumberError');
      }

      const expiryEl = document.getElementById('expiry');
      if (!expiryEl.value.trim()) {
        showError(expiryEl, 'expiryError', 'Please enter the expiry date.');
        valid = false;
      } else {
        clearError(expiryEl, 'expiryError');
      }

      const cvvEl = document.getElementById('cvv');
      if (!cvvEl.value.trim()) {
        showError(cvvEl, 'cvvError', 'Please enter the CVV.');
        valid = false;
      } else {
        clearError(cvvEl, 'cvvError');
      }
    }

    // Shipping fields — only validate if "same as billing" is unchecked
    if (!sameAsBilling.checked) {
      const shipFields = [
        { id: 'shipAddress', errId: 'shipAddressError', msg: 'Please enter a shipping address.' },
        { id: 'shipCity',    errId: 'shipCityError',    msg: 'Please enter a city.' },
        { id: 'shipState',   errId: 'shipStateError',   msg: 'Please enter a state or province.' },
        { id: 'shipPostal',  errId: 'shipPostalError',  msg: 'Please enter a postal code.' },
      ];
      shipFields.forEach(({ id, errId, msg }) => {
        const el = document.getElementById(id);
        if (!el.value.trim()) {
          showError(el, errId, msg);
          valid = false;
        } else {
          clearError(el, errId);
        }
      });
    }

    // If all valid — show success banner
    if (valid) {
      document.getElementById('successBanner').style.display = 'block';
      this.reset();
      updateCardFields();
      shippingFields.classList.remove('open');
      sameAsBilling.checked = true;
    }
  });
