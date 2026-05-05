import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiDownload, FiExternalLink, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const Particle = ({ style }) => (
  <div
    className="absolute rounded-full bg-primary-500/20 dark:bg-primary-400/15 animate-float"
    style={style}
  />
);

export default function Hero() {
  const handleScrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const particles = Array.from({ length: 12 }, (_, i) => ({
    width: `${Math.random() * 60 + 10}px`,
    height: `${Math.random() * 60 + 10}px`,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${Math.random() * 4 + 4}s`,
    opacity: Math.random() * 0.5 + 0.1,
  }));

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-dark-900"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute inset-0 bg-gradient-radial from-primary-500/10 via-transparent to-transparent" />
      
      {/* Floating Particles */}
      {particles.map((style, i) => (
        <Particle key={i} style={style} />
      ))}

      {/* Glowing orbs */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary-500/30 text-primary-500 dark:text-primary-400 text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
              Available for opportunities
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-tight mb-4"
            >
              Hi, I'm{' '}
              <span className="gradient-text">JANANI K</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl sm:text-3xl font-semibold text-gray-600 dark:text-gray-300 mb-6 h-10"
            >
              <TypeAnimation
                sequence={[
                  'AI/ML Developer',
                  2000,
                  'Full Stack Engineer',
                  2000,
                  'LLM Specialist',
                  2000,
                  'Data Scientist',
                  2000,
                  'MERN Stack Developer',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-primary-500 dark:text-primary-400"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-10 max-w-xl"
            >
              I build intelligent AI-powered applications and scalable web solutions that bridge cutting-edge technology with practical business impact.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10"
            >
              <motion.button
                onClick={handleScrollToProjects}
                className="btn-primary flex items-center gap-2 text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiExternalLink size={18} />
                View Projects
              </motion.button>
              <motion.a
                href="/resume%20(11).pdf"
                download="JANANI_K_Resume.pdf"
                className="btn-outline flex items-center gap-2 text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiDownload size={18} />
                Download Resume
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-center lg:justify-start gap-4"
            >
              {[
                { Icon: FiGithub, href: 'https://github.com/JANANIKALEESWARAN', label: 'GitHub' },
                { Icon: FiLinkedin, href: 'https://www.linkedin.com/in/janani-k-682693291/', label: 'LinkedIn' },
                { Icon: FiMail, href: 'mailto:janani6002@gmail.com', label: 'Email' },
              ].map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-3 rounded-xl glass border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 hover:border-primary-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Profile Photo */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="flex-shrink-0"
          >
            <div className="relative">
              <div className="relative w-56 h-72 sm:w-64 sm:h-80 rounded-[2rem] overflow-hidden shadow-2xl shadow-primary-500/20 border border-gray-200 dark:border-gray-700">
                <img
                  src="/profile-photo.jpg"
                  alt="Janani K - AI/ML Developer & Full Stack Engineer"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                />
              </div>

              {/* Floating stat cards */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-12 top-1/4 glass-card px-4 py-3 rounded-2xl"
              >
                <div className="text-2xl font-bold gradient-text">5+</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">AI Projects</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -right-12 bottom-1/4 glass-card px-4 py-3 rounded-2xl"
              >
                <div className="text-2xl font-bold gradient-text">2+</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Publications</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-400 dark:text-gray-500">Scroll down</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 border-2 border-gray-300 dark:border-gray-600 rounded-full p-1 flex justify-center"
          >
            <div className="w-1 h-2 bg-primary-500 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
