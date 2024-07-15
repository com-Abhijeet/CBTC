import React, { createContext, useState, ReactNode } from "react";

interface UserContextType {
  userName: string;
  setUserName: (name: string) => void;
  userId: string;
  setUserId: (id: string) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  return (
    <UserContext.Provider value={{ userName, setUserName, userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
