import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';

const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-craft-900 text-craft-50 pt-16 pb-8 border-t-[6px] border-accent relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Section 1: Brand */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-extrabold text-3xl text-white tracking-tighter">CraftConnect<span className="text-accent">.</span></span>
            </Link>
            <p className="text-sm font-bold text-accent uppercase tracking-wider mt-2 mb-1">
              Connecting Artisans. Preserving Heritage. Empowering Communities.
            </p>
            <p className="text-craft-300 text-sm leading-relaxed pr-4">
              We eliminate middlemen to connect verified Nepali artisans directly with buyers globally, ensuring fair trade and transparent authenticity.
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'Marketplace', path: '/marketplace' },
                { name: 'How It Works', path: '/how-it-works' },
                { name: 'About Us', path: '/about-us' },
                { name: 'Contact', path: '/contact-us' }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-craft-300 hover:text-accent transition-colors text-sm flex items-center group">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Support */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Support</h3>
            <ul className="space-y-3">
              {[
                { name: 'Become a Verified Artisan', path: '/register/artisan' },
                { name: 'Report a Product', path: '/contact-us' },
                { name: 'FAQs', path: '/contact-us' },
                { name: 'Privacy Policy', path: '/' },
                { name: 'Terms & Conditions', path: '/' }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-craft-300 hover:text-white transition-colors text-sm flex items-center group">
                    <span className="w-1.5 h-1.5 rounded-full bg-craft-300 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: Contact & Social */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact & Social</h3>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start text-sm text-craft-300">
                <MapPin className="w-5 h-5 mr-3 text-accent shrink-0" />
                <span>Pokhara, Nepal</span>
              </li>
              <li className="flex items-center text-sm text-craft-300">
                <Mail className="w-5 h-5 mr-3 text-accent shrink-0" />
                <a href="mailto:support@craftconnectnepal.com" className="hover:text-white transition-colors">
                  support@craftconnectnepal.com
                </a>
              </li>
              <li className="flex items-center text-sm text-craft-300">
                <Phone className="w-5 h-5 mr-3 text-accent shrink-0" />
                <span>+977 98XXXXXXXX</span>
              </li>
            </ul>

            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 rounded-full bg-craft-800 flex items-center justify-center text-craft-300 hover:bg-accent hover:text-white transition-all transform hover:-translate-y-1">
                <FacebookIcon />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-craft-800 flex items-center justify-center text-craft-300 hover:bg-accent hover:text-white transition-all transform hover:-translate-y-1">
                <InstagramIcon />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-craft-800 flex items-center justify-center text-craft-300 hover:bg-accent hover:text-white transition-all transform hover:-translate-y-1">
                <LinkedInIcon />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-craft-800 flex items-center justify-center text-craft-300 hover:bg-accent hover:text-white transition-all transform hover:-translate-y-1">
                <GitHubIcon />
              </a>
            </div>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="pt-8 border-t border-craft-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-craft-400 text-sm">
            &copy; 2026 CraftConnect Nepal. All rights reserved.
          </p>
          <p className="text-craft-400 text-sm flex items-center">
            Built with <span className="text-red-500 mx-1">❤️</span> by Team Impact Coders
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
