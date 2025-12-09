    function removeItem(itemId) {
            if(confirm('Are you sure you want to remove this item from your cart?')) {
                const item = document.getElementById(itemId);
                if (item) {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-20px)';
                    setTimeout(() => {
                        item.remove();
                        updateCartTotals();
                    }, 300);
                }
            }
        }

        // Placeholder for dynamic price update simulation
        function updateCartTotals() {
            // In a real app, this would recalculate based on remaining items
            const items = document.querySelectorAll('#cart-items-container > div[id^="item-"]'); // Select only item divs
            const count = items.length;
            
            // Update Header Count
            const countElement = document.getElementById('cart-count');
            if(countElement) {
                countElement.innerText = `(${count} Items)`;
            }

            if(count === 0) {
                document.getElementById('cart-items-container').innerHTML = `
                    <div class="text-center py-10 bg-white rounded-2xl border border-gray-100">
                        <i class="fa-solid fa-cart-shopping text-6xl text-gray-200 mb-4"></i>
                        <p class="text-gray-500 mb-4">Your cart is empty.</p>
                        <a href="search.html" class="inline-block bg-primary text-white px-6 py-2 rounded-lg text-sm font-bold">Start Shopping</a>
                    </div>
                `;
                document.getElementById('final-total').innerText = "$0.00";
            } else {
                // Mock update logic for total price based on remaining items
                // For simplicity in this static demo, we'll just sum specific IDs if they exist
                let total = 0;
                if(document.getElementById('item-1')) total += 205.00;
                if(document.getElementById('item-2')) total += 700.00;
                if(document.getElementById('item-3')) total += 120.00;
                
                // Add tax/fees logic from HTML static values
                // Subtotal = total
                // Service Fee = 40
                // Tax = 14% of (total + 40) ?? Or just fixed. 
                // The HTML had fixed values: Subtotal 905, Service 40, Tax 132.30. Total 1077.30
                // Let's make it somewhat dynamic
                
                const subtotal = total;
                const serviceFee = 40; 
                const tax = (subtotal + serviceFee) * 0.14;
                const finalTotal = subtotal + serviceFee + tax;

                document.getElementById('final-total').innerText = "$" + finalTotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
            }
        }