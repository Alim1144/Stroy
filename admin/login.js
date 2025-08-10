// Login Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeLoginForm();
    initializePasswordToggle();
    checkRememberedUser();
});

// Initialize login form
function initializeLoginForm() {
    const loginForm = document.getElementById('loginForm');
    const loginBtn = document.querySelector('.login-btn');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;
        
        // Validate inputs
        if (!username || !password) {
            showError('Пожалуйста, заполните все поля');
            return;
        }
        
        // Show loading state
        loginBtn.classList.add('loading');
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Вход...';
        
        // Simulate login process
        setTimeout(() => {
            if (authenticateUser(username, password)) {
                // Save remember me
                if (remember) {
                    localStorage.setItem('rememberedUser', username);
                } else {
                    localStorage.removeItem('rememberedUser');
                }
                
                // Show success animation
                showSuccess();
                
                // Redirect to admin panel
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                showError('Неверное имя пользователя или пароль');
                loginBtn.classList.remove('loading');
                loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Войти';
            }
        }, 1500);
    });
}

// Initialize password toggle
function initializePasswordToggle() {
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordInput = document.getElementById('password');
    
    passwordToggle.addEventListener('click', function() {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        
        const icon = this.querySelector('i');
        icon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
    });
}

// Check for remembered user
function checkRememberedUser() {
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
        document.getElementById('username').value = rememberedUser;
        document.getElementById('remember').checked = true;
    }
}

// Simple authentication (replace with real authentication)
function authenticateUser(username, password) {
    // Default credentials (change these!)
    const validCredentials = {
        'admin': 'admin123',
        'stroymir': 'stroymir2024',
        'user': 'password123'
    };
    
    return validCredentials[username] === password;
}

// Show error message
function showError(message) {
    const loginCard = document.querySelector('.login-card');
    
    // Remove existing error
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.5rem;
        text-align: center;
        padding: 0.5rem;
        background: #fef2f2;
        border: 1px solid #fecaca;
        border-radius: 8px;
    `;
    
    // Insert error message
    const form = document.getElementById('loginForm');
    form.appendChild(errorDiv);
    
    // Shake animation
    loginCard.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        loginCard.style.animation = '';
    }, 500);
    
    // Auto remove error after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

// Show success animation
function showSuccess() {
    const loginCard = document.querySelector('.login-card');
    const loginBtn = document.querySelector('.login-btn');
    
    // Update button
    loginBtn.classList.remove('loading');
    loginBtn.innerHTML = '<i class="fas fa-check"></i> Успешно!';
    loginBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    
    // Success animation
    loginCard.classList.add('success');
    
    // Add success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = 'Вход выполнен успешно! Перенаправление...';
    successDiv.style.cssText = `
        color: #10b981;
        font-size: 0.875rem;
        margin-top: 0.5rem;
        text-align: center;
        padding: 0.5rem;
        background: #f0fdf4;
        border: 1px solid #bbf7d0;
        border-radius: 8px;
    `;
    
    const form = document.getElementById('loginForm');
    form.appendChild(successDiv);
}

// Add shake animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Enter key to submit form
    if (e.key === 'Enter' && document.activeElement.tagName !== 'TEXTAREA') {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.dispatchEvent(new Event('submit'));
        }
    }
    
    // Escape key to clear form
    if (e.key === 'Escape') {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.reset();
            const errorMessage = document.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        }
    }
});

// Auto-focus username field
window.addEventListener('load', function() {
    const usernameField = document.getElementById('username');
    if (usernameField) {
        usernameField.focus();
    }
});

// Form validation on input
document.addEventListener('input', function(e) {
    if (e.target.matches('#username, #password')) {
        const formGroup = e.target.closest('.form-group');
        if (formGroup) {
            formGroup.classList.remove('error');
        }
        
        // Remove error message when user starts typing
        const errorMessage = document.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
});

// Password strength indicator (optional)
function checkPasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return strength;
}

// Add password strength indicator
document.getElementById('password').addEventListener('input', function(e) {
    const password = e.target.value;
    const strength = checkPasswordStrength(password);
    
    // Remove existing indicator
    const existingIndicator = document.querySelector('.password-strength');
    if (existingIndicator) {
        existingIndicator.remove();
    }
    
    if (password.length > 0) {
        const indicator = document.createElement('div');
        indicator.className = 'password-strength';
        
        const strengthText = ['Очень слабый', 'Слабый', 'Средний', 'Хороший', 'Отличный'][strength - 1] || 'Очень слабый';
        const strengthColor = ['#ef4444', '#f59e0b', '#eab308', '#10b981', '#059669'][strength - 1] || '#ef4444';
        
        indicator.innerHTML = `
            <div class="strength-bar">
                <div class="strength-fill" style="width: ${strength * 20}%; background: ${strengthColor}"></div>
            </div>
            <span style="color: ${strengthColor}; font-size: 0.75rem;">${strengthText}</span>
        `;
        
        indicator.style.cssText = `
            margin-top: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        `;
        
        const strengthBar = indicator.querySelector('.strength-bar');
        strengthBar.style.cssText = `
            flex: 1;
            height: 4px;
            background: #e5e7eb;
            border-radius: 2px;
            overflow: hidden;
        `;
        
        const strengthFill = indicator.querySelector('.strength-fill');
        strengthFill.style.cssText = `
            height: 100%;
            transition: width 0.3s ease;
        `;
        
        const passwordGroup = e.target.closest('.form-group');
        passwordGroup.appendChild(indicator);
    }
});

// Remember me functionality
document.getElementById('remember').addEventListener('change', function(e) {
    if (!e.target.checked) {
        localStorage.removeItem('rememberedUser');
    }
});

// Add some visual feedback for form interactions
document.querySelectorAll('.form-group input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
        this.parentElement.style.transition = 'transform 0.3s ease';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// Add loading animation for background shapes
document.addEventListener('DOMContentLoaded', function() {
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        shape.style.animationDelay = `${index * 2}s`;
    });
});

// Add some security features
function preventMultipleSubmissions() {
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn.classList.contains('loading')) {
        return false;
    }
    return true;
}

// Add this to the form submit handler
document.getElementById('loginForm').addEventListener('submit', function(e) {
    if (!preventMultipleSubmissions()) {
        e.preventDefault();
        return;
    }
});

// Add some accessibility features
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            this.parentElement.style.outline = '2px solid #2563eb';
            this.parentElement.style.outlineOffset = '2px';
        }
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.outline = 'none';
    });
});

// Add some visual feedback for successful login
function showLoginSuccess() {
    const loginCard = document.querySelector('.login-card');
    
    // Add confetti effect (simple version)
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${['#2563eb', '#3b82f6', '#fbbf24', '#10b981'][Math.floor(Math.random() * 4)]};
                left: ${Math.random() * 100}vw;
                top: -10px;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: confettiFall 3s linear forwards;
            `;
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 50);
    }
}

// Add confetti animation CSS
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(360deg);
        }
    }
`;
document.head.appendChild(confettiStyle); 