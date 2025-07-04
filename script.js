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

// Music Player Functionality
(function() {
  const musicToggle = document.getElementById('musicToggle');
  const backgroundMusic = document.getElementById('backgroundMusic');
  let isPlaying = false;

  // Check if music was playing before (localStorage)
  const wasPlaying = localStorage.getItem('musicPlaying') === 'true';
  
  musicToggle.addEventListener('click', function() {
    if (isPlaying) {
      // Stop music
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;
      musicToggle.classList.remove('playing');
      isPlaying = false;
      localStorage.setItem('musicPlaying', 'false');
    } else {
      // Play music
      backgroundMusic.play().then(() => {
        musicToggle.classList.add('playing');
        isPlaying = true;
        localStorage.setItem('musicPlaying', 'true');
      }).catch(error => {
        console.log('Audio playback failed:', error);
        // Show a subtle notification that music couldn't play
        showMusicError();
      });
    }
  });

  // Auto-play music if it was playing before (optional)
  if (wasPlaying) {
    // Only auto-play if user has interacted with the page
    document.addEventListener('click', function autoPlayMusic() {
      if (wasPlaying && !isPlaying) {
        backgroundMusic.play().then(() => {
          musicToggle.classList.add('playing');
          isPlaying = true;
        }).catch(error => {
          console.log('Auto-play failed:', error);
        });
      }
      document.removeEventListener('click', autoPlayMusic);
    }, { once: true });
  }

  // Handle audio events
  backgroundMusic.addEventListener('ended', function() {
    // Music ended (shouldn't happen with loop, but just in case)
    musicToggle.classList.remove('playing');
    isPlaying = false;
    localStorage.setItem('musicPlaying', 'false');
  });

  backgroundMusic.addEventListener('error', function() {
    console.log('Audio error occurred');
    showMusicError();
  });

  function showMusicError() {
    // Create a subtle notification
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: rgba(255, 0, 0, 0.8);
      color: white;
      padding: 10px 15px;
      border-radius: 5px;
      font-size: 14px;
      z-index: 1001;
      backdrop-filter: blur(10px);
      animation: slideIn 0.3s ease;
    `;
    notification.textContent = 'Music file not found. Please add your music file.';
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  // Add CSS animations for notifications
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
})();

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

// --- Gallery Slider for Recepción section ---
(function() {
  const gallerySlides = document.querySelectorAll('.gallery-slide');
  const totalGallery = gallerySlides.length;
  let currentGalleryIndex = 0;
  let galleryInterval;

  function showGallerySlide(idx) {
    gallerySlides.forEach((img, i) => {
      img.classList.toggle('active', i === idx);
    });
  }

  window.changeGalleryImage = function(direction) {
    currentGalleryIndex += direction;
    if (currentGalleryIndex >= totalGallery) currentGalleryIndex = 0;
    if (currentGalleryIndex < 0) currentGalleryIndex = totalGallery - 1;
    showGallerySlide(currentGalleryIndex);
  };

  function autoGallery() {
    galleryInterval = setInterval(() => {
      window.changeGalleryImage(1);
    }, 4000);
  }

  // Touch/Swipe support for gallery slider
  const gallerySlider = document.querySelector('.gallery-slider');
  let startX = null;
  if (gallerySlider) {
    gallerySlider.addEventListener('touchstart', function(e) {
      if (e.touches.length === 1) {
        startX = e.touches[0].clientX;
      }
    });
    gallerySlider.addEventListener('touchend', function(e) {
      if (startX !== null && e.changedTouches.length === 1) {
        const endX = e.changedTouches[0].clientX;
        const diff = endX - startX;
        if (Math.abs(diff) > 50) {
          if (diff < 0) {
            window.changeGalleryImage(1);
          } else {
            window.changeGalleryImage(-1);
          }
        }
      }
      startX = null;
    });
  }

  // Start auto-advance
  if (totalGallery > 1) {
    autoGallery();
    // Pause on hover (desktop)
    if (gallerySlider) {
      gallerySlider.addEventListener('mouseenter', () => clearInterval(galleryInterval));
      gallerySlider.addEventListener('mouseleave', autoGallery);
    }
  }

  // Show first image on load
  showGallerySlide(currentGalleryIndex);
})(); 

// --- Gallery Slider for Ceremonia section ---
(function() {
  const ceremonyGallery = document.querySelector('.ceremony-gallery');
  if (!ceremonyGallery) return;
  const ceremonySlides = ceremonyGallery.querySelectorAll('.gallery-slide');
  const totalCeremony = ceremonySlides.length;
  let currentCeremonyIndex = 0;
  let ceremonyInterval;

  function showCeremonySlide(idx) {
    ceremonySlides.forEach((img, i) => {
      img.classList.toggle('active', i === idx);
    });
  }

  window.changeCeremonyGalleryImage = function(direction) {
    currentCeremonyIndex += direction;
    if (currentCeremonyIndex >= totalCeremony) currentCeremonyIndex = 0;
    if (currentCeremonyIndex < 0) currentCeremonyIndex = totalCeremony - 1;
    showCeremonySlide(currentCeremonyIndex);
  };

  function autoCeremonyGallery() {
    ceremonyInterval = setInterval(() => {
      window.changeCeremonyGalleryImage(1);
    }, 4000);
  }

  // Touch/Swipe support for ceremony gallery slider
  let startX = null;
  ceremonyGallery.addEventListener('touchstart', function(e) {
    if (e.touches.length === 1) {
      startX = e.touches[0].clientX;
    }
  });
  ceremonyGallery.addEventListener('touchend', function(e) {
    if (startX !== null && e.changedTouches.length === 1) {
      const endX = e.changedTouches[0].clientX;
      const diff = endX - startX;
      if (Math.abs(diff) > 50) {
        if (diff < 0) {
          window.changeCeremonyGalleryImage(1);
        } else {
          window.changeCeremonyGalleryImage(-1);
        }
      }
    }
    startX = null;
  });

  // Start auto-advance
  if (totalCeremony > 1) {
    autoCeremonyGallery();
    // Pause on hover (desktop)
    ceremonyGallery.addEventListener('mouseenter', () => clearInterval(ceremonyInterval));
    ceremonyGallery.addEventListener('mouseleave', autoCeremonyGallery);
  }

  // Show first image on load
  showCeremonySlide(currentCeremonyIndex);
})(); 