// FA2BEE Professional Website JavaScript
// Interactive features, order calculation, and service management

// Global variables
let currentService = null;
let orderData = {
    service: '',
    items: [],
    pickupDelivery: false,
    total: 0
};


// Pricing configuration (in Dalasi)
const pricing = {
    laundry: {
        'wash-only': 50,
        'iron-only': 30,
        'wash-iron': 80,
        'dry-clean': 150,
        'pickup-only': 50,
        'delivery-only': 50,
        'pickup-delivery': 100
    },
    cleaning: {
        'basic': 800,
        'deep': 1500,
        'move-in-out': 2000
    },
    realEstate: {
        // Property Rental Services
        'property-rental': 500,
        'property-management': 800,
        'property-sales': 1000,
        'property-valuation': 300
    }
};

// Item types for laundry service (in Dalasi)
const laundryItems = [
    { name: 'Shirts/T-shirts', type: 'shirts', basePrice: 50 },
    { name: 'Pants/Jeans', type: 'pants', basePrice: 50 },
    { name: 'Dresses/Skirts', type: 'dresses', basePrice: 60 },
    { name: 'Blouses', type: 'blouses', basePrice: 50 },
    { name: 'Suits/Blazers', type: 'suits', basePrice: 150 },
    { name: 'Coats/Jackets', type: 'coats', basePrice: 120 },
    { name: 'Bedding (per set)', type: 'bedding', basePrice: 200 },
    { name: 'Towels (per 5)', type: 'towels', basePrice: 100 }
];

// Initialize Laundry Form
function initializeLaundryForm() {
    const form = document.getElementById('laundryOrderForm');
    if (!form) return;

    // Service type changes (checkboxes)
    const serviceTypeOptions = form.querySelectorAll('input[name="serviceType"]');
    serviceTypeOptions.forEach(option => {
        option.addEventListener('change', calculateLaundryTotal);
    });

    // Service handling changes
    const serviceHandlingOptions = form.querySelectorAll('input[name="serviceHandling"]');
    serviceHandlingOptions.forEach(option => {
        option.addEventListener('change', calculateLaundryTotal);
    });

    // Service handling option selection (for visual feedback)
    const handlingOptions = form.querySelectorAll('.handling-option');
    handlingOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all handling options
            handlingOptions.forEach(opt => opt.classList.remove('selected'));
            // Add selected class to clicked option
            this.classList.add('selected');
            // Check the radio button
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
            }
            // Recalculate total
            calculateLaundryTotal();
        });
    });

    // Urgency changes
    const urgency = form.querySelector('#urgency');
    if (urgency) {
        urgency.addEventListener('change', calculateLaundryTotal);
    }

    // Quantity input changes
    const quantityInputs = form.querySelectorAll('.quantity-input');
    quantityInputs.forEach(input => {
        input.addEventListener('input', calculateLaundryTotal);
        input.addEventListener('change', calculateLaundryTotal);
    });

    // Quantity button changes
    const quantityButtons = form.querySelectorAll('.quantity-btn');
    quantityButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentNode.querySelector('.quantity-input');
            const change = this.textContent === '+' ? 1 : -1;
            const newValue = Math.max(0, parseInt(input.value) + change);
            input.value = newValue;
            calculateLaundryTotal();
        });
    });

    // Form submission
    form.addEventListener('submit', handleLaundryOrder);

}

// Initialize Cleaning Form
function initializeCleaningForm() {
    const form = document.getElementById('cleaningOrderForm');
    if (!form) return;

    // Service type selection
    const serviceOptions = form.querySelectorAll('input[name="serviceType"]');
    serviceOptions.forEach(option => {
        option.addEventListener('change', updateCleaningSummary);
    });

    // Property type, frequency, and pet information changes
    const propertyType = form.querySelector('#propertyType');
    const frequency = form.querySelector('#cleaningFrequency');
    const hasPets = form.querySelector('#hasPets');
    const petCount = form.querySelector('#petCount');
    const urgency = form.querySelector('#urgency');
    const preferredDate = form.querySelector('#preferredDate');
    const preferredTime = form.querySelector('#preferredTime');
    
    if (propertyType) propertyType.addEventListener('change', updateCleaningSummary);
    if (frequency) frequency.addEventListener('change', updateCleaningSummary);
    if (hasPets) hasPets.addEventListener('change', updateCleaningSummary);
    if (petCount) petCount.addEventListener('input', updateCleaningSummary);
    if (urgency) urgency.addEventListener('change', updateCleaningSummary);
    if (preferredDate) preferredDate.addEventListener('change', updateCleaningSummary);
    if (preferredTime) preferredTime.addEventListener('change', updateCleaningSummary);

    // Form submission
    form.addEventListener('submit', handleCleaningOrder);
}

// Initialize Salon Form
function initializeRealEstateForm() {
    const form = document.getElementById('realEstateOrderForm');
    if (!form) return;

    // Service type selection
    const serviceOptions = form.querySelectorAll('input[name="serviceType"]');
    serviceOptions.forEach(option => {
        option.addEventListener('change', updateRealEstateSummary);
    });

    // Property details changes
    const propertyType = form.querySelector('#propertyType');
    const budget = form.querySelector('#budget');
    const location = form.querySelector('#location');
    const preferredDate = form.querySelector('#preferredDate');
    const urgency = form.querySelector('#urgency');
    
    if (propertyType) propertyType.addEventListener('change', updateRealEstateSummary);
    if (budget) budget.addEventListener('change', updateRealEstateSummary);
    if (location) location.addEventListener('change', updateRealEstateSummary);
    if (preferredDate) preferredDate.addEventListener('change', updateRealEstateSummary);
    if (urgency) urgency.addEventListener('change', updateRealEstateSummary);

    // Form submission
    form.addEventListener('submit', handleRealEstateOrder);
}

