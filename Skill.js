const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Skill name is required'],
        trim: true,
        maxlength: [50, 'Skill name cannot exceed 50 characters']
    },
    category: {
        type: String,
        enum: ['frontend', 'backend', 'database', 'tools', 'other'],
        required: [true, 'Skill category is required']
    },
    level: {
        type: Number,
        required: [true, 'Skill level is required'],
        min: [0, 'Level cannot be less than 0'],
        max: [100, 'Level cannot exceed 100']
    },
    icon: {
        type: String,
        trim: true
    },
    color: {
        type: String,
        trim: true,
        default: '#007BFF'
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
skillSchema.index({ category: 1, order: 1 });
skillSchema.index({ status: 1 });

module.exports = mongoose.model('Skill', skillSchema); 