// Testimonial Slider
document.addEventListener('DOMContentLoaded', function() {
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
                // Availability form handling
document.addEventListener('DOMContentLoaded', function() {
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
            
            // In a real application, you would make an API call here
            // For now, just show a simple response
            alert(`Checking availability for ${guests} guest(s) from ${checkin} to ${checkout}`);
            
            // You could also add a section to display results:
            // const resultsContainer = document.createElement('div');
            // resultsContainer.innerHTML = `<p>Available options for ${guests} guest(s) from ${checkin} to ${checkout} will be displayed here.</p>`;
            // document.querySelector('.check-availability-container').appendChild(resultsContainer);
        });
    }
});