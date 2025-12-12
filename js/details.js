        function toggleFaq(button) {
            const content = button.nextElementSibling;
            const indicator = button.querySelector('div');
            
            if (content.style.maxHeight && content.style.maxHeight !== '0px') {
                content.style.maxHeight = '0';
                content.style.paddingTop = '0';
                content.style.marginBottom = '0';
                indicator.classList.remove('bg-primary');
                indicator.classList.add('bg-gray-300');
                indicator.innerHTML = '';
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.paddingTop = '0.75rem';
                indicator.classList.remove('bg-gray-300');
                indicator.classList.add('bg-primary');
                indicator.innerHTML = '<div class="w-2 h-2 bg-white rounded-full"></div>';
            }
        }

        // --- Rating Logic ---
        document.addEventListener('DOMContentLoaded', () => {
            const ratingGroups = document.querySelectorAll('.rating-group');

            ratingGroups.forEach(group => {
                const stars = group.querySelectorAll('.star-container i');
                const input = group.querySelector('input');

                stars.forEach(star => {
                    // Click Event (Save Rating)
                    star.addEventListener('click', () => {
                        const value = parseInt(star.getAttribute('data-value'));
                        input.value = value;
                        updateStars(stars, value);
                    });

                    // Hover Event (Preview Rating)
                    star.addEventListener('mouseenter', () => {
                        const value = parseInt(star.getAttribute('data-value'));
                        updateStars(stars, value);
                    });
                    
                    // Reset on mouse leave to the saved value
                    group.addEventListener('mouseleave', () => {
                        updateStars(stars, input.value || 0);
                    });
                });
            });
            
            // Check Wishlist Status
            const mainWishlistBtn = document.getElementById('wishlist-btn');
            if (mainWishlistBtn) {
                const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                const title = mainWishlistBtn.getAttribute('data-title');
                if (favorites.some(f => f.title === title)) {
                    // Visual state for already favorited
                    mainWishlistBtn.classList.add('bg-gray-100'); 
                    const iconRegular = mainWishlistBtn.querySelector('.fa-regular');
                    const iconSolid = mainWishlistBtn.querySelector('.fa-solid');
                    if (iconRegular) {
                        iconRegular.classList.add('hidden');
                        iconRegular.classList.remove('group-hover/btn:hidden'); // remove default hover behavior
                    }
                    if (iconSolid) {
                        iconSolid.classList.remove('hidden');
                        iconSolid.classList.remove('group-hover/btn:block'); // remove default hover behavior
                        iconSolid.classList.add('block');
                    }
                }
            }
            
            // Check card favorites status for "You might also like"
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
        });

        function updateStars(stars, value) {
            stars.forEach(star => {
                const starValue = parseInt(star.getAttribute('data-value'));
                if (starValue <= value) {
                    star.classList.remove('text-gray-300');
                    star.classList.add('text-yellow-400');
                } else {
                    star.classList.remove('text-yellow-400');
                    star.classList.add('text-gray-300');
                }
            });
        }

        function toggleBookingDate() {
            const widget = document.getElementById('booking-date-widget');
            const timeWidget = document.getElementById('booking-time-widget');
            if (timeWidget) timeWidget.classList.add('hidden'); // Close time if open
            if (widget) widget.classList.toggle('hidden');
        }

        function toggleBookingTime() {
            const widget = document.getElementById('booking-time-widget');
            const dateWidget = document.getElementById('booking-date-widget');
            if (dateWidget) dateWidget.classList.add('hidden'); // Close date if open
            if (widget) widget.classList.toggle('hidden');
        }

        function selectTime(time) {
            const display = document.getElementById('booking-time-display');
            if(display) display.innerText = time;
            
            const buttons = document.querySelectorAll('.time-slot');
            buttons.forEach(btn => {
                if (btn.innerText === time) {
                    btn.classList.add('bg-primary', 'text-white', 'border-primary');
                    btn.classList.remove('text-gray-600', 'hover:bg-emerald-50', 'hover:text-primary');
                } else {
                    btn.classList.remove('bg-primary', 'text-white', 'border-primary');
                    btn.classList.add('text-gray-600', 'hover:bg-emerald-50', 'hover:text-primary');
                }
            });

            toggleBookingTime();
        }

        // Global Click Listener to close widgets
        document.addEventListener('click', function(event) {
            const dateWidget = document.getElementById('booking-date-widget');
            const dateTrigger = document.getElementById('booking-date-trigger');
            const timeWidget = document.getElementById('booking-time-widget');
            const timeTrigger = document.getElementById('booking-time-trigger');
            
            // Close Date Widget
            if (dateWidget && dateTrigger) {
                if (!dateWidget.classList.contains('hidden') && 
                    !dateWidget.contains(event.target) && 
                    !dateTrigger.contains(event.target)) {
                    dateWidget.classList.add('hidden');
                }
            }

            // Close Time Widget
            if (timeWidget && timeTrigger) {
                if (!timeWidget.classList.contains('hidden') && 
                    !timeWidget.contains(event.target) && 
                    !timeTrigger.contains(event.target)) {
                    timeWidget.classList.add('hidden');
                }
            }
            
            // Close dropdowns
            const dropdown = document.getElementById('lang-dropdown');
            const btn = document.getElementById('lang-btn');
            if (dropdown && btn) {
                if (!dropdown.contains(event.target) && !btn.contains(event.target)) {
                    dropdown.classList.add('hidden');
                }
            }
        });

        // --- CALENDAR LOGIC START ---
        let startDate = null;
        let endDate = null;

        function getMonthIndex(monthName) {
            return monthName === 'February' ? 1 : 2; 
        }

        document.addEventListener('DOMContentLoaded', () => {
            const calendarDays = document.querySelectorAll('.calendar-day');

            calendarDays.forEach(day => {
                day.addEventListener('click', function() {
                    const dayNum = parseInt(this.innerText);
                    const monthName = this.parentElement.getAttribute('data-month');
                    const monthIdx = getMonthIndex(monthName);
                    
                    const selectedDate = { day: dayNum, month: monthName, index: monthIdx };

                    if (!startDate || (startDate && endDate)) {
                        startDate = selectedDate;
                        endDate = null;
                    } else {
                        if (selectedDate.index < startDate.index || (selectedDate.index === startDate.index && selectedDate.day < startDate.day)) {
                            startDate = selectedDate;
                        } else {
                            endDate = selectedDate;
                        }
                    }

                    updateCalendarVisuals();
                    updateDateDisplay();
                });
            });
        });

        function updateCalendarVisuals() {
            const allDays = document.querySelectorAll('.calendar-day');
            
            allDays.forEach(day => {
                day.className = 'calendar-day'; 
                const d = parseInt(day.innerText);
                const m = day.parentElement.getAttribute('data-month');
                const mIdx = getMonthIndex(m);

                const isStart = startDate && startDate.day === d && startDate.month === m;
                const isEnd = endDate && endDate.day === d && endDate.month === m;

                if (isStart || isEnd) {
                    day.classList.add('selected');
                }

                if (startDate && endDate) {
                    const currentVal = mIdx * 100 + d;
                    const startVal = startDate.index * 100 + startDate.day;
                    const endVal = endDate.index * 100 + endDate.day;

                    if (currentVal > startVal && currentVal < endVal) {
                        day.classList.add('in-range');
                    }
                }
            });
        }

        function updateDateDisplay() {
            const display = document.getElementById('booking-date-display');
            if (startDate && endDate) {
                display.innerText = `${startDate.month} ${startDate.day} - ${endDate.month} ${endDate.day}`;
            } else if (startDate) {
                display.innerText = `${startDate.month} ${startDate.day} - Select End Date`;
            } else {
                display.innerText = "Select Dates";
            }
        }

        // --- TICKET & PRICE LOGIC START ---
        const basePrice = 1200; // Base trip price
        const ticketPrices = {
            adult: 282,
            youth: 168,
            child: 80
        };
        
        // Initial counts matching HTML
        let ticketCounts = {
            adult: 2,
            youth: 0,
            child: 0
        };

        const extraServicePrice = 40;

        function updateTicket(type, change) {
            const current = ticketCounts[type];
            // Prevent negative numbers
            const newCount = current + change;
            
            if (newCount >= 0) {
                ticketCounts[type] = newCount;
                // Update display
                const displayEl = document.getElementById(`ticket-count-${type}`);
                if(displayEl) displayEl.innerText = newCount;
                
                updateTotal();
            }
        }

        function updateTotal() {
            let total = 0; // Or start with basePrice if applicable, design implies calculated sum
            
            // Sum tickets
            total += ticketCounts.adult * ticketPrices.adult;
            total += ticketCounts.youth * ticketPrices.youth;
            total += ticketCounts.child * ticketPrices.child;

            // Check extra service
            const extraCheckbox = document.getElementById('extra-service');
            const extraCheckVisual = document.getElementById('extra-service-check');
            
            if (extraCheckbox && extraCheckbox.checked) {
                total += extraServicePrice;
                extraCheckVisual.classList.remove('hidden');
            } else if (extraCheckVisual) {
                extraCheckVisual.classList.add('hidden');
            }
            
            // Format for display
            const formattedTotal = total.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
            document.getElementById('total-price').innerText = formattedTotal;
        }

        // Initialize total on load
        updateTotal();

        // --- GALLERY MODAL LOGIC ---
        function openGallery() {
            document.getElementById('image-gallery-modal').classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }

        function closeGallery() {
            document.getElementById('image-gallery-modal').classList.add('hidden');
            document.body.style.overflow = 'auto';
        }

        // --- LOAD MORE REVIEWS LOGIC ---
        function loadMoreReviews(btn) {
            // Simulate loading
            const originalText = btn.innerText;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Loading...';
            
            setTimeout(() => {
                const container = document.getElementById('reviews-container');
                
                const newReviewsHTML = `
                    <div class="border-b border-gray-100 pb-8 fade-in">
                        <div class="flex justify-between items-start mb-4">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs uppercase">S.J</div>
                                <div><h4 class="font-bold text-primary text-sm">Sarah Jenkins</h4></div>
                            </div>
                            <span class="text-xs text-gray-400">May 2023</span>
                        </div>
                        <h5 class="text-primary font-bold text-sm mb-2">Unforgettable experience!</h5>
                        <p class="text-gray-600 text-sm leading-relaxed mb-4">The guide was amazing and the scenery was breathtaking. Highly recommend this tour to anyone visiting Phuket. The lunch provided was also very tasty with options for vegetarians.</p>
                        <div class="flex gap-6 text-xs text-gray-500 font-medium"><button class="hover:text-primary transition">Helpful</button><button class="hover:text-primary transition">Not helpful</button></div>
                    </div>

                    <div class="border-b border-gray-100 pb-8 fade-in">
                        <div class="flex justify-between items-start mb-4">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs uppercase">M.R</div>
                                <div><h4 class="font-bold text-primary text-sm">Mike Ross</h4></div>
                            </div>
                            <span class="text-xs text-gray-400">June 2023</span>
                        </div>
                        <h5 class="text-primary font-bold text-sm mb-2">Good value for money</h5>
                        <p class="text-gray-600 text-sm leading-relaxed mb-4">Lunch was delicious and the boat ride was smooth. A bit crowded at Maya Bay but expected. The snorkeling spots were clear and full of fish.</p>
                        <div class="flex gap-6 text-xs text-gray-500 font-medium"><button class="hover:text-primary transition">Helpful</button><button class="hover:text-primary transition">Not helpful</button></div>
                    </div>
                `;
                
                container.insertAdjacentHTML('beforeend', newReviewsHTML);
                
                // Hide button after loading (simulating end of list)
                btn.parentElement.style.display = 'none'; 
                
            }, 800); 
        }

        // --- LANGUAGE DROPDOWN LOGIC ---
        function toggleLanguage() {
            const dropdown = document.getElementById('lang-dropdown');
            dropdown.classList.toggle('hidden');
        }

        function selectLang(element) {
            // Update button text or handle language change
            // Close dropdown
            document.getElementById('lang-dropdown').classList.add('hidden');
        }
        
        // --- FAVORITES LOGIC FOR DETAILS PAGE ---
        function toggleMainFavorite(btn) {
            // Prevent duplicate clicks if needed or just simple logic
            const tripData = {
                title: btn.getAttribute('data-title'),
                location: btn.getAttribute('data-location'),
                image: btn.getAttribute('data-image'),
                price: btn.getAttribute('data-price'),
                rating: btn.getAttribute('data-rating'),
                reviews: btn.getAttribute('data-reviews')
            };

            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            const index = favorites.findIndex(item => item.title === tripData.title);
            
            const heartRegular = btn.querySelector('.fa-regular');
            const heartSolid = btn.querySelector('.fa-solid');

            if (index === -1) {
                // Add
                favorites.push(tripData);
                // Visual update
                if(heartRegular) {
                    heartRegular.classList.add('hidden');
                    heartRegular.classList.remove('group-hover/btn:hidden');
                }
                if(heartSolid) {
                    heartSolid.classList.remove('hidden');
                    heartSolid.classList.remove('group-hover/btn:block');
                    heartSolid.classList.add('block');
                }
                // Optional: visual feedback like changing button bg
                btn.classList.add('bg-gray-100'); 
            } else {
                // Remove
                favorites.splice(index, 1);
                // Visual update
                if(heartRegular) {
                    heartRegular.classList.remove('hidden');
                    heartRegular.classList.add('group-hover/btn:hidden');
                }
                if(heartSolid) {
                    heartSolid.classList.add('hidden');
                    heartSolid.classList.add('group-hover/btn:block');
                    heartSolid.classList.remove('block');
                }
                 btn.classList.remove('bg-gray-100');
            }
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }

        // Generic toggle for cards (if needed in "You might also like")
        function toggleFavorite(event, element) {
            event.preventDefault();
            event.stopPropagation();
            // Simplified copy of logic from index.html
             const tripData = {
                title: element.getAttribute('data-title'),
                location: element.getAttribute('data-location'),
                image: element.getAttribute('data-image'),
                price: element.getAttribute('data-price'),
                rating: element.getAttribute('data-rating'),
                reviews: element.getAttribute('data-reviews')
            };

            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            const index = favorites.findIndex(item => item.title === tripData.title);
            
            const heartRegular = element.querySelector('.fa-regular');
            const heartSolid = element.querySelector('.fa-solid');
            
             if (index === -1) {
                favorites.push(tripData);
                if(heartRegular) {
                    heartRegular.classList.add('hidden');
                    heartRegular.classList.remove('group-hover/heart:hidden');
                }
                if(heartSolid) {
                    heartSolid.classList.remove('hidden');
                    heartSolid.classList.remove('group-hover/heart:block');
                    heartSolid.classList.add('block');
                }
            } else {
                favorites.splice(index, 1);
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

        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            const dropdown = document.getElementById('lang-dropdown');
            const btn = document.getElementById('lang-btn');
            
            // Safety check if elements exist on this page
            if (dropdown && btn) {
                if (!dropdown.contains(event.target) && !btn.contains(event.target)) {
                    dropdown.classList.add('hidden');
                }
            }
        });