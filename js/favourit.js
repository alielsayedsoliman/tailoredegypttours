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
            const header = document.querySelector('h1 span');
            
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
