// Admin Panel JavaScript

// Global variables
let currentSection = 'dashboard';
let services = [];
let portfolio = [];
let messages = [];

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeModals();
    loadData();
    initializeEventListeners();
    updatePageTitle();
});

// Navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            showSection(section);
            
            // Update active state
            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            this.parentElement.classList.add('active');
            
            // Update page title
            updatePageTitle();
        });
    });

    // Mobile sidebar toggle
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 1024) {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });
}

// Show section
function showSection(sectionName) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionName;
    }
}

// Update page title
function updatePageTitle() {
    const pageTitle = document.querySelector('.page-title');
    const titles = {
        'dashboard': 'Панель управления',
        'services': 'Управление услугами',
        'portfolio': 'Управление портфолио',
        'contacts': 'Контактная информация',
        'settings': 'Настройки сайта',
        'messages': 'Сообщения с сайта'
    };
    
    if (pageTitle && titles[currentSection]) {
        pageTitle.textContent = titles[currentSection];
    }
}

// Modals
function initializeModals() {
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                closeModal(modal);
            });
        }
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Load initial data
function loadData() {
    // Load services from localStorage or use default
    const savedServices = localStorage.getItem('adminServices');
    if (savedServices) {
        services = JSON.parse(savedServices);
    } else {
        services = getDefaultServices();
        saveServices();
    }
    
    // Load portfolio from localStorage or use default
    const savedPortfolio = localStorage.getItem('adminPortfolio');
    if (savedPortfolio) {
        portfolio = JSON.parse(savedPortfolio);
    } else {
        portfolio = getDefaultPortfolio();
        savePortfolio();
    }
    
    // Load messages from localStorage or use default
    const savedMessages = localStorage.getItem('adminMessages');
    if (savedMessages) {
        messages = JSON.parse(savedMessages);
    } else {
        messages = getDefaultMessages();
        saveMessages();
    }
    
    // Render data
    renderServices();
    renderPortfolio();
    renderMessages();
}

// Default data
function getDefaultServices() {
    return [
        {
            id: 1,
            name: 'Строительство домов',
            icon: 'fas fa-home',
            description: 'Строительство частных и многоквартирных домов под ключ с нуля до сдачи в эксплуатацию',
            features: ['Проектирование', 'Фундамент', 'Стены и крыша', 'Отделка']
        },
        {
            id: 2,
            name: 'Облицовка и отделка',
            icon: 'fas fa-paint-roller',
            description: 'Внутренняя и внешняя отделка помещений любой сложности',
            features: ['Штукатурка', 'Покраска', 'Обои', 'Плитка']
        },
        {
            id: 3,
            name: 'Покраска',
            icon: 'fas fa-brush',
            description: 'Профессиональная покраска стен, потолков, фасадов и других поверхностей',
            features: ['Внутренняя покраска', 'Фасадная покраска', 'Декоративная покраска', 'Защитные покрытия']
        },
        {
            id: 4,
            name: 'Ремонтные работы',
            icon: 'fas fa-tools',
            description: 'Капитальный и косметический ремонт квартир, офисов и коммерческих помещений',
            features: ['Капитальный ремонт', 'Косметический ремонт', 'Перепланировка', 'Электрика и сантехника']
        },
        {
            id: 5,
            name: 'Фасадные работы',
            icon: 'fas fa-layer-group',
            description: 'Отделка и утепление фасадов зданий современными материалами',
            features: ['Утепление фасадов', 'Облицовка сайдингом', 'Штукатурка фасадов', 'Вентилируемые фасады']
        },
        {
            id: 6,
            name: 'Демонтажные работы',
            icon: 'fas fa-truck',
            description: 'Демонтаж конструкций, перегородок и отделочных материалов',
            features: ['Демонтаж стен', 'Снос зданий', 'Вывоз мусора', 'Подготовка к ремонту']
        }
    ];
}

function getDefaultPortfolio() {
    return [
        {
            id: 1,
            title: 'Частный дом',
            description: 'Строительство дома 150м² под ключ',
            category: 'construction',
            image: null
        },
        {
            id: 2,
            title: 'Офисное помещение',
            description: 'Ремонт и отделка офиса 200м²',
            category: 'repair',
            image: null
        },
        {
            id: 3,
            title: 'Фасадные работы',
            description: 'Утепление и отделка фасада',
            category: 'facade',
            image: null
        },
        {
            id: 4,
            title: 'Внутренняя отделка',
            description: 'Покраска и отделка квартиры',
            category: 'finishing',
            image: null
        }
    ];
}

