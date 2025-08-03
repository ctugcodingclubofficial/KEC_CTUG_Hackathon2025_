// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
});

// Problem category filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const problemCards = document.querySelectorAll('.problem-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const category = button.getAttribute('data-category');
        
        problemCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Form validation and submission
const registrationForm = document.getElementById('registrationForm');

registrationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!validateForm(data)) {
        return;
    }
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Registering...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        showSuccessMessage();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        this.reset();
    }, 2000);
});

function validateForm(data) {
    const requiredFields = ['teamName', 'teamLeader', 'email', 'phone', 'college', 'department', 'year', 'teamSize', 'category'];
    
    for (let field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showErrorMessage(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
            return false;
        }
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showErrorMessage('Please enter a valid email address.');
        return false;
    }
    
    // Phone validation
    const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(data.phone)) {
        showErrorMessage('Please enter a valid phone number.');
        return false;
    }
    
    return true;
}

function showSuccessMessage() {
    const message = createNotification('Registration successful! You will receive a confirmation email shortly.', 'success');
    document.body.appendChild(message);
    setTimeout(() => message.remove(), 5000);
}

function showErrorMessage(text) {
    const message = createNotification(text, 'error');
    document.body.appendChild(message);
    setTimeout(() => message.remove(), 5000);
}

function createNotification(text, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${text}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        max-width: 400px;
        padding: 1rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 
            'background: linear-gradient(135deg, #10b981, #059669); color: white;' : 
            'background: linear-gradient(135deg, #ef4444, #dc2626); color: white;'
        }
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: inherit;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: auto;
    `;
    
    closeBtn.addEventListener('click', () => notification.remove());
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    return notification;
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.about-card, .problem-card, .detail-item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const shapes = document.querySelectorAll('.shape');
    
    if (hero) {
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    }
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Counter animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start < target) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Add loading states to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.classList.contains('loading')) return;
        
        this.classList.add('loading');
        
        setTimeout(() => {
            this.classList.remove('loading');
        }, 1000);
    });
});

// Add hover effects to cards
document.querySelectorAll('.about-card, .problem-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Search functionality for problems
function addSearchFunctionality() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search problems...';
    searchInput.className = 'problem-search';
    searchInput.style.cssText = `
        width: 100%;
        max-width: 400px;
        padding: 12px 20px;
        border: 2px solid var(--border-color);
        border-radius: 25px;
        font-size: 1rem;
        margin-bottom: 2rem;
        transition: border-color 0.3s ease;
    `;
    
    const problemsSection = document.querySelector('.problems .container');
    const sectionHeader = problemsSection.querySelector('.section-header');
    sectionHeader.appendChild(searchInput);
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const activeCategory = document.querySelector('.filter-btn.active').getAttribute('data-category');
        
        problemCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const category = card.getAttribute('data-category');
            
            const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            const matchesCategory = activeCategory === 'all' || category === activeCategory;
            
            if (matchesSearch && matchesCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Initialize search functionality
document.addEventListener('DOMContentLoaded', addSearchFunctionality);

// Add random floating animation to shapes
function addFloatingAnimation() {
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const randomDelay = Math.random() * 5;
        const randomDuration = 3 + Math.random() * 4;
        
        shape.style.animation = `float ${randomDuration}s ease-in-out ${randomDelay}s infinite`;
    });
}

// Initialize floating animation
document.addEventListener('DOMContentLoaded', addFloatingAnimation);

// Add dynamic background color change
function addDynamicBackground() {
    const hero = document.querySelector('.hero');
    const colors = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    ];
    
    let currentIndex = 0;
    
    setInterval(() => {
        currentIndex = (currentIndex + 1) % colors.length;
        hero.style.background = colors[currentIndex];
    }, 10000);
}

// Initialize dynamic background
document.addEventListener('DOMContentLoaded', addDynamicBackground);

// Problem statements data
const problemStatements = {
    hardware: [
        { id: 'HW-001', name: 'Smart Helmet for Accident Detection' },
        { id: 'HW-002', name: 'Wearable Health Monitor for Chronic Patients' },
        { id: 'HW-003', name: 'RFID-Based Asset Tracking System' },
        { id: 'HW-004', name: 'Solar-Powered Charging Station for Devices' },
        { id: 'HW-005', name: 'Smart Water Dispenser with Purity Indicator' },
        { id: 'HW-006', name: 'Digital Pill Dispenser for Elders' },
        { id: 'HW-07', name: 'Smart Classroom Attendance System Using RFID' }
    ],
    software: [
        { id: 'SW-013', name: 'Virtual Queue System for College Canteens' },
        { id: 'SW-014', name: 'Student Grievance Redressal Portal' },
        { id: 'SW-015', name: 'Peer-to-Peer Book Exchange Platform' },
        { id: 'SW-016', name: 'College Event Management System' },
        { id: 'SW-017', name: 'Campus Bus Tracking App' },
        { id: 'SW-018', name: 'Online Counseling Appointment System' },
        { id: 'SW-019', name: 'Hostel Maintenance Complaint App' },
        { id: 'SW-020', name: 'Digital Resume Builder with Templates' },
        { id: 'SW-021', name: 'Online Feedback and Survey System' },
        { id: 'SW-022', name: 'Lost and Found Portal for Students' },
        { id: 'SW-023', name: 'Academic Planner with Exam and Assignment Tracker' },
        { id: 'SW-024', name: 'Indoor Navigation App for Campus Buildings' },
        { id: 'SW-025', name: 'Code Practice Platform with College Leaderboard' },
        { id: 'SW-026', name: 'Smart Attendance Analytics Dashboard' }
    ],
    sustainability: [
        { id: 'SUS-027', name: 'IoT Rainwater Harvesting Monitor' },
        { id: 'SUS-028', name: 'Campus Waste Segregation Awareness App' },
        { id: 'SUS-029', name: 'Carbon Footprint Tracker for Students' },
        { id: 'SUS-030', name: 'Smart Dustbin with Waste Classification AI' },
        { id: 'SUS-031', name: 'E-Waste Collection and Tracking App' },
        { id: 'SUS-032', name: 'Smart Greenhouse Monitoring System' },
        { id: 'SUS-033', name: 'Paperless Office Suite for College Admin' },
        { id: 'SUS-034', name: 'Solar-Powered Smart Bench' },
        { id: 'SUS-035', name: 'Sustainable Product Review App' },
        { id: 'SUS-036', name: 'Biodegradable Packaging Material Finder' },
        { id: 'SUS-037', name: 'Energy Usage Dashboard for Campus Buildings' },
        { id: 'SUS-038', name: 'Urban Farming Starter Kit App' }
    ],
    aiml: [
        { id: 'AI-024', name: 'AI-Powered Disease Prediction System' },
        { id: 'AI-025', name: 'AI Tutor for Exam Preparation' },
        { id: 'AI-026', name: 'Real-Time Language Translator for Students' },
        { id: 'AI-027', name: 'AI-Based Resume Analyzer for Recruiters' },
        { id: 'AI-028', name: 'Smart Surveillance System Using Computer Vision' },
        { id: 'AI-029', name: 'AI-Powered Course Recommendation System' },
        { id: 'AI-030', name: 'Virtual Interview Coach Using NLP' },
        { id: 'AI-031', name: 'Emotion Detection from Voice and Facial Data' },
        { id: 'AI-032', name: 'Fake News Detection System' },
        { id: 'AI-033', name: 'AI-Based Plagiarism Detection for Code' },
        { id: 'AI-034', name: 'Traffic Violation Detection Using AI' }
    ],
    agriculture: [
        { id: 'AGR-035', name: 'Smart Irrigation System' },
        { id: 'AGR-036', name: 'Crop Recommendation System Based on Soil and Weather Data' },
        { id: 'AGR-037', name: 'Drone-Based Crop Health Monitoring' },
        { id: 'AGR-038', name: 'AI-Powered Yield Prediction Tool' },
        { id: 'AGR-039', name: 'Livestock Health Monitoring Wearable' },
        { id: 'AGR-040', name: 'Fertilizer Dosage Calculator App' },
        { id: 'AGR-041', name: 'Water Source Locator for Rural Farmers' },
        { id: 'AGR-042', name: 'Agricultural News and Market Price Alert App' }
    ],
    others: [
        { id: 'OTH-043', name: 'Disaster Alert and Response App' },
        { id: 'OTH-044', name: 'Smart Voting System with Blockchain' },
        { id: 'OTH-045', name: 'Campus Navigation App for Visually Impaired' },
        { id: 'OTH-046', name: 'Cyberbullying Detection and Reporting Tool' },
        { id: 'OTH-047', name: 'Smart Women Safety Wearable' },
        { id: 'OTH-048', name: 'Crowdsourced Problem Reporting Platform' }
    ]
};

// Update problem statements based on selected category
function updateProblemStatements() {
    const categorySelect = document.getElementById('category');
    const problemSelect = document.getElementById('problemStatement');
    const problemIdInput = document.getElementById('problemId');
    
    const selectedCategory = categorySelect.value;
    
    // Clear existing options
    problemSelect.innerHTML = '<option value="">Select Problem Statement</option>';
    problemIdInput.value = '';
    
    if (selectedCategory && problemStatements[selectedCategory]) {
        problemStatements[selectedCategory].forEach(problem => {
            const option = document.createElement('option');
            option.value = problem.id;
            option.textContent = problem.name;
            problemSelect.appendChild(option);
        });
    }
}

// Update problem ID when problem statement is selected
document.addEventListener('DOMContentLoaded', function() {
    const problemSelect = document.getElementById('problemStatement');
    const problemIdInput = document.getElementById('problemId');
    
    if (problemSelect && problemIdInput) {
        problemSelect.addEventListener('change', function() {
            problemIdInput.value = this.value;
        });
    }
    
    // Pre-fill form if problem was selected from category page
    const selectedProblemId = localStorage.getItem('selectedProblemId');
    const selectedProblemName = localStorage.getItem('selectedProblemName');
    const selectedCategory = localStorage.getItem('selectedCategory');
    
    if (selectedProblemId && selectedProblemName && selectedCategory) {
        // Set the category
        const categorySelect = document.getElementById('category');
        if (categorySelect) {
            categorySelect.value = selectedCategory;
            updateProblemStatements();
            
            // Set the problem statement after a short delay to ensure options are loaded
            setTimeout(() => {
                const problemSelect = document.getElementById('problemStatement');
                const problemIdInput = document.getElementById('problemId');
                
                if (problemSelect && problemIdInput) {
                    problemSelect.value = selectedProblemId;
                    problemIdInput.value = selectedProblemId;
                }
            }, 100);
        }
        
        // Clear localStorage after setting
        localStorage.removeItem('selectedProblemId');
        localStorage.removeItem('selectedProblemName');
        localStorage.removeItem('selectedCategory');
    }
});

// Update member fields based on team size
function updateMemberFields() {
    const teamSizeSelect = document.getElementById('teamSize');
    const memberFields = document.getElementById('memberFields');
    
    if (!teamSizeSelect || !memberFields) return;
    
    const teamSize = parseInt(teamSizeSelect.value);
    memberFields.innerHTML = '';
    
    // Generate member input fields (excluding team leader)
    for (let i = 2; i <= teamSize; i++) {
        const memberDiv = document.createElement('div');
        memberDiv.className = 'form-group member-input';
        memberDiv.innerHTML = `
            <label for="member${i}">Team Member ${i} Name</label>
            <input type="text" id="member${i}" name="member${i}" required>
        `;
        memberFields.appendChild(memberDiv);
    }
}

// Registration Link Handler
function setRegistrationLink(url) {
    const registrationLink = document.getElementById('registrationLink');
    if (registrationLink) {
        registrationLink.href = url;
        registrationLink.target = '_blank';
    }
}

// Initialize registration link (you can change this URL)
document.addEventListener('DOMContentLoaded', function() {
    // Set the registration link here - replace with your actual registration form URL
    // setRegistrationLink('https://your-registration-form-url.com');
    
    // For now, it shows an alert. Remove this and uncomment the line above when you have the URL
    const registrationLink = document.getElementById('registrationLink');
    if (registrationLink) {
        registrationLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Registration link will be provided by the organizers. Please contact the event team for the registration form.');
        });
    }
});
