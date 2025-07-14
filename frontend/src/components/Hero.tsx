import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-[600px] w-full bg-[url('https://images.pexels.com/photos/4386442/pexels-photo-4386442.jpeg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 py-20 text-white">
          <h1 className="text-5xl font-bold mb-6">Central Bank Communication in India</h1>
          <p className="text-xl max-w-3xl mb-8">
            This project aims to enhance understanding of the Reserve Bank of India's communication strategies. It explores key questions such as the effectiveness of communication in managing expectations, the impact on financial markets, and the role of digital media in disseminating information.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md text-lg font-medium">
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;