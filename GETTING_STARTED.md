# 🚀 Getting Started with FA2BEE

## 📋 Quick Setup Checklist

### ✅ Prerequisites
- [ ] Node.js (v14 or higher) installed
- [ ] Python installed (for frontend server)
- [ ] GitHub OAuth App created
- [ ] GitHub OAuth App client secret obtained

### ✅ GitHub OAuth Setup
1. Go to GitHub → Settings → Developer settings → OAuth Apps
2. Create new OAuth App with:
   - **Authorization callback URL**: `http://localhost:3000/auth/callback`
   - **Homepage URL**: `http://localhost:5500/frontend`
3. Copy Client ID and Client Secret

### ✅ Project Setup
1. **Configure Backend**
   ```bash
   cd backend
   # Edit server.js - replace YOUR_CLIENT_SECRET_HERE with actual secret
   npm install
   ```

2. **Start Development Servers**
   ```bash
   # Option 1: Automated (Recommended)
   start-dev.bat        # Windows
   ./start-dev.sh       # Linux/Mac
   
   # Option 2: Manual
   # Terminal 1:
   cd backend && npm start
   # Terminal 2:
   cd frontend && python -m http.server 5500
   ```

### ✅ Test the Application
1. Open browser: `http://localhost:5500`
2. Navigate to Cleaning page: `http://localhost:5500/cleaning.html`
3. Click "Login with GitHub"
4. Complete GitHub authorization
5. Verify user profile appears

## 🏗️ Project Structure

```
FA2BEE MULTIPLE SERVICE/
├── backend/                    # 🔧 Backend Server
│   ├── server.js              # OAuth server (Port 3000)
│   ├── package.json           # Dependencies
│   └── README.md              # Backend docs
├── frontend/                   # 🎨 Frontend App
│   ├── *.html                 # Service pages
│   ├── styles.css             # Styling
│   ├── script.js              # JavaScript
│   └── README.md              # Frontend docs
├── start-dev.bat              # 🚀 Auto-start (Windows)
├── start-dev.sh               # 🚀 Auto-start (Linux/Mac)
├── debug-backend.bat          # 🐛 Backend debugging
├── debug-frontend.bat         # 🐛 Frontend debugging
├── DEBUGGING_GUIDE.md         # 🐛 Debug help
├── PROJECT_OVERVIEW.md        # 📋 Architecture overview
└── README.md                  # 📖 Main documentation
```

## 🔧 Development Commands

### Start Development
```bash
# Windows
start-dev.bat

# Linux/Mac
./start-dev.sh
```

### Debug Individual Components
```bash
# Backend only
debug-backend.bat

# Frontend only
debug-frontend.bat
```

### Manual Commands
```bash
# Backend
cd backend
npm install
npm start

# Frontend
cd frontend
python -m http.server 5500
```

## 🌐 Access Points

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:5500 | Main website |
| Backend | http://localhost:3000 | OAuth server |
| Health Check | http://localhost:3000/health | Backend status |
| OAuth Login | http://localhost:3000/login | Start OAuth flow |
| Cleaning Page | http://localhost:5500/cleaning.html | OAuth integration |

## 🐛 Common Issues & Solutions

### Backend Won't Start
```bash
cd backend
npm install  # Install dependencies
npm start    # Start server
```

### Frontend Won't Load
```bash
cd frontend
python -m http.server 5500
# OR use Live Server extension in VS Code
```

### OAuth Not Working
1. Check GitHub OAuth App callback URL: `http://localhost:3000/auth/callback`
2. Verify client secret in `backend/server.js`
3. Check browser console for errors

### CORS Errors
- Verify backend CORS origin matches frontend URL
- Check `backend/server.js` CORS configuration

## 📚 Documentation

| File | Purpose |
|------|---------|
| `README.md` | Main project documentation |
| `PROJECT_OVERVIEW.md` | Architecture and features |
| `DEBUGGING_GUIDE.md` | Comprehensive debugging help |
| `backend/README.md` | Backend-specific setup |
| `frontend/README.md` | Frontend-specific setup |
| `frontend/GITHUB_OAUTH_SETUP.md` | OAuth configuration guide |

## 🔄 Workflow

### Development Workflow
1. **Start servers** using `start-dev.bat` or `start-dev.sh`
2. **Make changes** to frontend or backend files
3. **Test changes** in browser
4. **Debug issues** using provided debugging tools
5. **Check logs** in terminal and browser console

### Debugging Workflow
1. **Identify issue** (frontend/backend/OAuth)
2. **Check relevant logs** (browser console/terminal)
3. **Refer to debugging guide** (`DEBUGGING_GUIDE.md`)
4. **Test step by step** using debug scripts
5. **Verify configuration** (OAuth settings, file paths)

## 🎯 Next Steps

### After Setup
1. **Test all services** (laundry, cleaning, salon)
2. **Verify OAuth flow** works correctly
3. **Check admin dashboard** functionality
4. **Test order tracking** system
5. **Configure EmailJS** for notifications

### For Production
1. **Update URLs** to production domains
2. **Set environment variables** for secrets
3. **Configure SSL/HTTPS**
4. **Set up proper hosting** for both frontend and backend

---

**🎉 You're ready to develop with FA2BEE!**

The organized folder structure makes it easy to:
- **Debug issues** by separating frontend and backend concerns
- **Maintain code** with clear documentation
- **Scale the project** with modular architecture
- **Collaborate** with team members on specific components

Happy coding! 🚀
