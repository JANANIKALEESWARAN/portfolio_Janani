import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiAward, FiBriefcase, FiStar, FiCode } from 'react-icons/fi';

const timeline = [
  {
    type: 'work',
    title: 'AI/ML Developer',
    org: 'CubeAISolutions Tech Pvt Ltd',
    period: 'Feb 2026 – Present',
    description:
      'Developing LLM-Based Financial Document Analysis System using advanced Large Language Models. Implementing RAG architecture for context-aware querying and leveraging QLORA fine-tuning for domain optimization.',
    tags: ['LLM', 'RAG', 'QLORA', 'Vector Database'],
    icon: FiBriefcase,
    color: '#6366f1',
  },
  {
    type: 'work',
    title: 'AI/ML Intern',
    org: 'Generative AI Consortium',
    period: 'Mar 2025 – Apr 2025',
    description:
      'Designed and implemented machine learning models for real-world business challenges. Collaborated with cross-functional teams to integrate AI solutions into production environments.',
    tags: ['Machine Learning', 'Python', 'AI Integration'],
    icon: FiBriefcase,
    color: '#10b981',
  },
  {
    type: 'achievement',
    title: 'Microsoft Certified Power BI Data Analyst',
    org: 'Microsoft',
    period: 'Mar 2025',
    description:
      'Earned Microsoft Power BI Data Analyst Associate certification demonstrating expertise in data visualization, analysis, and business intelligence solutions.',
    tags: ['Power BI', 'Data Analysis', 'Microsoft'],
    icon: FiAward,
    color: '#FF9900',
  },
  {
    type: 'achievement',
    title: '🏆 1st Prize - CloudSpark\'26 Project Presentation',
    org: 'Kongu Engineering College',
    period: '2026',
    description:
      'Won first prize in CloudSpark\'26 project presentation competition for innovative AI/ML project showcasing technical excellence and practical implementation.',
    tags: ['AI/ML', 'Project Presentation', 'Innovation'],
    icon: FiStar,
    color: '#f59e0b',
  },
  {
    type: 'achievement',
    title: 'Hacknovate\'26 24-Hour Hackathon Participant',
    org: 'Kongu Engineering College',
    period: '2026',
    description:
      'Participated in intensive 24-hour hackathon event, developing solutions under time constraints and demonstrating rapid prototyping skills.',
    tags: ['Hackathon', 'Rapid Development', 'Teamwork'],
    icon: FiStar,
    color: '#3b82f6',
  },
  {
    type: 'achievement',
    title: 'SIH Internal Hackathon Participant',
    org: 'Kongu Engineering College',
    period: '2025',
    description:
      'Participated in Smart India Hackathon internal selection, contributing to innovative problem-solving and collaborative development.',
    tags: ['SIH', 'Innovation', 'Problem Solving'],
    icon: FiStar,
    color: '#ec4899',
  },
];

function TimelineItem({ item, index, isLeft }) {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex items-start gap-8 mb-10 ${isLeft ? 'flex-row' : 'flex-row-reverse'} md:w-[calc(50%-2rem)]`}
    >
      <div className="glass-card p-5 flex-1 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 group">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${item.color}20` }}
          >
            <Icon style={{ color: item.color }} size={18} />
          </div>
          <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap bg-gray-100 dark:bg-dark-600 px-2 py-1 rounded-lg">
            {item.period}
          </span>
        </div>
        <h4 className="font-display font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary-500 transition-colors">
          {item.title}
        </h4>
        <p className="text-primary-500 dark:text-primary-400 text-sm font-medium mb-2">{item.org}</p>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-3">{item.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md text-xs font-medium"
              style={{ backgroundColor: `${item.color}15`, color: item.color }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="experience" className="py-24 bg-white dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="section-heading">Experience & <span className="gradient-text">Achievements</span></h2>
          <p className="section-subheading mx-auto">My journey in building great things</p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-400 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Desktop: Zigzag timeline | Mobile: single column */}
        <div className="relative">
          {/* Center line (desktop only) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500/60 via-accent-400/60 to-primary-500/60 transform -translate-x-1/2" />

          {/* Items */}
          <div className="flex flex-col md:block gap-6 md:gap-0">
            {timeline.map((item, i) => (
              <div
                key={i}
                className={`md:flex md:items-start ${i % 2 === 0 ? 'md:justify-start' : 'md:justify-end'} md:mb-0`}
              >
                {/* Center dot */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 mt-5"
                  style={{ top: `${i * 180 + 20}px` }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: i * 0.1 + 0.3 }}
                    className="w-4 h-4 rounded-full border-2 border-primary-500 bg-white dark:bg-dark-900"
                    style={{ boxShadow: `0 0 12px ${item.color}60` }}
                  />
                </div>
                <TimelineItem item={item} index={i} isLeft={i % 2 === 0} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
