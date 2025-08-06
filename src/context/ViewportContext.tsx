import { createContext, useContext, useEffect, useState, ReactNode } from "react";

const ViewportContext = createContext<Record<string, boolean>>({});

export const ViewportProvider = ({ children } : { children: ReactNode }) => {
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
