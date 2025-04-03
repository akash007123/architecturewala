import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div>
            <div className="mb-6">
              <Link href="/">
                <a className="text-white font-serif text-2xl font-bold">Arcology</a>
              </Link>
            </div>
            <p className="text-neutral-300 mb-6">
              Creating innovative architectural designs that transform spaces and enhance lives.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-secondary transition-colors" aria-label="Instagram">
                <i className='bx bxl-instagram text-xl'></i>
              </a>
              <a href="#" className="text-white hover:text-secondary transition-colors" aria-label="LinkedIn">
                <i className='bx bxl-linkedin text-xl'></i>
              </a>
              <a href="#" className="text-white hover:text-secondary transition-colors" aria-label="Pinterest">
                <i className='bx bxl-pinterest text-xl'></i>
              </a>
              <a href="#" className="text-white hover:text-secondary transition-colors" aria-label="Twitter">
                <i className='bx bxl-twitter text-xl'></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about">
                  <a className="text-neutral-300 hover:text-secondary transition-colors">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-neutral-300 hover:text-secondary transition-colors">Services</a>
                </Link>
              </li>
              <li>
                <Link href="/projects">
                  <a className="text-neutral-300 hover:text-secondary transition-colors">Projects</a>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <a className="text-neutral-300 hover:text-secondary transition-colors">Blog</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-neutral-300 hover:text-secondary transition-colors">Contact</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services#architectural-design">
                  <a className="text-neutral-300 hover:text-secondary transition-colors">Architectural Design</a>
                </Link>
              </li>
              <li>
                <Link href="/services#interior-design">
                  <a className="text-neutral-300 hover:text-secondary transition-colors">Interior Design</a>
                </Link>
              </li>
              <li>
                <Link href="/services#urban-planning">
                  <a className="text-neutral-300 hover:text-secondary transition-colors">Urban Planning</a>
                </Link>
              </li>
              <li>
                <Link href="/services#sustainable-design">
                  <a className="text-neutral-300 hover:text-secondary transition-colors">Sustainable Design</a>
                </Link>
              </li>
              <li>
                <Link href="/services#project-management">
                  <a className="text-neutral-300 hover:text-secondary transition-colors">Project Management</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-6">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className='bx bx-map text-secondary mr-3 mt-1'></i>
                <span className="text-neutral-300">123 Architecture Avenue, Design District, New York, NY 10001</span>
              </li>
              <li className="flex items-center">
                <i className='bx bx-phone text-secondary mr-3'></i>
                <span className="text-neutral-300">+1 (555) 987-6543</span>
              </li>
              <li className="flex items-center">
                <i className='bx bx-envelope text-secondary mr-3'></i>
                <span className="text-neutral-300">info@arcology.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-300 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Arcology. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-neutral-300 hover:text-secondary text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-neutral-300 hover:text-secondary text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-neutral-300 hover:text-secondary text-sm transition-colors">Cookies Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
