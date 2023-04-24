import React, { createContext, useState } from "react";

export const HomeContext = createContext();

export const HomeContextProvider = ({ children }) => {
  const [propcards, setPropcards] = useState([]);

  return (
    <HomeContext.Provider value={{ propcards, setPropcards }}>
      {children}
    </HomeContext.Provider>
  );
};