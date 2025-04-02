import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Building2,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <NavLink to="/" className="flex items-center space-x-2">
              <Building2 className="h-8 w-16 text-white" />
              <span className="text-2xl font-bold text-white">
                ArchVision
              </span>
            </NavLink>
            <p className="text-stone-400">
              Creating innovative architectural solutions for a sustainable
              future.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-stone-400 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-stone-400 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-stone-400 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-stone-400 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/services"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Architectural Design
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Interior Design
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Project Management
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Renovation
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Consulting
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-stone-400">
                <Mail className="h-5 w-5 mr-2" />
                akashraikwar763@gmail.com
              </li>
              <li className="text-stone-400">
                Anand Nagar, Vasant Vihar
                <br />
                Ujjain, MP 456010
                <br />
                INDIA
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-stone-400">
              © {new Date().getFullYear()} ArchVision. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/privacy"
                className="text-stone-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-stone-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
