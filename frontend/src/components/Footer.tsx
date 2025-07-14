import React from 'react';
import { Building2, Mail, ArrowRight, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden text-sm">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-10">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
              <Building2 size={24} className="text-white" />
            </div>
            <div className="text-left">
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Central Bank Communication
              </h2>
              <p className="text-blue-200 text-xs">Reserve Bank of India Research</p>
            </div>
          </div>
          <p className="text-gray-300 max-w-xl mx-auto text-base">
            Advancing understanding of monetary policy communication through research
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* About Section */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white mb-3 relative">
              About Our Research
              <div className="absolute -bottom-1 left-0 w-10 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </h3>
            <p className="text-gray-300">
              A platform for understanding central bank communication in India.
            </p>
            <div className="flex items-center space-x-2 text-blue-300 text-xs pt-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span>Active Research Projects: 12+</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white mb-3 relative">
              Quick Links
              <div className="absolute -bottom-1 left-0 w-10 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </h3>
            <ul className="space-y-2">
              {[
                { name: 'Interactive Tools', href: '#tools' },
                { name: 'Publications', href: '#publications' },
                { name: 'Blogs', href: '/outreach' },
                { name: 'Podcasts', href: '/outreach' }
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="group flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300"
                  >
                    <ArrowRight size={12} className="group-hover:text-blue-400" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white mb-3 relative">
              Resources
              <div className="absolute -bottom-1 left-0 w-10 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </h3>
            <ul className="space-y-2">
              {[
                { name: 'Data Repository', href: '#data' },
                { name: 'Methodology', href: '#methodology' },
                { name: 'Research Papers', href: '#research' },
                { name: 'Contact Us', href: '/contact' }
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="group flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300"
                  >
                    <ExternalLink size={12} className="group-hover:text-purple-400" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white mb-3 relative">
              Stay Connected
              <div className="absolute -bottom-1 left-0 w-10 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </h3>
            <p className="text-gray-300">
              Get the latest research updates in your inbox.
            </p>
            <form className="space-y-3 pt-2">
              <div className="relative group">
                <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full bg-white/10 border border-white/20 pl-10 pr-4 py-2 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                />
              </div>
              <button 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 py-2 rounded-lg text-sm font-semibold"
                type="submit"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-6 text-xs text-gray-400 text-center md:text-left flex flex-col md:flex-row justify-between">
          <div>
            <p>© 2024 Central Bank Communication. All rights reserved.</p>
            <p className="text-gray-500 mt-1">
              Advancing policy research through communication analysis.
            </p>
          </div>
          <div className="flex justify-center md:justify-end space-x-4 mt-4 md:mt-0">
            <a href="#privacy" className="hover:text-blue-400">Privacy</a>
            <a href="#terms" className="hover:text-blue-400">Terms</a>
            <a href="#accessibility" className="hover:text-blue-400">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
