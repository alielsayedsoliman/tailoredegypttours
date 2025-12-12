        function togglePassword() {
            const passwordInput = document.getElementById('password');
            const eyeIcon = document.getElementById('eye-icon');
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                eyeIcon.classList.remove('fa-eye');
                eyeIcon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                eyeIcon.classList.remove('fa-eye-slash');
                eyeIcon.classList.add('fa-eye');
            }
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