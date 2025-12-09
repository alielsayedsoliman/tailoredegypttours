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