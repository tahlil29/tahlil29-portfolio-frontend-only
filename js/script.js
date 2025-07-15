// my-portfolio-frontend-ONLY/js/script.js

// --- IMPORTANT: ADD THIS LINE AND REPLACE THE PLACEHOLDER ---
// This constant will hold the full URL to your deployed Backend API endpoint.
// Replace 'https://YOUR_ACTUAL_RENDER_BACKEND_URL_HERE' with the REAL URL you copied from Render's dashboard for your Backend Web Service.
// Example: If your backend URL is https://my-portfolio-backend-1234.onrender.com, it should be:
// const backendApiUrl = "https://my-portfolio-backend-1234.onrender.com/send-message";
const backendApiUrl = "https://tahlil29-portfolio-backend-api.onrender.com/send-message"; // <-- THIS IS THE CHANGE!
// -----------------------------------------------------------


document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            try {
                // --- USE THE backendApiUrl CONSTANT HERE IN YOUR FETCH CALL ---
                const response = await fetch(backendApiUrl, { // <-- THIS IS THE CHANGE!
                // -----------------------------------------------------------
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json(); // Always try to parse JSON response

                if (response.ok) { // Check if the HTTP status code is 2xx (e.g., 200 OK)
                    alert('Message sent successfully!');
                    contactForm.reset(); // Clear the form fields
                } else {
                    // Display specific error message from the backend if available
                    console.error('Backend error response:', result); // Log the full error to console
                    alert('Failed to send message: ' + (result.message || 'Unknown error. Check console for details.'));
                }
            } catch (error) {
                // This catches network errors or issues with the fetch itself (e.g., CORS blocked)
                console.error('Frontend fetch error:', error);
                alert('An error occurred. Please check your internet connection or try again later.');
            }
        });
    } else {
        console.warn('Contact form (element with ID "contactForm") not found on this page.');
    }
});