// Update Cleaning Order Summary
function updateCleaningSummary() {
    const form = document.getElementById('cleaningOrderForm');
    if (!form) return;

    const selectedServiceTypes = form.querySelectorAll('input[name="serviceType"]:checked');
    const propertyType = form.querySelector('#propertyType');
    const frequency = form.querySelector('#cleaningFrequency');
    const hasPets = form.querySelector('#hasPets');
    const petCount = form.querySelector('#petCount');

    let total = 0;
    let serviceTypeText = 'Select a service';

    if (selectedServiceTypes.length > 0) {
        // Use the first selected service type for base price calculation
        total = pricing.cleaning[selectedServiceTypes[0].value];
        serviceTypeText = selectedServiceTypes[0].nextElementSibling.querySelector('h4').textContent;
    }

    // Add urgency fee if selected
    const urgency = form.querySelector('#urgency');
    if (urgency && urgency.value) {
        if (urgency.value === 'urgent') {
            total += 300; // D300 for same day cleaning
        } else if (urgency.value === 'express') {
            total += 150; // D150 for next day cleaning
        }
    }

    // Format pet information
    let petInfoText = '-';
    if (hasPets && hasPets.value) {
        if (hasPets.value === 'no') {
            petInfoText = 'No pets';
        } else {
            const petCountValue = petCount ? petCount.value : '';
            const petType = hasPets.options[hasPets.selectedIndex].text;
            petInfoText = petCountValue ? `${petType} (${petCountValue})` : petType;
        }
    }

    // Update urgency display
    const urgencyRow = form.querySelector('#urgencyRow');
    const urgencyFee = form.querySelector('#urgencyFee');
    
    if (urgency && urgency.value && (urgency.value === 'urgent' || urgency.value === 'express')) {
        if (urgencyRow) urgencyRow.style.display = 'flex';
        if (urgencyFee) {
            const urgencyAmount = urgency.value === 'urgent' ? 300 : 150;
            urgencyFee.textContent = `D${urgencyAmount}`;
        }
    } else {
        if (urgencyRow) urgencyRow.style.display = 'none';
    }

    // Update display
    const serviceTypeDisplay = form.querySelector('#serviceTypeDisplay');
    const propertyTypeDisplay = form.querySelector('#propertyTypeDisplay');
    const frequencyDisplay = form.querySelector('#frequencyDisplay');
    const petInfoDisplay = form.querySelector('#petInfoDisplay');
    const orderTotal = form.querySelector('#orderTotal');
    const buttonTotal = form.querySelector('#buttonTotal');

    if (serviceTypeDisplay) serviceTypeDisplay.textContent = serviceTypeText;
    if (propertyTypeDisplay) propertyTypeDisplay.textContent = propertyType ? propertyType.options[propertyType.selectedIndex].text : '-';
    if (frequencyDisplay) frequencyDisplay.textContent = frequency ? frequency.options[frequency.selectedIndex].text : '-';
    if (petInfoDisplay) petInfoDisplay.textContent = petInfoText;
    if (orderTotal) orderTotal.textContent = `D${total.toFixed(0)}`;
    if (buttonTotal) buttonTotal.textContent = `D${total.toFixed(0)}`;
}

// Update Real Estate Order Summary
function updateRealEstateSummary() {
    const form = document.getElementById('realEstateOrderForm');
    if (!form) return;

    const selectedServiceTypes = form.querySelectorAll('input[name="serviceType"]:checked');
    const propertyType = form.querySelector('#propertyType');
    const budget = form.querySelector('#budget');
    const preferredDate = form.querySelector('#preferredDate');

    let total = 0;
    let serviceTypeText = 'Select a service';

    if (selectedServiceTypes.length > 0) {
        // Use the first selected service type for base price calculation
        total = pricing.realEstate[selectedServiceTypes[0].value];
        serviceTypeText = selectedServiceTypes[0].nextElementSibling.querySelector('h4').textContent;
    }

    // Update display
    const serviceTypeDisplay = form.querySelector('#serviceTypeDisplay');
    const propertyTypeDisplay = form.querySelector('#propertyTypeDisplay');
    const budgetDisplay = form.querySelector('#budgetDisplay');
    const preferredDateDisplay = form.querySelector('#preferredDateDisplay');
    const orderTotal = form.querySelector('#orderTotal');
    const buttonTotal = form.querySelector('#buttonTotal');

    if (serviceTypeDisplay) serviceTypeDisplay.textContent = serviceTypeText;
    if (propertyTypeDisplay) propertyTypeDisplay.textContent = propertyType ? propertyType.value || '-' : '-';
    if (budgetDisplay) budgetDisplay.textContent = budget ? budget.value || '-' : '-';
    if (preferredDateDisplay) preferredDateDisplay.textContent = preferredDate ? preferredDate.value || '-' : '-';
    if (orderTotal) orderTotal.textContent = `D${total.toFixed(0)}`;
    if (buttonTotal) buttonTotal.textContent = `D${total.toFixed(0)}`;
}

