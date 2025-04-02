import  { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/projects', label: 'Projects' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent '}`}>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-gray-800" />
            <span className="text-xl font-bold text-gray-800">ArchVision</span>
          </NavLink>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-300 ${
                    isActive ? 'text-gray-900' : 'text-gray-900 hover:text-gray-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <a href="/schedule">
            <button className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition-colors duration-300">
              Schedule Consultation
            </button>
            </a>
          </div>

          <button
            className="md:hidden text-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg"
          >
            <div className="flex flex-col py-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                      isActive ? 'text-gray-800 bg-gray-100' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
              <button className="mx-4 mt-4 bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition-colors duration-300">
                Schedule Consultation
              </button>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
};

export default Header;