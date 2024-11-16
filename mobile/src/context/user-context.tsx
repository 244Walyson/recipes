import React, { createContext, useState, ReactNode, useContext } from "react";
import { IUserRequest } from "../interfaces/user/user-request.interface";
import { IUserResponse } from "../interfaces/user/user-response.interface";


interface UserContextType {
  user: IUserResponse | null;
  setUser: (user: IUserResponse) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUserResponse | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
