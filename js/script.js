// js/script.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Side Menu Functionality ---
    window.openNav = function() {
        document.getElementById("sideMenu").style.width = "250px";
        document.getElementById("mainContent").style.marginLeft = "250px";
    }

    window.closeNav = function() {
        document.getElementById("sideMenu").style.width = "0";
        document.getElementById("mainContent").style.marginLeft = "0";
    }

    // --- Designation Slider Animation ---
    const designations = document.querySelectorAll('.designation-text');
    let currentIndex = 0;

    if (designations.length > 0) {
        designations[currentIndex].style.opacity = '1';
        designations[currentIndex].style.transform = 'translateY(0)';

        function animateDesignations() {
            designations[currentIndex].style.opacity = '0';
            designations[currentIndex].style.transform = 'translateY(-100%)';

            currentIndex = (currentIndex + 1) % designations.length;

            const nextDesignation = designations[currentIndex];
            // Reset position for the next one to come from bottom
            nextDesignation.style.transform = 'translateY(100%)';
            // A slight delay to ensure position reset before new animation starts
            setTimeout(() => {
                nextDesignation.style.opacity = '1';
                nextDesignation.style.transform = 'translateY(0)';
            }, 50); // Small delay
        }

        setTimeout(() => {
            setInterval(animateDesignations, 3000); // Change text every 3 seconds
        }, 3000);
    }


    // --- Contact Form JavaScript ---
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
                    contactForm.reset();
                } else {
                    formMessage.textContent = result.message || 'Failed to send message.';
                    formMessage.className = 'form-message error';
                }
            } catch (error) {
                console.error('Error:', error);
                formMessage.textContent = 'Network error: Could not reach the server or unexpected issue.';
                formMessage.className = 'form-message error';
            } finally {
                formMessage.style.display = 'block';
            }
        });
    }

    // --- Design Gallery Data (IMPORTANT: POPULATE THIS ARRAY) ---
    // This array holds the detailed information for each design.
    // The `id` here MUST match the `data-design-id` in your HTML's .design-item elements.
    const designsData = [
        {
            id: 'design_fitness_app',
            fullImageSrc: 'assets/designs/full_fitness_app.jpg', // Path to a larger image for the modal
            title: 'Fitness Tracking App UI',
            description: 'This project involved designing a mobile application interface for fitness tracking, focusing on intuitive navigation, clear data visualization, and an encouraging user experience. Key features include daily activity logs, workout plans, progress charts, and social sharing options. The design prioritizes readability and ease of use for a wide demographic of fitness enthusiasts.',
            tools: 'Figma, Adobe Illustrator',
            projectLink: 'https://behance.net/yourprofile/fitness-app-case-study' // Optional: Link to a Behance/Dribbble case study or live prototype
        },
        {
            id: 'design_cafe_brand',
            fullImageSrc: 'assets/designs/full_cafe_brand.jpg',
            title: 'Cafe Brand Identity',
            description: 'A comprehensive branding project for "The Daily Grind" cafe. This included logo design, color palette, typography selection, menu design, packaging, and interior design elements. The goal was to create a warm, inviting, and memorable brand presence that reflected the cafe\'s artisanal coffee and community focus.',
            tools: 'Adobe Illustrator, Adobe Photoshop',
            projectLink: 'https://dribbble.com/yourprofile/cafe-branding-project'
        },
        {
            id: 'design_event_poster',
            fullImageSrc: 'assets/designs/full_event_poster.jpg',
            title: 'Annual Music Festival Poster',
            description: 'Designed a series of promotional posters for the "Harmony Fest" music festival. The design aimed to capture the vibrant energy of the event using dynamic layouts, custom typography, and a blend of photography and graphic elements. Various sizes were created for print and digital media campaigns.',
            tools: 'Adobe Photoshop, Adobe InDesign',
            projectLink: '' // No external link for this one, or leave blank if not applicable
        },
        {
            id: 'design_analytics_dash',
            fullImageSrc: 'assets/designs/full_analytics_dash.jpg',
            title: 'Enterprise Analytics Dashboard',
            description: 'Developed the user interface for an enterprise-level analytics dashboard. The design challenge was to present complex data in an understandable and actionable way for business users. Features include customizable widgets, interactive charts, and real-time data feeds, designed for clarity and efficiency.',
            tools: 'Figma, Miro',
            projectLink: 'https://www.figma.com/proto/your-prototype-link'
        },
        {
            id: 'design_book_cover',
            fullImageSrc: 'assets/designs/full_book_cover.jpg',
            title: 'Whispers of Eldoria - Book Cover',
            description: 'An imaginative book cover illustration for a fantasy novel titled "Whispers of Eldoria." The artwork combines mystical elements with intricate details to draw readers into the world of the story, using a rich color palette and dynamic composition.',
            tools: 'Procreate, Adobe Photoshop',
            projectLink: ''
        },
        {
            id: 'design_ecom_website',
            fullImageSrc: 'assets/designs/full_ecom_website.jpg',
            title: 'E-commerce Website Redesign',
            description: 'Undertook a complete UI/UX redesign for an existing e-commerce platform specializing in handcrafted goods. The focus was on improving product discovery, streamlining the checkout process, and enhancing visual appeal to boost conversion rates and user satisfaction.',
            tools: 'Adobe XD, Figma, Balsamiq',
            projectLink: 'https://your-ecom-demo.netlify.app/'
        },
        // --- ADD YOUR 20+ DESIGNS HERE ---
        // EXAMPLE:
        // {
        //     id: 'your_design_unique_id',
        //     fullImageSrc: 'assets/designs/full_your_design.jpg',
        //     title: 'Your Design Title',
        //     description: 'A detailed description of this design project, including your role, challenges, and solutions.',
        //     tools: 'Tools Used: e.g., Figma, Adobe Photoshop, Blender',
        //     projectLink: 'https://example.com/link-to-case-study-or-prototype' // Optional
        // },
    ];


    // --- Designs Filter and Modal Functionality ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const designItems = document.querySelectorAll('.designs-grid .design-item');
    const designModal = document.getElementById('designModal');
    const closeButton = document.querySelector('.modal .close-button');
    const modalDesignImage = document.getElementById('modalDesignImage');
    const modalDesignTitle = document.getElementById('modalDesignTitle');
    const modalDesignDescription = document.getElementById('modalDesignDescription');
    const modalDesignTools = document.getElementById('modalDesignTools');
    const modalDesignLink = document.getElementById('modalDesignLink');

    // Function to filter designs
    function filterDesigns(category) {
        // Remove 'active' class from all buttons
        filterButtons.forEach(button => button.classList.remove('active'));
        // Add 'active' class to the clicked button
        document.querySelector(`.filter-btn[data-filter="${category}"]`).classList.add('active');

        designItems.forEach(item => {
            const itemCategories = item.dataset.category ? item.dataset.category.split(' ') : [];

            if (category === 'all' || itemCategories.includes(category)) {
                item.classList.remove('hidden');
                // For smoother re-appearance, force reflow after removing hidden class
                void item.offsetWidth; 
            } else {
                item.classList.add('hidden');
            }
        });
    }

    // Add event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.filter;
            filterDesigns(category);
        });
    });

    // Initial filter to show all designs when page loads
    filterDesigns('all');


    // Function to open the design modal
    function openDesignModal(designId) {
        const design = designsData.find(d => d.id === designId);

        if (design) {
            modalDesignImage.src = design.fullImageSrc;
            modalDesignTitle.textContent = design.title;
            modalDesignDescription.textContent = design.description;
            modalDesignTools.textContent = design.tools;

            if (design.projectLink) {
                modalDesignLink.href = design.projectLink;
                modalDesignLink.style.display = 'inline-block';
            } else {
                modalDesignLink.style.display = 'none';
            }

            designModal.style.display = 'flex'; // Use flex to center the modal content
            document.body.style.overflow = 'hidden'; // Prevent scrolling background
        }
    }

    // Function to close the design modal
    function closeDesignModal() {
        designModal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Add event listeners to each design item to open modal
    designItems.forEach(item => {
        item.addEventListener('click', () => {
            const designId = item.dataset.designId;
            openDesignModal(designId);
        });
    });

    // Close modal when clicking on the close button
    if (closeButton) {
        closeButton.addEventListener('click', closeDesignModal);
    }

    // Close modal when clicking outside the modal-content
    if (designModal) {
        designModal.addEventListener('click', (event) => {
            if (event.target === designModal) { // Check if the click was directly on the modal backdrop
                closeDesignModal();
            }
        });
    }

    // Close modal when Escape key is pressed
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && designModal.style.display === 'flex') {
            closeDesignModal();
        }
    });

}); // End DOMContentLoaded