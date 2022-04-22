import { Listbox, Transition } from "@headlessui/react";
import React from "react";
import { Task } from "../../types/Board";

interface PriorityDropdownProps {
  priority: "L" | "M" | "H";
  setTask: React.Dispatch<React.SetStateAction<Task>>;
}

const DropdownList = [
  {
    value: "L",
    text: "Low",
    icon: <i className="far fa-arrow-down text-green-600 mr-1" />,
  },
  {
    value: "M",
    text: "Medium",
    icon: <i className="far fa-circle text-yellow-500 text-lg mr-1" />,
  },
  {
    value: "H",
    text: "High",
    icon: <i className="far fa-arrow-up text-red-600 mr-1" />,
  },
];

const PriorityDropdown = ({ priority, setTask }: PriorityDropdownProps) => {
  return (
    <Listbox
      value={priority}
      onChange={(e) => {
        setTask((task) => ({
          ...task,
          priority: e,
        }));
      }}
    >
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
          <span className="block truncate">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium leading-5 bg-white text-gray-800">
              {DropdownList.find((item) => item.value === priority)?.icon}

              <span className="ml-1">
                {DropdownList.find((item) => item.value === priority)?.text}
              </span>
            </span>
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <i className="fas fa-chevron-down"></i>
          </span>
        </Listbox.Button>
        <Transition
          as={React.Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {DropdownList.map((pr, prIdx) => (
              <Listbox.Option
                key={prIdx}
                className={({ active }) =>
                  `cursor-default select-none relative py-2 pl-10 pr-4 ${
                    active ? "text-amber-900 bg-amber-100" : "text-gray-900"
                  }`
                }
                value={pr.value}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {pr.icon}
                      {pr.text}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <i className="fas fa-check"></i>
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default PriorityDropdown;
