import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiExternalLink, FiFilter } from 'react-icons/fi';
import api from '../utils/api';

const fallbackProjects = [
  {
    _id: '1', title: 'LLM-Based Financial Document Analysis', featured: true,
    description: 'Intelligent document analyzer enabling context-aware querying of unstructured financial data using LLM and RAG architecture.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60',
    technologies: ['Mistral LLM', 'QLORA', 'RAG', 'Vector Database', 'Python'],
    github: 'https://github.com/JANANIKALEESWARAN/LLM_Based_documentAnalyser', demo: '',
  },
  {
    _id: '2', title: 'AI-Driven Virtual Try-On Platform', featured: true,
    description: 'E-commerce platform with AI-powered virtual outfit preview, pose detection, recommendations, and ordering functionality.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=60',
    technologies: ['MERN Stack', 'Pose Detection', 'Computer Vision', 'TensorFlow'],
    github: 'https://github.com/JANANIKALEESWARAN/outfitSnap', demo: '',
  },
  {
    _id: '3', title: 'Smart Agro Agency System', featured: true,
    description: 'MERN-based agricultural platform with crop disease detection, PlantVIT model integration, and demand prediction.',
    image: 'https://picsum.photos/seed/agriculture-farming-crops/800/600.jpg',
    technologies: ['MongoDB', 'React.js', 'PlantVIT Model', 'Predictive Analytics'],
    github: 'https://github.com/JANANIKALEESWARAN/Smart_Agro_Advisory_System_frontend', demo: 'https://agroinventory.vercel.app/',
  },
  {
    _id: '4', title: 'Blood Group Detection System', featured: false,
    description: 'Deep learning-based biometric system for blood group detection using fingerprint analysis with 70% accuracy.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=60',
    technologies: ['Python', 'CNN', 'OpenCV', 'Deep Learning', 'Image Processing'],
    github: 'https://github.com/JANANIKALEESWARAN/BloodGroupDetection_app', demo: 'https://jananikaleeswaran-bloodgroupdetection-app-app-yqr071.streamlit.app/',
  },
  {
    _id: '5', title: 'Paralysis Agitans Prediction', featured: true,
    description: 'Parkinson\'s disease early detection model using voice biomarkers achieving 94.92% accuracy with SMOTE technique.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&auto=format&fit=crop&q=60',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'ML Algorithms'],
    github: 'https://github.com/JANANIKALEESWARAN/parkinson-s-disease-prediction-app', demo: 'https://jananikaleeswaran-parkinson-s-disease-prediction-app-app-mg4mvo.streamlit.app/',
  },
];

function ProjectCard({ project, index }) {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="glass-card overflow-hidden group flex flex-col"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {project.featured && (
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-primary-500 text-white text-xs font-semibold rounded-lg">
            ⭐ Featured
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary-900/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
          {project.github && (
            <motion.a
              href={project.github} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
              className="p-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors backdrop-blur-sm"
            >
              <FiGithub size={22} />
            </motion.a>
          )}
          {project.demo && (
            <motion.a
              href={project.demo} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
              className="p-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors backdrop-blur-sm"
            >
              <FiExternalLink size={22} />
            </motion.a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-bold text-gray-900 dark:text-white text-lg mb-2 group-hover:text-primary-500 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 flex-1">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-lg text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [activeFilter, setActiveFilter] = useState('All');
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  useEffect(() => {
    api.get('/projects')
      .then((res) => { if (res.data.length) setProjects(res.data); })
      .catch(() => {});
  }, []);

  const allTechs = ['All', ...new Set(projects.flatMap((p) => p.technologies))].slice(0, 12);
  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.technologies.includes(activeFilter));

  return (
    <section id="projects" className="py-24 bg-gray-50 dark:bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="section-heading">My <span className="gradient-text">Projects</span></h2>
          <p className="section-subheading mx-auto">A showcase of what I've built</p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-400 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 flex-wrap justify-center mb-10"
        >
          <FiFilter className="text-gray-400" size={16} />
          {allTechs.map((tech) => (
            <button
              key={tech}
              onClick={() => setActiveFilter(tech)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === tech
                  ? 'bg-primary-500 text-white shadow-md shadow-primary-500/30'
                  : 'bg-white dark:bg-dark-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:border-primary-500/50 hover:text-primary-500'
              }`}
            >
              {tech}
            </button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project._id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            No projects found for "{activeFilter}"
          </div>
        )}
      </div>
    </section>
  );
}
