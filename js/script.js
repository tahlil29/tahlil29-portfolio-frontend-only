document.addEventListener('DOMContentLoaded', () => {

    // --- Side Menu Functionality ---
    window.openNav = function() {
        document.getElementById("sideMenu").style.width = "250px";
        document.getElementById("mainContent").style.marginLeft = "250px";
        document.querySelector('.hamburger-menu').classList.add('active');
    }

    window.closeNav = function() {
        document.getElementById("sideMenu").style.width = "0";
        document.getElementById("mainContent").style.marginLeft = "0";
        document.querySelector('.hamburger-menu').classList.remove('active');
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
            nextDesignation.style.transition = 'none';
            nextDesignation.style.transform = 'translateY(100%)';
            nextDesignation.style.opacity = '0';

            setTimeout(() => {
                nextDesignation.style.transition = 'opacity 0.4s ease-in-out, transform 0.4s ease-in-out';
                nextDesignation.style.opacity = '1';
                nextDesignation.style.transform = 'translateY(0)';
            }, 50);
        }

        setTimeout(() => {
            setInterval(animateDesignations, 3000);
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

            if (!data.name || !data.email || !data.message) {
                formMessage.textContent = 'All fields are required.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                return;
            }
            if (!/\S+@\S+\.\S+/.test(data.email)) {
                formMessage.textContent = 'Please enter a valid email address.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                return;
            }

            formMessage.textContent = 'Sending message...';
            formMessage.className = 'form-message';
            formMessage.style.display = 'block';


            try {
                const response = await fetch('https://tahlil29-portfolio-backend-api.onrender.com/send-message', { // This URL is from your provided console output
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
                console.error('Error sending message:', error);
                formMessage.textContent = 'Network error: Could not reach the server or unexpected issue.';
                formMessage.className = 'form-message error';
            } finally {
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }
        });
    }

    // --- Design Gallery Data (THIS IS WHERE YOU NEED TO MAKE THE CRUCIAL CHANGES) ---
    // The 'fullImageSrc' for each object MUST point to the actual path of your large, full-resolution image.
    // Ensure these paths are correct relative to your HTML file.
    const designsData = [
        {
            id: 'design_fitness_app',
            fullImageSrc: 'assets/work/GD1.png', // <--- REPLACE 'assets/work/GD1.png' WITH THE ACTUAL PATH TO YOUR *LARGE* IMAGE for this design.
            title: 'Fitness Tracking App UI',
            description: 'Designed a clean and motivating UI for a fitness tracking mobile application. This is a detailed description of the design process, challenges faced, and the solutions implemented. It focuses on user experience, visual hierarchy, and interaction design principles to create an intuitive and engaging app.',
            tools: 'Figma, Adobe Illustrator',
            projectLink: ''
        },
        {
            id: 'design_cafe_brand',
            fullImageSrc: 'assets/work/GD2.png', // <--- REPLACE THIS WITH THE ACTUAL PATH TO YOUR *LARGE* IMAGE
            title: 'Cafe Brand Identity',
            description: 'Developed a complete brand identity, including logo and packaging, for a local cafe. This involved creating a cohesive visual language that reflects the cafe\'s unique atmosphere and values. Mockups were created to show the brand\'s application across various touchpoints.',
            tools: 'Adobe Illustrator, Adobe Photoshop',
            projectLink: ''
        },
        {
            id: 'design_event_poster',
            fullImageSrc: 'assets/work/GD3.png', // <--- REPLACE THIS WITH THE ACTUAL PATH TO YOUR *LARGE* IMAGE
            title: 'Music Event Poster Design',
            description: 'Created a vibrant and engaging poster for an annual music festival. The design aimed to capture the energetic mood of the event while effectively communicating key information such as dates, lineup, and venue. Various design iterations were explored to find the most impactful visual.',
            tools: 'Adobe Photoshop, Adobe InDesign',
            projectLink: ''
        },
        {
            id: 'design_uiux1',
            fullImageSrc: 'assets/work/UIUX1.png', // <--- REPLACE THIS WITH THE ACTUAL PATH TO YOUR *LARGE* IMAGE
            title: 'UI/UX Design Project 1',
            description: 'A comprehensive UI/UX project focusing on [briefly describe what it is, e.g., a mobile banking app, a recipe sharing platform, etc.]. The design process included user research, wireframing, prototyping, and user testing to ensure a delightful and efficient user experience.',
            tools: 'Figma, Adobe XD',
            projectLink: ''
        },
        {
            id: 'design_uiux2',
            fullImageSrc: 'assets/work/UIUX2.png', // <--- REPLACE THIS WITH THE ACTUAL PATH TO YOUR *LARGE* IMAGE
            title: 'UI/UX Design Project 2',
            description: 'This project involved designing [briefly describe, e.g., an e-learning platform, a travel booking site]. Emphasis was placed on creating an intuitive information architecture, visually appealing interfaces, and seamless user flows to enhance accessibility and engagement.',
            tools: 'Sketch, InVision',
            projectLink: ''
        },
        {
            id: 'design_uiux3',
            fullImageSrc: 'assets/work/UIUX3.png', // <--- REPLACE THIS WITH THE ACTUAL PATH TO YOUR *LARGE* IMAGE
            title: 'UI/UX Design Project 3',
            description: 'A design exploration for [briefly describe, e.g., a smart home control app, a fitness tracker dashboard]. This project delved into creating a personalized and responsive experience, with attention to micro-interactions and visual feedback.',
            tools: 'Adobe XD, Photoshop',
            projectLink: ''
        },
        {
            id: 'design_gd4',
            fullImageSrc: 'assets/work/GD4.png', // <--- REPLACE THIS WITH THE ACTUAL PATH TO YOUR *LARGE* IMAGE
            title: 'Creative Graphic Design 4',
            description: 'A graphic design project for [briefly describe, e.g., a social media campaign, an editorial layout]. The goal was to convey a specific message through strong visuals, creative typography, and effective use of color and composition.',
            tools: 'Adobe Photoshop, Illustrator',
            projectLink: ''
        },
        {
            id: 'design_gd5',
            fullImageSrc: 'assets/work/GD5.png', // <--- REPLACE THIS WITH THE ACTUAL PATH TO YOUR *LARGE* IMAGE
            title: 'Graphic Design Project 5',
            description: 'This design project explored [briefly describe, e.g., packaging design, brochure layout]. It focused on balancing aesthetic appeal with practical considerations for print and production.',
            tools: 'Adobe InDesign, Illustrator',
            projectLink: ''
        },
        {
            id: 'design_gd6',
            fullImageSrc: 'assets/work/GD6.png', // <--- REPLACE THIS WITH THE ACTUAL PATH TO YOUR *LARGE* IMAGE
            title: 'Digital Graphic Design 6',
            description: 'A digital graphic design piece for [briefly describe, e.g., a website hero section, an infographic]. The design aimed for high visual impact and clear communication within digital constraints.',
            tools: 'Figma, Photoshop',
            projectLink: ''
        },
        {
            id: 'design_b1',
            fullImageSrc: 'assets/work/B1.png', // <--- REPLACE THIS WITH THE ACTUAL PATH TO YOUR *LARGE* IMAGE
            title: 'Branding Project 1',
            description: 'Development of a unique brand identity for [briefly describe, e.g., a tech startup, a local business]. This included logo concepts, brand guidelines, and application across various marketing materials to establish a strong brand presence.',
            tools: 'Adobe Illustrator',
            projectLink: ''
        },
        {
            id: 'design_b2',
            fullImageSrc: 'assets/work/B2.png', // <--- REPLACE THIS WITH THE ACTUAL PATH TO YOUR *LARGE* IMAGE
            title: 'Brand Collateral Design 2',
            description: 'Creation of essential brand collateral for [briefly describe, e.g., business cards, letterheads, social media templates]. The focus was on consistency and professional presentation of the brand.',
            tools: 'Adobe Photoshop, InDesign',
            projectLink: ''
        },
        {
            id: 'design_b3',
            fullImageSrc: 'assets/work/B3.jpg', // <--- REPLACE THIS WITH THE ACTUAL PATH TO YOUR *LARGE* IMAGE
            title: 'Comprehensive Branding 3',
            description: 'An extensive branding exercise for [briefly describe, e.g., a non-profit organization, a new product launch]. This involved deep dives into brand strategy, competitive analysis, and crafting a compelling visual narrative.',
            tools: 'Figma, Illustrator',
            projectLink: ''
        }
        // YOU NEED TO ADD ALL YOUR REMAINING DESIGNS HERE, AND FOR EACH ONE,
        // ENSURE 'fullImageSrc' POINTS TO THE ACTUAL LARGE IMAGE FILE.
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
        filterButtons.forEach(button => button.classList.remove('active'));
        const activeButton = document.querySelector(`.filter-btn[data-filter="${category}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }

        designItems.forEach(item => {
            const itemCategories = item.dataset.category ? item.dataset.category.split(' ') : [];

            if (category === 'all' || itemCategories.includes(category)) {
                item.classList.remove('hidden');
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
            modalDesignImage.src = design.fullImageSrc; // This line uses the 'fullImageSrc' from your data
            modalDesignTitle.textContent = design.title;
            modalDesignDescription.textContent = design.description;
            modalDesignTools.textContent = 'Tools: ' + design.tools;

            if (design.projectLink && design.projectLink.trim() !== '') {
                modalDesignLink.href = design.projectLink;
                modalDesignLink.style.display = 'inline-block';
            } else {
                modalDesignLink.style.display = 'none';
            }

            designModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        } else {
            console.warn(`Design with ID "${designId}" not found in designsData.`);
        }
    }

    // Function to close the design modal
    function closeDesignModal() {
        designModal.style.display = 'none';
        document.body.style.overflow = '';
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
            if (event.target === designModal) {
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