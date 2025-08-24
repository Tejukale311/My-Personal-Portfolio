const express = require('express');
const { body, validationResult } = require('express-validator');
const Project = require('../models/Project');
const router = express.Router();

// Validation middleware
const validateProject = [
    body('name')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Project name must be between 2 and 100 characters'),
    
    body('description')
        .trim()
        .isLength({ min: 10, max: 500 })
        .withMessage('Description must be between 10 and 500 characters'),
    
    body('longDescription')
        .optional()
        .trim()
        .isLength({ max: 2000 })
        .withMessage('Long description cannot exceed 2000 characters'),
    
    body('technologies')
        .isArray({ min: 1 })
        .withMessage('At least one technology must be specified'),
    
    body('category')
        .isIn(['frontend', 'backend', 'fullstack', 'mobile', 'other'])
        .withMessage('Invalid category'),
    
    body('order')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Order must be a non-negative integer')
];

// GET - Get all projects
router.get('/', async (req, res) => {
    try {
        const { category, featured, status } = req.query;
        const filter = {};

        if (category) filter.category = category;
        if (featured !== undefined) filter.featured = featured === 'true';
        if (status) filter.status = status;

        const projects = await Project.find(filter)
            .sort({ order: 1, createdAt: -1 })
            .select('-__v');

        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects
        });

    } catch (error) {
        console.error('❌ Error fetching projects:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching projects'
        });
    }
});

// GET - Get project by ID
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        
        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        res.status(200).json({
            success: true,
            data: project
        });

    } catch (error) {
        console.error('❌ Error fetching project:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching project'
        });
    }
});

// POST - Create new project
router.post('/', validateProject, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        const project = new Project(req.body);
        await project.save();

        res.status(201).json({
            success: true,
            message: 'Project created successfully',
            data: project
        });

    } catch (error) {
        console.error('❌ Error creating project:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating project'
        });
    }
});

// PUT - Update project
router.put('/:id', validateProject, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        const project = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Project updated successfully',
            data: project
        });

    } catch (error) {
        console.error('❌ Error updating project:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating project'
        });
    }
});

// DELETE - Delete project
router.delete('/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Project deleted successfully'
        });

    } catch (error) {
        console.error('❌ Error deleting project:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting project'
        });
    }
});

module.exports = router; 