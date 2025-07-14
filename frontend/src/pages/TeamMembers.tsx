import React, { useEffect, useState } from 'react';
import TeamCard from '../components/TeamCard';
import api from '../services/api';
import { TeamMember } from '../data/teamData';
import { Users, Star, Award, Globe, TrendingUp, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';


export default function TeamMembers() {
  const [researchTeam, setResearchTeam] = useState<TeamMember[]>([]);
  const [collaborators, setCollaborators] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get('/team/')
      .then((response) => {
        const allMembers = response.data;
        setResearchTeam(allMembers.filter((m: TeamMember) => m.category === 'research'));
        setCollaborators(allMembers.filter((m: TeamMember) => m.category === 'collaborator'));
        setError(null);
      })
      .catch((err) => {
        console.error('Error fetching team members:', err);
        setError('Failed to load team members. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-blue-600 mx-auto"></div>
            <div className="absolute inset-0 rounded-full border-4 border-blue-200 animate-pulse"></div>
          </div>
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Users className="w-8 h-8 text-blue-600 animate-bounce" />
            <span className="text-2xl font-semibold text-gray-700">Loading our amazing team...</span>
          </div>
          <p className="text-gray-500 max-w-md mx-auto">
            We're gathering information about our talented researchers and collaborators
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center bg-white p-12 rounded-3xl shadow-2xl max-w-md mx-auto">
          <div className="text-red-500 text-8xl mb-6">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h2>
          <p className="text-red-600 text-lg font-medium mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const totalMembers = researchTeam.length + collaborators.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>

        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-6 mr-6">
                <Users className="w-12 h-12" />
              </div>
              <div className="text-left">
                <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Our Team
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
                  Meet the brilliant minds driving innovation in monetary policy research
                </p>
              </div>
            </div>

            {/* Team Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-blue-500 bg-opacity-20 rounded-full p-3">
                    <Star className="w-8 h-8 text-blue-200" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-2">{totalMembers}</div>
                <div className="text-blue-100">Team Members</div>
              </div>

              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-purple-500 bg-opacity-20 rounded-full p-3">
                    <Award className="w-8 h-8 text-purple-200" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-2">{researchTeam.length}</div>
                <div className="text-blue-100">Researchers</div>
              </div>

              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-green-500 bg-opacity-20 rounded-full p-3">
                    <Globe className="w-8 h-8 text-green-200" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-2">{collaborators.length}</div>
                <div className="text-blue-100">Collaborators</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Research Team Section */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-4 mr-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Research Team</h2>
                <p className="text-xl text-gray-600">Leading experts in monetary policy and economic research</p>
              </div>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          </div>

          {researchTeam.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {researchTeam.map((member, index) => (
                <div
                  key={member.id}
                  className="opacity-0 animate-fade-in-up"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: 'forwards'
                  }}
                >
                  <TeamCard
                    name={member.name}
                    role={member.role}
                    photo={member.photo}
                    area_of_work={member.area_of_work}
                    affiliation={member.affiliation}
                    profileUrl={member.profileUrl}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">👥</div>
              <p className="text-xl text-gray-600">No research team members found</p>
            </div>
          )}
        </section>

        {/* Collaborators Section */}
        <section>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-full p-4 mr-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Collaborators</h2>
                <p className="text-xl text-gray-600">Valued partners contributing to our research excellence</p>
              </div>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-600 mx-auto rounded-full"></div>
          </div>

          {collaborators.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {collaborators.map((member, index) => (
                <div
                  key={member.id}
                  className="opacity-0 animate-fade-in-up"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: 'forwards'
                  }}
                >
                  <TeamCard
                    name={member.name}
                    role={member.role}
                    photo={member.photo}
                    area_of_work={member.area_of_work}
                    affiliation={member.affiliation}
                    profileUrl={member.profileUrl}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">🤝</div>
              <p className="text-xl text-gray-600">No collaborators found</p>
            </div>
          )}
        </section>
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-gray-300 text-xl mb-10 leading-relaxed">
            Interested in contributing to cutting-edge monetary policy research?
            We're always looking for talented individuals to join our team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Research Opportunities
            </button>
            <Link to="/contact">
              <button className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
                Collaboration Inquiries
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}