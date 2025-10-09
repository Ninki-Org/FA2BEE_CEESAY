# FA2BEE Backend - GitHub OAuth Server

This is the backend server for the FA2BEE web application, handling GitHub OAuth authentication.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure GitHub OAuth
Edit `server.js` and replace the client secret:
```javascript
const GITHUB_CLIENT_SECRET = 'YOUR_ACTUAL_CLIENT_SECRET_HERE';
```

### 3. Start the Server
```bash
npm start
```

The server will run on `http://localhost:3000`

## API Endpoints

- `GET /login` - Initiates GitHub OAuth flow
- `GET /auth/callback` - GitHub OAuth callback handler
- `GET /health` - Health check endpoint
- `GET /` - Root endpoint with API information

## Development

For development with auto-restart:
```bash
npm run dev
```

## Project Structure

```
backend/
├── server.js          # Main Express server
├── package.json       # Dependencies and scripts
└── README.md         # This file
```

## Configuration

- **Port**: 3000 (configurable in server.js)
- **CORS Origin**: `http://localhost:5500/frontend`
- **GitHub OAuth**: Configured with your OAuth App credentials

## Dependencies

- `express` - Web framework
- `axios` - HTTP client for GitHub API calls
- `cors` - Cross-Origin Resource Sharing middleware
- `nodemon` - Development auto-restart (dev dependency)
