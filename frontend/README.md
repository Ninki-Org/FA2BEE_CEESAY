# FA2BEE Frontend - Web Application

This is the frontend web application for FA2BEE services including laundry, cleaning, and kids salon services.

## Quick Start

### 1. Serve the Frontend
Since this is a static website, you can serve it using any static file server:

**Option 1: Using Live Server (VS Code Extension)**
- Install Live Server extension in VS Code
- Right-click on `index.html` and select "Open with Live Server"
- The site will open at `http://localhost:5500`

**Option 2: Using Python**
```bash
# Python 3
python -m http.server 5500

# Python 2
python -m SimpleHTTPServer 5500
```

**Option 3: Using Node.js http-server**
```bash
npx http-server -p 5500
```

### 2. Access the Application
Open your browser and go to `http://localhost:5500`

## Project Structure

```
frontend/
├── index.html                    # Homepage
├── cleaning.html                 # Cleaning service page (with GitHub OAuth)
├── laundry.html                  # Laundry service page
├── salon.html                    # Kids salon page
├── admin.html                    # Admin dashboard
├── tracking.html                 # Order tracking page
├── styles.css                    # Main stylesheet
├── script.js                     # Main JavaScript functionality
├── GITHUB_OAUTH_SETUP.md         # OAuth setup guide
├── emailjs-setup.md              # EmailJS configuration
├── emailjs-setup-instructions.md # EmailJS setup instructions
├── email-templates-guide.md      # Email templates guide
├── customer-email-templates.md   # Customer email templates
└── README.md                     # This file
```

## Features

### Services
- **Laundry Service**: Professional laundry and dry cleaning with pickup/delivery
- **Home Cleaning**: Residential and commercial cleaning services
- **Kids Salon**: Professional grooming services for children

### GitHub OAuth Integration
- Login with GitHub functionality on the cleaning page
- Secure authentication flow
- User profile display after login

### Admin Dashboard
- Order management system
- Real-time order tracking
- Customer information display

### Order Tracking
- Track orders using order ID
- Status updates and history
- Customer notifications

## Development

### File Structure
- **HTML Files**: Individual service pages and admin interface
- **CSS**: Responsive design with modern styling
- **JavaScript**: Interactive features, form handling, and OAuth integration

### Key JavaScript Functions
- Form validation and submission
- Order calculation and pricing
- GitHub OAuth handling
- EmailJS integration for notifications

## Integration with Backend

The frontend integrates with the GitHub OAuth backend running on `http://localhost:3000`:

- Login button redirects to backend OAuth endpoint
- Backend handles GitHub authentication
- User data is returned and displayed in the frontend

## Configuration

### EmailJS Setup
Follow the instructions in `emailjs-setup.md` to configure email notifications.

### GitHub OAuth
See `GITHUB_OAUTH_SETUP.md` for complete OAuth integration setup.

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Progressive Web App features

## Troubleshooting

### Common Issues
1. **OAuth not working**: Ensure backend server is running on port 3000
2. **Styling issues**: Check that `styles.css` is properly linked
3. **JavaScript errors**: Check browser console for error messages
4. **Forms not submitting**: Verify EmailJS configuration

### Debug Mode
Open browser developer tools (F12) to see console logs and debug information.