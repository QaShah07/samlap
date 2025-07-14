import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, TrendingUp, Users, FileText, BarChart3, MessageSquare, Cloud } from 'lucide-react';

interface MPCCard {
  title: string;
  description: string;
  image: string;
  path: string;
  icon: React.ReactNode;
  gradient: string;
}

const MPCPage: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const cards: MPCCard[] = [
    {
      title: "Formation and Evolution",
      description: "Explore the historical development and structural evolution of the MPC framework",
      image: "https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      path: "/formation",
      icon: <TrendingUp className="w-6 h-6" />,
      gradient: "from-blue-600 to-purple-600"
    },
    {
      title: "MPC Decisions",
      description: "Analyze key monetary policy decisions and their economic impact over time",
      image: "https://images.pexels.com/photos/7567440/pexels-photo-7567440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      path: "/mpc-decisions",
      icon: <FileText className="w-6 h-6" />,
      gradient: "from-emerald-600 to-teal-600"
    },
    {
      title: "MPC Members",
      description: "Meet the committee members and understand their backgrounds and expertise",
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      path: "/member",
      icon: <Users className="w-6 h-6" />,
      gradient: "from-orange-600 to-red-600"
    },
    {
      title: "Voting Patterns",
      description: "Examine voting patterns and consensus building within the committee",
      image: "https://images.pexels.com/photos/7567476/pexels-photo-7567476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      path: "/mpc-voting",
      icon: <BarChart3 className="w-6 h-6" />,
      gradient: "from-indigo-600 to-blue-600"
    },
    {
      title: "Economic Discussions",
      description: "Deep dive into macroeconomic discussions and variable analysis",
      image: "https://images.pexels.com/photos/7567455/pexels-photo-7567455.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      path: "/economic-discussions",
      icon: <MessageSquare className="w-6 h-6" />,
      gradient: "from-pink-600 to-rose-600"
    },
    {
      title: "Word Cloud Analysis",
      description: "Visual representation of key terms and themes from MPC communications",
      image: "https://images.pexels.com/photos/7567469/pexels-photo-7567469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      path: "/word-cloud",
      icon: <Cloud className="w-6 h-6" />,
      gradient: "from-violet-600 to-purple-600"
    }
  ];

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Monetary Policy Committee
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Explore comprehensive insights into India's monetary policy framework, decisions, and economic impact
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 mx-auto rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden transform hover:-translate-y-2"
              onClick={() => handleCardClick(card.path)}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${card.gradient} opacity-70 group-hover:opacity-80 transition-opacity duration-500`}></div>
                
                {/* Icon */}
                <div className="absolute top-4 left-4">
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-3 text-white">
                    {card.icon}
                  </div>
                </div>

                {/* Hover Arrow */}
                <div className={`absolute top-4 right-4 transform transition-all duration-500 ${
                  hoveredCard === index ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'
                }`}>
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-2 text-white">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {card.description}
                </p>
                
                {/* Action Button */}
                <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors duration-300">
                  <span className="mr-2">Explore</span>
                  <ChevronRight className={`w-4 h-4 transform transition-transform duration-300 ${
                    hoveredCard === index ? 'translate-x-1' : ''
                  }`} />
                </div>
              </div>

              {/* Bottom Accent */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Dive Deeper?</h2>
          <p className="text-gray-300 text-lg mb-8">
            Discover comprehensive analytics and insights about India's monetary policy landscape
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default MPCPage;