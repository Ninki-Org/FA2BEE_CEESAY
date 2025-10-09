# 🚀 EMAILJS SETUP GUIDE - FA2BEE EMAIL SYSTEM

## ❌ **CURRENT PROBLEM**
Your website is **NOT sending emails** because EmailJS is not properly configured. The current configuration uses placeholder values.

## ✅ **SOLUTION: Complete EmailJS Setup**

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Create Email Service
1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose **Gmail** (recommended) or your preferred email provider
4. Connect your Gmail account that will send emails
5. Note down your **Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Templates
Create **TWO** email templates:

#### Template 1: Manager Notification Email
1. Go to **Email Templates**
2. Click **Create New Template**
3. Set Template ID: `template_fa2bee_orders`
4. Set Subject: `New Order Received - {{order_id}}`
5. Set Content:

```html
Dear FA2BEE Manager,

You have received a new order:

ORDER DETAILS:
- Order ID: {{order_id}}
- Service Type: {{service_type}}
- Customer Name: {{customer_name}}
- Customer Phone: {{customer_phone}}
- Customer Email: {{customer_email}}
- Total Amount: {{total_amount}}
- Payment Method: {{payment_method}}
- Preferred Date: {{preferred_date}}
- Preferred Time: {{preferred_time}}
- Urgency: {{urgency}}
- Special Instructions: {{special_instructions}}
- Address: {{address}}
{{#if child_name}}
- Child Name: {{child_name}}
- Child Age: {{child_age}}
{{/if}}
{{#if pet_info}}
- Pet Information: {{pet_info}}
{{/if}}
- Order Time: {{order_timestamp}}

Please check your admin dashboard: {{admin_link}}

Best regards,
FA2BEE Website
```

#### Template 2: Customer Confirmation Email
1. Create another template
2. Set Template ID: `template_customer_confirmation`
3. Set Subject: `Order Confirmation - {{order_id}}`
4. Set Content:

```html
Dear {{customer_name}},

Thank you for choosing FA2BEE! Your order has been confirmed.

ORDER DETAILS:
- Order ID: {{order_id}}
- Service Type: {{service_type}}
- Total Amount: {{total_amount}}
- Payment Method: {{payment_method}}
- Preferred Date: {{preferred_date}}
- Preferred Time: {{preferred_time}}
- Urgency: {{urgency}}
- Special Instructions: {{special_instructions}}
- Address: {{address}}
{{#if child_name}}
- Child Name: {{child_name}}
- Child Age: {{child_age}}
{{/if}}
{{#if pet_info}}
- Pet Information: {{pet_info}}
{{/if}}
- Order Time: {{order_timestamp}}

PAYMENT DETAILS:
{{payment_details}}

You can track your order using this link: {{tracking_link}}

We'll contact you soon to confirm the details and schedule your service.

Best regards,
FA2BEE Team
```

### Step 4: Get Your Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key** (looks like: `user_abc123def456`)

### Step 5: Update Your Code
1. Open `frontend/script.js`
2. Find the `EMAILJS_CONFIG` object (around line 509)
3. Replace `YOUR_EMAILJS_PUBLIC_KEY` with your actual public key:

```javascript
const EMAILJS_CONFIG = {
    serviceId: 'YOUR_SERVICE_ID',        // Replace with your service ID
    templateId: 'template_fa2bee_orders', // Keep this
    publicKey: 'YOUR_ACTUAL_PUBLIC_KEY'  // Replace with your public key
};
```

### Step 6: Test the Setup
1. Restart your backend server
2. Go to your website
3. Fill out an order form
4. Submit the order
5. Check your email (paalieunjie22@gmail.com) for the notification
6. Check the customer's email for the confirmation

## 🔧 **TROUBLESHOOTING**

### If emails still don't work:
1. Check browser console for errors
2. Verify your EmailJS public key is correct
3. Make sure your email service is connected
4. Check that template IDs match exactly
5. Ensure your Gmail account allows "Less secure apps" or use App Passwords

### Common Issues:
- **"EmailJS not configured"** → Public key is still placeholder
- **"Service not found"** → Service ID is incorrect
- **"Template not found"** → Template ID doesn't match
- **"Authentication failed"** → Email service not properly connected

## **EMAIL ADDRESSES**
- **Manager Email**: paalieunjie22@gmail.com (receives order notifications)
- **Customer Email**: Uses the email they provide in the form (receives confirmations)

## **EXPECTED RESULT**
After setup, when someone submits an order:
1. ✅ Order is stored locally
2. ✅ Manager gets email notification at paalieunjie22@gmail.com
3. ✅ Customer gets confirmation email (if they provided email)
4. ✅ Success message shows to user

---

**Need Help?** Check the EmailJS documentation or contact support if you encounter issues.


