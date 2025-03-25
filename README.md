# Makao Homes - Premium Apartment Booking Website

A responsive single-page application (SPA) for a premium accommodation service in Nairobi, Kenya. This project showcases modern web development techniques using HTML, CSS, and JavaScript.

## Features

- **Responsive Design:** Works seamlessly on mobile and desktop devices
- **Interactive Booking Form:** Includes date validation and guest selection
- **Apartment Listings:** Dynamic apartment listings fetched from an external API
- **Testimonial Slider:** Auto-rotating customer reviews with interactive navigation
- **Newsletter Subscription:** Email collection form for marketing
- **Smooth Scrolling:** Enhanced navigation with smooth scrolling to sections
- **Modern UI:** Elegant design with a gold and neutral color palette

## Technologies Used

- HTML5
- CSS3 (Flexbox & Grid for layouts)
- JavaScript (ES6+)
- External API integration (JSONPlaceholder for demo data)
- Font Awesome icons for UI elements

## Project Setup

1. Clone the repository
   ```
   git clone https://github.com/edgynns/makao-homes.git
   ```

2. Navigate to the project directory
   ```
   cd makao-homes
   ```

3. Open the project in your code editor or simply open the `index.html` file in your browser

## Live Demo

Check out the live site on GitHub Pages: [Makao Homes](https://edgynns.github.io/makao-homes)

## Project Structure

```
makao homes/
│
├── index.html          # Single HTML file for the entire application
├── css/
│   └── styles.css      # All styles for the application
├── js/
│   └── main.js         # JavaScript functionality
├── images/             # Image assets (add your own images here)
│   └── ...
└── README.md           # Project documentation
```

## Features Implementation Details

### Single Page Application
The entire application runs on a single HTML file with different sections that act as "pages".

### API Integration
The apartment listings are fetched from a public API (JSONPlaceholder for demo purposes), demonstrating asynchronous data handling.

### Event Listeners
The project incorporates multiple event listeners:
1. DOMContentLoaded - Initialize the application
2. Click - For navigation, testimonial slider, and form submissions
3. Change - For date picker validation
4. Scroll - For navigation highlighting
5. Submit - For form handling

## Contribution

Feel free to fork this project and submit pull requests. For major changes, please open an issue first to discuss the proposed changes.

## Author

Edgar Muchemi

## Acknowledgments

- Font Awesome for the icons
- Unsplash for the demo images
- JSONPlaceholder for the demo API