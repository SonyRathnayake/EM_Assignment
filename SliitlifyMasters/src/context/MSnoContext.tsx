import React, { FC, useState, createContext } from 'react';
type NameValue = { msNo: string; setMsNo: any };

export const MSnoContext = createContext<NameValue>({
  msNo: '',
  setMsNo: undefined,
});

export const MsProvider: FC = ({ children }) => {
  const [msNo, setMsNo] = useState<string>('');
  return (
    <MSnoContext.Provider value={{ msNo, setMsNo }}>
      {children}
    </MSnoContext.Provider>
  );
};
