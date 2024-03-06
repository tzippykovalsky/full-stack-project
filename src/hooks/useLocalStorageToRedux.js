

import { useDispatch } from 'react-redux';

const useLocalStorageToRedux = () => { 
  
  const dispatch = useDispatch();

  const localStorageToRedux = (key, action) => {
    const dataFromLocalStorage = localStorage.getItem(key);
    if (dataFromLocalStorage) {
      dispatch(action(JSON.parse(dataFromLocalStorage)));
    }
  }
  return localStorageToRedux;



};

export default useLocalStorageToRedux;
