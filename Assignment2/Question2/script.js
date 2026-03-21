// 1. SELECTORS
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const paymentRadios = document.querySelectorAll('input[name="payment"]');
const cardFields = document.getElementById('cardFields');
const cardInputs = ['cardNumber', 'expiry', 'cvv'];
const sameAsBilling = document.getElementById('sameAsBilling');
const shippingFields = document.getElementById('shippingFields');
const paymentForm = document.getElementById('paymentForm');

// 2. CARD SELECTION LOGIC (The Fix)
function updateCardFields() {
    const selectedRadio = document.querySelector('input[name="payment"]:checked');
    if (!selectedRadio) return; // Safety check

    const isPayPal = (selectedRadio.value === 'paypal');

    cardInputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.disabled = isPayPal;
            // Use Constraint Validation API to clear errors when switching
            if (isPayPal) {
                el.setCustomValidity("");
                const err = document.getElementById(id + 'Error');
                if (err) err.classList.remove('visible');
            }
        }
    });

    // Toggle the visual gray-out class
    if (isPayPal) {
        cardFields.classList.add('disabled-section');
    } else {
        cardFields.classList.remove('disabled-section');
    }
}

// 3. SHIPPING TOGGLE LOGIC
sameAsBilling.addEventListener('change', function () {
    if (this.checked) {
        shippingFields.classList.remove('open');
    } else {
        shippingFields.classList.add('open');
    }
});

// 4. VALIDATION HELPER
function validateField(id, errorId, message, customCondition = true) {
    const el = document.getElementById(id);
    const errorEl = document.getElementById(errorId);
    
    if (!el.value.trim() || !customCondition) {
        el.setCustomValidity(message);
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.add('visible');
        }
        return false;
    } else {
        el.setCustomValidity("");
        if (errorEl) errorEl.classList.remove('visible');
        return true;
    }
}

// 5. EVENT LISTENERS
// Listen for Radio Button changes
paymentRadios.forEach(radio => {
    radio.addEventListener('change', updateCardFields);
});

// Formatting Card Number
document.getElementById('cardNumber').addEventListener('input', function () {
    let v = this.value.replace(/\D/g, '').substring(0, 16);
    this.value = v.replace(/(.{4})/g, '$1 ').trim();
});

// Formatting Expiry
document.getElementById('expiry').addEventListener('input', function () {
    let v = this.value.replace(/\D/g, '').substring(0, 4);
    if (v.length >= 3) v = v.substring(0, 2) + ' / ' + v.substring(2);
    this.value = v;
});

// Form Submission
paymentForm.addEventListener('submit', function (e) {
    let isValid = true;

    // Validate Basic Info
    if (!validateField('name', 'nameError', 'Name is required')) isValid = false;
    
    const emailEl = document.getElementById('email');
    if (!validateField('email', 'emailError', 'Valid email required', emailRegex.test(emailEl.value))) isValid = false;

    // Validate Card (only if not PayPal)
    const isPayPal = document.querySelector('input[name="payment"]:checked').value === 'paypal';
    if (!isPayPal) {
        if (!validateField('cardNumber', 'cardNumberError', 'Check card number')) isValid = false;
        if (!validateField('expiry', 'expiryError', 'Check expiry')) isValid = false;
        if (!validateField('cvv', 'cvvError', 'CVV required')) isValid = false;
    }

    if (!isValid) {
        e.preventDefault();
        paymentForm.reportValidity(); // Shows native browser tooltips
    } else {
        e.preventDefault();
        document.getElementById('successBanner').style.display = 'block';
        paymentForm.reset();
        updateCardFields(); // Reset UI state to PayPal (disabled)
    }
});

// 6. INITIALIZE ON LOAD
updateCardFields();