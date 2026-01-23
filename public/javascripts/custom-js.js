const titleElement = document.querySelector('.TitleName');
const texts = ['Rohan Vyas', 'Software Developer', 'Hacker'];
let currentIndex = 0;

function glitchAndSwitch() {
    // Add glitch class
    titleElement.classList.add('glitch');
    titleElement.setAttribute('data-text', texts[currentIndex]);

    // After glitch animation (300ms), change text
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % texts.length;
        titleElement.textContent = texts[currentIndex];
        titleElement.setAttribute('data-text', texts[currentIndex]);

        // Remove glitch class after animation
        setTimeout(() => {
            titleElement.classList.remove('glitch');
        }, 300);
    }, 150);
}

// Set initial text
titleElement.textContent = texts[0];
titleElement.setAttribute('data-text', texts[0]);

// Start glitching every 4 seconds
setInterval(glitchAndSwitch, 4000);


// Smooth scroll and active nav link highlighting
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

// Handle navigation clicks
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Update active class
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Update active nav on scroll
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
  const skillItems = document.querySelectorAll('.skill-item');
  
  // Animate skills on hover
  skillItems.forEach(item => {
    const progress = item.querySelector('.skill-progress');
    const skillLevel = item.getAttribute('data-skill');
    
    item.addEventListener('mouseenter', function() {
      progress.style.width = skillLevel + '%';
    });
    
    item.addEventListener('mouseleave', function() {
      progress.style.width = '0%';
    });
  });
  
  // Optional: Animate skills when scrolling into view
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillsSection = entry.target;
        const items = skillsSection.querySelectorAll('.skill-item');
        
        items.forEach((item, index) => {
          setTimeout(() => {
            const progress = item.querySelector('.skill-progress');
            const skillLevel = item.getAttribute('data-skill');
            progress.style.width = skillLevel + '%';
            
            // Reset after animation
            setTimeout(() => {
              progress.style.width = '0%';
            }, 2000);
          }, index * 100);
        });
      }
    });
  }, observerOptions);
  
  const skillsGrid = document.querySelector('.skills-grid');
  if (skillsGrid) {
    observer.observe(skillsGrid);
  }
});