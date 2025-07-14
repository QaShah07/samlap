// src/App.tsx

import React from "react";
// import Header from "./components/Header";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import AppRoutes from "./routes";

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Header />
      <Navbar /> */}
      <main className="flex-grow">
        <AppRoutes />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
