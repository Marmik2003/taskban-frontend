import React from "react";
import { LayoutContext } from "../context/LayoutContext";
import Logo from "./Logo";
import Navbar from "./Navbar";
import ScreenLoading from "./ScreenLoading";
import Sidebar from "./Sidebar";

const BaseLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 300);

  return (
    
    <LayoutContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        isUserMenuOpen,
        setIsUserMenuOpen,
      }}
    >
      {isLoading && (
        <ScreenLoading />
      )}
      <div className="md:fixed md:w-full md:top-0 md:z-20 flex flex-row flex-wrap items-center bg-white p-6 border-b border-gray-300">
        <Logo />
        <Navbar />
      </div>
      {/* end navbar */}
      {/* strat wrapper */}
      <div className="h-screen flex flex-row flex-wrap">
        <Sidebar />
        {/* strat content */}
        <div className="bg-gray-100 flex-1 p-6 md:mt-16"></div>
        {/* end content */}
      </div>
    </LayoutContext.Provider>
  );
};

export default BaseLayout;
