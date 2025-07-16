// js/script.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Side Menu Functionality ---
    // Function to open the side menu
    window.openNav = function() {
        document.getElementById("sideMenu").style.width = "250px";
        document.getElementById("mainContent").style.marginLeft = "250px";
    }

    // Function to close the side menu
    window.closeNav = function() {
        document.getElementById("sideMenu").style.width = "0";
        document.getElementById("mainContent").style.marginLeft = "0";
    }

    // --- Designation Slider Animation ---
    const designations = document.querySelectorAll('.designation-text');
    let currentIndex = 0;

    // Ensure there are designations to animate
    if (designations.length > 0) {
        // Initially show the first designation. This runs as soon as the DOM is ready.
        designations[currentIndex].style.opacity = '1';
        designations[currentIndex].style.transform = 'translateY(0)';

        // Function to animate the designations
        function animateDesignations() {
            // Hide the current designation (move up and fade out)
            designations[currentIndex].style.opacity = '0';
            designations[currentIndex].style.transform = 'translateY(-100%)';

            // Move to the next index, looping back to the start if at the end
            currentIndex = (currentIndex + 1) % designations.length;

            // Show the next designation (move down into view and fade in)
            const nextDesignation = designations[currentIndex];
            nextDesignation.style.opacity = '1';
            nextDesignation.style.transform = 'translateY(0)';
        }

        // Start the animation. The first transition will happen AFTER 3 seconds,
        // allowing the initial text to be visible for that duration.
        setTimeout(() => {
            setInterval(animateDesignations, 3000); // Change text every 3 seconds
        }, 3000);
    }


    // --- Contact Form JavaScript ---
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent default form submission

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries()); // Convert form data to a plain object

            try {
                // Send the form data to your Render backend
                const response = await fetch('https://tahlil29-portfolio-backend-api.onrender.com/send-message', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data) // Send data as JSON
                });

                const result = await response.json(); // Parse the JSON response from backend

                if (response.ok) { // Check if the response status is 2xx
                    formMessage.textContent = result.message;
                    formMessage.className = 'form-message success';
                    contactForm.reset(); // Clear the form fields on success
                } else {
                    // If backend sends an error status
                    formMessage.textContent = result.message || 'Failed to send message.';
                    formMessage.className = 'form-message error';
                }
            } catch (error) {
                // Catch network errors or other unexpected issues
                console.error('Error:', error);
                formMessage.textContent = 'Network error: Could not reach the server or unexpected issue.';
                formMessage.className = 'form-message error';
            } finally {
                // Always display the message div after an attempt
                formMessage.style.display = 'block';
            }
        });
    }

}); // End DOMContentLoaded