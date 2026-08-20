/**
 * ENT Clinic - Navigation JavaScript Module
 * Handles mobile navigation drawer toggle, accessibility, and active state.
 */

document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const navOverlay = document.querySelector('.nav-overlay');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && mobileDrawer && navOverlay) {
    function openDrawer() {
      mobileToggle.classList.add('is-active');
      mobileDrawer.classList.add('is-open');
      navOverlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      mobileToggle.classList.remove('is-active');
      mobileDrawer.classList.remove('is-open');
      navOverlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    mobileToggle.addEventListener('click', () => {
      if (mobileDrawer.classList.contains('is-open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    navOverlay.addEventListener('click', closeDrawer);

    // Close mobile menu when clicking links inside drawer
    mobileDrawer.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });
  }

  // Set active link based on current page URL
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});
