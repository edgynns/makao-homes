// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Testimonial Slider
    const dots = document.querySelectorAll('.slider-dot');
    const slides = document.querySelectorAll('.testimonial-slide');
    
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = this.getAttribute('data-slide');
            
            // Remove active class from all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Add active class to selected slide and dot
            slides[slideIndex].classList.add('active');
            this.classList.add('active');
        });
    });
    
    // Automatic slide change
    let currentSlide = 0;
    const slideCount = slides.length;
    
    function nextSlide() {
        // Remove active class from current slide and dot
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        // Move to next slide
        currentSlide = (currentSlide + 1) % slideCount;
        
        // Add active class to new slide and dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Navigation link active state
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
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
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Availability form handling
    const checkAvailabilityBtn = document.getElementById('check-availability');
    
    if (checkAvailabilityBtn) {
        checkAvailabilityBtn.addEventListener('click', function() {
            const checkin = document.getElementById('checkin').value;
            const checkout = document.getElementById('checkout').value;
            const guests = document.getElementById('guests').value;
            
            // Validate dates
            if (!checkin || !checkout) {
                alert('Please select both check-in and check-out dates');
                return;
            }
            
            // Check if dates are valid
            const checkinDate = new Date(checkin);
            const checkoutDate = new Date(checkout);
            
            if (checkinDate >= checkoutDate) {
                alert('Check-out date must be after check-in date');
                return;
            }
            
            // Create and display results section
            const resultsContainer = document.createElement('div');
            resultsContainer.style.marginTop = '20px';
            resultsContainer.style.padding = '15px';
            resultsContainer.style.backgroundColor = '#f8f9fa';
            resultsContainer.style.borderRadius = '5px';
            resultsContainer.innerHTML = `
                <h4>Selected Dates</h4>
                <p><strong>Check-in:</strong> ${checkin}</p>
                <p><strong>Check-out:</strong> ${checkout}</p>
                <p><strong>Guests:</strong> ${guests}</p>
                <p class="price" style="margin-top: 10px; font-size: 18px;">Available rooms from KES 5,210 / night</p>
                <button class="button" style="width: 100%; margin-top: 15px;">View Available Options</button>
            `;
            
            // First remove any existing results
            const existingResults = document.querySelector('.availability-results');
            if (existingResults) {
                existingResults.remove();
            }
            
            // Add class for styling
            resultsContainer.classList.add('availability-results');
            
            // Append to container
            document.querySelector('.check-availability-container').appendChild(resultsContainer);
        });
    }
    
    // Add event listeners for apartment cards
    const viewDetailsButtons = document.querySelectorAll('.book-now-btn');
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const apartmentTitle = this.closest('.apartment-card').querySelector('.apartment-title').textContent;
            alert(`You're viewing details for the ${apartmentTitle}. In a complete application, this would show more details and booking options.`);
        });
    });
    
    // Newsletter subscription
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing with ${email}! You'll receive our next newsletter soon.`);
            this.reset();
        });
    }

    // API INTEGRATION 1: Fetch nearby attractions from TripAdvisor API
    // Using a CORS proxy to avoid cross-origin issues
    async function fetchAttractions() {
        try {
            // In a real application, you would use your API key
            const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=6');
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Process the data
            displayAttractions(data);
        } catch (error) {
            console.error('Error fetching attractions:', error);
            document.getElementById('attractions-container').innerHTML = `
                <div class="error-message" style="grid-column: 1 / -1; text-align: center; padding: 30px;">
                    <p>Sorry, we couldn't load attractions at this time. Please try again later.</p>
                </div>
            `;
        }
    }
    
    // Function to display attractions
    function displayAttractions(attractions) {
        const attractionsContainer = document.getElementById('attractions-container');
        
        // Clear loading spinner
        attractionsContainer.innerHTML = '';
        
        // Array of attraction types for variety
        const types = ['Museum', 'Park', 'Restaurant', 'Historical Site', 'Shopping', 'Beach'];
        
        // Array of distances
        const distances = ['0.8 km', '1.2 km', '2.5 km', '3.7 km', '4.1 km', '5.3 km'];
        
        // Sample descriptions for attractions
        const descriptions = [
            'A stunning venue showcasing local art and culture with interactive exhibits.',
            'Beautiful green space perfect for morning walks or afternoon picnics.',
            'Award-winning culinary experience with local and international cuisine.',
            'Fascinating landmark that showcases Kenya\'s rich heritage and history.',
            'Premium shopping experience with local crafts and international brands.',
            'Serene location to relax and enjoy the natural beauty of the surroundings.'
        ];
        
        // Map data to our attraction cards
        attractions.forEach((item, index) => {
            const attractionCard = document.createElement('div');
            attractionCard.className = 'attraction-card';
            
            // Create a more meaningful title from the photo title
            const words = item.title.split(' ');
            const title = words.length > 3 
                ? words.slice(0, 3).join(' ') + ' ' + types[index % types.length]
                : item.title;
            
            attractionCard.innerHTML = `
                <div class="attraction-image">
                    <img src="${item.thumbnailUrl}" alt="${title}">
                </div>
                <div class="attraction-info">
                    <h3 class="attraction-title">${title}</h3>
                    <p class="attraction-description">${descriptions[index % descriptions.length]}</p>
                    <div class="attraction-meta">
                        <span class="type">${types[index % types.length]}</span>
                        <span class="distance">${distances[index % distances.length]} from Makao Homes</span>
                    </div>
                </div>
            `;
            
            attractionsContainer.appendChild(attractionCard);
        });
    }
    
    // API INTEGRATION 2: Fetch current weather
    async function fetchWeather() {
        try {
            // In a real application, you would use your API key
            const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Simulate weather data since we're using a placeholder API
            const weatherData = {
                temp: Math.floor(Math.random() * 10) + 20, // 20-30°C
                condition: ['Sunny', 'Partly Cloudy', 'Clear Skies', 'Light Rain'][Math.floor(Math.random() * 4)]
            };
            
            // Display weather
            const weatherStatus = document.getElementById('weather-status');
            if (weatherStatus) {
                let weatherIcon = '';
                
                // Choose icon based on condition
                if (weatherData.condition.includes('Sunny')) {
                    weatherIcon = '<i class="fas fa-sun weather-icon" style="color: #FFD700;"></i>';
                } else if (weatherData.condition.includes('Cloudy')) {
                    weatherIcon = '<i class="fas fa-cloud weather-icon" style="color: #A9A9A9;"></i>';
                } else if (weatherData.condition.includes('Rain')) {
                    weatherIcon = '<i class="fas fa-cloud-rain weather-icon" style="color: #4682B4;"></i>';
                } else {
                    weatherIcon = '<i class="fas fa-cloud-sun weather-icon" style="color: #87CEEB;"></i>';
                }
                
                weatherStatus.innerHTML = `${weatherIcon} ${weatherData.temp}°C, ${weatherData.condition}`;
            }
        } catch (error) {
            console.error('Error fetching weather:', error);
            const weatherStatus = document.getElementById('weather-status');
            if (weatherStatus) {
                weatherStatus.textContent = 'Weather data unavailable';
            }
        }
    }
    
    // Call our API functions
    fetchAttractions();
    fetchWeather();
});