function getDefaultMessages() {
    return [
        {
            id: 1,
            name: 'Иван Петров',
            phone: '+7 (999) 123-45-67',
            email: 'ivan@example.com',
            service: 'Строительство домов',
            message: 'Интересует строительство дома 150м². Нужна консультация по материалам и срокам.',
            time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            read: false
        },
        {
            id: 2,
            name: 'Мария Сидорова',
            phone: '+7 (999) 234-56-78',
            email: 'maria@example.com',
            service: 'Ремонтные работы',
            message: 'Требуется капитальный ремонт квартиры 80м². Когда можно приехать на замеры?',
            time: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
            read: false
        },
        {
            id: 3,
            name: 'Алексей Козлов',
            phone: '+7 (999) 345-67-89',
            email: 'alex@example.com',
            service: 'Покраска',
            message: 'Нужно покрасить фасад дома. Площадь примерно 200м². Какие краски посоветуете?',
            time: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            read: true
        }
    ];
}

// Event listeners
function initializeEventListeners() {
    // Service management
    const addServiceBtn = document.getElementById('addServiceBtn');
    if (addServiceBtn) {
        addServiceBtn.addEventListener('click', () => {
            openServiceModal();
        });
    }
    
    const saveServiceBtn = document.getElementById('saveServiceBtn');
    if (saveServiceBtn) {
        saveServiceBtn.addEventListener('click', saveService);
    }
    
    const cancelServiceBtn = document.getElementById('cancelServiceBtn');
    if (cancelServiceBtn) {
        cancelServiceBtn.addEventListener('click', () => {
            closeModal(document.getElementById('serviceModal'));
        });
    }
    
    // Portfolio management
    const addPortfolioBtn = document.getElementById('addPortfolioBtn');
    if (addPortfolioBtn) {
        addPortfolioBtn.addEventListener('click', () => {
            openPortfolioModal();
        });
    }
    
    const savePortfolioBtn = document.getElementById('savePortfolioBtn');
    if (savePortfolioBtn) {
        savePortfolioBtn.addEventListener('click', savePortfolio);
    }
    
    const cancelPortfolioBtn = document.getElementById('cancelPortfolioBtn');
    if (cancelPortfolioBtn) {
        cancelPortfolioBtn.addEventListener('click', () => {
            closeModal(document.getElementById('portfolioModal'));
        });
    }
    
    // Contacts management
    const saveContactsBtn = document.getElementById('saveContactsBtn');
    if (saveContactsBtn) {
        saveContactsBtn.addEventListener('click', saveContacts);
    }
    
    // Settings management
    const saveSettingsBtn = document.getElementById('saveSettingsBtn');
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', saveSettings);
    }
    
    // Messages management
    const markAllReadBtn = document.getElementById('markAllReadBtn');
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', markAllMessagesRead);
    }
    
    // Image upload preview
    const portfolioImage = document.getElementById('portfolioImage');
    if (portfolioImage) {
        portfolioImage.addEventListener('change', handleImageUpload);
    }
    
    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
}

// Service management
function openServiceModal(serviceId = null) {
    const modal = document.getElementById('serviceModal');
    const title = document.getElementById('serviceModalTitle');
    const form = document.getElementById('serviceForm');
    
    if (serviceId) {
        // Edit mode
        const service = services.find(s => s.id === serviceId);
        if (service) {
            title.textContent = 'Редактировать услугу';
            document.getElementById('serviceName').value = service.name;
            document.getElementById('serviceIcon').value = service.icon;
            document.getElementById('serviceDescription').value = service.description;
            document.getElementById('serviceFeatures').value = service.features.join('\n');
            form.dataset.editId = serviceId;
        }
    } else {
        // Add mode
        title.textContent = 'Добавить услугу';
        form.reset();
        delete form.dataset.editId;
    }
    
    openModal('serviceModal');
}

