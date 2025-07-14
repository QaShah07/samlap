import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, BookOpen, Mic, FileText, ExternalLink } from 'lucide-react';

// 1. Define the type for a single update item
type UpdateItem = {
  title: string;
  description: string;
  image: string;
  date?: string;
  readTime?: string;
  category?: string;
};

// 2. Define the keys and the main updates object type
type TabKey = 'Publications' | 'Blogs' | 'Podcasts';
type AllUpdates = Record<TabKey, UpdateItem[]>;

const allUpdates: AllUpdates = {
  Publications: [
    {
      title: 'The Impact of Central Bank Communication on Market Volatility in India',
      description: "A comprehensive study analyzing the effects of Reserve Bank of India's communication strategies on market volatility and investor sentiment.",
      image: 'https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg',
      date: 'March 15, 2024',
      readTime: '12 min read',
      category: 'Research Paper'
    },
    {
      title: 'Monetary Policy Transmission in Emerging Markets',
      description: 'An in-depth analysis of the effectiveness of monetary policy transmission mechanisms in emerging market economies with focus on India.',
      image: 'https://images.pexels.com/photos/187041/pexels-photo-187041.jpeg',
      date: 'February 28, 2024',
      readTime: '15 min read',
      category: 'Policy Analysis'
    },
  ],
  Blogs: [
    {
      title: "Decoding the Reserve Bank of India's Monetary Policy Statements",
      description: 'An insightful blog post breaking down the key takeaways from recent monetary policy statements and their market implications.',
      image: 'https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg',
      date: 'March 10, 2024',
      readTime: '8 min read',
      category: 'Analysis'
    },
    {
      title: 'Digital Currency and the Future of Banking',
      description: 'Exploring the implications of Central Bank Digital Currencies (CBDCs) for the Indian banking sector and financial inclusion.',
      image: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg',
      date: 'March 5, 2024',
      readTime: '6 min read',
      category: 'Innovation'
    },
  ],
  Podcasts: [
    {
      title: 'Expert Discussion on the Future of Central Banking in India',
      description: 'A podcast featuring leading economists discussing the future direction of central banking in India and emerging challenges.',
      image: 'https://images.pexels.com/photos/1251845/pexels-photo-1251845.jpeg',
      date: 'March 12, 2024',
      readTime: '45 min',
      category: 'Expert Panel'
    },
    {
      title: 'Understanding Monetary Policy Communication',
      description: 'A deep dive into how central banks communicate their policy decisions and the impact on market expectations.',
      image: 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg',
      date: 'March 8, 2024',
      readTime: '32 min',
      category: 'Educational'
    },
  ],
};

const getTabIcon = (tab: TabKey) => {
  switch (tab) {
    case 'Publications':
      return FileText;
    case 'Blogs':
      return BookOpen;
    case 'Podcasts':
      return Mic;
    default:
      return FileText;
  }
};

const LatestUpdates: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('Publications');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleTabClick = (tab: TabKey, e: React.MouseEvent) => {
    e.preventDefault();
    if (tab === 'Blogs' || tab === 'Podcasts') {
      // Navigate to outreach page with the selected section as a hash
      navigate(`/outreach#${tab.toLowerCase()}`);
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.05),transparent_50%)]"></div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-6">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">Fresh Insights</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Latest 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Updates
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stay informed with our latest research publications, insightful blog posts, and expert discussions
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20">
            <div className="flex space-x-2">
              {(Object.keys(allUpdates) as TabKey[]).map((tab) => {
                const Icon = getTabIcon(tab);
                return (
                  <button
                    key={tab}
                    onClick={(e) => handleTabClick(tab, e)}
                    className={`relative flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 group ${
                      activeTab === tab
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
                    }`}
                  >
                    <Icon size={18} className={`transition-all duration-300 ${
                      activeTab === tab ? 'text-white' : 'text-gray-500 group-hover:text-blue-600'
                    }`} />
                    <span>{tab}</span>
                    {activeTab === tab && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-xl animate-pulse"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {allUpdates[activeTab].map((update, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 ${
                hoveredCard === index ? 'transform -translate-y-2 scale-[1.02]' : ''
              }`}
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={update.image}
                  alt={update.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 border border-white/20">
                    {update.category}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-end p-4">
                  <button className="bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                {/* Meta Information */}
                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>{update.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={14} />
                    <span>{update.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                  {update.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                  {update.description}
                </p>

                {/* Read More Button */}
                <div className="flex items-center justify-between">
                  <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold transition-all duration-300 group/btn">
                    <span>Read More</span>
                    <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                  
                  {/* Type Indicator */}
                  <div className="flex items-center space-x-1 text-gray-400">
                    {React.createElement(getTabIcon(activeTab), { size: 16 })}
                    <span className="text-xs font-medium">{activeTab.slice(0, -1)}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Gradient Line */}
              <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group">
            <span className="flex items-center space-x-2">
              <span>View All {activeTab}</span>
              <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default LatestUpdates;