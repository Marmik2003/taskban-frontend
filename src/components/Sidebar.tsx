import React, { useContext, useEffect, useRef } from "react";
import { LayoutContext } from "../context/LayoutContext";

const Sidebar = () => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { isSidebarOpen, setIsSidebarOpen } = useContext(LayoutContext);

  useEffect(() => {
    const cList = sidebarRef.current?.classList;
    if (cList?.contains("md:-ml-64")) {
      cList.remove("md:-ml-64");
      cList.add("md:ml-0");
      cList.remove("md:animate__slideOutLeft");
      cList.add("md:animate__slideInLeft");
    } else {
      const _class = function () {
        cList?.remove("md:animate__slideInLeft");
        cList?.add("md:animate__slideOutLeft");
      };
      const animate = async () => {
        await _class();
        setTimeout(() => {
          cList?.replace('md:ml-0' , 'md:-ml-64');
          
        }, 300);
      };
      animate();
    }
  }, [isSidebarOpen]);

  return (
    <div
      id="sidebar"
      className="relative flex flex-col flex-wrap bg-white border-r border-gray-300 p-6 flex-none w-64 md:ml-0 md:fixed md:top-0 md:z-30 md:h-screen md:shadow-xl animate__animated animate__faster md:animate__slideOutLeft"
      ref={sidebarRef}
    >
      {/* sidebar content */}
      <div className="flex flex-col">
        {/* sidebar toggle */}
        <div className="text-right hidden md:block mb-4">
          <button id="sideBarHideBtn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <i className="fad fa-times-circle" />
          </button>
        </div>
        {/* end sidebar toggle */}
        {/* link */}
        <a
          href="/"
          className="mb-3 capitalize font-thin text-sm hover:text-blue-600 transition ease-in-out duration-500 my-2 bg-gray-100 px-2 py-2 rounded-lg"
        >
          <i className="far fa-home mr-2" />
          Home
        </a>
        {/* end link */}
        {/* link */}
        <a
          href="/"
          className="mb-3 capitalize font-thin text-sm hover:text-blue-600 transition ease-in-out duration-500 my-2 px-2 py-2 rounded-lg"
        >
          <i className="far fa-list mr-2" />
          Boards
        </a>
        {/* end link */}
        {/* link */}
        <a
          href="/"
          className="mb-3 capitalize font-thin text-sm hover:text-blue-600 transition ease-in-out duration-500 my-2 px-2 py-2 rounded-lg"
        >
          <i className="far fa-check mr-2" />
          To Do
        </a>
        {/* end link */}
      </div>
      {/* end sidebar content */}
    </div>
  );
};

export default Sidebar;
