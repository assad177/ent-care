/**
 * ENT Clinic - Main Application JavaScript Module
 * Handles modal popups, appointment forms, and global interactive behaviors.
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

  // Handle Form Submission
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
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

  // Handle Contact Page Form
  const contactPageForm = document.getElementById('contactPageForm');
  if (contactPageForm) {
    contactPageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactPageForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerText : 'Send Message';
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Sending...';
      }

      setTimeout(() => {
        alert('Thank you for reaching out to The ENT Clinic. We have received your message and will respond within 24 hours.');
        contactPageForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = originalText;
        }
      }, 800);
    });
  }
});
