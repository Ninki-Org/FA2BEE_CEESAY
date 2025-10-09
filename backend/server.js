const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

// GitHub OAuth configuration
const GITHUB_CLIENT_ID = 'Ov23ct4A4FbBoywQmMnj';
const GITHUB_CLIENT_SECRET = '89f90e421ebbc66a4105f0ad9464a54806f7bca2';
const GITHUB_REDIRECT_URI = 'http://localhost:3000/auth/callback';

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from your frontend
    credentials: true
}));
app.use(express.json());

// Serve static files from frontend directory
app.use(express.static('../frontend'));

// Route to initiate GitHub OAuth login
app.get('/login', (req, res) => {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(GITHUB_REDIRECT_URI)}&scope=read:user user:email`;
    
    console.log('Redirecting to GitHub OAuth:', githubAuthUrl);
    res.redirect(githubAuthUrl);
});

// GitHub OAuth callback route
app.get('/auth/callback', async (req, res) => {
    try {
        const { code, error, error_description } = req.query;
        
        // Check for OAuth errors from GitHub
        if (error) {
            console.error('GitHub OAuth error:', error, error_description);
            return res.status(400).json({ 
                error: error,
                message: error_description || 'GitHub OAuth authorization failed'
            });
        }
        
        if (!code) {
            console.error('No authorization code received');
            return res.status(400).json({ 
                error: 'No authorization code received',
                message: 'GitHub OAuth flow failed - no code parameter'
            });
        }

        console.log('Received authorization code:', code);

        // Exchange code for access token
        const tokenResponse = await axios.post(
            "https://github.com/login/oauth/access_token",
            {
                client_id: "Ov23ct4A4FbBoywQmMnj",
                client_secret: "89f90e421ebbc66a4105f0ad9464a54806f7bca2",
                code: code,
                redirect_uri: "http://localhost:3000/auth/callback"
            },
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            }
        );

        console.log('Token response:', tokenResponse.data);

        if (tokenResponse.data.error) {
            console.error('GitHub token exchange error:', tokenResponse.data);
            return res.status(400).json({ 
                error: 'Token exchange failed',
                message: tokenResponse.data.error_description || 'Failed to exchange code for access token'
            });
        }

        const accessToken = tokenResponse.data.access_token;
        console.log('Access token obtained successfully');

        // Fetch user profile from GitHub API
        const userResponse = await axios.get('https://api.github.com/user', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'FA2BEE-App'
            }
        });

        console.log('User profile fetched:', {
            id: userResponse.data.id,
            login: userResponse.data.login,
            name: userResponse.data.name,
            email: userResponse.data.email
        });

        // Return user information
        const userInfo = {
            id: userResponse.data.id,
            username: userResponse.data.login,
            name: userResponse.data.name || userResponse.data.login,
            email: userResponse.data.email,
            avatar_url: userResponse.data.avatar_url,
            github_url: userResponse.data.html_url
        };

        // For development, you can redirect back to your frontend with user info
        // In production, you'd typically set a session/JWT token and redirect
        const redirectUrl = `http://localhost:3000/cleaning.html?github_user=${encodeURIComponent(JSON.stringify(userInfo))}`;
        
        console.log('Redirecting to frontend with user info');
        res.redirect(redirectUrl);

    } catch (error) {
        console.error('OAuth callback error:', error.response?.data || error.message);
        
        const errorMessage = error.response?.data?.message || error.message || 'Unknown error occurred';
        
        // Redirect to frontend with error
        const errorRedirectUrl = `http://localhost:3000/cleaning.html?oauth_error=${encodeURIComponent(errorMessage)}`;
        res.redirect(errorRedirectUrl);
    }
});

// Health check route
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        service: 'FA2BEE GitHub OAuth Backend'
    });
});

// Root route
app.get('/', (req, res) => {
    res.json({ 
        message: 'FA2BEE GitHub OAuth Backend is running!',
        endpoints: {
            login: '/login',
            callback: '/auth/callback',
            health: '/health'
        },
        instructions: 'Visit /login to start GitHub OAuth flow'
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({ 
        error: 'Internal server error',
        message: 'Something went wrong on the server'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Not found',
        message: `Route ${req.method} ${req.path} not found`
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 FA2BEE GitHub OAuth Backend running on http://localhost:${PORT}`);
    console.log(`📝 Make sure to replace GITHUB_CLIENT_SECRET with your actual client secret!`);
    console.log(`🔗 Visit http://localhost:${PORT}/login to test the OAuth flow`);
});

module.exports = app;
