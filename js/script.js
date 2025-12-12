 // --- 1. Search Box Interaction ---
        document.querySelector('button.bg-primary').addEventListener('click', function() {
            const where = document.querySelector('input[type="text"]').value;
            const type = document.querySelector('select').value;
            if(where) {
                alert(`Searching for tours in "${where}" with type "${type}"...`);
            } else {
                alert('Please enter a destination to search.');
            }
        });


        function toggleLanguage() {
            const dropdown = document.getElementById('lang-dropdown');
            dropdown.classList.toggle('hidden');
        }

        function selectLang(element) {
            // Update button text or handle language change
            const selectedText = element.innerText;
            // Optionally update UI to show selected language
            
            // Close dropdown
            document.getElementById('lang-dropdown').classList.add('hidden');
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            const dropdown = document.getElementById('lang-dropdown');
            const btn = document.getElementById('lang-btn');
            
            if (!dropdown.contains(event.target) && !btn.contains(event.target)) {
                dropdown.classList.add('hidden');
            }
        });

                // --- TOUR TYPE DROPDOWN LOGIC ---
        function toggleTourTypeDropdown() {
            const dropdown = document.getElementById('tour-type-dropdown');
            const icon = document.getElementById('tour-type-icon');
            dropdown.classList.toggle('hidden');
            if (!dropdown.classList.contains('hidden')) {
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        }

        function selectTourType(value) {
            document.getElementById('selected-tour-type').innerText = value;
            document.getElementById('tour-type-value').value = value;
            toggleTourTypeDropdown();
        }



        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            const langDropdown = document.getElementById('lang-dropdown');
            const langBtn = document.getElementById('lang-btn');

            const tourDropdown = document.getElementById('tour-type-dropdown');
            const tourBtn = document.getElementById('tour-type-btn');
            
            if (langDropdown && langBtn && !langDropdown.contains(event.target) && !langBtn.contains(event.target)) {
                langDropdown.classList.add('hidden');
            }

            if (tourDropdown && tourBtn && !tourDropdown.contains(event.target) && !tourBtn.contains(event.target)) {
                tourDropdown.classList.add('hidden');
                const icon = document.getElementById('tour-type-icon');
                if(icon) icon.style.transform = 'rotate(0deg)';
            }
        });

        
        // --- 2. Generic Horizontal Slider Logic (Top Deals & Popular Tours) ---
        function initHorizontalSlider(containerId, prevBtnId, nextBtnId, dotsContainerId) {
            const container = document.getElementById(containerId);
            const prevBtn = document.getElementById(prevBtnId);
            const nextBtn = document.getElementById(nextBtnId);
            const dotsContainer = document.getElementById(dotsContainerId);

            if (!container) return;

            // Approximate card width (320px = 20rem) + gap (24px = 1.5rem) = 344px
            // We use clientWidth of first child to be precise if available
            let scrollAmount = 344;
            const firstCard = container.firstElementChild?.firstElementChild;
            if (firstCard) {
                // width + gap (gap is on parent flex container, approximated)
                scrollAmount = firstCard.clientWidth + 24; 
            }

            // --- Button Logic ---
            if (prevBtn && nextBtn) {
                nextBtn.addEventListener('click', () => {
                    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                });

                prevBtn.addEventListener('click', () => {
                    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                });
            }

            // --- Dots Logic ---
            if (dotsContainer) {
                const totalItems = container.firstElementChild ? container.firstElementChild.children.length : 0;
                // Clear existing static dots
                dotsContainer.innerHTML = ''; 

                // Determine visible items to calculate number of dots (simplified: 1 dot per item for mobile, per group for desktop?)
                // For simplicity, let's just make 1 dot per item to ensure full navigation
                for (let i = 0; i < totalItems; i++) {
                    const dot = document.createElement('div');
                    // Base styling
                    dot.className = 'w-2 h-2 rounded-full cursor-pointer transition-all duration-300 bg-gray-300';
                    // Active state initial check (index 0)
                    if (i === 0) dot.classList.replace('bg-gray-300', 'bg-primary');
                    
                    dot.addEventListener('click', () => {
                        // Scroll to specific item
                        const targetX = i * scrollAmount;
                        container.scrollTo({ left: targetX, behavior: 'smooth' });
                    });
                    
                    dotsContainer.appendChild(dot);
                }

                // Update active dot on scroll
                container.addEventListener('scroll', () => {
                    const currentScroll = container.scrollLeft;
                    // Calculate active index based on scroll position
                    const activeIndex = Math.round(currentScroll / scrollAmount);
                    
                    const dots = dotsContainer.children;
                    for (let j = 0; j < dots.length; j++) {
                        if (j === activeIndex) {
                            dots[j].classList.replace('bg-gray-300', 'bg-primary');
                            dots[j].classList.add('w-4'); // Expand active dot slightly
                            dots[j].classList.remove('w-2');
                        } else {
                            dots[j].classList.replace('bg-primary', 'bg-gray-300');
                            dots[j].classList.add('w-2');
                            dots[j].classList.remove('w-4');
                        }
                    }
                });
            }
        }

        // Initialize Top Deals Slider (No dots container in HTML, so just buttons)
        initHorizontalSlider('deals-scroll-container', 'deals-prev-btn', 'deals-next-btn');
        
        // Initialize Popular Tours Slider (With dots)
        initHorizontalSlider('tours-scroll-container', 'tours-prev-btn', 'tours-next-btn', 'popular-tours-dots');


        // --- 3. Customer Reviews Slider Logic (Orbit) ---
        const reviewsData = [
            {
                id: 1,
                name: "John Smith",
                role: "Traveler",
                title: "Excellent Service!",
                quote: "I had an amazing experience with this company. The service was top-notch, and the staff was incredibly friendly. I highly recommend them!",
                img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
            },
            {
                id: 2,
                name: "Sarah Johnson",
                role: "Adventurer",
                title: "Unforgettable Journey",
                quote: "Egypt was breathtaking, and the tour guides were so knowledgeable. Every detail was perfect from start to finish.",
                img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"
            },
            {
                id: 3,
                name: "Michael Brown",
                role: "Photographer",
                title: "Stunning Views",
                quote: "The locations we visited were absolutely cinematic. Best travel agency I've used in years.",
                img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop"
            },
            {
                id: 4,
                name: "Emily Davis",
                role: "Backpacker",
                title: "Great Value",
                quote: "Affordable and luxurious at the same time. I loved the Nile cruise and the desert safari.",
                img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop"
            },
            {
                id: 5,
                name: "David Wilson",
                role: "Explorer",
                title: "History Comes Alive",
                quote: "Walking through the temples was like stepping back in time. Highly recommended for history buffs.",
                img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop"
            },
            {
                id: 6,
                name: "Jessica Taylor",
                role: "Foodie",
                title: "Amazing Culture",
                quote: "The food, the people, the sights... everything was perfect. Thank you for a wonderful trip.",
                img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200&auto=format&fit=crop"
            },
            {
                id: 7,
                name: "Chris Martin",
                role: "Traveler",
                title: "Top Notch Support",
                quote: "They were always available to answer my questions. Felt very safe and well taken care of.",
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
            }
        ];

        let activeReviewIndex = 0; // Starts at 0
        const totalReviews = reviewsData.length;

        // Elements
        const orbitContainer = document.getElementById('reviews-orbit-container');
        const textContainer = document.getElementById('review-text-container');
        const dotsContainer = document.getElementById('review-dots');
        
        // Text Elements
        const reviewTitle = document.getElementById('review-title');
        const reviewQuote = document.getElementById('review-quote');
        const reviewName = document.getElementById('review-name');
        const reviewRole = document.getElementById('review-role');

        function initReviews() {
            // Create Image Elements
            reviewsData.forEach((review, index) => {
                const imgDiv = document.createElement('div');
                imgDiv.className = 'review-avatar w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg cursor-pointer flex items-center justify-center bg-gray-200';
                
                // Add click event to bring this specific image to center
                imgDiv.onclick = () => jumpToReview(index);

                // Inner Image
                const img = document.createElement('img');
                img.src = review.img;
                img.alt = review.name;
                img.className = 'w-full h-full object-cover';
                
                // Quote Icon (Only visible when active via CSS)
                const icon = document.createElement('div');
                icon.className = 'quote-icon absolute -top-2 -right-2 bg-yellow-400 text-white w-8 h-8 rounded-full flex items-center justify-center text-xl font-serif z-50';
                icon.innerHTML = '"';
                
                imgDiv.appendChild(img);
                imgDiv.appendChild(icon);
                orbitContainer.appendChild(imgDiv);
            });

            // Create Dots
            reviewsData.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.className = 'w-1.5 h-1.5 rounded-full bg-gray-300 cursor-pointer transition-all duration-300';
                dot.onclick = () => jumpToReview(index);
                dotsContainer.appendChild(dot);
            });

            updateReviewDisplay();
        }

        function updateReviewDisplay() {
            // 1. Update Positions of Images
            const avatars = document.querySelectorAll('.review-avatar');
            avatars.forEach((avatar, i) => {
                const pos = (i - activeReviewIndex + totalReviews) % totalReviews;
                avatar.className = 'review-avatar w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg cursor-pointer flex items-center justify-center bg-gray-200';
                avatar.classList.add(`orbit-pos-${pos}`);
            });

            // 2. Update Dots
            const dots = dotsContainer.children;
            Array.from(dots).forEach((dot, i) => {
                if (i === activeReviewIndex) {
                    dot.className = 'w-3 h-1.5 rounded-full bg-primary cursor-pointer transition-all duration-300';
                } else {
                    dot.className = 'w-1.5 h-1.5 rounded-full bg-gray-300 cursor-pointer transition-all duration-300';
                }
            });

            // 3. Morph Text Transition
            textContainer.style.opacity = '0';
            textContainer.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                const data = reviewsData[activeReviewIndex];
                reviewTitle.innerText = data.title;
                reviewQuote.innerText = `"${data.quote}"`;
                reviewName.innerText = data.name;
                reviewRole.innerText = data.role;

                textContainer.style.opacity = '1';
                textContainer.style.transform = 'translateY(0)';
            }, 400); 
        }

        function nextReview() {
            activeReviewIndex = (activeReviewIndex + 1) % totalReviews;
            updateReviewDisplay();
        }

        function prevReview() {
            activeReviewIndex = (activeReviewIndex - 1 + totalReviews) % totalReviews;
            updateReviewDisplay();
        }

        function jumpToReview(index) {
            activeReviewIndex = index;
            updateReviewDisplay();
        }

        document.getElementById('next-review').addEventListener('click', nextReview);
        document.getElementById('prev-review').addEventListener('click', prevReview);

        initReviews();
        

        // --- MOBILE MENU LOGIC ---
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');

        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                if (!mobileMenu.classList.contains('hidden')) {
                    // Open animation
                    setTimeout(() => {
                        mobileMenu.classList.remove('scale-y-0', 'opacity-0');
                    }, 10);
                } else {
                    // Close animation state reset (handled by CSS primarily but ensuring class toggle is instant)
                    mobileMenu.classList.add('scale-y-0', 'opacity-0');
                }
            });
        }

        function toggleMobileLang() {
            const dropdown = document.getElementById('mobile-lang-dropdown');
            const icon = document.getElementById('mobile-lang-icon');
            dropdown.classList.toggle('hidden');
            if(icon) {
                if(dropdown.classList.contains('hidden')) {
                    icon.style.transform = 'rotate(0deg)';
                } else {
                    icon.style.transform = 'rotate(180deg)';
                }
            }
        }

                // --- FAVORITES LOGIC ---
        function toggleFavorite(event, element) {
            event.preventDefault();
            event.stopPropagation();

            const tripData = {
                title: element.getAttribute('data-title'),
                location: element.getAttribute('data-location'),
                image: element.getAttribute('data-image'),
                price: element.getAttribute('data-price'),
                rating: element.getAttribute('data-rating'),
                reviews: element.getAttribute('data-reviews'),
                duration: element.getAttribute('data-duration')
            };

            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            const index = favorites.findIndex(item => item.title === tripData.title);

            const heartRegular = element.querySelector('.fa-regular');
            const heartSolid = element.querySelector('.fa-solid');

            if (index === -1) {
                // Add to favorites
                favorites.push(tripData);
                // Visual update to solid red
                if(heartRegular) {
                    heartRegular.classList.add('hidden');
                    heartRegular.classList.remove('group-hover/heart:hidden'); // Override hover
                }
                if(heartSolid) {
                    heartSolid.classList.remove('hidden');
                    heartSolid.classList.remove('group-hover/heart:block'); // Override hover
                    heartSolid.classList.add('block');
                }
            } else {
                // Remove from favorites
                favorites.splice(index, 1);
                // Visual update back to outline
                if(heartRegular) {
                    heartRegular.classList.remove('hidden');
                    heartRegular.classList.add('group-hover/heart:hidden');
                }
                if(heartSolid) {
                    heartSolid.classList.add('hidden');
                    heartSolid.classList.add('group-hover/heart:block');
                    heartSolid.classList.remove('block');
                }
            }

            localStorage.setItem('favorites', JSON.stringify(favorites));
        }

        // Initialize Favorites State
        document.addEventListener('DOMContentLoaded', () => {
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            const buttons = document.querySelectorAll('.favorite-btn');
            
            buttons.forEach(btn => {
                const title = btn.getAttribute('data-title');
                if (favorites.some(f => f.title === title)) {
                    const heartRegular = btn.querySelector('.fa-regular');
                    const heartSolid = btn.querySelector('.fa-solid');
                    if(heartRegular) {
                        heartRegular.classList.add('hidden');
                        heartRegular.classList.remove('group-hover/heart:hidden');
                    }
                    if(heartSolid) {
                        heartSolid.classList.remove('hidden');
                        heartSolid.classList.remove('group-hover/heart:block');
                        heartSolid.classList.add('block');
                    }
                }
            });
            
            // updateResultCount(); // Removed to fix reference error
        });
