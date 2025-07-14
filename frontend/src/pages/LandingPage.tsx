import React from "react";
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import InteractiveTools from '../components/InteractiveTools';
import LatestUpdates from '../components/LatestUpdates';
import Footer from '../components/Footer';


const LandingPage: React.FC = () => {
  return (
    <>
    <div className="min-h-screen bg-gray-50">
          
          <Nav />
          <div className="w-full">
            <Hero />
          </div>
          <div className="max-w-7xl mx-auto px-4">
            <InteractiveTools />
          </div>
          <LatestUpdates />
          <Footer />
        </div>
        </>
  );
};

export default LandingPage