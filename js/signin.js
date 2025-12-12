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