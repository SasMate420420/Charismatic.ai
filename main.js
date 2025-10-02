
// ========================================
// CONSOLIDATED CHARISMATIC.AI JAVASCRIPT
// ========================================

// Universal scroll-based animation for all elements
function animateAllElements() {
  const elements = document.querySelectorAll(
    '.hero-content, .section-title, .section-subtitle, .process-step, .cta-content, .chatbot-demo-inner'
  );

  elements.forEach((element, index) => {
    if (!element.classList.contains('visible') && !element.classList.contains('animated')) {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.8;

      if (isVisible) {
        // Staggered delay for process steps
        if (element.classList.contains('process-step')) {
          const stepIndex = Array.from(document.querySelectorAll('.process-step')).indexOf(element);
          setTimeout(() => {
            element.classList.add('visible');
            element.classList.add('animated');
          }, stepIndex * 200);
        // All other elements
        } else {
          element.classList.add('visible');
          element.classList.add('animated');
        }
      }
    }
  });
}

// Animate showcase cards on scroll
function animateOnScroll() {
  const showcaseCards = document.querySelectorAll('.showcase-card');
  const triggerBottom = window.innerHeight * 0.85; // when to trigger animation

  showcaseCards.forEach((card, index) => {
    const cardTop = card.getBoundingClientRect().top;

    if (cardTop < triggerBottom) {
      // Add visible class for CSS transition-based animations
      card.classList.add('visible');
      
      // Handle CSS keyframe animations for fade-in-left/right cards
      if (card.classList.contains('fade-in-left') || card.classList.contains('fade-in-right')) {
        // Add a small staggered delay for better visual effect
        setTimeout(() => {
          card.style.animationPlayState = 'running';
          card.style.opacity = '1';
        }, index * 100);
      }
    } else {
      // Reset animations when scrolling back up
      card.classList.remove('visible');
      if (card.classList.contains('fade-in-left') || card.classList.contains('fade-in-right')) {
        card.style.animationPlayState = 'paused';
        card.style.opacity = '0';
      }
    }
  });
}

// Fallback to ensure showcase cards are visible
function ensureShowcaseVisible() {
  const showcaseCards = document.querySelectorAll('.showcase-card');
  showcaseCards.forEach(card => {
    card.classList.add('visible');
    // Ensure keyframe animated cards are also visible
    if (card.classList.contains('fade-in-left') || card.classList.contains('fade-in-right')) {
      card.style.animationPlayState = 'running';
      card.style.opacity = '1';
    }
  });
}

// Initialize AOS library if available
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({ once: true, duration: 1200, offset: 80 });
  }
}

// Ensure Bootstrap navbar functionality works
function initBootstrapComponents() {
  // Make sure navbar toggler is always visible
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  if (navbarToggler) {
    // Force toggler to be visible (in case something is hiding it)
    navbarToggler.style.display = 'block';
    navbarToggler.style.visibility = 'visible';
    
    if (navbarCollapse) {
      // Ensure proper Bootstrap collapse functionality
      navbarToggler.addEventListener('click', function() {
        // Small delay to ensure Bootstrap has processed
        setTimeout(() => {
          if (navbarCollapse.classList.contains('show')) {
            document.body.style.overflow = 'hidden';
          } else {
            document.body.style.overflow = '';
          }
        }, 100);
      });
    }
  }
}

// Smooth scroll for anchor links
function smoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Parallax effect for hero
function parallaxEffect() {
  const hero = document.querySelector('.hero');
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;

  if (hero) {
    hero.style.transform = `translateY(${rate}px)`;
  }
}

// Handle CTA button click
function initCTAButton() {
  const demoBtn = document.getElementById('demo-btn');
  if (demoBtn) {
    demoBtn.addEventListener('click', function() {
      window.location.href = '#demo';
    });
  }
}

// Partners section fade-in on scroll
document.addEventListener('DOMContentLoaded', function() {
  const partnersSection = document.querySelector('.partners');
  if (!partnersSection) return;
  function onScroll() {
    const rect = partnersSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      partnersSection.classList.add('visible');
      window.removeEventListener('scroll', onScroll);
    }
  }
  window.addEventListener('scroll', onScroll);
  onScroll(); // check on load
});

// Initialize all animations and functionality
function initAnimations() {
  animateOnScroll();
  animateAllElements();
  smoothScroll();
  initAOS();
  initCTAButton();
  initBootstrapComponents();
  preventAnimationLoops();
}

// Prevent animation loops by marking elements as animated after first run
function preventAnimationLoops() {
  const animatedElements = document.querySelectorAll('.slide-in-left, .slide-in-right, .fade-in-up, .fade-in-left, .fade-in-right');
  
  animatedElements.forEach(element => {
    // Listen for animation end event and mark as animated
    element.addEventListener('animationend', function() {
      this.classList.add('animated');
    }, { once: true });
    
    // If element already has visible styling, mark as animated immediately
    const computedStyle = window.getComputedStyle(element);
    if (computedStyle.opacity === '1' || computedStyle.transform !== 'none') {
      element.classList.add('animated');
    }
  });
}

// Main scroll handler
function handleScroll() {
  animateOnScroll();
  animateAllElements();
  parallaxEffect();
}

// Main load handler
function handleLoad() {
  animateOnScroll();
  animateAllElements();
  setTimeout(ensureShowcaseVisible, 1000);
}

// Main DOMContentLoaded handler
function handleDOMContentLoaded() {
  initAnimations();
  animateOnScroll();
  animateAllElements();
  setTimeout(ensureShowcaseVisible, 500);
}

// Event listeners
window.addEventListener('scroll', handleScroll);
window.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
window.addEventListener('load', handleLoad);