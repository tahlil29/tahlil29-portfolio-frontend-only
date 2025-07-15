document.addEventListener('DOMContentLoaded', () => {

    // --- Side Menu Functionality ---
    const sideMenu = document.getElementById('sideMenu');
    const mainContent = document.getElementById('mainContent');
    const hamburgerMenu = document.querySelector('.hamburger-menu');

    window.openNav = function() {
        sideMenu.style.width = "250px"; // Width of the sidebar
        mainContent.style.marginLeft = "250px"; // Push main content
        hamburgerMenu.classList.add('active'); // Animate hamburger
    }

    window.closeNav = function() {
        sideMenu.style.width = "0";
        mainContent.style.marginLeft = "0";
        hamburgerMenu.classList.remove('active'); // Reset hamburger
    }

    // Close side menu if clicked outside on larger screens (optional, but good UX)
    // This part can be tricky with fixed elements and often best left to direct close button
    // or integrated into hamburger toggle. For now, rely on closeNav().


    // --- Animated Banner Background ---
    const heroBanner = document.getElementById('heroBanner');
    const bannerImages = [
        'assets/images/banner-bg1.jpg',
        'assets/images/banner-bg2.jpg',
        // Add more image paths here
    ];
    let currentBannerIndex = 0;

    function changeBannerBackground() {
        if (bannerImages.length === 0) return; // No images to cycle

        currentBannerIndex = (currentBannerIndex + 1) % bannerImages.length;
        heroBanner.style.backgroundImage = `url('${bannerImages[currentBannerIndex]}')`;
    }

    if (heroBanner && bannerImages.length > 1) { // Only animate if more than one image
        heroBanner.style.backgroundImage = `url('${bannerImages[currentBannerIndex]}')`; // Set initial background
        setInterval(changeBannerBackground, 8000); // Change every 8 seconds
    }


    // --- Scrolling Designation Effect ---
    const designationTexts = document.querySelectorAll('.designation-text');
    let currentDesignationIndex = 0;

    function animateDesignations() {
        if (designationTexts.length === 0) return;

        // Hide all designations initially (or after previous animation)
        designationTexts.forEach(span => {
            span.style.opacity = 0;
            span.style.transform = 'translateY(100%)'; // Start from bottom
        });

        // Show the current one
        designationTexts[currentDesignationIndex].style.opacity = 1;
        designationTexts[currentDesignationIndex].style.transform = 'translateY(0)'; // Move to center

        // Move to the next designation after a delay
        setTimeout(() => {
            designationTexts[currentDesignationIndex].style.opacity = 0;
            designationTexts[currentDesignationIndex].style.transform = 'translateY(-100%)'; // Move upwards
            currentDesignationIndex = (currentDesignationIndex + 1) % designationTexts.length;
        }, 3000); // Display for 3 seconds

        // Schedule the next animation cycle
        setTimeout(animateDesignations, 3700); // 3s display + 0.7s transition duration
    }

    // Start the animation only if designations exist
    if (designationTexts.length > 0) {
        // Initial setup for the first designation to appear without initial upwards movement
        designationTexts[currentDesignationIndex].style.opacity = 1;
        designationTexts[currentDesignationIndex].style.transform = 'translateY(0)';
        setTimeout(() => {
            currentDesignationIndex = (currentDesignationIndex + 1) % designationTexts.length;
            animateDesignations(); // Start the full animation loop
        }, 3000);
    }


    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === "#") { // Handle logo click or empty hash
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });


    // --- Contact Form Submission (Frontend Logic) ---
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent default form submission

            formMessage.style.display = 'none'; // Hide previous messages
            formMessage.classList.remove('success', 'error'); // Reset classes

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            try {
                // IMPORTANT: Replace with your Railway.com backend URL
                const response = await fetch('https://your-railway-app-name.railway.app/send-message', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json();

                if (response.ok) {
                    formMessage.classList.add('success');
                    formMessage.textContent = result.message || 'Message sent successfully!';
                    contactForm.reset(); // Clear the form
                } else {
                    formMessage.classList.add('error');
                    formMessage.textContent = result.message || 'Failed to send message. Please try again.';
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                formMessage.classList.add('error');
                formMessage.textContent = 'An error occurred. Please check your internet connection and try again.';
            } finally {
                formMessage.style.display = 'block'; // Show the message
            }
        });
    }
});