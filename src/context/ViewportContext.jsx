import React, { createContext, useContext, useEffect, useState } from "react";

const ViewportContext = createContext(undefined);

export const ViewportProvider = ({ children }) => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 840);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 840);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ViewportContext.Provider value={{ isMobileView }}>
      {children}
    </ViewportContext.Provider>
  );
};

export const useViewport = () => useContext(ViewportContext);
