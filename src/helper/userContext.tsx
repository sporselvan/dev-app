import React, { createContext, useContext, ReactNode, useState } from "react";

interface UserContextProps {
  children: ReactNode;
}

interface UserContextValue {
  userId: string | null;
  // productId: string | null;
  // itemId: string | null;
  setUserId: (userId: string) => void;
  // setProductId: (productId: string) => void;
  // setItemId: (itemId: string) => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);

  return (
    // <UserContext.Provider value={{ userId, productId, itemId, setUserId, setProductId, setItemId }}>
    //   {children}
    // </UserContext.Provider>
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
