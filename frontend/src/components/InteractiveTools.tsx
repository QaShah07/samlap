import React from 'react';
import { LineChart, BarChart, PieChart } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// 1. Define the type for a tool
type Tool = {
  icon: LucideIcon;
  title: string;
  description: string;
};

// 2. Define the props for ToolCard
type ToolCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const ToolCard: React.FC<ToolCardProps> = ({ icon: Icon, title, description }) => (
  <div className="bg-emerald-600 p-6 rounded-lg text-white">
    <div className="bg-white/10 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
      <Icon size={32} className="text-white" />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-white/80">{description}</p>
  </div>
);

const InteractiveTools: React.FC = () => {
  const tools: Tool[] = [
    {
      icon: LineChart,
      title: "Policy Rate Tracker",
      description: "Track the latest policy rate decisions by the Reserve Bank of India and analyze historical trends."
    },
    {
      icon: BarChart,
      title: "Inflation Forecast Visualizer",
      description: "Visualize inflation forecasts from the Reserve Bank of India and compare them with market expectations."
    },
    {
      icon: PieChart,
      title: "Market Reaction Analyzer",
      description: "Analyze market reactions to key communication events from the Reserve Bank of India."
    }
  ];

  return (
    <section className="py-16 px-6">
      <h2 className="text-2xl font-bold mb-8">Interactive Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <ToolCard key={index} {...tool} />
        ))}
      </div>
    </section>
  );
};

export default InteractiveTools;