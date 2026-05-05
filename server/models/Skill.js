const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ['Languages', 'Web Technologies', 'Tools & Platforms', 'Databases'],
      required: true,
    },
    icon: { type: String, default: '' },
    level: { type: Number, min: 0, max: 100, default: 80 },
    color: { type: String, default: '#6366f1' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Skill', SkillSchema);
