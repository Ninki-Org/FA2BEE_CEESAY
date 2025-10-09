#!/bin/bash

echo "Starting FA2BEE Development Environment..."
echo ""

echo "Starting Backend Server..."
cd backend && npm start &
BACKEND_PID=$!

echo ""
echo "Waiting 3 seconds for backend to start..."
sleep 3

echo ""
echo "Starting Frontend Server..."
cd ../frontend && python3 -m http.server 5500 &
FRONTEND_PID=$!

echo ""
echo "Development servers are starting..."
echo "Backend: http://localhost:3000"
echo "Frontend: http://localhost:5500"
echo ""
echo "Press Ctrl+C to stop both servers"

# Function to cleanup background processes
cleanup() {
    echo ""
    echo "Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "Servers stopped."
    exit 0
}

# Trap Ctrl+C
trap cleanup SIGINT

# Wait for user to stop
wait
