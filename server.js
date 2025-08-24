require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/database');

// Import routes
const contactRoutes = require('./routes/contact');
const projectRoutes = require('./routes/projects');
const skillRoutes = require('./routes/skills');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://ajax.googleapis.com"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"]
        }
    }
}));

// CORS configuration
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5500', 'http://localhost:8080'],
    credentials: true
}));

// Body parsing middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
app.use(morgan('combined'));

// API Routes
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'MEAN Stack Portfolio API is running',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        database: 'MongoDB'
    });
});

// API documentation endpoint
app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to Tejasvi Kale Portfolio MEAN Stack API',
        version: '2.0.0',
        endpoints: {
            health: 'GET /api/health',
            contact: {
                submit: 'POST /api/contact',
                getAll: 'GET /api/contact',
                getById: 'GET /api/contact/:id',
                updateStatus: 'PUT /api/contact/:id/status',
                delete: 'DELETE /api/contact/:id'
            },
            projects: {
                getAll: 'GET /api/projects',
                getById: 'GET /api/projects/:id',
                create: 'POST /api/projects',
                update: 'PUT /api/projects/:id',
                delete: 'DELETE /api/projects/:id'
            },
            skills: {
                getAll: 'GET /api/skills',
                getByCategory: 'GET /api/skills/category/:category',
                getById: 'GET /api/skills/:id',
                create: 'POST /api/skills',
                update: 'PUT /api/skills/:id',
                delete: 'DELETE /api/skills/:id'
            }
        },
        technologies: ['Node.js', 'Express.js', 'MongoDB', 'AngularJS']
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found',
        availableEndpoints: [
            'GET /api/health',
            'GET /api',
            'POST /api/contact',
            'GET /api/projects',
            'GET /api/skills'
        ]
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('❌ Global error handler:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 MEAN Stack Portfolio API running on http://localhost:${PORT}`);
    console.log(`📧 Contact API: http://localhost:${PORT}/api/contact`);
    console.log(`💼 Projects API: http://localhost:${PORT}/api/projects`);
    console.log(`🛠️ Skills API: http://localhost:${PORT}/api/skills`);
    console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
    console.log(`📚 API docs: http://localhost:${PORT}/api`);
    console.log(`⏰ Started at: ${new Date().toISOString()}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    process.exit(0);
});