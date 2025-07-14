import React, { useState } from 'react';
import { Search, Menu, X, Building2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Nav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Team Members', path: '/team' },
    { name: 'MPC', path: '/MPC' },
    { name: 'Explorer', path: '#explorer' },
    { name: 'Our Works', path: '/ourworks' },
    { name: 'Outreach', path: '/outreach' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="w-full bg-gradient-to-r from-blue-900 via-blue-800 to-purple-800 backdrop-blur-lg shadow-2xl sticky top-0 z-50">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3 group">
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl group-hover:bg-white/30 transition-all duration-300">
              <Building2 size={28} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg md:text-xl text-white tracking-tight">
                Central Bank Communication
              </span>
              <span className="text-blue-200 text-xs md:text-sm font-medium">
                Reserve Bank of India
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative overflow-hidden group ${
                  isActive(item.path)
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'text-blue-100 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/20 to-blue-400/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Link>
            ))}
            
            {/* Search Button */}
            <button className="ml-4 p-2 rounded-lg text-blue-100 hover:text-white hover:bg-white/10 transition-all duration-300 group">
              <Search size={20} className="group-hover:scale-110 transition-transform duration-300" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-all duration-300"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-96 opacity-100 pb-4' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="pt-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'text-blue-100 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Search */}
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-blue-100 hover:text-white hover:bg-white/10 transition-all duration-300">
              <Search size={20} />
              <span className="text-sm font-medium">Search</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;