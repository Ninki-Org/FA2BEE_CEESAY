# 🐛 FA2BEE Debugging Guide

This guide helps you debug issues in the FA2BEE project with the organized folder structure.

## 📁 Project Structure for Debugging

```
FA2BEE MULTIPLE SERVICE/
├── backend/           # 🔧 Backend Issues
│   ├── server.js     # OAuth server logic
│   ├── package.json  # Dependencies
│   └── README.md     # Backend docs
├── frontend/          # 🎨 Frontend Issues
│   ├── *.html        # Page issues
│   ├── styles.css    # Styling issues
│   ├── script.js     # JavaScript issues
│   └── README.md     # Frontend docs
└── DEBUGGING_GUIDE.md # This file
```

## 🔧 Backend Debugging

### Common Backend Issues

#### 1. Server Won't Start
**Location:** `backend/server.js`

**Check:**
```bash
cd backend
npm install  # Install dependencies
npm start    # Start server
```

**Debug Steps:**
- Check if port 3000 is available
- Verify Node.js version (v14+)
- Check `package.json` dependencies

#### 2. GitHub OAuth Not Working
**Location:** `backend/server.js`

**Check:**
```javascript
const GITHUB_CLIENT_SECRET = 'YOUR_CLIENT_SECRET_HERE'; // ← Update this
```

**Debug Steps:**
1. Verify client secret is correct
2. Check GitHub OAuth App callback URL: `http://localhost:3000/auth/callback`
3. Check browser console for CORS errors
4. Test OAuth flow step by step

#### 3. CORS Errors
**Location:** `backend/server.js`

**Check:**
```javascript
app.use(cors({
    origin: 'http://localhost:5500/frontend', // ← Should match frontend URL
    credentials: true
}));
```

**Debug Steps:**
1. Verify frontend URL matches CORS origin
2. Check if frontend is served from correct port
3. Clear browser cache

### Backend Debug Commands

```bash
# Check if backend is running
curl http://localhost:3000/health

# Test OAuth endpoint
curl http://localhost:3000/login

# Check backend logs
cd backend && npm start
```

## 🎨 Frontend Debugging

### Common Frontend Issues

#### 1. Pages Not Loading
**Location:** `frontend/` folder

**Check:**
- Frontend server is running on port 5500
- Files are in correct `frontend/` folder
- URLs point to correct paths

#### 2. Styling Issues
**Location:** `frontend/styles.css`

**Debug Steps:**
1. Check if `styles.css` is linked in HTML files
2. Verify CSS file path: `href="styles.css"`
3. Check browser developer tools for CSS errors

#### 3. JavaScript Errors
**Location:** `frontend/script.js`

**Debug Steps:**
1. Open browser developer tools (F12)
2. Check Console tab for JavaScript errors
3. Verify `script.js` is linked in HTML files

#### 4. GitHub OAuth Frontend Issues
**Location:** `frontend/cleaning.html`

**Check:**
- Login button redirects to: `http://localhost:3000/login`
- Backend server is running
- OAuth flow completes successfully

### Frontend Debug Commands

```bash
# Serve frontend
cd frontend
python -m http.server 5500

# Check if frontend loads
curl http://localhost:5500
```

## 🔄 Full Stack Debugging

### OAuth Flow Debugging

**Step-by-step verification:**

1. **Frontend → Backend**
   ```bash
   # Check if login button works
   # Should redirect to: http://localhost:3000/login
   ```

2. **Backend → GitHub**
   ```bash
   # Check backend logs for GitHub redirect
   # Should show: "Redirecting to GitHub OAuth"
   ```

3. **GitHub → Backend**
   ```bash
   # Check callback handling
   # Should show: "Received authorization code"
   ```

4. **Backend → Frontend**
   ```bash
   # Check user data return
   # Should redirect to: http://localhost:5500/frontend/cleaning.html?github_user=...
   ```

### Network Debugging

**Browser Developer Tools:**
1. Open F12 → Network tab
2. Try OAuth login
3. Check for failed requests
4. Look for CORS errors

**Common Network Issues:**
- 404 errors → Check file paths
- CORS errors → Check backend CORS config
- 500 errors → Check backend logs

## 🛠️ Debugging Tools

### Browser Developer Tools
- **F12** → Console (JavaScript errors)
- **F12** → Network (API calls)
- **F12** → Elements (HTML/CSS issues)

### Backend Logging
Add to `backend/server.js`:
```javascript
console.log('Debug:', { variable: value });
```

### Frontend Logging
Add to `frontend/script.js`:
```javascript
console.log('Debug:', variable);
```

## 📋 Debugging Checklist

### Before Starting Debugging
- [ ] Backend server running on port 3000
- [ ] Frontend server running on port 5500
- [ ] GitHub OAuth App configured correctly
- [ ] Client secret updated in backend

### Backend Issues
- [ ] Check server logs
- [ ] Verify dependencies installed
- [ ] Test API endpoints
- [ ] Check OAuth configuration

### Frontend Issues
- [ ] Check browser console
- [ ] Verify file paths
- [ ] Test in different browsers
- [ ] Check network requests

### OAuth Issues
- [ ] Verify GitHub OAuth App settings
- [ ] Check callback URL
- [ ] Test OAuth flow step by step
- [ ] Check CORS configuration

## 🚨 Common Error Messages

### "Cannot GET /"
- Frontend server not running
- Wrong port or URL

### "CORS error"
- Backend CORS origin doesn't match frontend URL
- Check `backend/server.js` CORS configuration

### "No authorization code received"
- GitHub OAuth App callback URL incorrect
- Should be: `http://localhost:3000/auth/callback`

### "Token exchange failed"
- GitHub OAuth client secret incorrect
- Check `backend/server.js` configuration

## 📞 Getting Help

1. **Check logs first** - Backend and browser console
2. **Verify configuration** - OAuth settings and file paths
3. **Test step by step** - OAuth flow, API endpoints
4. **Check documentation** - README files in each folder

## 🔧 Quick Fixes

### Restart Everything
```bash
# Stop all servers (Ctrl+C)
# Then restart:
start-dev.bat  # Windows
./start-dev.sh # Linux/Mac
```

### Clear Browser Cache
- Hard refresh: Ctrl+F5
- Clear browser data
- Try incognito/private mode

### Reinstall Dependencies
```bash
cd backend
rm -rf node_modules
npm install
```

Remember: Most issues are configuration-related. Double-check your GitHub OAuth App settings and file paths!
