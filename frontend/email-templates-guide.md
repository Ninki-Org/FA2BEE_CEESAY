# FA2BEE Email Templates Setup Guide

## Overview
The website now sends automatic emails to both the manager and customers when orders are placed. You need to set up two email templates in EmailJS.

## Required Email Templates

### 1. Manager Notification Template
- **Template ID:** Use your existing template (already configured)
- **Purpose:** Notifies manager about new orders
- **Recipient:** Manager email (paalieunjie22@gmail.com)

### 2. Customer Confirmation Template
- **Template ID:** `customer_confirmation` (NEW - needs to be created)
- **Purpose:** Sends payment details to customer
- **Recipient:** Customer's email

## Customer Confirmation Template Content

Create a new template in EmailJS with this content:

**Subject:** Order Confirmation - FA2BEE Services

**Body:**
```
Dear {{customer_name}},

Thank you for choosing FA2BEE Services! Your order has been confirmed.

ORDER DETAILS:
Service: {{service_type}}
Total Amount: {{total_amount}}
Payment Method: {{payment_method}}
Order Date: {{order_timestamp}}

{{payment_details}}

SERVICE DETAILS:
{{order_details}}

APPOINTMENT:
Preferred Date: {{preferred_date}}
Preferred Time: {{preferred_time}}
Urgency: {{urgency}}

{{#if child_name}}
CHILD DETAILS:
Child Name: {{child_name}}
Child Age: {{child_age}}
{{/if}}

{{#if pickup_address}}
SERVICE ADDRESS:
{{pickup_address}}
{{/if}}

{{#if special_instructions}}
SPECIAL INSTRUCTIONS:
{{special_instructions}}
{{/if}}

We will contact you shortly to confirm your appointment and provide any additional details.

Thank you for choosing FA2BEE Services!

Best regards,
FA2BEE Team
```

## Payment Details Variables

The template uses these payment detail variables:
- `{{payment_details}}` - Contains specific payment instructions based on chosen method
- `{{payment_method}}` - Shows the selected payment method name

## Setup Steps

1. Log into your EmailJS account
2. Go to Email Templates
3. Create a new template with ID: `customer_confirmation`
4. Copy the template content above
5. Save the template
6. Test by placing an order

## Payment Methods Supported

- **Wave Payment** - Shows Wave number and instructions
- **Mobile Money Transfer** - Shows MTN/Orange Money numbers
- **Bank Transfer** - Shows GTBank and Ecobank details
- **Cash Payment** - Shows cash payment instructions

## Notes

- Both manager and customer emails are sent automatically
- Payment details are customized based on selected payment method
- All emails include order tracking information
- Customer emails are sent to the email address provided in the order form

