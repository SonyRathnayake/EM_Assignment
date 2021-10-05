import React, { FC, useState, createContext } from 'react';
type NameValue = { msNo: string; setMsNo: any };
//Extra-light 200 italic

export const MSnoContext = createContext<NameValue>({
  msNo: '',
  setMsNo: undefined,
});

export const MsProvider: FC = ({ children }) => {
  const [msNo, setMsNo] = useState<string>('');
  const [user, setUser] = React.useState(null);
  return (
    <MSnoContext.Provider value={{ msNo, setMsNo }}>
      {children}
    </MSnoContext.Provider>
  );
};
