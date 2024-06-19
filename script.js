let slideIndex = 0;
let startX, currentX;
let isDragging = false;
const slides = document.getElementsByClassName("mySlides");
const dots = document.getElementsByClassName("dot");

function showSlides(n) {
  if (n >= slides.length) {
    slideIndex = 0;
  }
  if (n < 0) {
    slideIndex = slides.length - 1;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
    slides[i].style.transform = "translateX(0)";
  }
  slides[slideIndex].classList.add("active");
  updateDots();
}

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n - 1));
}

function updateDots() {
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }
  dots[slideIndex].classList.add("active");
}

function autoShowSlides() {
  plusSlides(1);
  setTimeout(autoShowSlides, 5000); // Change slide every 5 seconds
}

document
  .querySelector(".slideshow-container")
  .addEventListener("mousedown", (e) => {
    startX = e.clientX;
    isDragging = true;
  });

document
  .querySelector(".slideshow-container")
  .addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    currentX = e.clientX;
    const deltaX = currentX - startX;
    slides[slideIndex].style.transform = `translateX(${deltaX}px)`;
  });

document
  .querySelector(".slideshow-container")
  .addEventListener("mouseup", (e) => {
    isDragging = false;
    const deltaX = e.clientX - startX;
    slides[slideIndex].style.transform = "";
    if (deltaX > 50) {
      plusSlides(-1);
    } else if (deltaX < -50) {
      plusSlides(1);
    }
  });

document
  .querySelector(".slideshow-container")
  .addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

document
  .querySelector(".slideshow-container")
  .addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
    const deltaX = currentX - startX;
    slides[slideIndex].style.transform = `translateX(${deltaX}px)`;
  });

document
  .querySelector(".slideshow-container")
  .addEventListener("touchend", (e) => {
    isDragging = false;
    const deltaX = e.changedTouches[0].clientX - startX;
    slides[slideIndex].style.transform = "";
    if (deltaX > 50) {
      plusSlides(-1);
    } else if (deltaX < -50) {
      plusSlides(1);
    }
  });

document.getElementById("menu-icon").addEventListener("click", () => {
  const navLinks = document.getElementById("nav-links");
  navLinks.classList.toggle("show");
});

showSlides(slideIndex);
autoShowSlides();


// Load JSON data
fetch('parties.json')
  .then(response => response.json())
  .then(data => {
    const partyList = document.querySelector('.party-list');

    // Loop through parties data and create HTML elements
    data.parties.forEach((party, index) => {
      const partyItem = document.createElement('div');
      partyItem.classList.add('party-item');
      partyItem.innerHTML = `
      <div class="image-container">
<img src=${party.image} alt="Best 1">
      </div>
      
      <h3>${party.party_name}</h3>
      <div class="details">
       
        <p>التاريخ: ${party.date}</p>
        <button onclick="viewPartyDetails(${index})">شراء</button>
      </div>
       
        
      `;
      partyList.appendChild(partyItem);
    });

    // Function to view party details
    window.viewPartyDetails = function(index) {
      // Store selected party details in sessionStorage (or use other methods for state management)
      sessionStorage.setItem('selectedParty', JSON.stringify(data.parties[index]));

      // Navigate to details page
      window.location.href = 'party-details.html';
    };
  })
  .catch(error => console.error('Error fetching parties data:', error));

