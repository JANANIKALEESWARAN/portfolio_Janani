require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');
const Skill = require('./models/Skill');

const projects = [
  {
    title: 'AI Portfolio Analyzer',
    description:
      'A full-stack application that analyzes investment portfolios using machine learning. Provides real-time risk assessment, diversification insights, and predictive analytics.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
    technologies: ['Python', 'React', 'TensorFlow', 'MongoDB', 'FastAPI'],
    github: 'https://github.com',
    demo: 'https://example.com',
    featured: true,
    order: 1,
  },
  {
    title: 'E-Commerce Platform',
    description:
      'A modern e-commerce solution built with the MERN stack. Features include product management, cart, Stripe payments, and an admin dashboard.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
    github: 'https://github.com',
    demo: 'https://example.com',
    featured: true,
    order: 2,
  },
  {
    title: 'Real-time Chat Application',
    description:
      'A scalable real-time messaging platform supporting private and group chats, file sharing, and message reactions using Socket.IO.',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800',
    technologies: ['React', 'Node.js', 'Socket.IO', 'Redis', 'MongoDB'],
    github: 'https://github.com',
    demo: 'https://example.com',
    featured: false,
    order: 3,
  },
  {
    title: 'DevOps CI/CD Pipeline',
    description:
      'An automated CI/CD pipeline for cloud deployments with Docker containerization, Kubernetes orchestration, and GitHub Actions.',
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800',
    technologies: ['Docker', 'Kubernetes', 'GitHub Actions', 'AWS', 'Terraform'],
    github: 'https://github.com',
    demo: '',
    featured: false,
    order: 4,
  },
  {
    title: 'Smart Task Manager',
    description:
      'A productivity application with AI-powered prioritization, drag-and-drop kanban boards, calendar integration, and team collaboration features.',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'OpenAI'],
    github: 'https://github.com',
    demo: 'https://example.com',
    featured: true,
    order: 5,
  },
  {
    title: 'RAG Document QA System',
    description:
      'A Retrieval-Augmented Generation system that allows users to chat with their documents using LLMs with FAISS vector storage.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
    technologies: ['Python', 'LangChain', 'FAISS', 'Streamlit', 'Mistral'],
    github: 'https://github.com',
    demo: '',
    featured: false,
    order: 6,
  },
];

const skills = [
  // Languages
  { name: 'JavaScript', category: 'Languages', icon: 'js', level: 92, color: '#F7DF1E' },
  { name: 'Python', category: 'Languages', icon: 'python', level: 88, color: '#3776AB' },
  { name: 'TypeScript', category: 'Languages', icon: 'ts', level: 82, color: '#3178C6' },
  { name: 'Java', category: 'Languages', icon: 'java', level: 75, color: '#ED8B00' },
  { name: 'C++', category: 'Languages', icon: 'cpp', level: 70, color: '#00599C' },

  // Web Technologies
  { name: 'React.js', category: 'Web Technologies', icon: 'react', level: 90, color: '#61DAFB' },
  { name: 'Node.js', category: 'Web Technologies', icon: 'node', level: 87, color: '#339933' },
  { name: 'Express.js', category: 'Web Technologies', icon: 'express', level: 85, color: '#000000' },
  { name: 'TailwindCSS', category: 'Web Technologies', icon: 'tailwind', level: 88, color: '#06B6D4' },
  { name: 'Next.js', category: 'Web Technologies', icon: 'next', level: 78, color: '#000000' },
  { name: 'GraphQL', category: 'Web Technologies', icon: 'graphql', level: 70, color: '#E10098' },

  // Tools & Platforms
  { name: 'Git & GitHub', category: 'Tools & Platforms', icon: 'git', level: 92, color: '#F05032' },
  { name: 'Docker', category: 'Tools & Platforms', icon: 'docker', level: 80, color: '#2496ED' },
  { name: 'AWS', category: 'Tools & Platforms', icon: 'aws', level: 72, color: '#FF9900' },
  { name: 'Linux', category: 'Tools & Platforms', icon: 'linux', level: 78, color: '#FCC624' },
  { name: 'VS Code', category: 'Tools & Platforms', icon: 'vscode', level: 95, color: '#007ACC' },

  // Databases
  { name: 'MongoDB', category: 'Databases', icon: 'mongodb', level: 88, color: '#47A248' },
  { name: 'PostgreSQL', category: 'Databases', icon: 'postgresql', level: 80, color: '#4169E1' },
  { name: 'MySQL', category: 'Databases', icon: 'mysql', level: 75, color: '#4479A1' },
  { name: 'Redis', category: 'Databases', icon: 'redis', level: 70, color: '#DC382D' },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await Project.deleteMany({});
    await Skill.deleteMany({});

    await Project.insertMany(projects);
    await Skill.insertMany(skills);

    console.log(`✅ Seeded ${projects.length} projects and ${skills.length} skills`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
}

seed();
