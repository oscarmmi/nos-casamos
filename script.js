// Slider functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
  // Hide all slides
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  // Show current slide
  if (slides[index]) {
    slides[index].classList.add('active');
    dots[index].classList.add('active');
  }
}

function changeSlide(direction) {
  currentSlideIndex += direction;
  
  if (currentSlideIndex >= slides.length) {
    currentSlideIndex = 0;
  } else if (currentSlideIndex < 0) {
    currentSlideIndex = slides.length - 1;
  }
  
  showSlide(currentSlideIndex);
}

function currentSlide(index) {
  currentSlideIndex = index - 1;
  showSlide(currentSlideIndex);
}

// Auto-advance slides every 5 seconds
function autoAdvance() {
  changeSlide(1);
}

let slideInterval = setInterval(autoAdvance, 5000);

// Pause auto-advance when hovering over slider
document.querySelector('.slider-container').addEventListener('mouseenter', () => {
  clearInterval(slideInterval);
});

// Resume auto-advance when leaving slider
document.querySelector('.slider-container').addEventListener('mouseleave', () => {
  slideInterval = setInterval(autoAdvance, 5000);
});

// Get modal elements
const modal = document.getElementById('rsvpModal');
const openBtn = document.getElementById('openModal');
const closeBtn = document.querySelector('.close-button');

// Open modal
openBtn.onclick = function() {
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Close modal
closeBtn.onclick = function() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close if clicked outside modal
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// Handle form submission
document.getElementById('rsvpForm').onsubmit = function(e) {
  e.preventDefault();
  // Add your form submission logic here
  alert('¡Gracias por confirmar tu asistencia!');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

function updateCountdown() {
  const weddingDate = new Date('December 20, 2025 14:00:00').getTime();
  
  function update() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

    // Update simple countdown in the "Cuándo" section
    const daysSimpleElement = document.getElementById('days-simple');
    if (daysSimpleElement) {
      daysSimpleElement.textContent = days.toString();
    }

    if (distance < 0) {
      clearInterval(timer);
      document.querySelector('.countdown').innerHTML = '<div class="wedding-date">¡El gran día ha llegado!</div>';
      if (daysSimpleElement) {
        daysSimpleElement.textContent = '0';
      }
    }
  }

  update();
  const timer = setInterval(update, 1000);
}

document.addEventListener('DOMContentLoaded', updateCountdown);

// --- Touch/Swipe support for slider ---
(function() {
  const sliderContainer = document.querySelector('.slider-container');
  let startX = null;

  if (sliderContainer) {
    sliderContainer.addEventListener('touchstart', function(e) {
      if (e.touches.length === 1) {
        startX = e.touches[0].clientX;
      }
    });

    sliderContainer.addEventListener('touchend', function(e) {
      if (startX !== null && e.changedTouches.length === 1) {
        const endX = e.changedTouches[0].clientX;
        const diff = endX - startX;
        if (Math.abs(diff) > 50) { // threshold for swipe
          if (diff < 0) {
            // Swipe left: next slide
            changeSlide(1);
          } else {
            // Swipe right: previous slide
            changeSlide(-1);
          }
        }
      }
      startX = null;
    });
  }
})(); 