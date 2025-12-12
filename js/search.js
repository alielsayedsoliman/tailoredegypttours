  function toggleFilter(button) {
            const content = button.nextElementSibling;
            const icon = button.querySelector('i');
            
            button.classList.toggle('active');
            content.classList.toggle('open');
            
            if (button.classList.contains('active')) {
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        }

        // Toggle Date Picker Widget
        function toggleDatePicker() {
            const widget = document.getElementById('date-picker-widget');
            if (widget) {
                widget.classList.toggle('hidden');
            }
        }

        // Close Date Picker when clicking outside
        document.addEventListener('click', function(event) {
            const widget = document.getElementById('date-picker-widget');
            const trigger = document.getElementById('date-picker-trigger');
            
            if (widget && trigger && !widget.classList.contains('hidden')) {
                if (!widget.contains(event.target) && !trigger.contains(event.target)) {
                    widget.classList.add('hidden');
                }
            }
        });
        
        function toggleLanguage() {
        const dropdown = document.getElementById('lang-dropdown');
        dropdown.classList.toggle('hidden');
    }

    function selectLang(element) {
        // Update button text or handle language change
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

        function toggleLanguage() {
        const dropdown = document.getElementById('lang-dropdown');
        dropdown.classList.toggle('hidden');
    }

    function selectLang(element) {
        // Update button text or handle language change
        // Close dropdown
        document.getElementById('lang-dropdown').classList.add('hidden');
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        const dropdown = document.getElementById('lang-dropdown');
        const btn = document.getElementById('lang-btn');
        
        if (dropdown && btn) {
            if (!dropdown.contains(event.target) && !btn.contains(event.target)) {
                dropdown.classList.add('hidden');
            }
        }
    });

    function updateResultCount() {
        const cards = document.querySelectorAll('.tour-card');
        let visibleCount = 0;
        cards.forEach(card => {
            if (card.offsetParent !== null) { // Checks if element is visible
                visibleCount++;
            }
        });
        const countSpan = document.getElementById('visible-count');
        if(countSpan) countSpan.innerText = `${visibleCount} results`;
    }

    // Run initially
    document.addEventListener('DOMContentLoaded', () => {
        updateResultCount();
    });

        // Price Filtering Logic
        function filterByPrice(maxPrice) {
            // Update display text
            const display = document.getElementById('price-display');
            if(display) display.innerText = maxPrice;
            
            // Filter items
            const cards = document.querySelectorAll('.tour-card');
            cards.forEach(card => {
                const priceAttr = card.getAttribute('data-price');
                if(priceAttr) {
                    const price = parseInt(priceAttr);
                    if (price <= maxPrice) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        }

        // Sort Dropdown Functions
        function toggleSortDropdown() {
            const dropdown = document.getElementById('sort-dropdown');
            const icon = document.getElementById('sort-icon');
            
            if(dropdown) dropdown.classList.toggle('hidden');
            
            if (dropdown && !dropdown.classList.contains('hidden')) {
                if(icon) icon.style.transform = 'rotate(180deg)';
            } else {
                if(icon) icon.style.transform = 'rotate(0deg)';
            }
        }

        function selectSort(value) {
            const label = document.getElementById('sort-label');
            const dropdown = document.getElementById('sort-dropdown');
            const icon = document.getElementById('sort-icon');

            if(label) label.innerText = value;
            if(dropdown) dropdown.classList.add('hidden');
            if(icon) icon.style.transform = 'rotate(0deg)';
        }

        // Close Sort Dropdown when clicking outside
        document.addEventListener('click', function(event) {
            const dropdown = document.getElementById('sort-dropdown');
            const trigger = document.getElementById('sort-label')?.parentElement;
            const icon = document.getElementById('sort-icon');
            
            if (dropdown && trigger && !dropdown.classList.contains('hidden') && 
                !dropdown.contains(event.target) && 
                !trigger.contains(event.target)) {
                dropdown.classList.add('hidden');
                if(icon) icon.style.transform = 'rotate(0deg)';
            }
        });

        // --- URL Parameter Parsing & Page Updates ---
        document.addEventListener('DOMContentLoaded', function() {
            const urlParams = new URLSearchParams(window.location.search);
            const destination = urlParams.get('q'); // from search box
            const city = urlParams.get('city'); // from top deals
            const filter = urlParams.get('filter'); // from see all buttons
            
            const pageTitle = document.getElementById('page-title');
            const breadcrumb = document.getElementById('breadcrumb-current');
            const resultCount = document.getElementById('result-count');

            if (city && pageTitle) {
                const formattedCity = city.charAt(0).toUpperCase() + city.slice(1);
                pageTitle.innerText = `Explore all things to do in ${formattedCity}`;
                breadcrumb.innerText = formattedCity;
                if(resultCount) resultCount.innerText = `${Math.floor(Math.random() * 500) + 100} results for ${formattedCity} Tours`;
            } else if (destination && pageTitle) {
                pageTitle.innerText = `Search results for "${destination}"`;
                breadcrumb.innerText = "Search";
                if(resultCount) resultCount.innerText = `42 results found`;
            } else if (filter && pageTitle) {
                if (filter === 'popular') {
                    pageTitle.innerText = "Popular Tours";
                    breadcrumb.innerText = "Popular";
                } else if (filter === 'articles') {
                    pageTitle.innerText = "Travel Articles";
                    breadcrumb.innerText = "Articles";
                }
                if(resultCount) resultCount.innerText = "Showing all results";
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
                    const parent = this.closest('[data-month]'); // Get parent grid
                    if(!parent) return; // Safety check
                    
                    const monthName = parent.getAttribute('data-month'); // Get month from parent attribute
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
            
            // Add Apply/Cancel Listeners for Date Picker
            const cancelBtn = document.getElementById('cancel-date-btn');
            if(cancelBtn) cancelBtn.addEventListener('click', toggleDatePicker);
            
            const applyBtn = document.getElementById('apply-date-btn');
            if(applyBtn) applyBtn.addEventListener('click', toggleDatePicker);
            
            // Add Listener to trigger div
            const trigger = document.getElementById('date-picker-trigger');
            if(trigger) trigger.addEventListener('click', toggleDatePicker);
        });

        function updateCalendarVisuals() {
            const allDays = document.querySelectorAll('.calendar-day');
            
            allDays.forEach(day => {
                day.className = 'calendar-day'; 
                const d = parseInt(day.innerText);
                const parent = day.closest('[data-month]');
                if(!parent) return;
                const m = parent.getAttribute('data-month');
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
            const display = document.getElementById('date-display');
            if (!display) return;
            if (startDate && endDate) {
                display.value = `${startDate.month} ${startDate.day} - ${endDate.month} ${endDate.day}`;
            } else if (startDate) {
                display.value = `${startDate.month} ${startDate.day} - Select End Date`;
            } else {
                display.value = "Select Dates";
            }
        }
        // --- CALENDAR LOGIC END ---

            function toggleLanguage() {
        const dropdown = document.getElementById('lang-dropdown');
        dropdown.classList.toggle('hidden');
    }

    function selectLang(element) {
        // Update button text or handle language change
        // Close dropdown
        document.getElementById('lang-dropdown').classList.add('hidden');
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        const dropdown = document.getElementById('lang-dropdown');
        const btn = document.getElementById('lang-btn');
        
        if (dropdown && btn) {
            if (!dropdown.contains(event.target) && !btn.contains(event.target)) {
                dropdown.classList.add('hidden');
            }
        }
    });

    function updateResultCount() {
        const cards = document.querySelectorAll('.tour-card');
        let visibleCount = 0;
        cards.forEach(card => {
            if (card.offsetParent !== null) { // Checks if element is visible
                visibleCount++;
            }
        });
        const countSpan = document.getElementById('visible-count');
        if(countSpan) countSpan.innerText = `${visibleCount} results`;
    }

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
        
        updateResultCount();
    });

        function toggleLanguage() {
        const dropdown = document.getElementById('lang-dropdown');
        if (dropdown) {
            dropdown.classList.toggle('hidden');
        }
    }

    function selectLang(element) {
        // Update button text or handle language change
        // Close dropdown
        const dropdown = document.getElementById('lang-dropdown');
        if (dropdown) {
            dropdown.classList.add('hidden');
        }
    }

    // Toggle Filter Accordion
    function toggleFilter(button) {
        const content = button.nextElementSibling;
        const icon = button.querySelector('i');
        
        button.classList.toggle('active');
        content.classList.toggle('open');
        
        if (button.classList.contains('active')) {
            icon.style.transform = 'rotate(180deg)';
        } else {
            icon.style.transform = 'rotate(0deg)';
        }
    }

    // Update Result Count
    function updateResultCount() {
        const cards = document.querySelectorAll('.tour-card');
        let visibleCount = 0;
        cards.forEach(card => {
            if (card.style.display !== 'none') {
                visibleCount++;
            }
        });
        const countSpan = document.getElementById('visible-count');
        const resultCountSpan = document.getElementById('result-count');
        const text = `${visibleCount} results`;
        
        if (countSpan) countSpan.innerText = text;
        if (resultCountSpan) resultCountSpan.innerText = `Showing ${visibleCount} results`;
    }

    // Filter by Price
    function filterByPrice(maxPrice) {
        const display = document.getElementById('price-display');
        if(display) display.innerText = maxPrice;

        const cards = document.querySelectorAll('.tour-card');
        cards.forEach(card => {
            const price = parseInt(card.getAttribute('data-price'));
            if (price <= maxPrice) {
                card.style.display = 'flex'; // Or 'block' depending on layout, flex for these cards
            } else {
                card.style.display = 'none';
            }
        });
        updateResultCount();
    }

    // Toggle Sort Dropdown
    function toggleSortDropdown() {
        const dropdown = document.getElementById('sort-dropdown');
        const icon = document.getElementById('sort-icon');
        if (dropdown) {
            dropdown.classList.toggle('hidden');
            if (!dropdown.classList.contains('hidden')) {
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        }
    }

    function selectSort(sortName) {
        const label = document.getElementById('sort-label');
        if(label) label.innerText = sortName;
        toggleSortDropdown();
        // Add sorting logic here if needed
    }

    // Favorites Logic
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
                heartRegular.classList.remove('group-hover/heart:hidden'); 
            }
            if(heartSolid) {
                heartSolid.classList.remove('hidden');
                heartSolid.classList.remove('group-hover/heart:block');
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

    // Initialize state
    document.addEventListener('DOMContentLoaded', () => {
        updateResultCount();
        
        // Initialize favorites state
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const favButtons = document.querySelectorAll('.favorite-btn'); // You need to add this class to your heart buttons in HTML
        
        // Note: For the search page, you'll need to update the HTML of the tour cards to include the `favorite-btn` class 
        // and the `data-` attributes (title, location, price, etc.) similar to index.html for this to work fully.
        // I will rely on the `onclick="toggleFavorite(...)"` being present in the HTML for interaction.
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(event) {
        const langDropdown = document.getElementById('lang-dropdown');
        const langBtn = document.getElementById('lang-btn');
        
        if (langDropdown && langBtn && !langDropdown.contains(event.target) && !langBtn.contains(event.target)) {
            langDropdown.classList.add('hidden');
        }

        const sortDropdown = document.getElementById('sort-dropdown');
        const sortBtn = document.querySelector('button[onclick="toggleSortDropdown()"]'); // Target the sort button
         if (sortDropdown && sortBtn && !sortDropdown.contains(event.target) && !sortBtn.contains(event.target)) {
            sortDropdown.classList.add('hidden');
            const icon = document.getElementById('sort-icon');
            if(icon) icon.style.transform = 'rotate(0deg)';
        }
    });