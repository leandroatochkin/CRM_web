require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path')
const  helmet = require('helmet')
const fs = require('fs');
const routes = require('./routes.cjs')
const centralizedErrorHandler = require('./middleware/error_handler.cjs')




const allowedOrigins = [
    'http://localhost:5174'
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);  // Allow requests with no origin (e.g., mobile apps)
        
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(bodyParser.json());



// Explicitly handle preflight (OPTIONS) requests
app.options(allowedOrigins, cors());  // Handles OPTIONS requests for all routes

// Your routes and other middleware



app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Access-Control-Allow-Credentials', 'true');  // Required if using credentials
    next();
});

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            "default-src": ["'self'"],
            "img-src": ["'self'", "data:", "http://localhost:3001"],
            "upgrade-insecure-requests": [],
        },
    },
    crossOriginResourcePolicy: false,
    crossOriginOpenerPolicy: false, //{ policy: 'same-origin-allow-popups' }, // Ensure same-origin policy
    crossOriginResourcePolicy: { policy: 'cross-origin' }
}));



// app.use('/images', (req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*'); // or '*' to allow all origins
//     next();
// }, express.static(path.join('C:/Malbec/IMAGENES')));





Object.entries(routes).forEach(([path, route]) => {
    app.use(path, require(route));
  });

app.use(centralizedErrorHandler)





app.listen(3001, ()=>{console.log('Server running on port 3001')})