// Handle Cleaning Order Submission
function handleCleaningOrder(e) {
    e.preventDefault();
    console.log('handleCleaningOrder: Form submission started');
    
    const form = e.target;
    if (!validateForm(form)) {
        console.log('handleCleaningOrder: Form validation failed');
        return;
    }

    console.log('handleCleaningOrder: Form validation passed');

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading"></span> Processing...';
    submitBtn.disabled = true;

    // Collect form data
    const formData = new FormData(form);
    const orderData = {
        customerName: formData.get('customerName'),
        customerPhone: formData.get('customerPhone'),
        customerEmail: formData.get('customerEmail'),
        serviceAddress: formData.get('serviceAddress'),
        serviceType: formData.get('serviceType'),
        propertyType: formData.get('propertyType'),
        cleaningFrequency: formData.get('cleaningFrequency'),
        hasPets: formData.get('hasPets'),
        petCount: formData.get('petCount'),
        petDetails: formData.get('petDetails'),
        specialInstructions: formData.get('specialInstructions'),
        paymentMethod: formData.get('paymentMethod'),
        preferredDate: formData.get('preferredDate'),
        preferredTime: formData.get('preferredTime'),
        urgency: formData.get('urgency'),
        total: `D${pricing.cleaning[formData.get('serviceType')].toFixed(0)}`
    };

    // Add timestamp
    orderData.timestamp = new Date().toISOString();

    console.log('handleCleaningOrder: Order data collected:', orderData);

    // Store order in localStorage for admin dashboard
    storeOrder(orderData);

    // Send email to manager
    sendOrderEmail(orderData).then(() => {
        console.log('handleCleaningOrder: Email sent successfully');
        showOrderSuccessMessage(orderData);
        form.reset();
        updateCleaningSummary();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }).catch(() => {
        // Even if email fails, show success to user
        console.log('handleCleaningOrder: Email failed but showing success to user');
        showOrderSuccessMessage(orderData);
        form.reset();
        updateCleaningSummary();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}

// Handle Laundry Order Submission
function handleLaundryOrder(e) {
    e.preventDefault();
    console.log('handleLaundryOrder: Form submission started');
    
    const form = e.target;
    if (!validateForm(form)) {
        console.log('handleLaundryOrder: Form validation failed');
        return;
    }

    console.log('handleLaundryOrder: Form validation passed');

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading"></span> Processing...';
    submitBtn.disabled = true;

    // Collect form data
    const formData = new FormData(form);
    const orderData = {
        customerName: formData.get('customerName'),
        customerPhone: formData.get('customerPhone'),
        customerEmail: formData.get('customerEmail'),
        pickupAddress: formData.get('pickupAddress'),
        serviceType: formData.get('serviceType'),
        serviceHandling: formData.get('serviceHandling'),
        branch: formData.get('branch'),
        preferredDate: formData.get('preferredDate'),
        preferredTime: formData.get('preferredTime'),
        urgency: formData.get('urgency'),
        specialInstructions: formData.get('specialInstructions'),
        paymentMethod: formData.get('paymentMethod'),
        total: document.getElementById('orderTotal').textContent
    };

    // Add timestamp
    orderData.timestamp = new Date().toISOString();

    console.log('handleLaundryOrder: Order data collected:', orderData);

    // Store order in localStorage for admin dashboard
    storeOrder(orderData);

    // Send email to manager
    sendOrderEmail(orderData).then(() => {
        console.log('handleLaundryOrder: Email sent successfully');
        showOrderSuccessMessage(orderData);
        form.reset();
        calculateLaundryTotal();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }).catch(() => {
        // Even if email fails, show success to user
        console.log('handleLaundryOrder: Email failed but showing success to user');
        showOrderSuccessMessage(orderData);
        form.reset();
        calculateLaundryTotal();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}

// Handle Salon Order Submission
function handleRealEstateOrder(e) {
    e.preventDefault();
    console.log('handleRealEstateOrder: Form submission started');
    
    const form = e.target;
    if (!validateForm(form)) {
        console.log('handleRealEstateOrder: Form validation failed');
        return;
    }

    console.log('handleRealEstateOrder: Form validation passed');

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading"></span> Processing...';
    submitBtn.disabled = true;

    // Collect form data
    const formData = new FormData(form);
    const orderData = {
        customerName: formData.get('customerName'),
        customerPhone: formData.get('customerPhone'),
        customerEmail: formData.get('customerEmail'),
        serviceType: formData.get('serviceType'),
        propertyType: formData.get('propertyType'),
        budget: formData.get('budget'),
        location: formData.get('location'),
        preferredDate: formData.get('preferredDate'),
        urgency: formData.get('urgency'),
        specialRequirements: formData.get('specialRequirements'),
        paymentMethod: formData.get('paymentMethod'),
        total: document.getElementById('orderTotal')?.textContent || 'D500'
    };

    // Add timestamp
    orderData.timestamp = new Date().toISOString();

    console.log('handleRealEstateOrder: Order data collected:', orderData);

    // Store order in localStorage for admin dashboard
    storeOrder(orderData);

    // Send email to manager
    sendOrderEmail(orderData).then(() => {
        console.log('handleRealEstateOrder: Email sent successfully');
        showOrderSuccessMessage(orderData);
        form.reset();
        updateRealEstateSummary();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }).catch(() => {
        // Even if email fails, show success to user
        console.log('handleRealEstateOrder: Email failed but showing success to user');
        showOrderSuccessMessage(orderData);
        form.reset();
        updateRealEstateSummary();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}

// FA2BEE Email System - FIXED VERSION
// This replaces the broken email functionality

// WORKING EMAIL CONFIGURATION
const EMAIL_CONFIG = {
    // Using Formspree as reliable alternative to EmailJS
    formspreeEndpoint: 'https://formspree.io/f/mblzjzaj', // Your actual Formspree endpoint
    adminEmail: 'paalieunjie22@gmail.com'
};

// Alternative: Simple email service that actually works
function sendOrderEmailSimple(orderData) {
    console.log('Sending order email to admin...');
    
    // Method 1: Using Formspree (Recommended)
    return fetch(EMAIL_CONFIG.formspreeEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            to: EMAIL_CONFIG.adminEmail,
            subject: `New FA2BEE Order - ${orderData.orderId || 'Order'}`,
            message: formatOrderEmailContent(orderData),
            orderData: orderData
        })
    })
    .then(response => {
        if (response.ok) {
            console.log('Email sent successfully via Formspree');
            return Promise.resolve();
        } else {
            console.log('Formspree failed, trying mailto fallback');
            return sendEmailViaMailto(orderData);
        }
    })
    .catch(error => {
        console.log('Primary email failed, using mailto fallback');
        return sendEmailViaMailto(orderData);
    });
}

// Method 2: Mailto fallback (opens user's email client)
function sendEmailViaMailto(orderData) {
    const subject = encodeURIComponent(`New FA2BEE Order - ${orderData.orderId || 'Order'}`);
    const body = encodeURIComponent(formatOrderEmailContent(orderData));
    const mailtoUrl = `mailto:${EMAIL_CONFIG.adminEmail}?subject=${subject}&body=${body}`;
    
    // Open user's email client
    window.open(mailtoUrl, '_blank');
    
    return Promise.resolve();
}

// Format email content for admin
function formatOrderEmailContent(orderData) {
    const serviceName = getServiceTypeName(orderData);
    
    return `
NEW FA2BEE ORDER RECEIVED
========================

Order ID: ${orderData.orderId || 'N/A'}
Service Type: ${serviceName}
Order Date: ${new Date().toLocaleString()}

CUSTOMER INFORMATION:
--------------------
Name: ${orderData.customerName || 'N/A'}
Phone: ${orderData.customerPhone || 'N/A'}
Email: ${orderData.customerEmail || 'N/A'}

SERVICE DETAILS:
---------------
${getServiceDetails(orderData)}

PAYMENT INFORMATION:
-------------------
Total Amount: ${orderData.total || 'N/A'}
Payment Method: ${getPaymentMethodName(orderData.paymentMethod) || 'N/A'}

SCHEDULING:
----------
Preferred Date: ${orderData.preferredDate || 'N/A'}
Preferred Time: ${orderData.preferredTime || 'N/A'}
Urgency: ${orderData.urgency || 'Normal'}

ADDRESS:
--------
${orderData.pickupAddress || orderData.serviceAddress || 'N/A'}

SPECIAL INSTRUCTIONS:
--------------------
${orderData.specialInstructions || 'None'}

ACTION REQUIRED:
---------------
Please contact the customer at ${orderData.customerPhone} to confirm the service booking.

---
This email was generated automatically by the FA2BEE website.
Order placed at: ${new Date().toLocaleString()}
    `.trim();
}

// Get service details based on order type
function getServiceDetails(orderData) {
    if (orderData.propertyType) {
        return `Property Type: ${orderData.propertyType || 'N/A'}
Budget Range: ${orderData.budget || 'N/A'}
Preferred Location: ${orderData.location || 'N/A'}
Move-in Date: ${orderData.moveInDate || orderData.preferredDate || 'N/A'}
Urgency: ${orderData.urgency || 'Normal'}`;
    } else if (orderData.serviceAddress) {
        return `Property Type: ${orderData.propertyType || 'N/A'}
Cleaning Frequency: ${orderData.cleaningFrequency || 'N/A'}
Pets: ${orderData.hasPets === 'no' ? 'No pets' : (orderData.hasPets || 'N/A')}${orderData.petCount ? ` (${orderData.petCount})` : ''}`;
    } else {
        return `Service Handling: ${orderData.serviceHandling || 'N/A'}
Branch: ${orderData.branch || 'N/A'}
Items: See order details below`;
    }
}

// Store order in localStorage for admin dashboard
function storeOrder(orderData) {
    try {
        console.log('storeOrder: Starting to store order:', orderData);
        
        // Get existing orders
        const existingOrders = JSON.parse(localStorage.getItem('fa2bee_orders') || '[]');
        console.log('storeOrder: Existing orders count:', existingOrders.length);
        
        // Generate unique order ID
        const orderId = `FA2BEE-${String(existingOrders.length + 1).padStart(4, '0')}`;
        
        // Add tracking information to order
        const orderWithTracking = {
            ...orderData,
            orderId: orderId,
            status: 'received',
            statusHistory: [
                {
                    status: 'received',
                    timestamp: new Date().toISOString(),
                    message: 'Order received and confirmed'
                }
            ]
        };
        
        console.log('storeOrder: Order with tracking:', orderWithTracking);
        
        // Add new order
        existingOrders.push(orderWithTracking);
        
        // Store back to localStorage
        localStorage.setItem('fa2bee_orders', JSON.stringify(existingOrders));
        
        console.log('storeOrder: Order stored successfully!');
        console.log('storeOrder: Total orders in localStorage:', existingOrders.length);
        console.log('storeOrder: All orders:', existingOrders);
        
        // Verify storage
        const verifyOrders = JSON.parse(localStorage.getItem('fa2bee_orders') || '[]');
        console.log('storeOrder: Verification - orders in localStorage:', verifyOrders.length);
        
    } catch (error) {
        console.error('storeOrder: Failed to store order:', error);
    }
}

// Initialize Email System
function initializeEmailSystem() {
    console.log('FA2BEE Email System - Fixed Version Loaded');
    console.log('Admin email will be sent to:', EMAIL_CONFIG.adminEmail);
}

// Send order email to manager - FIXED VERSION
function sendOrderEmail(orderData) {
    console.log('sendOrderEmail: Starting email process for order:', orderData);
    
    // Use the new working email system
    return sendOrderEmailSimple(orderData);
}

// Old email functions removed - now using the fixed sendOrderEmailSimple function above

// Get service type name for email
function getServiceTypeName(orderData) {
    if (orderData.propertyType) {
        return 'Real Estate';
    } else if (orderData.serviceAddress) {
        return 'Home Cleaning';
    } else if (orderData.pickupAddress) {
        return 'Laundry Service';
    }
    return 'Service';
}

// Format order details for email
function formatOrderDetails(orderData) {
    let details = [];
    
    if (orderData.serviceType) {
        details.push(`Service Type: ${orderData.serviceType}`);
    }
    
    if (orderData.serviceHandling) {
        details.push(`Service Handling: ${orderData.serviceHandling}`);
    }
    
    if (orderData.propertyType) {
        details.push(`Property Type: ${orderData.propertyType}`);
    }
    
    if (orderData.cleaningFrequency) {
        details.push(`Cleaning Frequency: ${orderData.cleaningFrequency}`);
    }
    
    if (orderData.hairType) {
        details.push(`Hair Type: ${orderData.hairType}`);
    }
    
    if (orderData.childGender) {
        details.push(`Child Gender: ${orderData.childGender}`);
    }
    
    return details.join('\n');
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    setupEventListeners();
    setupMobileMenu();
    setupFormValidation();
    setupAnimations();
    initializeCleaningForm();
    initializeSalonForm();
    setupPageTransitions();
    initializeEmailSystem();
    
    // Force initial calculation for visible forms
    setTimeout(() => {
        calculateTotal();
        // Also run specific form calculations
        updateCleaningSummary();
        updateRealEstateSummary();
    }, 100);
    
    // Additional initialization after a longer delay to ensure all elements are loaded
    setTimeout(() => {
        initializeLaundryForm();
        initializeCleaningForm();
        initializeRealEstateForm();
    }, 500);
});

// Initialize website
function initializeWebsite() {
    // Add loading animation
    document.body.classList.add('loading');
    
    // Initialize service modals
    initializeServiceModals();
    
    // Setup pricing tabs
    setupPricingTabs();
    
    // Remove loading animation
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 1000);
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

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

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('serviceModal');
        if (event.target === modal) {
            closeModal();
        }
    });
}

