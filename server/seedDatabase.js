const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Project = require('./models/Project');
const Skill = require('./models/Skill');

// Resume data
const projects = [
  {
    title: 'LLM-Based Financial Document Analysis',
    description: 'Intelligent document analyzer enabling context-aware querying of unstructured financial data using LLM and RAG architecture.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60',
    technologies: ['Mistral LLM', 'QLORA', 'RAG', 'Vector Database', 'Python'],
    github: 'https://github.com/JANANIKALEESWARAN/LLM_Based_documentAnalyser',
    demo: '',
    featured: true,
    order: 1
  },
  {
    title: 'AI-Driven Virtual Try-On Platform',
    description: 'E-commerce platform with AI-powered virtual outfit preview, pose detection, recommendations, and ordering functionality.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=60',
    technologies: ['MERN Stack', 'Pose Detection', 'Computer Vision', 'TensorFlow'],
    github: 'https://github.com/JANANIKALEESWARAN/outfitSnap',
    demo: '',
    featured: true,
    order: 2
  },
  {
    title: 'Smart Agro Agency System',
    description: 'MERN-based agricultural platform with crop disease detection, PlantVIT model integration, and demand prediction.',
    image: 'https://picsum.photos/seed/agriculture-farming-crops/800/600.jpg',
    technologies: ['MongoDB', 'React.js', 'PlantVIT Model', 'Predictive Analytics'],
    github: 'https://github.com/JANANIKALEESWARAN/Smart_Agro_Advisory_System_frontend',
    demo: 'https://agroinventory.vercel.app/',
    featured: true,
    order: 3
  },
  {
    title: 'Blood Group Detection System',
    description: 'Deep learning-based biometric system for blood group detection using fingerprint analysis with 70% accuracy.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=60',
    technologies: ['Python', 'CNN', 'OpenCV', 'Deep Learning', 'Image Processing'],
    github: 'https://github.com/JANANIKALEESWARAN/BloodGroupDetection_app',
    demo: 'https://jananikaleeswaran-bloodgroupdetection-app-app-yqr071.streamlit.app/',
    featured: false,
    order: 4
  },
  {
    title: 'Paralysis Agitans Prediction',
    description: 'Parkinson\'s disease early detection model using voice biomarkers achieving 94.92% accuracy with SMOTE technique.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&auto=format&fit=crop&q=60',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'ML Algorithms'],
    github: 'https://github.com/JANANIKALEESWARAN/parkinson-s-disease-prediction-app',
    demo: 'https://jananikaleeswaran-parkinson-s-disease-prediction-app-app-mg4mvo.streamlit.app/',
    featured: true,
    order: 5
  }
];

const skills = [
  // Programming Languages
  { name: 'Python', category: 'Languages', level: 90, color: '#3776ab' },
  { name: 'Java', category: 'Languages', level: 85, color: '#007396' },
  { name: 'C++', category: 'Languages', level: 80, color: '#00599c' },
  { name: 'JavaScript', category: 'Languages', level: 88, color: '#f7df1e' },
  { name: 'C', category: 'Languages', level: 75, color: '#a8b9cc' },
  
  // Web Technologies
  { name: 'React.js', category: 'Web Technologies', level: 85, color: '#61dafb' },
  { name: 'Node.js', category: 'Web Technologies', level: 85, color: '#339933' },
  { name: 'Express.js', category: 'Web Technologies', level: 82, color: '#000000' },
  { name: 'HTML5', category: 'Web Technologies', level: 90, color: '#e34f26' },
  { name: 'CSS3', category: 'Web Technologies', level: 88, color: '#1572b6' },
  
  // Databases
  { name: 'MongoDB', category: 'Databases', level: 80, color: '#47a248' },
  { name: 'MySQL', category: 'Databases', level: 82, color: '#4479a1' },
  { name: 'Firebase', category: 'Databases', level: 75, color: '#ffca28' },
  
  // Tools & Platforms
  { name: 'TensorFlow', category: 'Tools & Platforms', level: 85, color: '#ff6f00' },
  { name: 'Scikit-learn', category: 'Tools & Platforms', level: 88, color: '#f7931e' },
  { name: 'NLTK', category: 'Tools & Platforms', level: 80, color: '#000000' },
  { name: 'PowerBI', category: 'Tools & Platforms', level: 85, color: '#f2c811' },
  { name: 'Git', category: 'Tools & Platforms', level: 90, color: '#f05032' },
  { name: 'Docker', category: 'Tools & Platforms', level: 70, color: '#2496ed' },
  { name: 'Postman', category: 'Tools & Platforms', level: 85, color: '#ff6c37' }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB Atlas');

    // Clear existing data
    await Project.deleteMany({});
    await Skill.deleteMany({});
    console.log('🗑️ Cleared existing data');

    // Insert projects
    const insertedProjects = await Project.insertMany(projects);
    console.log(`✅ Inserted ${insertedProjects.length} projects`);

    // Insert skills
    const insertedSkills = await Skill.insertMany(skills);
    console.log(`✅ Inserted ${insertedSkills.length} skills`);

    console.log('🎉 Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Projects: ${insertedProjects.length}`);
    console.log(`   - Skills: ${insertedSkills.length}`);
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the seeding function
seedDatabase();
