import React, { useState } from 'react';
import { ExternalLink, MapPin, Briefcase, User, Globe } from 'lucide-react';

interface TeamCardProps {
  name: string;
  role: string;
  photo: string;
  area_of_work: string;
  affiliation?: string; // Made optional
  profileUrl?: string;
}

const TeamCard: React.FC<TeamCardProps> = ({
  name,
  role,
  photo,
  area_of_work,
  affiliation,
  profileUrl
}) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div 
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Card Content */}
      <div className="relative p-6">
        {/* Profile Image Section */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            {!imageError ? (
              <img
                src={photo}
                alt={name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-500"
                onError={handleImageError}
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-500">
                <span className="text-white font-bold text-xl">{getInitials(name)}</span>
              </div>
            )}
            
            {/* Online Status Indicator */}
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full border-3 border-white shadow-md">
              <div className="w-full h-full bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Name and Role */}
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">
            {name}
          </h3>
          <p className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
            {role}
          </p>
        </div>

        {/* Details Section */}
        <div className="space-y-3 mb-6">
          <div className="flex items-start space-x-3">
            <div className="bg-purple-100 rounded-full p-2 mt-0.5">
              <Briefcase className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Area of Work</p>
              <p className="text-sm text-gray-600 leading-relaxed">{area_of_work}</p>
            </div>
          </div>

          {/* Affiliation: only show if affiliation is provided */}
          {affiliation && (
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 rounded-full p-2 mt-0.5">
                <MapPin className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Affiliation</p>
                <p className="text-sm text-gray-600">{affiliation}</p>
              </div>
            </div>
          )}
        </div>

        {/* Profile Link */}
        {profileUrl && (
          <div className={`transform transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Globe className="w-4 h-4" />
              <span>View Profile</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </div>
    </div>
  );
};

export default TeamCard;
