import React from 'react';
import { Search } from 'lucide-react';

const WorkHeader: React.FC = () => {
  return (
    <div className="mb-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Research Papers</h1>
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search papers by title, author, or keywords"
          className="block w-full pl-10 pr-3 py-3 bg-gray-100 border-0 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm text-gray-600"
        />
      </div>
    </div>
  );
};

export default WorkHeader;