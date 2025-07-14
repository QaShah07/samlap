import React, { useState, useEffect } from 'react';
import { 
  Cloud, 
  Calendar, 
  TrendingUp, 
  BarChart3, 
  ChevronDown,
  Activity,
  Hash,
  Clock,
  Database
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import api from '../../services/api';

interface WordData {
  word: string;
  frequency: number;
}

interface YearlyWordCloud {
  year: number;
  words: WordData[];
}

interface MonthlyData {
  month: number;
  month_name: string;
  words: { [key: string]: number };
}

interface MonthlyTrends {
  year: number;
  monthly_data: MonthlyData[];
}

interface Statistics {
  total_entries: number;
  unique_words: number;
  years_covered: number;
  most_frequent_word: string;
  highest_frequency: number;
}

const WordCloudAnalysis: React.FC = () => {
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [wordCloudData, setWordCloudData] = useState<WordData[]>([]);
  const [monthlyTrends, setMonthlyTrends] = useState<MonthlyData[]>([]);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fetch available years on component mount
  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await api.get<number[]>('/minutesAnalysis/years/');
        setAvailableYears(response.data);
        if (response.data.length > 0) {
          setSelectedYear(response.data[0]); // Select most recent year by default
        }
      } catch (err) {
        console.error('Error fetching years:', err);
        setError('Failed to load available years');
      }
    };

    const fetchStatistics = async () => {
      try {
        const response = await api.get<Statistics>('/minutesAnalysis/statistics/');
        setStatistics(response.data);
      } catch (err) {
        console.error('Error fetching statistics:', err);
      }
    };

    Promise.all([fetchYears(), fetchStatistics()]).finally(() => setLoading(false));
  }, []);

  // Fetch data when year changes
  useEffect(() => {
    if (selectedYear) {
      fetchYearData(selectedYear);
    }
  }, [selectedYear]);

  const fetchYearData = async (year: number) => {
    try {
      setLoading(true);
      const [wordCloudResponse, trendsResponse] = await Promise.all([
        api.get<YearlyWordCloud>(`/minutesAnalysis/wordcloud/${year}/`),
        api.get<MonthlyTrends>(`/minutesAnalysis/trends/${year}/`)
      ]);

      setWordCloudData(wordCloudResponse.data.words);
      setMonthlyTrends(trendsResponse.data.monthly_data);
      setError(null);
    } catch (err) {
      console.error('Error fetching year data:', err);
      setError('Failed to load data for selected year');
    } finally {
      setLoading(false);
    }
  };

  // Generate word cloud visual representation
  const generateWordCloud = () => {
    if (wordCloudData.length === 0) return null;

    const maxFrequency = Math.max(...wordCloudData.map(w => w.frequency));
    const minFrequency = Math.min(...wordCloudData.map(w => w.frequency));
    
    return (
      <div className="relative w-full h-96 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 overflow-hidden">
        <div className="flex flex-wrap justify-center items-center h-full gap-2">
          {wordCloudData.slice(0, 50).map((word, index) => {
            // Calculate font size based on frequency (12px to 48px)
            const fontSize = 12 + ((word.frequency - minFrequency) / (maxFrequency - minFrequency)) * 36;
            
            // Generate random colors
            const colors = [
              'text-blue-600', 'text-indigo-600', 'text-purple-600', 
              'text-green-600', 'text-teal-600', 'text-cyan-600',
              'text-red-600', 'text-pink-600', 'text-orange-600'
            ];
            const colorClass = colors[index % colors.length];
            
            return (
              <span
                key={`${word.word}-${index}`}
                className={`font-bold ${colorClass} hover:scale-110 transition-transform duration-200 cursor-pointer`}
                style={{ fontSize: `${fontSize}px` }}
                title={`${word.word}: ${word.frequency} occurrences`}
              >
                {word.word}
              </span>
            );
          })}
        </div>
      </div>
    );
  };

  // Prepare data for monthly trends chart
  const prepareMonthlyChartData = () => {
    if (monthlyTrends.length === 0) return [];

    return monthlyTrends.map(month => {
      const chartData: any = {
        month: month.month_name.substring(0, 3), // Short month name
        month_full: month.month_name
      };

      // Add top words as separate series
      Object.entries(month.words).forEach(([word, frequency]) => {
        chartData[word] = frequency;
      });

      return chartData;
    });
  };

  const chartData = prepareMonthlyChartData();
  const topWords = wordCloudData.slice(0, 5); // Get top 5 words for the chart

  // Colors for different words in the chart
  const chartColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  if (loading && availableYears.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-xl font-medium">Loading word analysis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center mb-6">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-4 mr-4">
              <Cloud className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">MPC Meeting Minutes Analysis</h1>
              <p className="text-xl text-blue-100 max-w-3xl">
                Word Cloud and frequency analysis of Monetary Policy Committee meeting minutes
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Statistics Cards */}
        {statistics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-100 rounded-full p-3">
                  <Database className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-500">Total Entries</span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{statistics.total_entries.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Word frequency records</div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-100 rounded-full p-3">
                  <Hash className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-500">Unique Words</span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{statistics.unique_words.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Distinct vocabulary</div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-100 rounded-full p-3">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-500">Years Covered</span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{statistics.years_covered}</div>
              <div className="text-sm text-gray-600">Data span</div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-orange-100 rounded-full p-3">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-sm font-medium text-gray-500">Top Word</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{statistics.most_frequent_word}</div>
              <div className="text-sm text-gray-600">{statistics.highest_frequency.toLocaleString()} occurrences</div>
            </div>
          </div>
        )}

        {/* Year Selection */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-12">
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Year for Analysis
            </label>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full max-w-md bg-white border border-gray-300 rounded-xl px-4 py-3 text-left shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {selectedYear ? `Year ${selectedYear}` : 'Select a year'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {selectedYear && wordCloudData.length > 0 && `${wordCloudData.length} words analyzed`}
                      </div>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 w-full max-w-md mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto">
                  {availableYears.map((year) => (
                    <button
                      key={year}
                      onClick={() => {
                        setSelectedYear(year);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left p-4 hover:bg-gray-50 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl ${
                        selectedYear === year ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3 text-sm">
                          {year.toString().slice(-2)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Year {year}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            MPC Meeting Minutes
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Word Cloud Section */}
          {selectedYear && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Word Cloud - {selectedYear}
                </h3>
                <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                  <Activity className="w-4 h-4 mr-2" />
                  <span className="font-medium">{wordCloudData.length} words</span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6">
                Visual representation of the most frequent words in the MPC meeting minutes. 
                Larger words indicate higher frequency.
              </p>

              {loading ? (
                <div className="flex items-center justify-center h-96 bg-gray-50 rounded-2xl">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Generating word cloud...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-96 bg-red-50 rounded-2xl">
                  <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <p className="text-red-600 font-semibold">{error}</p>
                  </div>
                </div>
              ) : (
                generateWordCloud()
              )}
            </div>
          )}
        </div>

        {/* Monthly Frequency Trends */}
        {selectedYear && chartData.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-12">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Monthly Word Frequency Trends - {selectedYear}
              </h3>
              <p className="text-gray-600">
                Track how the frequency of top words changes throughout the year
              </p>
            </div>

            <div className="mb-6">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
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
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  {topWords.map((word, index) => (
                    <Line
                      key={word.word}
                      type="monotone"
                      dataKey={word.word}
                      stroke={chartColors[index]}
                      strokeWidth={3}
                      dot={{ fill: chartColors[index], strokeWidth: 2, r: 4 }}
                      name={word.word}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 justify-center">
              {topWords.map((word, index) => (
                <div key={word.word} className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-2"
                    style={{ backgroundColor: chartColors[index] }}
                  ></div>
                  <span className="text-sm font-medium text-gray-700">
                    {word.word} ({word.frequency})
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top Words Table */}
        {selectedYear && wordCloudData.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">Top Words - {selectedYear}</h3>
              <p className="text-gray-600 mt-2">Most frequently used words in MPC meeting minutes</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Rank</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Word</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Frequency</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Relative Usage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {wordCloudData.slice(0, 20).map((word, index) => {
                    const maxFreq = wordCloudData[0]?.frequency || 1;
                    const percentage = ((word.frequency / maxFreq) * 100).toFixed(1);
                    
                    return (
                      <tr key={word.word} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full text-sm font-bold">
                            {index + 1}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-gray-900 text-lg">{word.word}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            {word.frequency.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center">
                            <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                              <div 
                                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-600">{percentage}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WordCloudAnalysis;