function saveService() {
    const form = document.getElementById('serviceForm');
    const name = document.getElementById('serviceName').value;
    const icon = document.getElementById('serviceIcon').value;
    const description = document.getElementById('serviceDescription').value;
    const features = document.getElementById('serviceFeatures').value.split('\n').filter(f => f.trim());
    
    if (!name || !description) {
        showNotification('Пожалуйста, заполните все обязательные поля', 'error');
        return;
    }
    
    const editId = form.dataset.editId;
    
    if (editId) {
        // Update existing service
        const index = services.findIndex(s => s.id === parseInt(editId));
        if (index !== -1) {
            services[index] = {
                ...services[index],
                name,
                icon,
                description,
                features
            };
        }
    } else {
        // Add new service
        const newService = {
            id: Date.now(),
            name,
            icon,
            description,
            features
        };
        services.push(newService);
    }
    
    saveServices();
    renderServices();
    closeModal(document.getElementById('serviceModal'));
    showNotification('Услуга успешно сохранена', 'success');
}

function deleteService(serviceId) {
    if (confirm('Вы уверены, что хотите удалить эту услугу?')) {
        services = services.filter(s => s.id !== serviceId);
        saveServices();
        renderServices();
        showNotification('Услуга удалена', 'success');
    }
}

function renderServices() {
    const grid = document.getElementById('servicesGrid');
    if (!grid) return;
    
    grid.innerHTML = services.map(service => `
        <div class="service-card">
            <div class="service-card-header">
                <h3 class="service-card-title">${service.name}</h3>
                <div class="service-card-actions">
                    <button onclick="openServiceModal(${service.id})" title="Редактировать">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteService(${service.id})" title="Удалить">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="service-card-body">
                <p class="service-card-description">${service.description}</p>
                <ul class="service-card-features">
                    ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');
}

// Portfolio management
function openPortfolioModal(portfolioId = null) {
    const modal = document.getElementById('portfolioModal');
    const title = document.getElementById('portfolioModalTitle');
    const form = document.getElementById('portfolioForm');
    
    if (portfolioId) {
        // Edit mode
        const item = portfolio.find(p => p.id === portfolioId);
        if (item) {
            title.textContent = 'Редактировать работу';
            document.getElementById('portfolioTitle').value = item.title;
            document.getElementById('portfolioDescription').value = item.description;
            document.getElementById('portfolioCategory').value = item.category;
            form.dataset.editId = portfolioId;
        }
    } else {
        // Add mode
        title.textContent = 'Добавить работу';
        form.reset();
        delete form.dataset.editId;
    }
    
    openModal('portfolioModal');
}

function savePortfolio() {
    const form = document.getElementById('portfolioForm');
    const title = document.getElementById('portfolioTitle').value;
    const description = document.getElementById('portfolioDescription').value;
    const category = document.getElementById('portfolioCategory').value;
    const imageFile = document.getElementById('portfolioImage').files[0];
    
    if (!title || !description) {
        showNotification('Пожалуйста, заполните все обязательные поля', 'error');
        return;
    }
    
    const editId = form.dataset.editId;
    
    if (editId) {
        // Update existing portfolio item
        const index = portfolio.findIndex(p => p.id === parseInt(editId));
        if (index !== -1) {
            portfolio[index] = {
                ...portfolio[index],
                title,
                description,
                category
            };
        }
    } else {
        // Add new portfolio item
        const newItem = {
            id: Date.now(),
            title,
            description,
            category,
            image: null
        };
        portfolio.push(newItem);
    }
    
    savePortfolio();
    renderPortfolio();
    closeModal(document.getElementById('portfolioModal'));
    showNotification('Работа успешно сохранена', 'success');
}

function deletePortfolio(portfolioId) {
    if (confirm('Вы уверены, что хотите удалить эту работу?')) {
        portfolio = portfolio.filter(p => p.id !== portfolioId);
        savePortfolio();
        renderPortfolio();
        showNotification('Работа удалена', 'success');
    }
}

function renderPortfolio() {
    const grid = document.getElementById('portfolioGrid');
    if (!grid) return;
    
    grid.innerHTML = portfolio.map(item => `
        <div class="portfolio-card">
            <div class="portfolio-card-image">
                <div class="portfolio-card-actions">
                    <button onclick="openPortfolioModal(${item.id})" title="Редактировать">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deletePortfolio(${item.id})" title="Удалить">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                ${item.image ? `<img src="${item.image}" alt="${item.title}">` : '<i class="fas fa-image"></i>'}
            </div>
            <div class="portfolio-card-body">
                <h3 class="portfolio-card-title">${item.title}</h3>
                <p class="portfolio-card-description">${item.description}</p>
                <span class="portfolio-card-category">${getCategoryName(item.category)}</span>
            </div>
        </div>
    `).join('');
}

function getCategoryName(category) {
    const categories = {
        'construction': 'Строительство',
        'finishing': 'Отделка',
        'painting': 'Покраска',
        'repair': 'Ремонт',
        'facade': 'Фасад'
    };
    return categories[category] || category;
}

// Image upload
function handleImageUpload(event) {
    const file = event.target.files[0];
    const preview = document.getElementById('imagePreview');
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
    } else {
        preview.innerHTML = '';
    }
}

// Contacts management
function saveContacts() {
    const phone = document.getElementById('contactPhone').value;
    const email = document.getElementById('contactEmail').value;
    const address = document.getElementById('contactAddress').value;
    const schedule = document.getElementById('contactSchedule').value;
    
    // Save to localStorage
    const contacts = { phone, email, address, schedule };
    localStorage.setItem('adminContacts', JSON.stringify(contacts));
    
    showNotification('Контактная информация сохранена', 'success');
}

// Settings management
function saveSettings() {
    const title = document.getElementById('siteTitle').value;
    const description = document.getElementById('siteDescription').value;
    const primaryColor = document.getElementById('primaryColor').value;
    const accentColor = document.getElementById('accentColor').value;
    
    // Save to localStorage
    const settings = { title, description, primaryColor, accentColor };
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    
    showNotification('Настройки сохранены', 'success');
}

// Messages management
function renderMessages() {
    const list = document.getElementById('messagesList');
    if (!list) return;
    
    const unreadCount = messages.filter(m => !m.read).length;
    const badge = document.querySelector('.badge');
    if (badge) {
        badge.textContent = unreadCount;
        badge.style.display = unreadCount > 0 ? 'inline' : 'none';
    }
    
    list.innerHTML = messages.map(message => `
        <div class="message-item ${!message.read ? 'unread' : ''}">
            <div class="message-header">
                <div class="message-info">
                    <h4>${message.name}</h4>
                    <p>${message.phone} • ${message.email}</p>
                </div>
                <span class="message-time">${formatTime(message.time)}</span>
            </div>
            <div class="message-content">${message.message}</div>
            <span class="message-service">${message.service}</span>
        </div>
    `).join('');
}

function markAllMessagesRead() {
    messages.forEach(message => {
        message.read = true;
    });
    saveMessages();
    renderMessages();
    showNotification('Все сообщения отмечены как прочитанные', 'success');
}

function formatTime(timeString) {
    const date = new Date(timeString);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60 * 60 * 1000) {
        const minutes = Math.floor(diff / (60 * 1000));
        return `${minutes} мин назад`;
    } else if (diff < 24 * 60 * 60 * 1000) {
        const hours = Math.floor(diff / (60 * 60 * 1000));
        return `${hours} ч назад`;
    } else {
        const days = Math.floor(diff / (24 * 60 * 60 * 1000));
        return `${days} дн назад`;
    }
}

// Data persistence
function saveServices() {
    localStorage.setItem('adminServices', JSON.stringify(services));
}

function savePortfolio() {
    localStorage.setItem('adminPortfolio', JSON.stringify(portfolio));
}

function saveMessages() {
    localStorage.setItem('adminMessages', JSON.stringify(messages));
}

// Notifications
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Logout
function logout() {
    if (confirm('Вы уверены, что хотите выйти?')) {
        // Clear session data if needed
        window.location.href = '../index.html';
    }
}

// Export data for main site
function exportData() {
    return {
        services,
        portfolio,
        contacts: JSON.parse(localStorage.getItem('adminContacts') || '{}'),
        settings: JSON.parse(localStorage.getItem('adminSettings') || '{}')
    };
}

// Make exportData available globally
window.adminPanel = {
    exportData
}; 