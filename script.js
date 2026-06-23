document.addEventListener('DOMContentLoaded', () => {
  console.log("Portfolio scripts initialized successfully!");

  /* ==========================================
     THEME TOGGLE (LIGHT / DARK MODE)
     ========================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn.querySelector('i');
  
  // Check local storage or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.className = 'fa-solid fa-sun';
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    themeIcon.className = 'fa-solid fa-moon';
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    let newTheme = 'light';
    
    if (currentTheme === 'light') {
      newTheme = 'dark';
      themeIcon.className = 'fa-solid fa-sun';
    } else {
      themeIcon.className = 'fa-solid fa-moon';
    }
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  /* ==========================================
     MOBILE NAVIGATION DRAWER
     ========================================== */
  const menuToggleBtn = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const menuIcon = menuToggleBtn.querySelector('i');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function toggleMobileMenu() {
    mobileNav.classList.toggle('open');
    if (mobileNav.classList.contains('open')) {
      menuIcon.className = 'fa-solid fa-xmark';
    } else {
      menuIcon.className = 'fa-solid fa-bars';
    }
  }

  menuToggleBtn.addEventListener('click', toggleMobileMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      menuIcon.className = 'fa-solid fa-bars';
    });
  });

  // Close menu if clicking outside
  document.addEventListener('click', (e) => {
    if (!menuToggleBtn.contains(e.target) && !mobileNav.contains(e.target) && mobileNav.classList.contains('open')) {
      mobileNav.classList.remove('open');
      menuIcon.className = 'fa-solid fa-bars';
    }
  });

  /* ==========================================
     SCROLL REVEAL ANIMATIONS
     ========================================== */
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once the section has animated in, we can stop observing it
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(elem => {
    revealObserver.observe(elem);
  });

  /* ==========================================
     ACTIVE NAVIGATION LINK HIGHLIGHTING ON SCROLL
     ========================================== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const scrollActiveObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    threshold: 0.4,
    rootMargin: '-80px 0px -40% 0px'
  });

  sections.forEach(section => {
    scrollActiveObserver.observe(section);
  });

  /* ==========================================
     CONTACT FORM SUBMISSION SIMULATOR
     ========================================== */
  const contactForm = document.getElementById('portfolio-contact-form');
  const formFeedback = document.getElementById('form-feedback');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('.submit-btn');
      const submitBtnText = submitBtn.querySelector('.btn-text');
      const submitBtnIcon = submitBtn.querySelector('i');
      
      // Get values
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subject = document.getElementById('form-subject').value.trim();
      const message = document.getElementById('form-message').value.trim();
      
      if (!name || !email || !subject || !message) {
        showFeedback("Please fill out all required fields.", "error");
        return;
      }
      
      // Disable buttons during submission state
      submitBtn.disabled = true;
      submitBtnText.textContent = "Sending...";
      submitBtnIcon.className = "fa-solid fa-circle-notch fa-spin";
      
      // Simulate API submit delay
      setTimeout(() => {
        showFeedback("Thank you, Arnitha has received your message!", "success");
        contactForm.reset();
        
        // Restore button state
        submitBtn.disabled = false;
        submitBtnText.textContent = "Send Message";
        submitBtnIcon.className = "fa-solid fa-paper-plane";
      }, 1500);
    });
  }

  function showFeedback(text, status) {
    formFeedback.textContent = text;
    formFeedback.className = `form-feedback ${status}`;
    
    // Auto clear feedback after 5 seconds
    setTimeout(() => {
      formFeedback.textContent = "";
      formFeedback.className = "form-feedback";
    }, 5000);
  }
});