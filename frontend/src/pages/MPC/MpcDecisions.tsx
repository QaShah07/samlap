import React, { useState, useEffect } from "react";
import api from "../../services/api";
import {
  ChevronUp,
  ChevronDown,
  Search,
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  Users,
  BarChart3,
  Brain,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface MPCDecision {
  id: number;
  date: string;
  policy_change: "rate_hike" | "rate_cut" | "rate_hold";
  voting_pattern: string;
  explicit_dissenter: string;
  implicit_dissent_score: string; // e.g. "0.85 VADER"
}

type SortKey = keyof MPCDecision | "implicit_dissent_score";
type SortDirection = "asc" | "desc";

const policyDisplayMap: Record<MPCDecision['policy_change'], string> = {
  rate_hike: "Rate Hike",
  rate_cut: "Rate Cut",
  rate_hold: "Rate Hold",
};

const MPCDecisions: React.FC = () => {
  const [decisions, setDecisions] = useState<MPCDecision[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  useEffect(() => {
    const fetchDecisions = async () => {
      try {
        const response = await api.get<MPCDecision[]>('/mpc/decisions/');
        setDecisions(response.data);
      } catch (err: any) {
        console.error("Error fetching MPC decisions:", err);
        setError(err.message || "Could not load MPC decisions.");
      } finally {
        setLoading(false);
      }
    };
    fetchDecisions();
  }, []);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const processedDecisions = decisions
    .map(dec => {
      const [scoreStr, ...llmParts] = dec.implicit_dissent_score.split(' ');
      return {
        ...dec,
        implicit_score: parseFloat(scoreStr),
        implicit_llm: llmParts.join(' '),
      };
    })
    .filter(d => {
      const term = searchTerm.trim().toLowerCase();
      if (!term) return true;
      return (
        d.date.toLowerCase().includes(term) ||
        policyDisplayMap[d.policy_change].toLowerCase().includes(term) ||
        d.voting_pattern.toLowerCase().includes(term) ||
        d.explicit_dissenter.toLowerCase().includes(term) ||
        d.implicit_dissent_score.toLowerCase().includes(term)
      );
    })
    .sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case 'date': cmp = a.date.localeCompare(b.date); break;
        case 'policy_change': cmp = policyDisplayMap[a.policy_change].localeCompare(policyDisplayMap[b.policy_change]); break;
        case 'voting_pattern': cmp = a.voting_pattern.localeCompare(b.voting_pattern); break;
        case 'explicit_dissenter': cmp = a.explicit_dissenter.localeCompare(b.explicit_dissenter); break;
        case 'implicit_dissent_score': cmp = a.implicit_score - b.implicit_score; break;
        default: break;
      }
      return sortDirection === 'asc' ? cmp : -cmp;
    });

  const getPolicyIcon = (policy: string) => {
    switch (policy) {
      case 'rate_hike': return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'rate_cut': return <TrendingDown className="w-4 h-4 text-green-500" />;
      case 'rate_hold': return <Minus className="w-4 h-4 text-blue-500" />;
      default: return null;
    }
  };

  const getPolicyBadgeColor = (policy: string) => {
    switch (policy) {
      case 'rate_hike': return 'bg-red-100 text-red-800 border-red-200';
      case 'rate_cut': return 'bg-green-100 text-green-800 border-green-200';
      case 'rate_hold': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDissenterBadgeColor = (d: string) =>
    d.includes('NA') || d.includes('6:0')
      ? 'bg-green-100 text-green-800 border-green-200'
      : 'bg-orange-100 text-orange-800 border-orange-200';

  const getVotingPatternDisplay = (pattern: string) => {
    const isUnanimous = pattern.includes('Unanimous');
    return (
      <div className="flex items-center space-x-2">
        {isUnanimous ? <CheckCircle className="w-4 h-4 text-green-500" /> : <AlertCircle className="w-4 h-4 text-orange-500" />}
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
          isUnanimous ? 'bg-green-100 text-green-800 border-green-200' : 'bg-orange-100 text-orange-800 border-orange-200'
        }`}>{pattern}</span>
      </div>
    );
  };

  const getLLMBadgeColor = (llm: string) => {
    if (llm.includes('VADER')) return 'bg-purple-100 text-purple-800 border-purple-200';
    if (llm.includes('finBERT')) return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    if (llm.includes('Central') || llm.includes('RoBERTA')) return 'bg-teal-100 text-teal-800 border-teal-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getLLMIcon = () => <Brain className="w-4 h-4" />;

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
        <p className="text-gray-600 text-xl">Loading MPC decisions...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center p-8 bg-red-50 rounded-lg border border-red-200">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <BarChart3 className="w-8 h-8 text-red-600" />
        </div>
        <p className="text-red-600 text-xl font-semibold mb-2">Error Loading Data</p>
        <p className="text-red-500">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-600 p-3 rounded-full mr-4"><BarChart3 className="w-8 h-8 text-white" /></div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">MPC Decisions</h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Explore the comprehensive history of Monetary Policy Committee decisions, including policy changes, voting patterns, and AI-powered dissent analysis.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card icon={<Calendar />} label="Total Decisions" value={decisions.length} />
          <Card icon={<CheckCircle />} label="Unanimous Votes" value={decisions.filter(d => d.voting_pattern.includes("Unanimous")).length} />
          <Card icon={<TrendingUp />} label="Rate Hikes" value={decisions.filter(d => d.policy_change==="rate_hike").length} />
          <Card icon={<Brain />} label="AI Analyses" value={decisions.filter(d=>d.implicit_dissent_score).length} />
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={e=>setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm bg-white" />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  {['Date','Policy Change','Voting Pattern','Explicit Dissenter','Sentiment score'].map((head, idx)=>(
                    <th key={idx} onClick={()=>handleSort(head.toLowerCase().replace(/ /g,'_') as SortKey)} className="px-6 py-4 text-left cursor-pointer hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                        {{
                          Date:<Calendar className="w-4 h-4" />, 
                          'Policy Change':<TrendingUp className="w-4 h-4" />, 
                          'Voting Pattern':<Users className="w-4 h-4" />, 
                          'Explicit Dissenter':<Users className="w-4 h-4" />, 
                          'Sentiment score':<Brain className="w-4 h-4" />
                        }[head]}
                        <span>{head}</span>
                        {sortKey===head.toLowerCase().replace(/ /g,'_') && (sortDirection==='asc'? <ChevronUp className="w-4 h-4 text-blue-600"/>:<ChevronDown className="w-4 h-4 text-blue-600"/>)}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {processedDecisions.length===0 ? (
                  <tr><td colSpan={5} className="px-6 py-12 text-center">
                    <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium text-gray-500">No decisions found</p>
                    <p className="text-sm text-gray-500">Try adjusting your search criteria</p>
                  </td></tr>
                ) : processedDecisions.map((d,i)=>(
                  <tr key={d.id} className={i%2? 'bg-gray-50':'bg-white hover:bg-gray-50 transition-colors'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{d.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getPolicyBadgeColor(d.policy_change)}`}>
                        {getPolicyIcon(d.policy_change)}<span className="ml-2">{policyDisplayMap[d.policy_change]}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getVotingPatternDisplay(d.voting_pattern)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getDissenterBadgeColor(d.explicit_dissenter)}`}>{d.explicit_dissenter}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {d.implicit_llm ? (
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getLLMBadgeColor(d.implicit_llm)}`}>
                          {getLLMIcon()}<span className="ml-2">{d.implicit_llm} ({d.implicit_score.toFixed(2)})</span>
                        </span>
                      ) : <span className="text-gray-400 text-sm">No analysis</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          Showing {processedDecisions.length} of {decisions.length} decisions{searchTerm && ` matching "${searchTerm}"`}
        </div>
      </div>
    </div>
  );
};

export default MPCDecisions;

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
