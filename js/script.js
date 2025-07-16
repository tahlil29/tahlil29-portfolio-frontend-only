// For Side Menu functionality (if not already there)
function openNav() {
    document.getElementById("sideMenu").style.width = "250px";
    document.getElementById("mainContent").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("sideMenu").style.width = "0";
    document.getElementById("mainContent").style.marginLeft = "0";
}

// --- Designation Slider Animation ---
document.addEventListener('DOMContentLoaded', () => {
    const designations = document.querySelectorAll('.designation-text');
    let currentIndex = 0;

    function animateDesignations() {
        // Hide all designations first
        designations.forEach(span => {
            span.style.opacity = '0';
            span.style.transform = 'translateY(100%)'; // Move them down
        });

        // Show the current designation
        const currentDesignation = designations[currentIndex];
        currentDesignation.style.opacity = '1';
        currentDesignation.style.transform = 'translateY(0)'; // Move it into view

        currentIndex = (currentIndex + 1) % designations.length; // Cycle to the next
    }

    // Run the animation every few seconds
    // Initial display
    designations[currentIndex].style.opacity = '1';
    designations[currentIndex].style.transform = 'translateY(0)';
    currentIndex = (currentIndex + 1) % designations.length;

    setInterval(animateDesignations, 3000); // Change text every 3 seconds
});

// --- Contact Form JavaScript (if you still have it, keep it) ---
// If you want to put your contact form submission logic here,
// ensure it's not conflicting with the new `server.js` by sending data.
// Here's the basic structure from previous discussions, assuming your backend is at /send-message
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('https://tahlil29-portfolio-backend-api.onrender.com/send-message', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (response.ok) {
                    formMessage.textContent = result.message;
                    formMessage.className = 'form-message success';
                    contactForm.reset(); // Clear the form
                } else {
                    formMessage.textContent = result.message || 'Failed to send message.';
                    formMessage.className = 'form-message error';
                }
            } catch (error) {
                console.error('Error:', error);
                formMessage.textContent = 'Network error: Could not reach the server.';
                formMessage.className = 'form-message error';
            } finally {
                formMessage.style.display = 'block';
            }
        });
    }
});