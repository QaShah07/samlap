import React from 'react';

// Paper item type definition
type PaperItem = {
  type: string;
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
};

// Dataset item type definition
type DatasetItem = {
  type: string;
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
};

// Code repo item type definition
type CodeItem = {
  type: string;
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
};

const WorkBody: React.FC = () => {
  // Paper items data
  const papers: PaperItem[] = [
    {
      type: 'Working Paper',
      title: 'The Impact of Monetary Policy on Inflation in India',
      description: 'A comprehensive analysis of the relationship between monetary policy decisions and inflation rates in India, covering the period from 2010 to 2023.',
      imageUrl: 'https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      buttonText: 'Read Paper'
    },
    {
      type: 'Discussion Paper',
      title: 'Monetary Policy Transmission Mechanism in India',
      description: 'An examination of how monetary policy changes affect the real economy in India, focusing on the role of banks, financial markets, and consumer behavior.',
      imageUrl: 'https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      buttonText: 'Read Paper'
    },
    {
      type: 'Research Article',
      title: 'The Effectiveness of Quantitative Easing in India',
      description: 'An assessment of the impact of quantitative easing measures implemented by the Reserve Bank of India during the COVID-19 pandemic.',
      imageUrl: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      buttonText: 'Read Paper'
    }
  ];

  // Dataset items data
  const datasets: DatasetItem[] = [
    {
      type: 'Dataset',
      title: 'Indian Monetary Policy Indicators',
      description: 'A comprehensive dataset of key monetary policy indicators for India, including policy rates, reserve requirements, and liquidity measures.',
      imageUrl: 'https://images.pexels.com/photos/5926393/pexels-photo-5926393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      buttonText: 'Download CSV'
    },
    {
      type: 'Dataset',
      title: 'Inflation Data for India',
      description: 'A time series dataset of inflation rates in India, covering various measures such as CPI and WPI.',
      imageUrl: 'https://images.pexels.com/photos/5849577/pexels-photo-5849577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      buttonText: 'Download CSV'
    }
  ];

  // Code repo items data
  const codeRepos: CodeItem[] = [
    {
      type: 'Code Repository',
      title: 'Monetary Policy Analysis Code',
      description: 'A repository of code and scripts used for analyzing monetary policy in India, including implementations of various econometric models.',
      imageUrl: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      buttonText: 'View on GitHub'
    }
  ];

  return (
    <div>
      {/* Recent Papers Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Recent Papers</h2>
        <div className="space-y-8">
          {papers.map((paper, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-1">
                <div className="text-sm text-gray-600 mb-1">{paper.type}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{paper.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{paper.description}</p>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition">
                  {paper.buttonText}
                </button>
              </div>
              <div className="w-full md:w-1/3 h-48 overflow-hidden rounded-md">
                <img 
                  src={paper.imageUrl} 
                  alt={paper.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Data Repository Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Data Repository</h2>
        <div className="space-y-8">
          {datasets.map((dataset, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-1">
                <div className="text-sm text-gray-600 mb-1">{dataset.type}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{dataset.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{dataset.description}</p>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition">
                  {dataset.buttonText}
                </button>
              </div>
              <div className="w-full md:w-1/3 h-48 overflow-hidden rounded-md">
                <img 
                  src={dataset.imageUrl} 
                  alt={dataset.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Code Repository Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Code Repository</h2>
        <div className="space-y-8">
          {codeRepos.map((repo, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-1">
                <div className="text-sm text-gray-600 mb-1">{repo.type}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{repo.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{repo.description}</p>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition">
                  {repo.buttonText}
                </button>
              </div>
              <div className="w-full md:w-1/3 h-48 overflow-hidden rounded-md">
                <img 
                  src={repo.imageUrl} 
                  alt={repo.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WorkBody;