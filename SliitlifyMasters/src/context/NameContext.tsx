import React, { FC, useState, createContext } from 'react';
type NameValue = { name: string; setName: any };

export const NameContext = createContext<NameValue>({
  name: '',
  setName: undefined,
});

export const NameProvider: FC = ({ children }) => {
  const [name, setName] = useState<string>('');

  return (
    <NameContext.Provider value={{ name, setName }}>
      {children}
    </NameContext.Provider>
  );
};
