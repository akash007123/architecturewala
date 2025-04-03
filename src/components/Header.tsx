import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "../hooks/use-mobile";

const Header = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white bg-opacity-95 ${scrolled ? 'py-2 shadow-md' : 'py-4'}`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center space-x-2 cursor-pointer">
              <span className="text-primary font-serif text-2xl font-bold">Arcology</span>
            </a>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/">
              <a className={`hover:text-primary font-medium transition-colors ${location === '/' ? 'text-primary' : 'text-neutral-500'}`}>
                Home
              </a>
            </Link>
            <Link href="/about">
              <a className={`hover:text-primary font-medium transition-colors ${location === '/about' ? 'text-primary' : 'text-neutral-500'}`}>
                About
              </a>
            </Link>
            <Link href="/services">
              <a className={`hover:text-primary font-medium transition-colors ${location === '/services' ? 'text-primary' : 'text-neutral-500'}`}>
                Services
              </a>
            </Link>
            <Link href="/projects">
              <a className={`hover:text-primary font-medium transition-colors ${location === '/projects' ? 'text-primary' : 'text-neutral-500'}`}>
                Projects
              </a>
            </Link>
            <Link href="/testimonials">
              <a className={`hover:text-primary font-medium transition-colors ${location === '/testimonials' ? 'text-primary' : 'text-neutral-500'}`}>
                Testimonials
              </a>
            </Link>
            <Link href="/blog">
              <a className={`hover:text-primary font-medium transition-colors ${location === '/blog' ? 'text-primary' : 'text-neutral-500'}`}>
                Blog
              </a>
            </Link>
            <Link href="/contact">
              <a className={`hover:text-primary font-medium transition-colors ${location === '/contact' ? 'text-primary' : 'text-neutral-500'}`}>
                Contact
              </a>
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-neutral-500 focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <i className='bx bx-x text-2xl'></i>
            ) : (
              <i className='bx bx-menu text-2xl'></i>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav 
            className="md:hidden bg-white px-6 py-4 shadow-md"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-4">
              <Link href="/">
                <a className={`font-medium transition-colors py-2 ${location === '/' ? 'text-primary' : 'text-neutral-500'}`}>
                  Home
                </a>
              </Link>
              <Link href="/about">
                <a className={`font-medium transition-colors py-2 ${location === '/about' ? 'text-primary' : 'text-neutral-500'}`}>
                  About
                </a>
              </Link>
              <Link href="/services">
                <a className={`font-medium transition-colors py-2 ${location === '/services' ? 'text-primary' : 'text-neutral-500'}`}>
                  Services
                </a>
              </Link>
              <Link href="/projects">
                <a className={`font-medium transition-colors py-2 ${location === '/projects' ? 'text-primary' : 'text-neutral-500'}`}>
                  Projects
                </a>
              </Link>
              <Link href="/testimonials">
                <a className={`font-medium transition-colors py-2 ${location === '/testimonials' ? 'text-primary' : 'text-neutral-500'}`}>
                  Testimonials
                </a>
              </Link>
              <Link href="/blog">
                <a className={`font-medium transition-colors py-2 ${location === '/blog' ? 'text-primary' : 'text-neutral-500'}`}>
                  Blog
                </a>
              </Link>
              <Link href="/contact">
                <a className={`font-medium transition-colors py-2 ${location === '/contact' ? 'text-primary' : 'text-neutral-500'}`}>
                  Contact
                </a>
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
