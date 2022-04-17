import React from "react";
import { LayoutContext } from "../context/LayoutContext";
import Logo from "./Logo";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { previledgedRoutes } from '../routes'
import { useRoutes } from "react-router-dom";

const BaseLayout = () => {
  const renderedRoutes = useRoutes(previledgedRoutes);
  
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  
  return (
    
    <LayoutContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        isUserMenuOpen,
        setIsUserMenuOpen,
      }}
    >
      <div className="md:fixed md:w-full md:top-0 md:z-20 flex flex-row flex-wrap items-center bg-white p-6 border-b border-gray-300">
        <Logo />
        <Navbar />
      </div>
      {/* end navbar */}
      {/* start wrapper */}
      <div className="h-screen flex flex-row flex-wrap">
        <Sidebar />
        {/* start content */}
        <div className="bg-gray-100 flex-1 p-12 lg:p-6 md:mt-16">
          {renderedRoutes}
        </div>
        {/* end content */}
      </div>
    </LayoutContext.Provider>
  );
};

export default BaseLayout;
