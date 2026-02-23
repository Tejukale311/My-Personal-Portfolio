const express = require('express');
const { body, validationResult } = require('express-validator');
const Skill = require('../models/Skill');
const router = express.Router();

// Validation middleware
const validateSkill = [
    body('name')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Skill name must be between 2 and 50 characters'),
    
    body('category')
        .isIn(['frontend', 'backend', 'database', 'tools', 'other'])
        .withMessage('Invalid category'),
    
    body('level')
        .isInt({ min: 0, max: 100 })
        .withMessage('Level must be between 0 and 100'),
    
    body('color')
        .optional()
        .matches(/^#[0-9A-F]{6}$/i)
        .withMessage('Color must be a valid hex color'),
    
    body('order')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Order must be a non-negative integer')
];

// GET - Get all skills
router.get('/', async (req, res) => {
    try {
        const { category, status } = req.query;
        const filter = {};

        if (category) filter.category = category;
        if (status) filter.status = status;

        const skills = await Skill.find(filter)
            .sort({ order: 1, name: 1 })
            .select('-__v');

        res.status(200).json({
            success: true,
            count: skills.length,
            data: skills
        });

    } catch (error) {
        console.error('❌ Error fetching skills:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching skills'
        });
    }
});

// GET - Get skills by category
router.get('/category/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const skills = await Skill.find({ 
            category, 
            status: 'active' 
        })
        .sort({ order: 1, name: 1 })
        .select('-__v');

        res.status(200).json({
            success: true,
            count: skills.length,
            data: skills
        });

    } catch (error) {
        console.error('❌ Error fetching skills by category:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching skills'
        });
    }
});

// GET - Get skill by ID
router.get('/:id', async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        
        if (!skill) {
            return res.status(404).json({
                success: false,
                message: 'Skill not found'
            });
        }

        res.status(200).json({
            success: true,
            data: skill
        });

    } catch (error) {
        console.error('❌ Error fetching skill:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching skill'
        });
    }
});

// POST - Create new skill
router.post('/', validateSkill, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        const skill = new Skill(req.body);
        await skill.save();

        res.status(201).json({
            success: true,
            message: 'Skill created successfully',
            data: skill
        });

    } catch (error) {
        console.error('❌ Error creating skill:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating skill'
        });
    }
});

// PUT - Update skill
router.put('/:id', validateSkill, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        const skill = await Skill.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!skill) {
            return res.status(404).json({
                success: false,
                message: 'Skill not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Skill updated successfully',
            data: skill
        });

    } catch (error) {
        console.error('❌ Error updating skill:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating skill'
        });
    }
});

// DELETE - Delete skill
router.delete('/:id', async (req, res) => {
    try {
        const skill = await Skill.findByIdAndDelete(req.params.id);

        if (!skill) {
            return res.status(404).json({
                success: false,
                message: 'Skill not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Skill deleted successfully'
        });

    } catch (error) {
        console.error('❌ Error deleting skill:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting skill'
        });
    }
});

module.exports = router; 