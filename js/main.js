/**
 * ENT Clinic - Main Application JavaScript Module
 * Handles modal popups, appointment forms, strict input validation,
 * and custom modern confirmation dialogs.
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

  // Custom Modern Success Modal Dialog
  function showCustomSuccessAlert(title, message) {
    let customModal = document.getElementById('customSuccessModal');
    if (!customModal) {
      customModal = document.createElement('div');
      customModal.id = 'customSuccessModal';
      customModal.style.cssText = `
        position: fixed;
        top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(18, 50, 84, 0.65);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        z-index: 9999;
        display: flex; align-items: center; justify-content: center;
        padding: 1.5rem;
        opacity: 0; transition: opacity 0.3s ease;
      `;
      customModal.innerHTML = `
        <div style="background: #ffffff; border-radius: 16px; max-width: 440px; width: 100%; padding: 2.5rem 2rem; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.3); transform: scale(0.9); transition: transform 0.3s ease;">
          <div style="width: 64px; height: 64px; background: #e6f4ea; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem;">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#166534" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h3 id="customAlertTitle" style="font-family: 'Montserrat', sans-serif; font-size: 1.45rem; font-weight: 700; color: #123254; margin-bottom: 0.75rem; line-height: 1.3;">
            Appointment Request Received!
          </h3>
          <p id="customAlertMsg" style="font-family: 'Montserrat', sans-serif; font-size: 0.95rem; color: #465F78; line-height: 1.6; margin-bottom: 1.75rem;">
            Thank you! Our clinic manager will contact you shortly to confirm your booking time.
          </p>
          <button id="customAlertOkBtn" style="background: linear-gradient(126deg, #7193b8 0%, #485d70 100%); color: #ffffff; font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 0.9rem; letter-spacing: 1px; padding: 0.85rem 2.5rem; border: none; border-radius: 30px; cursor: pointer; box-shadow: 0 4px 15px rgba(72, 93, 112, 0.3); transition: all 0.2s ease;">
            OK, THANK YOU
          </button>
        </div>
      `;
      document.body.appendChild(customModal);

      const okBtn = customModal.querySelector('#customAlertOkBtn');
      okBtn.addEventListener('click', () => {
        customModal.style.opacity = '0';
        const innerCard = customModal.querySelector('div');
        if (innerCard) innerCard.style.transform = 'scale(0.9)';
        setTimeout(() => {
          customModal.style.display = 'none';
        }, 300);
      });
    }

    const titleEl = customModal.querySelector('#customAlertTitle');
    const msgEl = customModal.querySelector('#customAlertMsg');
    if (titleEl) titleEl.innerText = title;
    if (msgEl) msgEl.innerText = message;

    customModal.style.display = 'flex';
    setTimeout(() => {
      customModal.style.opacity = '1';
      const innerCard = customModal.querySelector('div');
      if (innerCard) innerCard.style.transform = 'scale(1)';
    }, 10);
  }

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
        closeAppointmentModal();
        showCustomSuccessAlert(
          'Appointment Request Received!',
          'Thank you! Your appointment request has been received. Our clinic manager will contact you shortly to confirm your booking time.'
        );
        appointmentForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = originalText;
        }
      }, 700);
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
        showCustomSuccessAlert(
          'Appointment Request Received!',
          'Thank you! Your appointment request has been received. Our team will contact you shortly.'
        );
        contactPageForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = originalText;
        }
      }, 700);
    });
  }
});
