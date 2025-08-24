const express = require('express');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const Contact = require('../models/Contact');
const router = express.Router();

// Rate limiting for contact form
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: {
        success: false,
        message: 'Too many contact form submissions, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Validation middleware
const validateContact = [
    body('name')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Name can only contain letters and spaces'),
    
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address'),
    
    body('subject')
        .trim()
        .isLength({ min: 5, max: 100 })
        .withMessage('Subject must be between 5 and 100 characters'),
    
    body('message')
        .trim()
        .isLength({ min: 10, max: 1000 })
        .withMessage('Message must be between 10 and 1000 characters')
];

// POST - Submit contact form
router.post('/', contactLimiter, validateContact, async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        const { name, email, subject, message } = req.body;

        // Create new contact submission
        const contact = new Contact({
            name,
            email,
            subject,
            message,
            ipAddress: req.ip,
            userAgent: req.get('User-Agent')
        });

        await contact.save();

        // Log the submission
        console.log('📧 New Contact Form Submission:');
        console.log(`   Name: ${name}`);
        console.log(`   Email: ${email}`);
        console.log(`   Subject: ${subject}`);
        console.log(`   IP: ${req.ip}`);
        console.log(`   Time: ${new Date().toISOString()}`);
        console.log('================================');

        res.status(201).json({
            success: true,
            message: 'Thank you for your message! I will get back to you soon.',
            data: {
                id: contact._id,
                name: contact.name,
                email: contact.email,
                subject: contact.subject,
                timestamp: contact.createdAt
            }
        });

    } catch (error) {
        console.error('❌ Contact form error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error. Please try again later.'
        });
    }
});

// GET - Get all contact submissions (admin only)
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find({})
            .sort({ createdAt: -1 })
            .select('-__v');

        res.status(200).json({
            success: true,
            count: contacts.length,
            data: contacts
        });

    } catch (error) {
        console.error('❌ Error fetching contacts:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching contact submissions'
        });
    }
});

// GET - Get contact by ID
router.get('/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact submission not found'
            });
        }

        res.status(200).json({
            success: true,
            data: contact
        });

    } catch (error) {
        console.error('❌ Error fetching contact:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching contact submission'
        });
    }
});

// PUT - Update contact status
router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        
        if (!['unread', 'read', 'replied'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status value'
            });
        }

        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact submission not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Status updated successfully',
            data: contact
        });

    } catch (error) {
        console.error('❌ Error updating contact status:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating contact status'
        });
    }
});

// DELETE - Delete contact submission
router.delete('/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact submission not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Contact submission deleted successfully'
        });

    } catch (error) {
        console.error('❌ Error deleting contact:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting contact submission'
        });
    }
});

module.exports = router;