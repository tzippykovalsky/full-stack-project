import { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import './App.css';
import "./styles/general.css";
import Navbar from './components/navBar/Navbar';
import Footer from './components/layout/Footer';
import ChatCopmonent from './components/ChatCopmonent';
import Router from './components/Router';
import { loginState } from './features/userSlice';
import { addArrProductToState } from './features/orderSlice';
import { saveCurrentPageOnSiteToState } from './features/productSlice';
import useLocalStorageToRedux from './hooks/useLocalStorageToRedux';

function App() {

  let localStorageToRedux = useLocalStorageToRedux();
  let currentUser = useSelector((state) => state.user.currentUser, shallowEqual);

  useEffect(() => {
    localStorageToRedux('myUser', loginState);
    localStorageToRedux('currentPages', saveCurrentPageOnSiteToState);
    localStorageToRedux('myCart', addArrProductToState);
  }, [])

  return (
    <>
      <Navbar />
      <Router />
      {currentUser?.role === 1 && <ChatCopmonent />}
      <Footer />
    </>
  );
}

export default App;
