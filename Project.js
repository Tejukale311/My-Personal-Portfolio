const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Project name is required'],
        trim: true,
        maxlength: [100, 'Project name cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Project description is required'],
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    longDescription: {
        type: String,
        trim: true,
        maxlength: [2000, 'Long description cannot exceed 2000 characters']
    },
    image: {
        type: String,
        trim: true
    },
    technologies: [{
        type: String,
        trim: true
    }],
    liveLink: {
        type: String,
        trim: true
    },
    githubLink: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        enum: ['frontend', 'backend', 'fullstack', 'mobile', 'other'],
        default: 'fullstack'
    },
    featured: {
        type: Boolean,
        default: false
    },
    order: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
}, {
    timestamps: true
});

// Index for better query performance
projectSchema.index({ featured: 1, order: 1 });
projectSchema.index({ category: 1, status: 1 });

module.exports = mongoose.model('Project', projectSchema); 