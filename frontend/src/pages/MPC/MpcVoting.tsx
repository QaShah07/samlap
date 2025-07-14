import React, { useState, useEffect } from "react";
import api from "../../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Vote, 
  BarChart3, 
  Activity,
  ArrowUp,
  ArrowDown,
  Minus,
  Calendar,
  Clock,
  ChevronDown
} from "lucide-react";

interface MemberVoting {
  id: number;
  name: string;
  tenure?: string;
  hikes: number;
  cuts: number;
  holds: number;
  total_votes: number;
}

interface DissentYear {
  year: number;
  explicit_count: number;
  implicit_count: number;
}

const MpcVoting: React.FC = () => {
  const [members, setMembers] = useState<MemberVoting[]>([]);
  const [dissentYears, setDissentYears] = useState<DissentYear[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<MemberVoting | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mRes, dRes] = await Promise.all([
          api.get<MemberVoting[]>("/mpcVoting/members/"),
          api.get<DissentYear[]>("/mpcVoting/dissent/"),
        ]);
        setMembers(mRes.data);
        setDissentYears(dRes.data);
        if (mRes.data.length > 0) {
          setSelectedMember(mRes.data[0]);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load MPC voting data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-xl font-medium">Loading voting data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 text-xl font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  // Calculate statistics
  let explicitPercentChange = 0;
  let implicitPercentChange = 0;
  if (dissentYears.length >= 2) {
    const first = dissentYears[0];
    const last = dissentYears[dissentYears.length - 1];
    if (first.explicit_count > 0) {
      explicitPercentChange = ((last.explicit_count - first.explicit_count) / first.explicit_count) * 100;
    }
    if (first.implicit_count > 0) {
      implicitPercentChange = ((last.implicit_count - first.implicit_count) / first.implicit_count) * 100;
    }
  }

  const latestExplicit = dissentYears.length > 0 ? dissentYears[dissentYears.length - 1].explicit_count : 0;
  const latestImplicit = dissentYears.length > 0 ? dissentYears[dissentYears.length - 1].implicit_count : 0;

  // Calculate total votes across all members
  const totalVotes = members.reduce((sum, member) => sum + member.total_votes, 0);
  const totalHikes = members.reduce((sum, member) => sum + member.hikes, 0);
  const totalCuts = members.reduce((sum, member) => sum + member.cuts, 0);
  const totalHolds = members.reduce((sum, member) => sum + member.holds, 0);

  // Pie chart data for selected member
  const pieData = selectedMember ? [
    { name: 'Rate Hikes', value: selectedMember.hikes, color: '#EF4444' },
    { name: 'Rate Cuts', value: selectedMember.cuts, color: '#10B981' },
    { name: 'Rate Holds', value: selectedMember.holds, color: '#6B7280' }
  ] : [];

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{`Year: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="font-medium">
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center mb-6">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-4 mr-4">
              <Vote className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">MPC Voting Patterns</h1>
              <p className="text-xl text-blue-100 max-w-3xl">
                Comprehensive analysis of Monetary Policy Committee member voting behaviors and dissent patterns
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Key Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 rounded-full p-3">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Total Members</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{members.length}</div>
            <div className="text-sm text-gray-600">Active Committee Members</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 rounded-full p-3">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Total Votes</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{totalVotes}</div>
            <div className="text-sm text-gray-600">Across All Members</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 rounded-full p-3">
                <Activity className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Explicit Dissent</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{latestExplicit}</div>
            <div className={`text-sm flex items-center ${explicitPercentChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {explicitPercentChange >= 0 ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
              {Math.abs(explicitPercentChange).toFixed(0)}% vs 5Y ago
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 rounded-full p-3">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Implicit Dissent</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{latestImplicit}</div>
            <div className={`text-sm flex items-center ${implicitPercentChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {implicitPercentChange >= 0 ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
              {Math.abs(implicitPercentChange).toFixed(0)}% vs 5Y ago
            </div>
          </div>
        </div>

        {/* Member Voting Analysis */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-12">
          {/* Member Selection Dropdown */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select MPC Member
            </label>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full max-w-md bg-white border border-gray-300 rounded-xl px-4 py-3 text-left shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                      {selectedMember ? selectedMember.name.split(' ').map(n => n[0]).join('').slice(0, 2) : '?'}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {selectedMember ? selectedMember.name : 'Select a member'}
                      </div>
                      {selectedMember && (
                        <div className="text-sm text-gray-500">
                          {selectedMember.total_votes} total votes
                          {selectedMember.tenure && (
                            <span className="ml-2">• {selectedMember.tenure}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute z-10 w-full max-w-md mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto">
                  {members.map((member) => (
                    <button
                      key={member.id}
                      onClick={() => {
                        setSelectedMember(member);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left p-4 hover:bg-gray-50 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl ${
                        selectedMember?.id === member.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3 text-sm">
                          {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{member.name}</div>
                          <div className="text-sm text-gray-500">
                            {member.total_votes} total votes
                            {member.tenure && (
                              <span className="ml-2 flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {member.tenure}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Member Voting Distribution */}
          {selectedMember && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {selectedMember.name}'s Voting Pattern
                </h3>
                {selectedMember.tenure && (
                  <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="font-medium">Tenure:</span>
                    <span className="ml-1">{selectedMember.tenure}</span>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                    <div className="flex items-center">
                      <ArrowUp className="w-5 h-5 text-red-600 mr-3" />
                      <span className="font-medium text-red-900">Rate Hikes</span>
                    </div>
                    <span className="text-2xl font-bold text-red-600">{selectedMember.hikes}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <ArrowDown className="w-5 h-5 text-green-600 mr-3" />
                      <span className="font-medium text-green-900">Rate Cuts</span>
                    </div>
                    <span className="text-2xl font-bold text-green-600">{selectedMember.cuts}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Minus className="w-5 h-5 text-gray-600 mr-3" />
                      <span className="font-medium text-gray-900">Rate Holds</span>
                    </div>
                    <span className="text-2xl font-bold text-gray-600">{selectedMember.holds}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Comprehensive Member Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-12 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Complete Voting History</h2>
            <p className="text-gray-600 mt-2">Detailed breakdown of each member's voting record</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Member</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Tenure</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                    <div className="flex items-center justify-center">
                      <ArrowUp className="w-4 h-4 text-red-600 mr-1" />
                      Hikes
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                    <div className="flex items-center justify-center">
                      <ArrowDown className="w-4 h-4 text-green-600 mr-1" />
                      Cuts
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                    <div className="flex items-center justify-center">
                      <Minus className="w-4 h-4 text-gray-600 mr-1" />
                      Holds
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Total Votes</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Activity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {members.map((member, index) => (
                  <tr key={member.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                          {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{member.name}</div>
                          <div className="text-sm text-gray-500">MPC Member</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {member.tenure ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {member.tenure}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                        {member.hikes}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        {member.cuts}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                        {member.holds}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-lg font-bold text-gray-900">{member.total_votes}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(member.total_votes / Math.max(...members.map(m => m.total_votes))) * 100}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dissent Patterns Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Explicit Dissent */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Explicit Dissent Trends</h3>
                <p className="text-gray-600">Formal disagreements with majority decisions</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            
            <div className="mb-6">
              <div className="text-3xl font-bold text-gray-900 mb-2">{latestExplicit}</div>
              <div className={`flex items-center text-sm ${explicitPercentChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {explicitPercentChange >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                {explicitPercentChange >= 0 ? '+' : ''}{explicitPercentChange.toFixed(1)}% over 5 years
              </div>
            </div>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dissentYears}>
                <XAxis 
                  dataKey="year" 
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  allowDecimals={false}
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="explicit_count" 
                  fill="url(#blueGradient)" 
                  radius={[6, 6, 0, 0]}
                />
                <defs>
                  <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#1E40AF" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Implicit Dissent */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Implicit Dissent Trends</h3>
                <p className="text-gray-600">Subtle disagreements through statements</p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
            </div>
            
            <div className="mb-6">
              <div className="text-3xl font-bold text-gray-900 mb-2">{latestImplicit}</div>
              <div className={`flex items-center text-sm ${implicitPercentChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {implicitPercentChange >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                {implicitPercentChange >= 0 ? '+' : ''}{implicitPercentChange.toFixed(1)}% over 5 years
              </div>
            </div>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dissentYears}>
                <XAxis 
                  dataKey="year" 
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  allowDecimals={false}
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="implicit_count" 
                  fill="url(#greenGradient)" 
                  radius={[6, 6, 0, 0]}
                />
                <defs>
                  <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#047857" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Combined Dissent Trend */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Combined Dissent Analysis</h3>
            <p className="text-gray-600">Comparative view of explicit vs implicit dissent patterns over time</p>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dissentYears}>
              <XAxis 
                dataKey="year" 
                tick={{ fontSize: 12, fill: "#6B7280" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                allowDecimals={false}
                tick={{ fontSize: 12, fill: "#6B7280" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="explicit_count" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: "#3B82F6", strokeWidth: 2, r: 6 }}
                name="Explicit Dissent"
              />
              <Line 
                type="monotone" 
                dataKey="implicit_count" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: "#10B981", strokeWidth: 2, r: 6 }}
                name="Implicit Dissent"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MpcVoting;

// Helper Card component
const Card: React.FC<{icon: React.ReactNode; label: string; value: number}> = ({icon,label,value}) => (
  <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-lg flex items-center">
    <div className="mr-3 text-blue-600">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);