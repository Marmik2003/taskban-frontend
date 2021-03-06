import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LayoutContext } from "../context/LayoutContext";
import NotImplementedComponent from "./NotImplementedComponent";

const Navbar = () => {
  const userMenuRef = useRef<HTMLDivElement>(null);
  const userBoxRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const auth = useAuth();

  const { isUserMenuOpen, setIsUserMenuOpen } = useContext(LayoutContext);
  const [isUserBoxOpen, setIsUserBoxOpen] = useState(false);

  const userMenuRender = useRef(false);
  const userBoxRender = useRef(false);

  useEffect(() => {
    if (userMenuRender.current) {
      if (userMenuRef.current?.classList.contains("md:hidden")) {
        userMenuRef.current?.classList.remove("md:hidden");
        userMenuRef.current?.classList.add("animate__fadeIn");
      } else {
        userMenuRef.current?.classList.remove("animate__fadeIn");
        userMenuRef.current?.classList.add("animate__fadeOut");
        setTimeout(() => {
          userMenuRef.current?.classList.remove("animate__fadeOut");
          userMenuRef.current?.classList.add("md:hidden");
        }, 300);
      }
    } else {
      userMenuRender.current = true;
    }
  }, [isUserMenuOpen]);

  useEffect(() => {
    if (userBoxRender.current) {
      if (userBoxRef.current?.classList.contains("hidden")) {
        userBoxRef.current?.classList.remove("hidden");
        userBoxRef.current?.classList.add("animate__fadeIn");
      } else {
        userBoxRef.current?.classList.remove("animate__fadeIn");
        userBoxRef.current?.classList.add("animate__fadeOut");
        setTimeout(() => {
          userBoxRef.current?.classList.remove("animate__fadeOut");
          userBoxRef.current?.classList.add("hidden");
        }, 300);
      } 
    } else {
      userBoxRender.current = true;
    }
  }, [isUserBoxOpen]);

  return (
    <>
      <button
        id="navbarToggle"
        className="hidden md:block md:fixed right-0 mr-6"
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
      >
        <i className="fad fa-chevron-double-down" />
      </button>
      {/* navbar content */}
      <div
        id="navbar"
        className="animate__animated md:fixed md:top-0 md:w-full md:left-0 md:mt-16 md:border-t md:border-b md:border-gray-200 md:p-10 md:bg-white flex-1 pl-3 flex flex-wrap justify-between items-center md:flex-col md:items-center flex-row-reverse md:hidden"
        ref={userMenuRef}
      >
        {/* right */}
        <div className="flex flex-row-reverse items-center">
          {/* user */}
          <div className="dropdown relative md:static">
            <button 
              className="menu-btn focus:outline-none focus:shadow-outline flex flex-wrap items-center"
              onClick={() => setIsUserBoxOpen(!isUserBoxOpen)}
            >
              <div className="w-8 h-8 overflow-hidden rounded-full">
                <img
                  className="w-full h-full object-cover"
                  alt="user"
                  src="/img/user.svg"
                />
              </div>
              <div className="ml-2 capitalize flex ">
                <h1 className="text-sm text-gray-800 font-semibold m-0 p-0 leading-none">
                  {auth.user?.name || auth.user?.username}
                </h1>
                <i className="fad fa-chevron-down ml-2 text-xs leading-none" />
              </div>
            </button>
            <button className="hidden fixed top-0 left-0 z-10 w-full h-full menu-overflow" />
            <div 
              className="text-gray-500 menu md:mt-10 md:w-full rounded bg-white shadow-md absolute z-20 right-0 w-40 mt-5 py-2 animate__animated animate__faster hidden"
              ref={userBoxRef}
            >
              {/* item */}
              <button
                className="px-4 py-2 w-full text-left block capitalize font-medium text-sm tracking-wide bg-white hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 ease-in-out"
                onClick={NotImplementedComponent}
              >
                <i className="fad fa-user-edit text-xs mr-1" />
                my profile
              </button>
              {/* end item */}
              <hr />
              {/* item */}
              <button
                className="w-full text-left px-4 py-2 block capitalize font-medium text-sm tracking-wide bg-white hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 ease-in-out"
                onClick={() => {
                  auth.signout(() => navigate("/login"));
                }}
              >
                <i className="fas fa-sign-out text-xs mr-1" />
                log out
              </button>
              {/* end item */}
            </div>
          </div>
          {/* end user */}
        </div>
        {/* end right */}
      </div>
      {/* end navbar content */}
    </>
  );
};

export default Navbar;
