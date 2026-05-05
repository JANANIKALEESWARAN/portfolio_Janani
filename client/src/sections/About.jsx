import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiBook, FiCalendar, FiAward } from 'react-icons/fi';

const education = [
  {
    degree: 'B.Tech Artificial Intelligence & Data Science',
    institution: 'Kongu Engineering College',
    year: '2023 – 2027',
    grade: 'CGPA: 9.07 / 10',
    icon: FiBook,
  },
  {
    degree: 'Higher Secondary Certificate',
    institution: 'Venkateeswara Vidhyalaya',
    year: '2021 – 2023',
    grade: '92.8%',
    icon: FiCalendar,
  },
];

const stats = [
  { value: '5+', label: 'AI/ML Projects' },
  { value: '2+', label: 'Publications' },
  { value: '3+', label: 'Years Experience' },
  { value: '10+', label: 'Technologies' },
];

const progressSkills = [
  { name: 'Full Stack Development', value: 88, color: '#6366f1' },
  { name: 'Machine Learning / AI', value: 85, color: '#10b981' },
  { name: 'Python Programming', value: 90, color: '#f59e0b' },
  { name: 'React.js Development', value: 85, color: '#3b82f6' },
  { name: 'Database Design', value: 80, color: '#ec4899' },
];

function ProgressBar({ name, value, color, delay }) {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{name}</span>
        <span className="text-sm font-bold" style={{ color }}>{value}%</span>
      </div>
      <div className="h-2.5 bg-gray-200 dark:bg-dark-600 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${value}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="about" className="py-24 bg-gray-50 dark:bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">About <span className="gradient-text">Me</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-400 mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Bio + Stats */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">
              AI/ML Developer & Full Stack Engineer
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Results-driven Full Stack Developer with expertise in AI/ML integration and web application development. 
              Passionate about building scalable solutions that bridge cutting-edge technology with practical business applications.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              Currently developing LLM-based financial document analysis systems and have experience with RAG architecture, 
              fine-tuning models, and building intelligent applications. Strong foundation in both frontend and backend 
              development with a focus on creating impactful, real-world solutions.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {stats.map(({ value, label }) => (
                <motion.div
                  key={label}
                  whileHover={{ y: -4 }}
                  className="glass-card p-4 text-center"
                >
                  <div className="text-2xl font-display font-bold gradient-text">{value}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{label}</div>
                </motion.div>
              ))}
            </div>

            {/* Skill progress bars */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Core Competencies</h4>
              {progressSkills.map((s, i) => (
                <ProgressBar key={s.name} {...s} delay={i * 0.15} />
              ))}
            </div>
          </motion.div>

          {/* Right: Education */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <FiAward className="text-primary-500" />
              Education
            </h3>
            <div className="space-y-6">
              {education.map(({ degree, institution, year, grade, icon: Icon }, i) => (
                <motion.div
                  key={degree}
                  whileHover={{ x: 4 }}
                  className="glass-card p-6 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary-500 to-accent-400 rounded-l-2xl" />
                  <div className="pl-2">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white leading-snug">{degree}</h4>
                      <div className="flex items-center gap-1 text-xs text-primary-500 dark:text-primary-400 bg-primary-500/10 px-2 py-1 rounded-lg whitespace-nowrap">
                        <Icon size={12} />
                        {year}
                      </div>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">{institution}</p>
                    <span className="text-sm font-medium text-accent-500">{grade}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Certifications & Achievements */}
            <div className="mt-8 glass-card p-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FiAward className="text-primary-500" />
                Certifications & Achievements
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Microsoft Certified:</strong> Power BI Data Analyst Associate (2025)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Academic Excellence Award (2024-2025)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    1st Prize - CloudSpark'26 Project Presentation (2026)
                  </span>
                </div>
              </div>
            </div>

            {/* Personal interests */}
            <div className="mt-8 glass-card p-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Interests & Hobbies</h4>
              <div className="flex flex-wrap gap-2">
                {['🤖 Machine Learning', '🌐 Full Stack Dev', '📚 Technical Writing', '🎵 Music', '🏋️ Fitness', '✈️ Travel', '🔬 Problem Solving', '💡 Open Source'].map((item) => (
                  <span key={item} className="px-3 py-1.5 bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-lg text-sm font-medium">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
