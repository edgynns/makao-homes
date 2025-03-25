// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initNavigation();
    
    // Initialize testimonial slider
    initTestimonialSlider();
    
    // Initialize date picker
    initDatePicker();
    
    // Initialize form handlers
    initFormHandlers();
    
    // Fetch apartments data from API
    fetchApartments();
    
    // Update hero image periodically
    updateHeroImage();
});

// Initialize navigation highlighting
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Set active class based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Smooth scroll to section when nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Update active class
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Initialize testimonial slider
function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.slider-dot');
    
    // Add click event to dots
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = this.getAttribute('data-slide');
            
            // Hide all slides
            slides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            // Remove active class from all dots
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Show selected slide and set active dot
            slides[slideIndex].classList.add('active');
            this.classList.add('active');
        });
    });
    
    // Auto slide every 5 seconds
    let currentSlide = 0;
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show next slide and set active dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Set interval for auto slide
    const slideInterval = setInterval(nextSlide, 5000);
    
    // Pause auto slide when user interacts with slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    testimonialSlider.addEventListener('mouseenter', function() {
        clearInterval(slideInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', function() {
        setInterval(nextSlide, 5000);
    });
}

// Initialize date picker
function initDatePicker() {
    const today = new Date().toISOString().split('T')[0];
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    
    // Set min date for check-in to today
    checkinInput.setAttribute('min', today);
    
    // Update checkout min date when checkin changes
    checkinInput.addEventListener('change', function() {
        // Set min checkout date to be the day after checkin
        const checkinDate = new Date(this.value);
        checkinDate.setDate(checkinDate.getDate() + 1);
        const minCheckout = checkinDate.toISOString().split('T')[0];
        checkoutInput.setAttribute('min', minCheckout);
        
        // If current checkout date is before new checkin date, update it
        if (checkoutInput.value && new Date(checkoutInput.value) <= new Date(this.value)) {
            checkoutInput.value = minCheckout;
        }
    });
}

// Form submission handlers
function initFormHandlers() {
    // Booking form submission
    const bookingButton = document.getElementById('check-availability');
    
    if (bookingButton) {
        bookingButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const checkin = document.getElementById('checkin').value;
            const checkout = document.getElementById('checkout').value;
            const guests = document.getElementById('guests').value;
            
            if (!checkin || !checkout) {
                alert('Please select check-in and check-out dates.');
                return;
            }
            
            // Calculate the number of nights
            const checkinDate = new Date(checkin);
            const checkoutDate = new Date(checkout);
            const nightsStay = Math.round((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
            
            // In a real application, you would send this data to a server
            // For this demo, we'll just show a confirmation message
            alert(`Booking request received!\n\nCheck-in: ${checkin}\nCheck-out: ${checkout}\nGuests: ${guests}\nNights: ${nightsStay}\n\nThank you for choosing Makao Homes!`);
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('.newsletter-input').value;
            
            if (!email) {
                alert('Please enter your email address.');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For this demo, we'll just show a confirmation message
            alert(`Thank you for subscribing to our newsletter!\n\nYou'll start receiving updates at: ${email}`);
            this.reset();
        });
    }
}

// Update hero image dynamically
function updateHeroImage() {
    const heroImg = document.getElementById('hero-img');
    
    if (heroImg) {
        // Array of apartment image URLs (could be local or from an API)
        const imageUrls = [
            'https://source.unsplash.com/random/600x400/?luxury,apartment',
            'https://source.unsplash.com/random/600x400/?modern,apartment',
            'https://source.unsplash.com/random/600x400/?condo',
            'https://source.unsplash.com/random/600x400/?penthouse'
        ];
        
        let currentImageIndex = 0;
        
        // Set initial image
        heroImg.src = imageUrls[currentImageIndex];
        
        // Update image every 7 seconds
        setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
            
            // Fade out effect
            heroImg.style.opacity = 0;
            
            // Change source after fade out
            setTimeout(() => {
                heroImg.src = imageUrls[currentImageIndex];
                
                // Fade in effect
                heroImg.style.opacity = 1;
            }, 500);
        }, 7000);
        
        // Add transition style
        heroImg.style.transition = 'opacity 0.5s ease-in-out';
    }
}

// Fetch apartments data from external API
function fetchApartments() {
    const apartmentContainer = document.getElementById('apartment-container');
    
    if (!apartmentContainer) return;
    
    // Show loading state
    apartmentContainer.innerHTML = '<div class="loading">Loading apartments...</div>';
    
    // Fetch data from public API (using JSONPlaceholder as an example)
    fetch('https://jsonplaceholder.typicode.com/photos?_limit=6')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Clear loading message
            apartmentContainer.innerHTML = '';
            
            // Process and display the apartments
            data.forEach(item => {
                // Create apartment types and prices
                const types = ['Studio', 'One Bedroom', 'Executive Suite', 'Penthouse', 'Family Suite', 'Deluxe Room'];
                const type = types[Math.floor(Math.random() * types.length)];
                const price = Math.floor(Math.random() * 10000) + 5000; // Random price between 5000-15000 KES
                const capacity = Math.floor(Math.random() * 4) + 1; // Random capacity between 1-4 guests
                
                // Create apartment card
                const apartmentCard = document.createElement('div');
                apartmentCard.className = 'apartment-card';
                
                apartmentCard.innerHTML = `
                    <div class="apartment-image">
                        <img src="${item.thumbnailUrl}" alt="${type}">
                    </div>
                    <div class="apartment-content">
                        <h3 class="apartment-title">${type}</h3>
                        <p class="apartment-description">${item.title.substring(0, 60)}...</p>
                        <div class="apartment-meta">
                            <span>KES ${price.toLocaleString()} / night</span>
                            <span>${capacity} Guest${capacity > 1 ? 's' : ''}</span>
                        </div>
                    </div>
                `;
                
                apartmentContainer.appendChild(apartmentCard);
            });
        })
        .catch(error => {
            console.error('Error fetching apartments:', error);
            apartmentContainer.innerHTML = `
                <div class="loading">
                    Failed to load apartments. Please try again later.
                </div>
            `;
        });
}