/**
 * GSAP and WOW.js Animations for Shopify Theme
 * This file handles all scroll-triggered animations, parallax effects, and interactive elements
 */

// Register GSAP plugins
if (typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Initialize WOW.js
let wow;
if (typeof WOW !== 'undefined') {
  wow = new WOW({
    boxClass: 'wow',
    animateClass: 'animated',
    offset: 100,
    mobile: true,
    live: true,
    callback: function(box) {
      // Optional callback when animation completes
    },
    scrollContainer: null
  });
  wow.init();
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  initGSAPAnimations();
  initParallaxEffects();
  initButtonHoverEffects();
  initProductGridAnimations();
});

/**
 * Initialize GSAP scroll-triggered animations
 */
function initGSAPAnimations() {
  if (typeof gsap === 'undefined') return;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return; // Skip animations if user prefers reduced motion
  }

  // Animate headings with zoom-in effect - more impactful
  gsap.utils.toArray('.gsap-zoom-in').forEach((element, index) => {
    gsap.fromTo(element, 
      {
        opacity: 0,
        scale: 0.5,
        y: 50
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          once: true
        },
        delay: index * 0.1
      }
    );
  });

  // Animate text sections with fade-in - smoother
  gsap.utils.toArray('.gsap-fade-in').forEach((element, index) => {
    gsap.fromTo(element,
      {
        opacity: 0,
        y: 40,
        filter: 'blur(10px)'
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          once: true
        },
        delay: index * 0.12
      }
    );
  });

  // Animate images with slide-in from left - more dynamic
  gsap.utils.toArray('.gsap-slide-left').forEach((element, index) => {
    gsap.fromTo(element,
      {
        opacity: 0,
        x: -150,
        scale: 0.9,
        rotation: -5
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          once: true
        },
        delay: index * 0.1
      }
    );
  });

  // Animate images with slide-in from right - more dynamic
  gsap.utils.toArray('.gsap-slide-right').forEach((element, index) => {
    gsap.fromTo(element,
      {
        opacity: 0,
        x: 150,
        scale: 0.9,
        rotation: 5
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          once: true
        },
        delay: index * 0.1
      }
    );
  });

  // Animate buttons with scale effect - more bounce
  gsap.utils.toArray('.gsap-button-enter').forEach((element) => {
    gsap.fromTo(element,
      {
        opacity: 0,
        scale: 0.3,
        y: 30
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          once: true
        }
      }
    );
  });

  // Add smooth section transitions
  gsap.utils.toArray('section').forEach((section, index) => {
    if (section.classList.contains('animated-hero-section') || 
        section.classList.contains('animated-features-section') ||
        section.classList.contains('animated-product-showcase') ||
        section.classList.contains('animated-testimonials-section') ||
        section.classList.contains('animated-cta-section')) {
      
      // Fade in entire sections smoothly
      gsap.fromTo(section,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
            once: true
          }
        }
      );
    }
  });
}

/**
 * Initialize parallax scrolling effects using GSAP ScrollTrigger
 */
function initParallaxEffects() {
  if (typeof gsap === 'undefined') return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Parallax effect for background images - fixed to prevent white space
  gsap.utils.toArray('.parallax-bg').forEach((element) => {
    const container = element.closest('.parallax-container') || element.parentElement;
    if (!container) return;
    
    // Ensure container has overflow hidden
    container.style.overflow = 'hidden';
    
    gsap.to(element, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
        invalidateOnRefresh: true
      }
    });
  });

  // Parallax effect for images (slower scroll) - more subtle
  gsap.utils.toArray('.parallax-image').forEach((element) => {
    const container = element.closest('.parallax-container') || element.parentElement;
    if (container) {
      container.style.overflow = 'hidden';
    }
    
    gsap.to(element, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: element.closest('section') || element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
        invalidateOnRefresh: true
      }
    });
  });

  // Parallax effect for text (opposite direction) - subtle
  gsap.utils.toArray('.parallax-text').forEach((element) => {
    gsap.to(element, {
      yPercent: -15,
      ease: 'none',
      scrollTrigger: {
        trigger: element.closest('section') || element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
        invalidateOnRefresh: true
      }
    });
  });
}

/**
 * Initialize button hover bounce effects
 */
function initButtonHoverEffects() {
  if (typeof gsap === 'undefined') return;

  const buttons = document.querySelectorAll('.gsap-bounce-hover, .the-gift-guide-button, .text-container a, .mob-btn');
  
  buttons.forEach((button) => {
    button.addEventListener('mouseenter', function() {
      gsap.to(this, {
        scale: 1.05,
        duration: 0.3,
        ease: 'back.out(1.7)',
        yoyo: true,
        repeat: 1
      });
    });

    button.addEventListener('mouseleave', function() {
      gsap.to(this, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
}

/**
 * Initialize product grid animations
 */
function initProductGridAnimations() {
  if (typeof gsap === 'undefined') return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Animate product grid items with stagger - more impactful
  const gridItems = document.querySelectorAll('.grid-item, .product-card, .feature-card, .testimonial-card');
  
  if (gridItems.length > 0) {
    gsap.fromTo(gridItems,
      {
        opacity: 0,
        y: 60,
        scale: 0.85,
        rotation: 2
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: {
          amount: 0.6,
          from: 'start'
        },
        scrollTrigger: {
          trigger: gridItems[0].closest('section') || gridItems[0].parentElement,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
          once: true
        }
      }
    );
  }

  // Animate plus icons with a subtle bounce
  const plusIcons = document.querySelectorAll('.plus-icon');
  plusIcons.forEach((icon, index) => {
    gsap.fromTo(icon,
      {
        opacity: 0,
        scale: 0,
        rotation: -180
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: icon.closest('.grid-item') || icon,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          once: true
        },
        delay: index * 0.1
      }
    );
  });
}

// Handle responsive behavior - reduce animations on mobile
function handleResponsiveAnimations() {
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile && typeof gsap !== 'undefined') {
    // Reduce animation intensity on mobile
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars && trigger.vars.duration) {
        trigger.vars.duration = trigger.vars.duration * 0.7; // Make animations faster on mobile
      }
    });
  }
}

// Call on resize
let resizeTimer;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    handleResponsiveAnimations();
    ScrollTrigger.refresh();
  }, 250);
});

// Refresh ScrollTrigger on page load
window.addEventListener('load', function() {
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.refresh();
    // Fix any overflow issues
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
  }
});

// Prevent horizontal scroll
window.addEventListener('DOMContentLoaded', function() {
  document.body.style.overflowX = 'hidden';
  document.documentElement.style.overflowX = 'hidden';
});

// Handle Shopify theme editor
if (typeof Shopify !== 'undefined' && Shopify.designMode) {
  document.addEventListener('shopify:section:load', function(event) {
    // Reinitialize animations when section is loaded in theme editor
    setTimeout(function() {
      initGSAPAnimations();
      initParallaxEffects();
      initProductGridAnimations();
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }, 100);
  });
}

