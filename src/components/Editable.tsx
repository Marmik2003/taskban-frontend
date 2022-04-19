import React, { useState, useEffect } from "react";

interface EditableProps {
  text?: string;
  type: string;
  placeholder?: string;
  children?: React.ReactNode;
  childRef?: React.RefObject<HTMLDivElement>;
  className?: string;
}

const Editable = ({
  text,
  type,
  placeholder,
  children,
  childRef,
  className,
  ...props
}: EditableProps) => {
  const [isEditing, setEditing] = useState(false);

  useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus();
    }
  }, [isEditing, childRef]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, type: string) => {
    const { key } = event;
    const keys = ["Escape", "Tab"];
    const enterKey = "Enter";
    const allKeys = [...keys, enterKey];
    if (
      (type === "textarea" && keys.indexOf(key) > -1) ||
      (type !== "textarea" && allKeys.indexOf(key) > -1)
    ) {
      setEditing(false);
    }
  };

  return (
    <section {...props}>
      {isEditing ? (
        <div
          onBlur={() => setEditing(false)}
          onKeyDown={e => handleKeyDown(e, type)}
        >
          {children}
        </div>
      ) : (
        <div
          className={className ? className : `rounded py-2 px-3 text-gray-700 leading-tight whitespace-pre-wrap hover:shadow-outline editable-${type}`}
          onClick={() => setEditing(true)}
        >
          <span className={`${text ? "text-gray-700" : "text-gray-500"}`}>
            {text || placeholder || "Click to edit"}
          </span>
        </div>
      )}
    </section>
  );
};

export default Editable;