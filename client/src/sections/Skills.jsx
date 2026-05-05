import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  SiJavascript, SiPython, SiCplusplus,
  SiReact, SiNodedotjs, SiExpress,
  SiGit, SiDocker,
  SiMongodb, SiMysql, SiFirebase,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import api from '../utils/api';

const iconMap = {
  js: SiJavascript, python: SiPython, cpp: SiCplusplus, java: FaJava,
  react: SiReact, node: SiNodedotjs, express: SiExpress,
  git: SiGit, docker: SiDocker,
  mongodb: SiMongodb, mysql: SiMysql, firebase: SiFirebase,
};

const fallbackSkills = [
  // Languages
  { name: 'Python', category: 'Languages', icon: 'python', level: 90, color: '#3776ab' },
  { name: 'Java', category: 'Languages', icon: 'java', level: 85, color: '#007396' },
  { name: 'C++', category: 'Languages', icon: 'cpp', level: 80, color: '#00599c' },
  { name: 'JavaScript', category: 'Languages', icon: 'js', level: 88, color: '#f7df1e' },
  { name: 'C', category: 'Languages', icon: '', level: 75, color: '#a8b9cc' },

  // Web Technologies
  { name: 'React.js', category: 'Web Technologies', icon: 'react', level: 85, color: '#61dafb' },
  { name: 'Node.js', category: 'Web Technologies', icon: 'node', level: 85, color: '#339933' },
  { name: 'Express.js', category: 'Web Technologies', icon: 'express', level: 82, color: '#000000' },
  { name: 'HTML5', category: 'Web Technologies', icon: 'html5', level: 90, color: '#e34f26' },
  { name: 'CSS3', category: 'Web Technologies', icon: 'css3', level: 88, color: '#1572b6' },

  // Databases
  { name: 'MongoDB', category: 'Databases', icon: 'mongodb', level: 80, color: '#47a248' },
  { name: 'MySQL', category: 'Databases', icon: 'mysql', level: 82, color: '#4479a1' },
  { name: 'Firebase', category: 'Databases', icon: 'firebase', level: 75, color: '#ffca28' },

  // Tools & Platforms
  { name: 'TensorFlow', category: 'Tools & Platforms', icon: 'tensorflow', level: 85, color: '#ff6f00' },
  { name: 'Scikit-learn', category: 'Tools & Platforms', icon: '', level: 88, color: '#f7931e' },
  { name: 'NLTK', category: 'Tools & Platforms', icon: '', level: 80, color: '#3d5a80' },
  { name: 'PowerBI', category: 'Tools & Platforms', icon: '', level: 85, color: '#f2c811' },
  { name: 'Git', category: 'Tools & Platforms', icon: 'git', level: 90, color: '#f05032' },
  { name: 'Docker', category: 'Tools & Platforms', icon: 'docker', level: 70, color: '#2496ed' },
  { name: 'Postman', category: 'Tools & Platforms', icon: 'postman', level: 85, color: '#ff6c37' },
];

const categories = ['Languages', 'Web Technologies', 'Tools & Platforms', 'Databases'];

function SkillCard({ skill, index }) {
  const Icon = iconMap[skill.icon];
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -8, scale: 1.03 }}
      className="glass-card p-5 flex flex-col items-center gap-3 group cursor-pointer text-center"
      style={{ '--skill-color': skill.color }}
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: `${skill.color}20` }}
      >
        {Icon ? (
          <Icon style={{ color: skill.color }} />
        ) : (
          <span className="text-xl font-bold" style={{ color: skill.color }}>
            {skill.name.slice(0, 2)}
          </span>
        )}
      </div>
      <div>
        <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{skill.name}</p>
        <div className="h-1 bg-gray-200 dark:bg-dark-600 rounded-full overflow-hidden w-24 mx-auto">
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
            transition={{ duration: 1, delay: index * 0.07 + 0.3 }}
            className="h-full rounded-full"
            style={{ backgroundColor: skill.color }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">{skill.level}%</p>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [skills, setSkills] = useState(fallbackSkills);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    api
      .get('/skills')
      .then((res) => { if (res.data.length) setSkills(res.data); })
      .catch(() => {});
  }, []);

  const grouped = categories.reduce((acc, cat) => {
    acc[cat] = skills.filter((s) => s.category === cat);
    return acc;
  }, {});

  return (
    <section id="skills" className="py-24 bg-white dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="section-heading">My <span className="gradient-text">Skills</span></h2>
          <p className="section-subheading mx-auto">Technologies I work with day-to-day</p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-400 mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="space-y-12">
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: catIdx * 0.1 }}
            >
              <h3 className="text-xl font-display font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-500 text-sm font-bold">
                  {catIdx + 1}
                </span>
                {cat}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {grouped[cat]?.map((skill, i) => (
                  <SkillCard key={skill.name} skill={skill} index={i} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
