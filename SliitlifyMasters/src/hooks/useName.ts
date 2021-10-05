import { useContext } from 'react';
import { NameContext } from '../context/NameContext';

const useName = () => {
  return useContext(NameContext);
};

export default useName;
