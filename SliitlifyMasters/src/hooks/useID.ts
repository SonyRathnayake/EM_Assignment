import { useContext } from 'react';
import { MSnoContext } from '../context/MSnoContext';

const useId = () => {
  return useContext(MSnoContext);
};

export default useId;
