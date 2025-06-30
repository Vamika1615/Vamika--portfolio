// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);
updateDarkModeIcon(currentTheme);

darkModeToggle.addEventListener('click', function() {
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateDarkModeIcon(newTheme);
});

function updateDarkModeIcon(theme) {
  const icon = darkModeToggle.querySelector('i');
  if (theme === 'dark') {
    icon.className = 'fas fa-sun';
  } else {
    icon.className = 'fas fa-moon';
  }
}

// Parallax effect for floating emojis
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const floatingEmojis = document.querySelectorAll('.floating-emoji');
  
  floatingEmojis.forEach((emoji, index) => {
    const speed = 0.5 + (index * 0.1);
    emoji.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
  });
});

// Enhanced Counter Animation for Statistics
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }
  updateCounter();
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
  const animatedElements = document.querySelectorAll('.project-card, .service-card, .skill-tag');
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// Typing animation for subtitle
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', function() {
  const subtitle = document.querySelector('.subtitle');
  if (subtitle) {
    const originalText = subtitle.textContent;
    setTimeout(() => {
      typeWriter(subtitle, originalText, 80);
    }, 500);
  }
});

// Enhanced Form Validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset previous errors
    clearErrors();
    
    // Get form data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    let isValid = true;
    
    // Validate name
    if (name.length < 2) {
      showError('name', 'Name must be at least 2 characters long');
      isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError('email', 'Please enter a valid email address');
      isValid = false;
    }
    
    // Validate subject
    if (subject.length < 5) {
      showError('subject', 'Subject must be at least 5 characters long');
      isValid = false;
    }
    
    // Validate message
    if (message.length < 10) {
      showError('message', 'Message must be at least 10 characters long');
      isValid = false;
    }
    
    if (isValid) {
      submitForm();
    }
  });
}

function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorSpan = field.parentNode.querySelector('.error-message');
  if (errorSpan) {
    errorSpan.textContent = message;
    field.style.borderColor = '#e74c3c';
  }
}

function clearErrors() {
  const errorMessages = document.querySelectorAll('.error-message');
  const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
  
  errorMessages.forEach(error => {
    error.textContent = '';
  });
  
  formInputs.forEach(input => {
    input.style.borderColor = '';
  });
}

function submitForm() {
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  
  submitBtn.textContent = 'Sending... 💌';
  submitBtn.disabled = true;
  
  // Simulate form submission
  setTimeout(() => {
    submitBtn.textContent = 'Sent! ✨';
    contactForm.reset();
    
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 2000);
  }, 1000);
}

// Custom smooth scroll with speed control and offset
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;

    // Get navbar height to account for sticky positioning
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    
    const targetPosition = target.offsetTop;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition - navbarHeight - 20; // Extra 20px for breathing room
    const duration = 1000;
    let start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const scrollY = easeInOutCubic(progress, startPosition, distance, duration);
      window.scrollTo(0, scrollY);
      if (progress < duration) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  });
});

// Easing function
function easeInOutCubic(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t * t + b;
  t -= 2;
  return (c / 2) * (t * t * t + 2) + b;
}

// Enhanced Scroll to top button functionality
window.onscroll = function() {
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (scrollBtn) {
    if (window.scrollY > 300) {
      scrollBtn.style.display = 'block';
      scrollBtn.style.opacity = '1';
    } else {
      scrollBtn.style.opacity = '0';
      setTimeout(() => {
        if (window.scrollY <= 300) {
          scrollBtn.style.display = 'none';
        }
      }, 300);
    }
  }
};

// Add hover effect to skill tags
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-3px) scale(1.05)';
  });
  
  tag.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// CTA Button Functionality
document.addEventListener('DOMContentLoaded', function() {
  const ctaButtons = document.querySelectorAll('.cta-button');
  
  ctaButtons.forEach(button => {
    button.addEventListener('click', function() {
      if (this.textContent.includes('View My Work')) {
        document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
      } else if (this.textContent.includes('Download CV')) {
        // Simulate CV download
        this.textContent = 'Downloading... 📄';
        setTimeout(() => {
          this.textContent = 'Downloaded! ✅';
          setTimeout(() => {
            this.textContent = 'Download CV';
          }, 2000);
        }, 1500);
      }
    });
  });
});

// Enhanced Project Card Interactions
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', function() {
    const overlay = this.querySelector('.project-overlay');
    if (overlay) {
      overlay.style.opacity = '1';
      setTimeout(() => {
        overlay.style.opacity = '0';
      }, 2000);
    }
  });
});

// Social Links Enhancement
document.querySelectorAll('.social-link').forEach(link => {
  link.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-2px)';
  });
  
  link.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// Add some fun Easter eggs
let clickCount = 0;
document.addEventListener('click', function() {
  clickCount++;
  if (clickCount === 10) {
    createFloatingHeart();
    clickCount = 0;
  }
});

function createFloatingHeart() {
  const heart = document.createElement('div');
  heart.innerHTML = '💖';
  heart.style.position = 'fixed';
  heart.style.left = Math.random() * window.innerWidth + 'px';
  heart.style.top = window.innerHeight + 'px';
  heart.style.fontSize = '2rem';
  heart.style.pointerEvents = 'none';
  heart.style.zIndex = '9999';
  heart.style.transition = 'all 3s ease-out';
  
  document.body.appendChild(heart);
  
  setTimeout(() => {
    heart.style.top = '-50px';
    heart.style.opacity = '0';
  }, 100);
  
  setTimeout(() => {
    document.body.removeChild(heart);
  }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
  const navWrapper = document.querySelector('.nav-wrapper');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  // Set scroll-padding-top based on nav height for accurate anchor scrolling
  if (navWrapper) {
    const setScrollPadding = () => {
      const navHeight = navWrapper.offsetHeight;
      document.documentElement.style.scrollPaddingTop = navHeight + 'px';
    };
    setScrollPadding();
    window.addEventListener('resize', setScrollPadding);
  }

  // Handle nav shadow and scroll-to-top button visibility
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      if(navWrapper) navWrapper.classList.add('scrolled');
    } else {
      if(navWrapper) navWrapper.classList.remove('scrolled');
    }

    if (scrollTopBtn) {
      if (window.scrollY > 300) {
        scrollTopBtn.style.display = 'block';
      } else {
        scrollTopBtn.style.display = 'none';
      }
    }
  });

  // Contact form submission logic
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      if (name && email && message) {
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
      } else {
        alert('Please fill out all fields before sending.');
      }
    });
  }
});
  