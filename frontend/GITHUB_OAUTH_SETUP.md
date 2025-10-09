# GitHub OAuth Setup Instructions

This guide will help you set up and run the GitHub OAuth backend for your FA2BEE web application.

## Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)
- Your GitHub OAuth App credentials

## Quick Setup

### 1. Install Dependencies

```bash
npm install
```

This will install the required packages:
- `express` - Web framework
- `axios` - HTTP client for API requests
- `cors` - Cross-Origin Resource Sharing middleware

### 2. Configure GitHub Client Secret

1. Open `backend/server.js`
2. Find this line:
   ```javascript
   const GITHUB_CLIENT_SECRET = 'YOUR_CLIENT_SECRET_HERE';
   ```
3. Replace `'YOUR_CLIENT_SECRET_HERE'` with your actual GitHub OAuth App client secret

### 3. Start the Server

```bash
cd backend
npm start
```

The server will start on `http://localhost:3000`

For development with auto-restart:
```bash
cd backend
npm run dev
```

## API Endpoints

### GET `/login`
Initiates GitHub OAuth flow. Redirects user to GitHub for authentication.

### GET `/auth/callback`
GitHub OAuth callback endpoint. Handles the authorization code and exchanges it for user data.

### GET `/health`
Health check endpoint to verify server status.

### GET `/`
Root endpoint with basic information about the API.

## How It Works

1. **User clicks login** → Frontend redirects to `http://localhost:3000/login`
2. **Backend redirects to GitHub** → User authorizes your app on GitHub
3. **GitHub redirects back** → GitHub sends user back to `/auth/callback` with authorization code
4. **Backend exchanges code** → Backend exchanges code for access token using your client secret
5. **Backend fetches user data** → Backend uses access token to get user profile from GitHub API
6. **User data returned** → Backend redirects back to frontend with user information

## Security Features

- ✅ Client secret stays on backend only (never exposed to frontend)
- ✅ CORS configured to only allow requests from `http://localhost:5500`
- ✅ Error handling for all OAuth flow steps
- ✅ Proper HTTP status codes and error messages

## Testing the OAuth Flow

1. Start the backend server: `npm start`
2. Open your browser and go to: `http://localhost:3000/login`
3. You should be redirected to GitHub for authorization
4. After authorizing, you'll be redirected back to your frontend with user data

## Frontend Integration

The backend redirects users back to your frontend with user data in the URL parameters:

**Success case:**
```
http://localhost:5500/frontend/cleaning.html?github_user={"id":12345,"username":"johndoe","name":"John Doe",...}
```

**Error case:**
```
http://localhost:5500/frontend/cleaning.html?oauth_error=Access denied by user
```

## Frontend JavaScript Example

Add this to your `frontend/cleaning.html` to handle the OAuth response:

```javascript
// Check for GitHub user data in URL parameters
function handleGitHubAuth() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Check for successful authentication
    const githubUserParam = urlParams.get('github_user');
    if (githubUserParam) {
        try {
            const githubUser = JSON.parse(decodeURIComponent(githubUserParam));
            console.log('GitHub user authenticated:', githubUser);
            
            // Update UI to show logged-in user
            showLoggedInUser(githubUser);
            
            // Clear URL parameters
            window.history.replaceState({}, document.title, window.location.pathname);
            
        } catch (error) {
            console.error('Error parsing GitHub user data:', error);
        }
    }
    
    // Check for authentication error
    const oauthError = urlParams.get('oauth_error');
    if (oauthError) {
        console.error('GitHub OAuth error:', oauthError);
        alert('GitHub authentication failed: ' + oauthError);
        
        // Clear URL parameters
        window.history.replaceState({}, document.title, window.location.pathname);
    }
}

function showLoggedInUser(user) {
    // Example: Update UI to show user is logged in
    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
        loginButton.innerHTML = `
            <img src="${user.avatar_url}" alt="${user.name}" style="width: 20px; height: 20px; border-radius: 50%; margin-right: 8px;">
            ${user.name}
        `;
        loginButton.onclick = null; // Disable login functionality
    }
}

// Add login button to your HTML
function addLoginButton() {
    const loginButton = document.createElement('button');
    loginButton.id = 'loginButton';
    loginButton.textContent = 'Login with GitHub';
    loginButton.onclick = () => {
        window.location.href = 'http://localhost:3000/login';
    };
    
    // Add button to your navigation or desired location
    const nav = document.querySelector('.nav-menu');
    if (nav) {
        nav.appendChild(loginButton);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    handleGitHubAuth();
    addLoginButton();
});
```

## Troubleshooting

### Common Issues

1. **"No authorization code received"**
   - Check that your GitHub OAuth App callback URL is set to `http://localhost:3000/auth/callback`

2. **"Token exchange failed"**
   - Verify your client secret is correct in `backend/server.js`
   - Ensure your GitHub OAuth App is not suspended

3. **CORS errors**
   - Make sure your frontend is running on `http://localhost:5500`
   - Check that the CORS origin in `backend/server.js` matches your frontend URL

4. **"Failed to fetch user profile"**
   - Check your internet connection
   - Verify GitHub API is accessible

### Debug Mode

Add this to your `backend/server.js` for more detailed logging:

```javascript
// Add this at the top of your backend/server.js
process.env.DEBUG = 'oauth:*';
```

## Production Deployment

For production deployment:

1. **Update URLs**: Change `localhost` URLs to your production domain
2. **Environment Variables**: Use environment variables for sensitive data:
   ```javascript
   const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
   ```
3. **HTTPS**: Ensure your production site uses HTTPS
4. **Security Headers**: Add security middleware for production

## Support

If you encounter any issues:

1. Check the server console logs for error messages
2. Verify your GitHub OAuth App configuration
3. Ensure all URLs match exactly (including protocol and port)

## Files Created

- `backend/server.js` - Main backend server
- `backend/package.json` - Node.js dependencies and scripts
- `backend/README.md` - Backend documentation
- `frontend/GITHUB_OAUTH_SETUP.md` - This setup guide

The backend is now ready to handle GitHub OAuth authentication for your FA2BEE web application!
