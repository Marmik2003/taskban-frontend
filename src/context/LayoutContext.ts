import React from "react";

interface LayoutContextProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isUserMenuOpen: boolean;
    setIsUserMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LayoutDefaultContext: LayoutContextProps = {
    isSidebarOpen: false,
    setIsSidebarOpen: () => {},
    isUserMenuOpen: false,
    setIsUserMenuOpen: () => {},
}

export const LayoutContext = React.createContext(LayoutDefaultContext);
