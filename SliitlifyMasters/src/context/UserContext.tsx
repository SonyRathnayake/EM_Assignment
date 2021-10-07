import React, { FC, useState, createContext } from 'react';
type NameValue = { user?: any; setUser: any };
//Extra-light 200 italic

export const UserContext = createContext<NameValue>({
  user: null,
  setUser: Function,
});

export const UserProvider: FC = ({ children }) => {
  const [user, setUser] = React.useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
