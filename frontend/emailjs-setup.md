# EmailJS Setup Guide for FA2BEE Website

## Overview
The FA2BEE website is configured to send order emails to the manager's email address (paalieunjie22@gmail.com) using EmailJS.

## Setup Steps

### 1. Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account
3. Verify your email address

### 2. Create Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Follow the setup instructions
5. Note down your **Service ID**

### 3. Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template content:

```
Subject: New FA2BEE Order - {{service_type}}

Dear Manager,

A new order has been placed through the FA2BEE website:

**Order Details:**
- Service Type: {{service_type}}
- Customer Name: {{customer_name}}
- Customer Phone: {{customer_phone}}
- Customer Email: {{customer_email}}
- Total Amount: {{total_amount}}
- Payment Method: {{payment_method}}

**Appointment Details:**
- Preferred Date: {{preferred_date}}
- Preferred Time: {{preferred_time}}
- Urgency: {{urgency}}

**Service Specifics:**
{{order_details}}

**Address:**
{{pickup_address}}

**Special Instructions:**
{{special_instructions}}

**Child Information (if applicable):**
- Child Name: {{child_name}}
- Child Age: {{child_age}}

**Pet Information (if applicable):**
- Pet Details: {{pet_info}}

**Order Timestamp:** {{order_timestamp}}

Please contact the customer to confirm the order details and schedule the service.

Best regards,
FA2BEE Website System
```

4. Note down your **Template ID**

### 4. Get Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key**

### 5. Update Configuration
1. Open `script.js`
2. Find the `EMAILJS_CONFIG` object
3. Replace the placeholder values:

```javascript
const EMAILJS_CONFIG = {
    serviceId: 'your_actual_service_id_here',
    templateId: 'your_actual_template_id_here',
    publicKey: 'your_actual_public_key_here'
};
```

### 6. Test the Setup
1. Open the website
2. Fill out an order form
3. Submit the order
4. Check if you receive the email at paalieunjie22@gmail.com

## Email Template Variables
The following variables are available in the email template:
- `{{to_email}}` - Manager's email
- `{{from_name}}` - Customer name
- `{{from_email}}` - Customer email
- `{{service_type}}` - Type of service (Laundry/Cleaning/Salon)
- `{{customer_name}}` - Customer's full name
- `{{customer_phone}}` - Customer's phone number
- `{{customer_email}}` - Customer's email
- `{{total_amount}}` - Order total amount
- `{{payment_method}}` - Selected payment method
- `{{order_details}}` - Service-specific details
- `{{preferred_date}}` - Preferred service date
- `{{preferred_time}}` - Preferred service time
- `{{urgency}}` - Service urgency level
- `{{special_instructions}}` - Special instructions
- `{{pickup_address}}` - Pickup/service address
- `{{child_name}}` - Child's name (for salon)
- `{{child_age}}` - Child's age (for salon)
- `{{pet_info}}` - Pet information (for cleaning)
- `{{order_timestamp}}` - When the order was placed

## Troubleshooting
- If emails don't send, check the browser console for error messages
- Ensure all EmailJS configuration values are correct
- Verify the email service is properly connected
- Check that the template ID matches exactly

## Fallback
If EmailJS fails to load, the order details will be logged to the browser console as a backup.

