document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorSummary = document.getElementById('formErrors');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset errors
        errorSummary.style.display = 'none';
        errorSummary.textContent = '';
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
        });
        
        // Validate inputs
        const errors = [];
        
        // Email validation
        if (!emailInput.value.trim()) {
            errors.push('Email is required');
            emailInput.parentElement.classList.add('error');
        } else if (!isValidEmail(emailInput.value.trim())) {
            errors.push('Please enter a valid email address');
            emailInput.parentElement.classList.add('error');
        }
        
        // Password validation
        if (!passwordInput.value.trim()) {
            errors.push('Password is required');
            passwordInput.parentElement.classList.add('error');
        } else if (passwordInput.value.trim().length < 6) {
            errors.push('Password must be at least 6 characters');
            passwordInput.parentElement.classList.add('error');
        }
        
        // Display errors
        if (errors.length > 0) {
            errorSummary.textContent = errors.join('. ') + '.';
            errorSummary.style.display = 'block';
            form.classList.add('animate__animated', 'animate__headShake');
            setTimeout(() => {
                form.classList.remove('animate__animated', 'animate__headShake');
            }, 1000);
            return;
        }
        
        // Form is valid - proceed with login
        simulateLogin();
    });
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function simulateLogin() {
        const btn = form.querySelector('.login-btn');
        btn.innerHTML = '<span>Authenticating...</span>';
        btn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            btn.innerHTML = '<span>Login Successful!</span>';
            btn.style.backgroundColor = '#2ecc71';
            
            setTimeout(() => {
                alert('Welcome to Flowdiary Challenge!');
                form.reset();
                btn.innerHTML = '<span>Login</span><svg viewBox="0 0 13 10" height="10px" width="15px"><path d="M1,5 L11,5"></path><polyline points="8 1 12 5 8 9"></polyline></svg>';
                btn.style.backgroundColor = '';
                btn.disabled = false;
            }, 1000);
        }, 1500);
    }
    
    // Add floating label functionality
    document.querySelectorAll('.form-group input').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.querySelector('label').classList.add('active');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.querySelector('label').classList.remove('active');
            }
        });
    });
});