        function removeFavorite(itemId) {
            const item = document.getElementById(itemId);
            if (item) {
                // Add fade out effect
                item.style.transition = "all 0.5s ease";
                item.style.opacity = "0";
                item.style.transform = "scale(0.9)";
                
                setTimeout(() => {
                    item.remove();
                    updateHeader();
                }, 500);
            }
        }

        function clearAllFavorites() {
            if(confirm("Are you sure you want to remove all favorites?")) {
                const container = document.getElementById('favorites-container');
                const items = container.children;
                
                Array.from(items).forEach((item, index) => {
                    setTimeout(() => {
                        item.style.transition = "all 0.5s ease";
                        item.style.opacity = "0";
                        item.style.transform = "scale(0.9)";
                    }, index * 100);
                });

                setTimeout(() => {
                    container.innerHTML = '';
                    updateHeader();
                }, items.length * 100 + 500);
            }
        }

        function updateHeader() {
            const container = document.getElementById('favorites-container');
            const count = container.children.length;
            const header = document.getElementById('wishlist-count'); // Corrected selector
            
            if (count === 0) {
                header.innerText = "(0 Trips)";
                // Show empty state
                container.innerHTML = `
                    <div class="col-span-full flex flex-col items-center justify-center py-20 text-center">
                        <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-300 text-4xl animate-bounce">
                            <i class="fa-regular fa-heart"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-primary mb-2">Your wishlist is empty</h3>
                        <p class="text-gray-500 mb-8 max-w-md">Looks like you haven't saved any trips yet. Explore our tours and find your next adventure!</p>
                        <a href="search.html" class="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-dark transition shadow-lg transform hover:-translate-y-1">Explore Tours</a>
                    </div>
                `;
            } else {
                header.innerText = `(${count} Trips)`;
            }
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

        














                // Load favorites on page load
        document.addEventListener('DOMContentLoaded', () => {
            renderFavorites();
        });

        function renderFavorites() {
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            const container = document.getElementById('favorites-container');
            const emptyState = document.getElementById('empty-state');
            const headerCount = document.getElementById('wishlist-count');

            // Update Header Count
            if(headerCount) headerCount.innerText = `(${favorites.length} Trips)`;

            // Clear container
            container.innerHTML = '';

            if (favorites.length === 0) {
                emptyState.classList.remove('hidden');
                emptyState.classList.add('flex');
            } else {
                emptyState.classList.add('hidden');
                emptyState.classList.remove('flex');

                favorites.forEach(trip => {
                    const tripHTML = `
                        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl transition duration-300 relative" data-title="${trip.title}">
                            <div class="h-48 relative overflow-hidden">
                                <img src="${trip.image}" alt="${trip.title}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
                                <button onclick="removeFavorite('${trip.title}')" class="absolute top-3 right-3 bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 transition shadow-sm z-10" title="Remove from favorites">
                                    <i class="fa-solid fa-heart"></i>
                                </button>
                            </div>
                            <div class="p-4 flex flex-col h-[200px] justify-between">
                                <div>
                                    <div class="flex items-center gap-1 text-gray-400 text-xs mb-2">
                                        <i class="fa-solid fa-location-dot"></i>
                                        <span>${trip.location}</span>
                                    </div>
                                    <h3 class="text-primary font-bold text-base leading-tight mb-2 line-clamp-2">
                                        <a href="details.html" class="hover:text-teal-600 transition">${trip.title}</a>
                                    </h3>
                                    <div class="flex items-center gap-1 text-yellow-500 text-xs mb-3">
                                        <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star-half-stroke"></i>
                                        <span class="text-gray-400 ml-1">${trip.rating} ${trip.reviews}</span>
                                    </div>
                                </div>
                                
                                <div class="flex justify-between items-end border-t border-gray-100 pt-3">
                                    <div>
                                        <span class="text-xs text-gray-400 block">From</span>
                                        <span class="text-primary font-bold text-lg">${trip.price}</span>
                                    </div>
                                    <a href="details.html" class="bg-primary/10 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg text-xs font-bold transition">View</a>
                                </div>
                            </div>
                        </div>
                    `;
                    container.insertAdjacentHTML('beforeend', tripHTML);
                });
            }
        }

        function removeFavorite(title) {
            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            // Find item by title
            const newFavorites = favorites.filter(item => item.title !== title);
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
            
            // Re-render to update UI
            renderFavorites();
        }

        function clearAllFavorites() {
            if(confirm("Are you sure you want to remove all favorites?")) {
                localStorage.setItem('favorites', JSON.stringify([]));
                renderFavorites();
            }
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