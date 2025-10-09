# Customer Email Templates for FA2BEE

## Overview
This file contains the email templates needed for the automated customer confirmation system with order tracking IDs and payment details.

## Template 1: Manager Notification Email

**Template Name:** Manager Order Notification  
**Subject:** New FA2BEE Order - {{service_type}} - {{order_id}}

**Template Body:**
```
Dear Manager,

A new order has been placed through the FA2BEE website:

**Order Details:**
- Order ID: {{order_id}}
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

## Template 2: Customer Confirmation Email

**Template Name:** Customer Order Confirmation  
**Subject:** FA2BEE Order Confirmation - {{order_id}}

**Template Body:**
```
Dear {{customer_name}},

Thank you for choosing FA2BEE! Your order has been received and confirmed.

**Your Order Details:**
- Order ID: {{order_id}} (Keep this for tracking!)
- Service Type: {{service_type}}
- Total Amount: {{total_amount}}
- Payment Method: {{payment_method}}

**Appointment Details:**
- Preferred Date: {{preferred_date}}
- Preferred Time: {{preferred_time}}
- Urgency: {{urgency}}

**Service Address:**
{{pickup_address}}

**Special Instructions:**
{{special_instructions}}

**💳 Payment Information:**
{{payment_details}}

**Contact Information:**
- Phone: +220 XXX-XXXX
- Email: info@fa2bee.com

**🔍 Order Tracking:**
You can track your order status using your Order ID: {{order_id}}
Visit our website or contact us for updates.

**Next Steps:**
1. We will contact you within 24 hours to confirm your appointment
2. Please have your payment ready as per the method selected
3. Keep your Order ID safe for tracking purposes

Thank you for choosing FA2BEE for your service needs!

Best regards,
FA2BEE Team
```

## EmailJS Configuration Variables

The following variables are available for both templates:

### Order Information
- `{{order_id}}` - Unique order tracking ID (e.g., FA2BEE-0001)
- `{{service_type}}` - Type of service (Laundry/Cleaning/Salon)
- `{{total_amount}}` - Order total amount
- `{{payment_method}}` - Selected payment method
- `{{payment_details}}` - Detailed payment instructions

### Customer Information
- `{{customer_name}}` - Customer's full name
- `{{customer_phone}}` - Customer's phone number
- `{{customer_email}}` - Customer's email address

### Service Details
- `{{preferred_date}}` - Preferred service date
- `{{preferred_time}}` - Preferred service time
- `{{urgency}}` - Service urgency level
- `{{special_instructions}}` - Special instructions
- `{{pickup_address}}` - Pickup/service address

### Service-Specific Information
- `{{child_name}}` - Child's name (for salon)
- `{{child_age}}` - Child's age (for salon)
- `{{pet_info}}` - Pet information (for cleaning)
- `{{order_details}}` - Service-specific details

### System Information
- `{{order_timestamp}}` - When the order was placed

## Setup Instructions

1. Create both templates in your EmailJS dashboard
2. Note down the Template IDs for each
3. Update the `EMAILJS_CONFIG` in `script.js` with:
   - `managerTemplateId` - for manager notifications
   - `customerTemplateId` - for customer confirmations
4. Test both email types to ensure they work correctly

## Current Status

The system is currently using console logging as a fallback. Once EmailJS is properly configured with these templates, customers will receive automated confirmation emails with their order IDs and payment details.



