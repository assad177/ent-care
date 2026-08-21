/**
 * ENT Clinic - Main Application JavaScript Module
 * Handles modal popups, appointment forms, and strict input field validation.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Appointment Modal Elements
  const modalWrapper = document.getElementById('appointmentModal');
  const openModalBtns = document.querySelectorAll('.js-open-appointment-modal, a[href*="popup"]');
  const closeModalBtns = document.querySelectorAll('.js-close-modal');
  const appointmentForm = document.getElementById('appointmentForm');

  // Open Modal function
  function openAppointmentModal(e) {
    if (e) e.preventDefault();
    if (modalWrapper) {
      modalWrapper.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  }

  // Close Modal function
  function closeAppointmentModal() {
    if (modalWrapper) {
      modalWrapper.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  // Attach triggers
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', openAppointmentModal);
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', closeAppointmentModal);
  });

  // Close modal when clicking on backdrop
  if (modalWrapper) {
    modalWrapper.addEventListener('click', (e) => {
      if (e.target === modalWrapper) {
        closeAppointmentModal();
      }
    });
  }

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalWrapper && modalWrapper.classList.contains('is-open')) {
      closeAppointmentModal();
    }
  });

  // Strict Field Validation Helper
  function validateForm(formElement, alertContainer) {
    const inputs = formElement.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    let firstInvalidInput = null;

    inputs.forEach(input => {
      const val = input.value ? input.value.trim() : '';
      if (!val || val === '') {
        isValid = false;
        input.style.borderColor = '#dc2626';
        input.style.backgroundColor = '#fef2f2';
        if (!firstInvalidInput) firstInvalidInput = input;
      } else {
        input.style.borderColor = '#d0d7de';
        input.style.backgroundColor = '#ffffff';
      }
    });

    if (!isValid) {
      if (alertContainer) {
        alertContainer.style.display = 'block';
        alertContainer.style.backgroundColor = '#fef2f2';
        alertContainer.style.color = '#dc2626';
        alertContainer.style.border = '1px solid #fecaca';
        alertContainer.innerText = 'Please fill out all required fields before making an appointment.';
      }
      if (firstInvalidInput) {
        firstInvalidInput.focus();
      }
    } else if (alertContainer) {
      alertContainer.style.display = 'none';
    }

    return isValid;
  }

  // Clear validation highlighting on input focus
  document.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('input', () => {
      input.style.borderColor = '#d0d7de';
      input.style.backgroundColor = '#ffffff';
    });
    input.addEventListener('change', () => {
      input.style.borderColor = '#d0d7de';
      input.style.backgroundColor = '#ffffff';
    });
  });

  // Handle Modal Form Submission
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!validateForm(appointmentForm, null)) {
        return;
      }

      const submitBtn = appointmentForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerText : 'Submit';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Booking...';
      }

      setTimeout(() => {
        alert('Thank you! Your appointment request has been received. Our clinic manager will contact you shortly to confirm your booking time.');
        appointmentForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = originalText;
        }
        closeAppointmentModal();
      }, 800);
    });
  }

  // Handle Contact Page Form Submission with Validation Checks
  const contactPageForm = document.getElementById('contactPageForm');
  const alertContainer = document.getElementById('formValidationAlert');

  if (contactPageForm) {
    contactPageForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!validateForm(contactPageForm, alertContainer)) {
        return;
      }

      const submitBtn = contactPageForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerText : 'MAKE APPOINTMENT';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Sending...';
      }

      setTimeout(() => {
        if (alertContainer) {
          alertContainer.style.display = 'block';
          alertContainer.style.backgroundColor = '#f0fdf4';
          alertContainer.style.color = '#166534';
          alertContainer.style.border = '1px solid #bbf7d0';
          alertContainer.innerText = 'Thank you! Your appointment request has been received. We will contact you shortly.';
        } else {
          alert('Thank you! Your appointment request has been received. We will contact you shortly.');
        }

        contactPageForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = originalText;
        }
      }, 800);
    });
  }
});
