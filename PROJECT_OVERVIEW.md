# 📋 FA2BEE Project Overview

## 🎯 Project Purpose
FA2BEE is a comprehensive service platform offering multiple services including laundry, home cleaning, and kids salon services with integrated GitHub OAuth authentication.

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   GitHub API    │
│   (Port 5500)   │◄──►│   (Port 3000)   │◄──►│   (OAuth)       │
│                 │    │                 │    │                 │
│ • HTML/CSS/JS   │    │ • Express.js    │    │ • User Auth     │
│ • User Interface│    │ • OAuth Handler │    │ • Profile Data  │
│ • Form Handling │    │ • API Routes    │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📁 Organized Folder Structure

### Backend (`/backend/`)
- **Purpose**: Handles GitHub OAuth authentication and API logic
- **Technology**: Node.js + Express.js
- **Port**: 3000
- **Key Files**:
  - `server.js` - Main Express server with OAuth routes
  - `package.json` - Dependencies and scripts
  - `README.md` - Backend-specific documentation

### Frontend (`/frontend/`)
- **Purpose**: User interface and service booking
- **Technology**: HTML5, CSS3, Vanilla JavaScript
- **Port**: 5500
- **Key Files**:
  - `index.html` - Homepage
  - `cleaning.html` - Cleaning service (with OAuth integration)
  - `laundry.html` - Laundry service
  - `salon.html` - Kids salon service
  - `admin.html` - Admin dashboard
  - `tracking.html` - Order tracking
  - `styles.css` - Main stylesheet
  - `script.js` - JavaScript functionality

## 🔄 Data Flow

### OAuth Authentication Flow
1. **User clicks "Login with GitHub"** → Frontend redirects to backend
2. **Backend redirects to GitHub** → User authorizes application
3. **GitHub redirects back** → Backend receives authorization code
4. **Backend exchanges code** → Gets access token from GitHub
5. **Backend fetches user data** → Gets profile from GitHub API
6. **User data returned** → Frontend displays authenticated user

### Service Booking Flow
1. **User selects service** → Navigates to service page
2. **User fills form** → JavaScript validates and calculates pricing
3. **Form submission** → Data stored in localStorage
4. **Email notification** → Manager receives order details
5. **Order tracking** → User can track order status

## 🛠️ Development Workflow

### Quick Start (Automated)
```bash
# Windows
start-dev.bat

# Linux/Mac
./start-dev.sh
```

### Manual Development
```bash
# Terminal 1: Backend
cd backend && npm start

# Terminal 2: Frontend
cd frontend && python -m http.server 5500
```

### Debug Mode
```bash
# Backend debugging
debug-backend.bat

# Frontend debugging
debug-frontend.bat
```

## 🔧 Key Features

### Authentication
- GitHub OAuth integration
- Secure client secret handling
- User profile display
- Session management

### Services
- **Laundry**: Washing, ironing, dry cleaning
- **Cleaning**: Basic, deep, move-in/out cleaning
- **Salon**: Kids grooming services

### Admin Features
- Order management dashboard
- Real-time order tracking
- Customer information display
- Status updates

### User Experience
- Mobile-responsive design
- Real-time pricing calculation
- Order tracking system
- Email notifications

## 🔒 Security Features

- Client secret protection (backend only)
- CORS configuration
- Input validation
- Error handling
- Secure OAuth flow

## 📊 Technology Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| Backend | Node.js + Express | OAuth server and API |
| Frontend | HTML5 + CSS3 + JS | User interface |
| Authentication | GitHub OAuth | User login |
| Notifications | EmailJS | Email alerts |
| Storage | localStorage | Order data |
| Styling | CSS3 + Gradients | Modern UI |

## 🚀 Deployment Considerations

### Backend Deployment
- Environment variables for production
- Update OAuth redirect URIs
- Configure CORS for production domain
- Set up SSL/HTTPS

### Frontend Deployment
- Update backend URLs for production
- Configure static hosting
- Update CORS origins
- Optimize for performance

## 🐛 Debugging Resources

- `DEBUGGING_GUIDE.md` - Comprehensive debugging guide
- `backend/README.md` - Backend-specific issues
- `frontend/README.md` - Frontend-specific issues
- Browser developer tools (F12)
- Backend console logs

## 📈 Future Enhancements

### Potential Additions
- Database integration (MongoDB/PostgreSQL)
- Payment gateway integration
- Real-time notifications
- Mobile app development
- Advanced admin analytics
- Multi-language support

### Scalability Considerations
- Microservices architecture
- Load balancing
- Database optimization
- Caching strategies
- CDN implementation

## 🎯 Success Metrics

### User Experience
- Page load times
- OAuth success rate
- Form completion rate
- Mobile responsiveness

### Business Metrics
- Order volume
- Service completion rate
- Customer satisfaction
- Revenue tracking

## 📞 Support & Maintenance

### Regular Maintenance
- Dependency updates
- Security patches
- Performance monitoring
- Backup procedures

### Monitoring
- Server health checks
- Error logging
- User feedback collection
- Performance metrics

---

**FA2BEE** - Professional services for your home and family in The Gambia 🇬🇲

*This organized structure makes debugging easier by separating concerns and providing clear documentation for each component.*
