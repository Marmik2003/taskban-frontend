import { Menu, Transition } from "@headlessui/react";
import React from "react";

interface ColumnListDropdownProps {
  children: JSX.Element[];
}

const ColumnListDropdown = ({ children }: ColumnListDropdownProps) => {
  return (
    <>
      <Menu as="div" className="relative text-left inline-block lg:hidden">
        <Menu.Button className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100">
          <ThreeDotsIcon />
        </Menu.Button>
        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {children.map((child, index) => (
              <Menu.Item key={index}>{child}</Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};
const ThreeDotsIcon = () => (
  <svg
    className="w-4 h-4 fill-current"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
  </svg>
);


export default ColumnListDropdown;