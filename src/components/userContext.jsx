import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    console.log(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const updateHighscore = (newHighscore) => {
    if (user && newHighscore > user.Highscore) {
      setUser({ ...user, Highscore: newHighscore });
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateHighscore }}>
      {children}
    </UserContext.Provider>
  );
};
