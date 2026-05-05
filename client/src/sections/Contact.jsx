import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiSend, FiMail, FiMapPin, FiLinkedin, FiGithub } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import api from '../utils/api';

const contactInfo = [
  { icon: FiMail, label: 'Email', value: 'janani6002@gmail.com', href: 'mailto:janani6002@gmail.com' },
  { icon: FiLinkedin, label: 'LinkedIn', value: 'linkedin.com/in/janani-k-682693291', href: 'https://www.linkedin.com/in/janani-k-682693291/' },
  { icon: FiGithub, label: 'GitHub', value: 'github.com/JANANIKALEESWARAN', href: 'https://github.com/JANANIKALEESWARAN' },
  { icon: FiMapPin, label: 'Location', value: 'Tamil Nadu, India', href: null },
];

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill all fields!');
      return;
    }

    const subject = `Portfolio Contact from ${form.name}`;
    const body = `Name: ${form.name}%0D%0AEmail: ${form.email}%0D%0A%0D%0AMessage:%0D%0A${form.message}`;
    const mailtoLink = `mailto:janani6002@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

    // Try API first
    setLoading(true);
    try {
      await api.post('/contact', form, { timeout: 5000 });
      toast.success('Message sent! I\'ll get back to you soon. 🎉');
      setForm({ name: '', email: '', message: '' });
    } catch {
      // Fallback: open email client
      window.open(mailtoLink, '_blank');
      toast.success('Opening your email client... Please send the message! 📧');
      setForm({ name: '', email: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gray-50 dark:bg-dark-800">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="section-heading">Get In <span className="gradient-text">Touch</span></h2>
          <p className="section-subheading mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-400 mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            <div className="glass-card p-6 mb-2">
              <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-2">Let's work together</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                I'm currently open to freelance projects and full-time roles. Whether you have a question or want to start a project together, my inbox is always open.
              </p>
            </div>

            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <motion.div
                key={label}
                whileHover={{ x: 5 }}
                className="glass-card p-4 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="text-primary-500" size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">{label}</p>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer"
                      className="text-gray-800 dark:text-gray-200 text-sm font-medium hover:text-primary-500 transition-colors">
                      {value}
                    </a>
                  ) : (
                    <p className="text-gray-800 dark:text-gray-200 text-sm font-medium">{value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 flex flex-col gap-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    id="name" name="name" type="text" value={form.name} onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-dark-700/80 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email" name="email" type="email" value={form.email} onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-dark-700/80 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message" name="message" rows={6} value={form.message} onChange={handleChange}
                  placeholder="Tell me about your project or just say hello..."
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-dark-700/80 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto sm:self-end text-base disabled:opacity-60 disabled:cursor-not-allowed"
                whileHover={!loading ? { scale: 1.03 } : {}}
                whileTap={!loading ? { scale: 0.97 } : {}}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend size={18} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
