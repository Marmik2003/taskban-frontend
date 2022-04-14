import React from "react";
import { LayoutContext } from "../context/LayoutContext";

const Logo = () => {
  const { isSidebarOpen, setIsSidebarOpen } = React.useContext(LayoutContext);

  return (
    <div className="flex-none w-56 flex flex-row items-center">
      <button
        id="sliderBtn"
        className="flex-none text-right text-gray-900 hidden md:block"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <i className="fad fa-bars" />
      </button>
      <img
        src="/img/logo-monochrome.svg"
        alt="Logo"
        className="w-28 ml-4 flex-none"
      />
    </div>
  );
};

export default Logo;