// Mobile menu setup
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Setup form validation
function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });
    });
}

// Form validation
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        } else {
            clearFieldError(field);
        }
    });

    // Email validation
    const emailFields = form.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'Email address is required for order confirmation');
            isValid = false;
        } else if (!isValidEmail(field.value)) {
            showFieldError(field, 'Please enter a valid email address');
            isValid = false;
        }
    });

    return isValid;
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show field error
function showFieldError(field, message) {
    clearFieldError(field);
    field.style.borderColor = '#EF4444';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#EF4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

// Clear field error
function clearFieldError(field) {
    field.style.borderColor = '';
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Setup animations
function setupAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-card, .feature-item').forEach(el => {
        observer.observe(el);
    });
}

// Setup page transitions
function setupPageTransitions() {
    // Add page enter class to body
    document.body.classList.add('page-enter');
    
    // Remove loading class and add active class after a short delay
    setTimeout(() => {
        document.body.classList.remove('loading');
        document.body.classList.add('page-enter-active');
    }, 100);
    
    // Handle navigation clicks for smooth transitions
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Add fade out effect
            document.body.style.opacity = '0.8';
            document.body.style.transform = 'translateY(10px)';
        });
    });
}

// Scroll to services
function scrollToServices() {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
        servicesSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Open service modal
function openServiceModal(serviceType) {
    currentService = serviceType;
    const modal = document.getElementById('serviceModal');
    const modalContent = document.getElementById('modalContent');
    
    if (modal && modalContent) {
        modalContent.innerHTML = generateServiceModal(serviceType);
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Setup modal event listeners
        setupModalEventListeners();
    }
}

// Generate service modal content
function generateServiceModal(serviceType) {
    switch (serviceType) {
        case 'laundry':
            return generateLaundryModal();
        case 'cleaning':
            return generateCleaningModal();
        case 'salon':
            return generateSalonModal();
        default:
            return '<p>Service not available</p>';
    }
}

// Generate laundry service modal
function generateLaundryModal() {
    return `
        <div class="service-modal">
            <h2>FA2BEE Laundry Service</h2>
            <p>Professional laundry and dry cleaning services with pickup and delivery options.</p>
            
            <form id="laundryOrderForm" class="order-form">
                <div class="form-row">
                    <div class="form-group">
                        <label for="customerName">Full Name *</label>
                        <input type="text" id="customerName" name="customerName" required>
                    </div>
                    <div class="form-group">
                        <label for="customerPhone">Phone Number *</label>
                        <input type="tel" id="customerPhone" name="customerPhone" required>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="customerEmail">Email Address</label>
                        <input type="email" id="customerEmail" name="customerEmail">
                    </div>
                    <div class="form-group">
                        <label for="pickupAddress">Pickup Address *</label>
                        <input type="text" id="pickupAddress" name="pickupAddress" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Service Type *</label>
                    <div class="service-options">
                        <div class="service-option" data-service="wash-only">
                            <div>
                                <strong>Wash Only</strong>
                                <p>Basic washing service - $2.50/item</p>
                            </div>
                            <input type="radio" name="serviceType" value="wash-only" required>
                        </div>
                        <div class="service-option" data-service="wash-iron">
                            <div>
                                <strong>Wash & Iron</strong>
                                <p>Washing with professional ironing - $4.00/item</p>
                            </div>
                            <input type="radio" name="serviceType" value="wash-iron" required>
                        </div>
                        <div class="service-option" data-service="dry-clean">
                            <div>
                                <strong>Dry Cleaning</strong>
                                <p>Professional dry cleaning - $8.00/item</p>
                            </div>
                            <input type="radio" name="serviceType" value="dry-clean" required>
                        </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Items to Clean</label>
                    <div id="laundryItems">
                        ${laundryItems.map(item => `
                            <div class="item-row">
                                <div class="item-info">
                                    <span class="item-name">${item.name}</span>
                                    <span class="item-price">$${item.basePrice.toFixed(2)} each</span>
                                </div>
                                <div class="quantity-controls">
                                    <button type="button" class="quantity-btn" onclick="updateQuantity('${item.type}', -1)">-</button>
                                    <input type="number" class="quantity-input" id="qty-${item.type}" value="0" min="0" onchange="calculateTotal()">
                                    <button type="button" class="quantity-btn" onclick="updateQuantity('${item.type}', 1)">+</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="checkbox-group">
                    <input type="checkbox" id="pickupDelivery" name="pickupDelivery" onchange="calculateTotal()">
                    <label for="pickupDelivery">Pickup & Delivery Service (+$5.00, Free for orders over $50)</label>
                </div>
                
                <div class="form-group">
                    <label for="specialInstructions">Special Instructions</label>
                    <textarea id="specialInstructions" name="specialInstructions" rows="3" placeholder="Any special care instructions or notes..."></textarea>
                </div>
                
                <div class="total-section">
                    <h3>Order Total: <span id="orderTotal">$0.00</span></h3>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
                    <button type="submit" class="btn-primary">Place Order</button>
                </div>
            </form>
        </div>
    `;
}

// Generate cleaning service modal
function generateCleaningModal() {
    return `
        <div class="service-modal">
            <h2>FA2BEE Home Cleaning Service</h2>
            <p>Complete home cleaning solutions for a spotless living space.</p>
            
            <form id="cleaningOrderForm" class="order-form">
                <div class="form-row">
                    <div class="form-group">
                        <label for="customerName">Full Name *</label>
                        <input type="text" id="customerName" name="customerName" required>
                    </div>
                    <div class="form-group">
                        <label for="customerPhone">Phone Number *</label>
                        <input type="tel" id="customerPhone" name="customerPhone" required>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="customerEmail">Email Address</label>
                        <input type="email" id="customerEmail" name="customerEmail">
                    </div>
                    <div class="form-group">
                        <label for="serviceAddress">Service Address *</label>
                        <input type="text" id="serviceAddress" name="serviceAddress" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Cleaning Type *</label>
                    <div class="service-options">
                        <div class="service-option" data-service="basic">
                            <div>
                                <strong>Basic Cleaning - $80</strong>
                                <p>2-3 hours service, all rooms included</p>
                            </div>
                            <input type="radio" name="cleaningType" value="basic" required>
                        </div>
                        <div class="service-option" data-service="deep">
                            <div>
                                <strong>Deep Cleaning - $150</strong>
                                <p>4-6 hours service, detailed cleaning</p>
                            </div>
                            <input type="radio" name="cleaningType" value="deep" required>
                        </div>
                        <div class="service-option" data-service="move-in-out">
                            <div>
                                <strong>Move-in/out Cleaning - $200</strong>
                                <p>Complete cleaning including inside cabinets</p>
                            </div>
                            <input type="radio" name="cleaningType" value="move-in-out" required>
                        </div>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="preferredDate">Preferred Date *</label>
                        <input type="date" id="preferredDate" name="preferredDate" required>
                    </div>
                    <div class="form-group">
                        <label for="preferredTime">Preferred Time *</label>
                        <select id="preferredTime" name="preferredTime" required>
                            <option value="">Select Time</option>
                            <option value="morning">Morning (8:00 AM - 12:00 PM)</option>
                            <option value="afternoon">Afternoon (12:00 PM - 4:00 PM)</option>
                            <option value="evening">Evening (4:00 PM - 8:00 PM)</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="homeSize">Home Size</label>
                    <select id="homeSize" name="homeSize">
                        <option value="small">Small (1-2 bedrooms)</option>
                        <option value="medium">Medium (3-4 bedrooms)</option>
                        <option value="large">Large (5+ bedrooms)</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="specialRequests">Special Requests</label>
                    <textarea id="specialRequests" name="specialRequests" rows="3" placeholder="Any specific areas or requirements..."></textarea>
                </div>
                
                <div class="total-section">
                    <h3>Service Total: <span id="cleaningTotal">$0.00</span></h3>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
                    <button type="submit" class="btn-primary">Book Service</button>
                </div>
            </form>
        </div>
    `;
}

// Generate salon service modal
function generateSalonModal() {
    return `
        <div class="service-modal">
            <h2>FA2BEE Kids Salon</h2>
            <p>Professional grooming services for your little ones in a fun, child-friendly environment.</p>
            
            <form id="salonOrderForm" class="order-form">
                <div class="form-row">
                    <div class="form-group">
                        <label for="parentName">Parent/Guardian Name *</label>
                        <input type="text" id="parentName" name="parentName" required>
                    </div>
                    <div class="form-group">
                        <label for="parentPhone">Phone Number *</label>
                        <input type="tel" id="parentPhone" name="parentPhone" required>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="childName">Child's Name *</label>
                        <input type="text" id="childName" name="childName" required>
                    </div>
                    <div class="form-group">
                        <label for="childAge">Child's Age *</label>
                        <input type="number" id="childAge" name="childAge" min="1" max="17" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="parentEmail">Email Address</label>
                    <input type="email" id="parentEmail" name="parentEmail">
                </div>
                
                <div class="form-group">
                    <label>Service Package *</label>
                    <div class="service-options">
                        <div class="service-option" data-service="haircut">
                            <div>
                                <strong>Haircut Only - $25</strong>
                                <p>Professional haircut in child-friendly environment</p>
                            </div>
                            <input type="radio" name="salonPackage" value="haircut" required>
                        </div>
                        <div class="service-option" data-service="haircut-styling">
                            <div>
                                <strong>Haircut + Styling - $35</strong>
                                <p>Haircut with special occasion styling</p>
                            </div>
                            <input type="radio" name="salonPackage" value="haircut-styling" required>
                        </div>
                        <div class="service-option" data-service="complete-package">
                            <div>
                                <strong>Complete Package - $50</strong>
                                <p>Haircut, styling, nail care, and facial treatment</p>
                            </div>
                            <input type="radio" name="salonPackage" value="complete-package" required>
                        </div>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="appointmentDate">Preferred Date *</label>
                        <input type="date" id="appointmentDate" name="appointmentDate" required>
                    </div>
                    <div class="form-group">
                        <label for="appointmentTime">Preferred Time *</label>
                        <select id="appointmentTime" name="appointmentTime" required>
                            <option value="">Select Time</option>
                            <option value="9:00">9:00 AM</option>
                            <option value="10:00">10:00 AM</option>
                            <option value="11:00">11:00 AM</option>
                            <option value="12:00">12:00 PM</option>
                            <option value="1:00">1:00 PM</option>
                            <option value="2:00">2:00 PM</option>
                            <option value="3:00">3:00 PM</option>
                            <option value="4:00">4:00 PM</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="specialRequests">Special Requests or Allergies</label>
                    <textarea id="specialRequests" name="specialRequests" rows="3" placeholder="Any special requirements, allergies, or preferences..."></textarea>
                </div>
                
                <div class="total-section">
                    <h3>Service Total: <span id="salonTotal">$0.00</span></h3>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
                    <button type="submit" class="btn-primary">Book Appointment</button>
                </div>
            </form>
        </div>
    `;
}

// Setup modal event listeners
function setupModalEventListeners() {
    // Service option selection
    document.querySelectorAll('.service-option').forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            document.querySelectorAll('.service-option').forEach(opt => opt.classList.remove('selected'));
            // Add selected class to clicked option
            this.classList.add('selected');
            // Check the radio button
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
            }
            // Recalculate total
            calculateTotal();
        });
    });

    // Payment option selection
    document.querySelectorAll('.payment-option').forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all payment options
            document.querySelectorAll('.payment-option').forEach(opt => opt.classList.remove('selected'));
            // Add selected class to clicked option
            this.classList.add('selected');
            // Check the radio button
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
            }
        });
    });

    // Form submission
    const forms = document.querySelectorAll('.order-form');
    forms.forEach(form => {
        form.addEventListener('submit', handleOrderSubmission);
    });

    // Initialize all forms
    initializeLaundryForm();
    initializeCleaningForm();
    initializeSalonForm();
    
    // Re-initialize forms when navigating between pages
    window.addEventListener('pageshow', function() {
        initializeLaundryForm();
        initializeCleaningForm();
        initializeRealEstateForm();
    });

    // Quantity controls
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentNode.querySelector('.quantity-input');
            const change = this.textContent === '+' ? 1 : -1;
            const newValue = Math.max(0, parseInt(input.value) + change);
            input.value = newValue;
            calculateTotal();
        });
    });

    // Quantity input changes
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', calculateTotal);
    });

    // Radio button changes
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', function() {
            calculateTotal();
            // Also trigger specific form updates
            updateCleaningSummary();
            updateRealEstateSummary();
        });
    });

    // Checkbox changes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', calculateTotal);
    });

    // Select changes (for urgency and other dropdowns)
    document.querySelectorAll('select').forEach(select => {
        select.addEventListener('change', function() {
            calculateTotal();
            // Also trigger specific form updates
            updateCleaningSummary();
            updateRealEstateSummary();
        });
    });
    
    // Text input changes
    document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="number"], input[type="date"]').forEach(input => {
        input.addEventListener('input', function() {
            calculateTotal();
            updateCleaningSummary();
            updateRealEstateSummary();
        });
    });
    
    // Textarea changes
    document.querySelectorAll('textarea').forEach(textarea => {
        textarea.addEventListener('input', function() {
            calculateTotal();
            updateCleaningSummary();
            updateRealEstateSummary();
        });
    });
}

// Update quantity
function updateQuantity(itemType, change) {
    const input = document.getElementById(`qty-${itemType}`);
    const newValue = Math.max(0, parseInt(input.value) + change);
    input.value = newValue;
    
    // Determine which calculation function to call based on current page
    const laundryForm = document.getElementById('laundryOrderForm');
    const cleaningForm = document.getElementById('cleaningOrderForm');
    const realEstateForm = document.getElementById('realEstateOrderForm');
    
    if (laundryForm) {
        calculateLaundryTotal();
    } else if (cleaningForm) {
        updateCleaningSummary();
    } else if (salonForm) {
        updateRealEstateSummary();
    }
}

// Calculate total
function calculateTotal() {
    // Check which service form exists and is visible
    const laundryForm = document.getElementById('laundryOrderForm');
    const cleaningForm = document.getElementById('cleaningOrderForm');
    const realEstateForm = document.getElementById('realEstateOrderForm');
    
    // Use a more reliable method to check if form is visible
    const isFormVisible = (form) => {
        return form && form.offsetWidth > 0 && form.offsetHeight > 0 && !form.classList.contains('hidden');
    };
    
    if (isFormVisible(laundryForm)) {
        calculateLaundryTotal();
    }
    if (isFormVisible(cleaningForm)) {
        updateCleaningSummary();
    }
    if (isFormVisible(realEstateForm)) {
        updateRealEstateSummary();
    }
}

// Calculate laundry total
function calculateLaundryTotal() {
    let total = 0;
    
    // Get selected service types (checkboxes)
    const selectedServiceTypes = document.querySelectorAll('input[name="serviceType"]:checked');
    if (selectedServiceTypes.length === 0) {
        // Reset display if no service selected
        const totalElement = document.getElementById('orderTotal');
        const buttonTotal = document.getElementById('buttonTotal');
        if (totalElement) totalElement.textContent = 'D0';
        if (buttonTotal) buttonTotal.textContent = 'D0';
        return;
    }
    
    // Use the first selected service type for base price calculation
    const basePrice = pricing.laundry[selectedServiceTypes[0].value];
    
    // Calculate item costs
    laundryItems.forEach(item => {
        const quantity = parseInt(document.getElementById(`qty-${item.type}`).value) || 0;
        total += quantity * basePrice;
    });
    
    // Update items subtotal
    const itemsSubtotal = document.getElementById('itemsSubtotal');
    if (itemsSubtotal) {
        itemsSubtotal.textContent = `D${total.toFixed(0)}`;
    }
    
    // Add service handling fee if selected
    const serviceHandling = document.querySelector('input[name="serviceHandling"]:checked');
    const deliveryRow = document.getElementById('deliveryRow');
    const deliveryFee = document.getElementById('deliveryFee');

    if (serviceHandling) {
        const handlingType = serviceHandling.value;

        if (handlingType === 'self-service') {
            // No additional charge
            if (deliveryRow) deliveryRow.style.display = 'none';
        } else if (handlingType === 'pickup-delivery') {
            if (total >= 1000) {
                // Free pickup & delivery for orders over D1000
                if (deliveryRow) deliveryRow.style.display = 'none';
            } else {
                total += pricing.laundry['pickup-delivery'];
                if (deliveryRow) deliveryRow.style.display = 'flex';
                if (deliveryFee) deliveryFee.textContent = 'D100';
            }
        } else if (handlingType === 'pickup-only' || handlingType === 'delivery-only') {
            total += pricing.laundry[handlingType];
            if (deliveryRow) deliveryRow.style.display = 'flex';
            if (deliveryFee) deliveryFee.textContent = 'D50';
        }
    } else {
        if (deliveryRow) deliveryRow.style.display = 'none';
    }

    // Add urgency fee if selected
    const urgency = document.querySelector('#urgency');
    const urgencyRow = document.getElementById('urgencyRow');
    const urgencyFee = document.getElementById('urgencyFee');

    if (urgency && urgency.value) {
        if (urgency.value === 'urgent') {
            total += 200; // D200 for same day
            if (urgencyRow) urgencyRow.style.display = 'flex';
            if (urgencyFee) urgencyFee.textContent = 'D200';
        } else if (urgency.value === 'express') {
            total += 100; // D100 for next day
            if (urgencyRow) urgencyRow.style.display = 'flex';
            if (urgencyFee) urgencyFee.textContent = 'D100';
        } else {
            if (urgencyRow) urgencyRow.style.display = 'none';
        }
    } else {
        if (urgencyRow) urgencyRow.style.display = 'none';
    }
    
    // Update total display
    const totalElement = document.getElementById('orderTotal');
    const buttonTotal = document.getElementById('buttonTotal');
    
    if (totalElement) {
        totalElement.textContent = `D${total.toFixed(0)}`;
    }
    if (buttonTotal) {
        buttonTotal.textContent = `D${total.toFixed(0)}`;
    }
}

// Calculate cleaning total
function calculateCleaningTotal() {
    const cleaningType = document.querySelector('input[name="cleaningType"]:checked');
    if (!cleaningType) return;
    
    const total = pricing.cleaning[cleaningType.value];
    
    const totalElement = document.getElementById('cleaningTotal');
    if (totalElement) {
        totalElement.textContent = `$${total.toFixed(2)}`;
    }
}

// Calculate salon total
function calculateSalonTotal() {
    const salonPackage = document.querySelector('input[name="salonPackage"]:checked');
    if (!salonPackage) return;
    
    const total = pricing.salon[salonPackage.value];
    
    const totalElement = document.getElementById('salonTotal');
    if (totalElement) {
        totalElement.textContent = `$${total.toFixed(2)}`;
    }
}

// Handle order submission
function handleOrderSubmission(e) {
    e.preventDefault();
    console.log('handleOrderSubmission: Form submission started');
    console.log('handleOrderSubmission: Form element:', e.target);
    
    if (!validateForm(e.target)) {
        console.log('handleOrderSubmission: Form validation failed');
        return;
    }
    
    console.log('handleOrderSubmission: Form validation passed');
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading"></span> Processing...';
    submitBtn.disabled = true;
    
    // Simulate order processing
    setTimeout(() => {
        // Collect form data
        const formData = new FormData(e.target);
        const orderData = Object.fromEntries(formData.entries());
        console.log('handleOrderSubmission: Form data collected:', orderData);
        
        // Add calculated total
        const totalElement = document.getElementById('orderTotal');
        if (totalElement) {
            orderData.total = totalElement.textContent;
            console.log('handleOrderSubmission: Total added:', orderData.total);
        } else {
            console.log('handleOrderSubmission: No total element found');
        }
        
        // Add payment method info
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
        if (paymentMethod) {
            orderData.paymentMethod = paymentMethod.value;
            console.log('handleOrderSubmission: Payment method added:', orderData.paymentMethod);
        } else {
            console.log('handleOrderSubmission: No payment method selected');
        }
        
        // Add branch info (for laundry service)
        const selectedBranch = document.querySelector('input[name="branch"]:checked');
        if (selectedBranch) {
            orderData.branch = selectedBranch.value;
            console.log('handleOrderSubmission: Branch added:', orderData.branch);
        }
        
        // Add timestamp to order data
        orderData.timestamp = new Date().toISOString();
        
        console.log('Order submission: Processing order data:', orderData);
        
        // Store order in localStorage for admin dashboard
        storeOrder(orderData);
        
        console.log('Order submission: Order stored, now sending email...');
        
        // Send email to manager
        sendOrderEmail(orderData).then(() => {
            console.log('Order submission: Email sent successfully');
            // Show success message
            showOrderSuccessMessage(orderData);
            
            // Reset form
            e.target.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }).catch(() => {
            // Even if email fails, show success to user
            showOrderSuccessMessage(orderData);
            
            // Reset form
            e.target.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
        
    }, 2000);
}

// Show success message
function showSuccessMessage(orderData) {
    const modalContent = document.getElementById('modalContent');
    if (modalContent) {
        modalContent.innerHTML = `
            <div class="success-message">
                <div class="success-icon">✅</div>
                <h2>Order Placed Successfully!</h2>
                <p>Thank you for choosing FA2BEE! Your order has been received and we'll contact you shortly to confirm the details.</p>
                <div class="order-summary">
                    <h3>Order Summary:</h3>
                    <p><strong>Service:</strong> ${currentService.charAt(0).toUpperCase() + currentService.slice(1)}</p>
                    <p><strong>Total:</strong> ${orderData.total}</p>
                    <p><strong>Contact:</strong> ${orderData.customerName || orderData.parentName}</p>
                </div>
                <p class="contact-info">We'll contact you at ${orderData.customerPhone || orderData.parentPhone} to schedule your service.</p>
            </div>
        `;
    }
}

// Show order success message for service pages
function showOrderSuccessMessage(orderData) {
    // Create success overlay
    const successOverlay = document.createElement('div');
    successOverlay.className = 'success-overlay';
        // Determine service type for display
        let serviceName = 'Service';
        if (orderData.serviceType) {
            if (orderData.childName) {
                serviceName = 'Kids Salon';
            } else if (orderData.serviceAddress) {
                serviceName = 'Home Cleaning';
            } else {
                serviceName = 'Laundry Service';
            }
        }

        successOverlay.innerHTML = `
        <div class="success-modal">
            <div class="success-icon">✅</div>
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for choosing FA2BEE! Your order has been received and a confirmation email with your tracking details will be sent to ${orderData.customerEmail} shortly.</p>
            
            <div class="order-id-section">
                <h3>Your Order ID: <span class="order-id">${orderData.orderId}</span></h3>
                <p class="tracking-info">Use this ID to track your order status. Keep this number safe!</p>
            </div>
            
            <div class="order-summary">
                <h3>Order Summary:</h3>
                <p><strong>Service:</strong> ${serviceName}</p>
                <p><strong>Total:</strong> ${orderData.total}</p>
                <p><strong>Payment Method:</strong> ${getPaymentMethodName(orderData.paymentMethod)}</p>
                <p><strong>Contact:</strong> ${orderData.customerName}</p>
                <p><strong>Email:</strong> ${orderData.customerEmail}</p>
                ${orderData.childName ? `<p><strong>Child:</strong> ${orderData.childName} (Age: ${orderData.childAge})</p>` : ''}
                ${orderData.serviceAddress ? `<p><strong>Address:</strong> ${orderData.serviceAddress}</p>` : ''}
                ${orderData.pickupAddress ? `<p><strong>Pickup Address:</strong> ${orderData.pickupAddress}</p>` : ''}
                ${orderData.hasPets ? `<p><strong>Pets:</strong> ${orderData.hasPets === 'no' ? 'No pets' : orderData.hasPets}${orderData.petCount ? ` (${orderData.petCount})` : ''}</p>` : ''}
                ${orderData.preferredDate ? `<p><strong>Preferred Date:</strong> ${orderData.preferredDate}</p>` : ''}
                ${orderData.preferredTime ? `<p><strong>Preferred Time:</strong> ${orderData.preferredTime}</p>` : ''}
                ${orderData.urgency ? `<p><strong>Service Urgency:</strong> ${orderData.urgency}</p>` : ''}
            </div>

            <div class="payment-details">
                <h3>💳 Payment Information:</h3>
                ${getPaymentDetailsHTML(orderData.paymentMethod)}
            </div>

            <div class="order-tracking">
                <h3>Order Tracking:</h3>
                <div class="tracking-steps">
                    <div class="tracking-step active">
                        <div class="step-icon">📝</div>
                        <div class="step-text">
                            <strong>Order Received</strong>
                            <small>Your order has been placed successfully</small>
                        </div>
                    </div>
                    <div class="tracking-step">
                        <div class="step-icon">⏰</div>
                        <div class="step-text">
                            <strong>Processing</strong>
                            <small>We're preparing your service</small>
                        </div>
                    </div>
                    <div class="tracking-step">
                        <div class="step-icon">🚚</div>
                        <div class="step-text">
                            <strong>In Progress</strong>
                            <small>Service is being performed</small>
                        </div>
                    </div>
                    <div class="tracking-step">
                        <div class="step-icon">✅</div>
                        <div class="step-text">
                            <strong>Completed</strong>
                            <small>Your service is ready for delivery</small>
                        </div>
                    </div>
                </div>
            </div>

            <p class="contact-info">We'll also contact you at ${orderData.customerPhone} to schedule your service and provide updates.</p>
            <button class="close-success" onclick="closeSuccessMessage()">Close</button>
        </div>
    `;
    
    document.body.appendChild(successOverlay);
    
    // Auto close after 5 seconds
    setTimeout(() => {
        closeSuccessMessage();
    }, 5000);
}

// Get payment method display name
function getPaymentMethodName(method) {
    const methods = {
        'wave': 'Wave Mobile Money',
        'mobile-money': 'Mobile Money Transfer',
        'bank-transfer': 'Bank Transfer',
        'cash': 'Cash Payment'
    };
    return methods[method] || method;
}

// Get payment details text for email
function getPaymentDetailsText(paymentMethod) {
    const paymentDetails = {
        'wave': `Wave Payment Details:
Wave Number: +220 123 4567
Account Name: FA2BEE Services
Please send payment via Wave and include your order reference in the message.`,
        'mobile-money': `Mobile Money Transfer Details:
MTN Mobile Money: +220 123 4567
Orange Money: +220 987 6543
Account Name: FA2BEE Services
Please send payment via your preferred mobile money service and include your order reference.`,
        'bank-transfer': `Bank Transfer Details:
GTBank (Guaranty Trust Bank):
- Account Number: 1234567890
- Account Name: FA2BEE Services Ltd
- Sort Code: 123456

Ecobank:
- Account Number: 0987654321
- Account Name: FA2BEE Services Ltd
- Sort Code: 654321

Please include your order reference in the transfer description.`,
        'cash': `Cash Payment Details:
Payment Method: Pay in cash when service is delivered
Instructions: Our service provider will collect payment directly from you when they arrive for service delivery.
Please have the exact amount ready for payment upon service completion.`
    };
    
    return paymentDetails[paymentMethod] || 'Payment details will be provided separately.';
}

// Get payment details HTML for success message
function getPaymentDetailsHTML(paymentMethod) {
    const paymentDetails = {
        'wave': `
            <div class="payment-method">
                <h4>🌊 Wave Payment</h4>
                <p><strong>Wave Number:</strong> +220 123 4567</p>
                <p><strong>Account Name:</strong> FA2BEE Services</p>
                <p><em>Please send payment via Wave and include your order reference in the message.</em></p>
            </div>
        `,
        'mobile-money': `
            <div class="payment-method">
                <h4>📱 Mobile Money Transfer</h4>
                <p><strong>MTN Mobile Money:</strong> +220 123 4567</p>
                <p><strong>Orange Money:</strong> +220 987 6543</p>
                <p><strong>Account Name:</strong> FA2BEE Services</p>
                <p><em>Please send payment via your preferred mobile money service and include your order reference.</em></p>
            </div>
        `,
        'bank-transfer': `
            <div class="payment-method">
                <h4>Bank Transfer</h4>
                <div class="bank-accounts">
                    <div class="bank-account">
                        <h5>GTBank (Guaranty Trust Bank)</h5>
                        <p><strong>Account Number:</strong> 1234567890</p>
                        <p><strong>Account Name:</strong> FA2BEE Services Ltd</p>
                        <p><strong>Sort Code:</strong> 123456</p>
                    </div>
                    <div class="bank-account">
                        <h5>Ecobank</h5>
                        <p><strong>Account Number:</strong> 0987654321</p>
                        <p><strong>Account Name:</strong> FA2BEE Services Ltd</p>
                        <p><strong>Sort Code:</strong> 654321</p>
                    </div>
                </div>
                <p><em>Please include your order reference in the transfer description.</em></p>
            </div>
        `,
        'cash': `
            <div class="payment-method">
                <h4>💵 Cash Payment</h4>
                <p><strong>Payment Method:</strong> Pay in cash when service is delivered</p>
                <p><strong>Instructions:</strong> Our service provider will collect payment directly from you when they arrive for service delivery.</p>
                <p><em>Please have the exact amount ready for payment upon service completion.</em></p>
            </div>
        `
    };
    
    return paymentDetails[paymentMethod] || '<p>Payment details will be provided via email.</p>';
}

// Close success message
function closeSuccessMessage() {
    const successOverlay = document.querySelector('.success-overlay');
    if (successOverlay) {
        successOverlay.remove();
    }
}

// Close modal
function closeModal() {
    const modal = document.getElementById('serviceModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Setup pricing tabs
function setupPricingTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.pricing-tab');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('onclick').match(/'([^']+)'/)[1];
            
            // Remove active class from all buttons and tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked button and corresponding tab
            button.classList.add('active');
            document.getElementById(`${targetTab}-pricing`).classList.add('active');
        });
    });
}

// Show pricing tab
function showPricingTab(tabName) {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.pricing-tab');
    
    // Remove active class from all buttons and tabs
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(tab => tab.classList.remove('active'));
    
    // Add active class to selected button and tab
    document.querySelector(`[onclick="showPricingTab('${tabName}')"]`).classList.add('active');
    document.getElementById(`${tabName}-pricing`).classList.add('active');
}

// Handle contact form
function handleContactForm(e) {
    e.preventDefault();
    
    if (!validateForm(e.target)) {
        return;
    }
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.innerHTML = '<span class="loading"></span> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Show success message
        showMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
        
        // Reset form
        e.target.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
    }, 2000);
}

// Show message
function showMessage(message, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Insert message at the top of the contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.insertBefore(messageDiv, contactForm.firstChild);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// Initialize service modals
function initializeServiceModals() {
    // Close modal button
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
}

// Add smooth scrolling behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Add scroll effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
});

// Add CSS for additional styles
const additionalStyles = `
    .service-modal {
        max-width: 100%;
    }
    
    .item-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border: 1px solid #E5E7EB;
        border-radius: 10px;
        margin-bottom: 1rem;
    }
    
    .item-info {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    
    .item-name {
        font-weight: 600;
        color: var(--primary-black);
    }
    
    .item-price {
        font-size: 0.875rem;
        color: var(--medium-gray);
    }
    
    .form-actions {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
    }
    
    .btn-primary {
        background: var(--gradient-primary);
        color: white;
        border: none;
        padding: 12px 25px;
        border-radius: 10px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        flex: 1;
    }
    
    .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-medium);
    }
    
    .btn-secondary {
        background: white;
        color: var(--primary-purple);
        border: 2px solid var(--primary-purple);
        padding: 12px 25px;
        border-radius: 10px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        flex: 1;
    }
    
    .btn-secondary:hover {
        background: var(--primary-purple);
        color: white;
    }
    
    .success-message {
        text-align: center;
        padding: 2rem;
    }
    
    .success-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
    }
    
    .order-summary {
        background: var(--light-gray);
        padding: 1.5rem;
        border-radius: 10px;
        margin: 1.5rem 0;
        text-align: left;
    }
    
    .order-summary h3 {
        margin-bottom: 1rem;
        color: var(--primary-black);
    }
    
    .order-summary p {
        margin-bottom: 0.5rem;
        color: var(--dark-gray);
    }
    
    .contact-info {
        font-style: italic;
        color: var(--medium-gray);
        margin-top: 1rem;
    }
    
    .field-error {
        color: #EF4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }
    
    .order-id-section {
        background: var(--gradient-primary);
        color: var(--primary-white);
        padding: 1.5rem;
        border-radius: 12px;
        margin: 1.5rem 0;
        text-align: center;
    }
    
    .order-id-section h3 {
        margin: 0 0 0.5rem 0;
        font-size: 1.5rem;
        font-weight: 700;
    }
    
    .order-id {
        background: rgba(255, 255, 255, 0.2);
        padding: 0.5rem 1rem;
        border-radius: 8px;
        font-family: 'Courier New', monospace;
        font-weight: 700;
        font-size: 1.2rem;
        letter-spacing: 1px;
        display: inline-block;
        margin: 0.5rem 0;
    }
    
    .tracking-info {
        margin: 0.5rem 0 0 0;
        opacity: 0.9;
        font-size: 0.9rem;
    }
    
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
