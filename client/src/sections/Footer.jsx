import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiTwitter, FiHeart } from 'react-icons/fi';

const socialLinks = [
  { Icon: FiGithub, href: 'https://github.com', label: 'GitHub' },
  { Icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { Icon: FiMail, href: 'mailto:janani@example.com', label: 'Email' },
  { Icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
];

const quickLinks = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'];

export default function Footer() {
  const handleNav = (label) => {
    const el = document.getElementById(label.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 dark:bg-dark-900 text-gray-300 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <h3 className="font-display font-bold text-2xl gradient-text mb-3">&lt;Janani /&gt;</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Full Stack Developer & AI Enthusiast crafting elegant web experiences.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {socialLinks.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-primary-500/20 hover:text-primary-400 transition-all duration-300"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => handleNav(link)}
                    className="text-sm text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2 hover:gap-3"
                  >
                    <span className="text-primary-500 text-xs">›</span>
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Summary */}
          <div>
            <h4 className="font-semibold text-white mb-4">Say Hello</h4>
            <p className="text-sm text-gray-400 mb-3">Open to new opportunities and collaborations.</p>
            <a
              href="mailto:janani@example.com"
              className="inline-flex items-center gap-2 text-sm text-primary-400 hover:text-primary-300 transition-colors"
            >
              <FiMail size={14} />
              janani@example.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-500 flex items-center gap-1.5">
            © {new Date().getFullYear()} Janani. Made with
            <FiHeart className="text-red-500 inline animate-pulse" size={14} />
            using React & TailwindCSS
          </p>
          <p className="text-sm text-gray-500">Built with MERN Stack</p>
        </div>
      </div>
    </footer>
  );
}
