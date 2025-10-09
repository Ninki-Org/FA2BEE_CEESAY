# EmailJS Setup Instructions for FA2BEE Website

## Current Status
The website is currently using a fallback method that logs order details to the browser console and stores orders in localStorage for the admin portal. To enable real email sending, follow these steps:

## Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account
3. Verify your email address

## Step 2: Create Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose Gmail (recommended)
4. Follow the setup instructions to connect your Gmail account
5. Note down your **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template content:

**Subject:** New FA2BEE Order - {{service_type}}

**Template Body:**
```
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

4. Note down your **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key** (e.g., `abc123def456`)

## Step 5: Update Configuration
1. Open `script.js`
2. Find the `EMAILJS_CONFIG` object (around line 400)
3. Replace the placeholder values with your actual credentials:

```javascript
const EMAILJS_CONFIG = {
    serviceId: 'your_actual_service_id_here',     // e.g., 'service_abc123'
    templateId: 'your_actual_template_id_here',   // e.g., 'template_xyz789'
    publicKey: 'your_actual_public_key_here'      // e.g., 'abc123def456'
};
```

## Step 6: Test the Setup
1. Open the website
2. Fill out an order form
3. Submit the order
4. Check if you receive the email at paalieunjie22@gmail.com
5. Check the admin portal (admin.html) to see the order

## Troubleshooting
- If emails don't send, check the browser console for error messages
- Ensure all EmailJS configuration values are correct
- Verify the email service is properly connected
- Check that the template ID matches exactly
- Make sure the manager email (paalieunjie22@gmail.com) is correct

## Current Fallback
Until EmailJS is properly configured, orders are:
1. Stored in localStorage (visible in admin portal)
2. Logged to browser console with full details
3. Displayed to user with success message

The admin portal will show all orders regardless of email configuration.