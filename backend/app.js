const express = require('express');
const cors = require('cors');
const path = require('path');
const reqInterceptor = require('./middlewares/gotYourReq');
const routes = require('./controllers/index');

const app = express();

// Define CORS options
const corsOptions = {
    origin: 'http://localhost:63342', // Update with your frontend origin
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'], // Include PATCH method
    allowedHeaders: 'Content-Type,Authorization', // Update with your allowed headers
};

// Enable CORS middleware with options
app.use(cors(corsOptions));

// Parse JSON bodies
app.use(express.json());

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Use request interceptor middleware
app.use(reqInterceptor);

// Use routes
app.use('/', routes);

// Handle OPTIONS requests for the PATCH route
app.options('/user/image', cors(corsOptions));

module.exports = app;
