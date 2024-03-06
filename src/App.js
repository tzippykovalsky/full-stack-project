import './App.css';
import ProductsList from './features/product/ProductsList';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navBar/Navbar';

import "./components/general.css"
import Cart from './features/order/Cart';
import SignUp from './features/user/SignUp';
import Login from './features/user/Login';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { loginState } from './features/user/userSlice';
import OrdersList from './features/order/OrdersList';
import EndOfOrder from './features/order/EndOfOrder';
import { addArrProductToState } from './features/order/orderSlice';
import { saveCurrentPageOnSiteToState } from './features/product/productSlice';
import useLocalStorageToRedux from './hooks/useLocalStorageToRedux';
import ProtectedRoute from './components/ProtectedRoute';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import ProductDetails from './features/product/ProductDetails';
import ChatCopmonent from './components/ChatCopmonent';
import AddProductToSite from './features/product/AddProductToSite';
import Home from './components/Home';
import Footer from './components/Footer';
import Delivery from './components/Delivey';
// import { config } from "dotenv"; למה לא עובד



function App() {

  let localStorageToRedux = useLocalStorageToRedux();
  let currentUser = useSelector((state) => state.user.currentUser)

  useEffect(() => {



    localStorageToRedux('myUser', loginState)
    localStorageToRedux('currentPages', saveCurrentPageOnSiteToState)
    localStorageToRedux('myCart', addArrProductToState)

  }, [])


  return (
    <>

      <Navbar />

      <Routes>

        <Route path='/all-products/' element={<ProductsList />} >
          <Route path='details/:item/' element={<ProductDetails />} />
        </Route>

        <Route path='/' element={<Home />} />
        <Route path='/livingRoom/' element={<ProductsList />} />
        <Route path='/kitchen/' element={<ProductsList />} />
        <Route path='/design/' element={<ProductsList />} />
        <Route path='/dishes/' element={<ProductsList />} />
        <Route path='/table/' element={<ProductsList />} />
        <Route path='/login/' element={<Login />} />
        <Route path='/signup/' element={<SignUp />} />
        <Route path='/cart/' element={<Cart />} />
        <Route path='/endOfOrder/' element={<EndOfOrder />} />

        <Route path='/addProductToSite/' element={
          <ProtectedRoute>
            <AddProductToSite />
          </ProtectedRoute>} />

        <Route path='/chatAdmin/' element={
          <ProtectedRoute>
            <ChatCopmonent />
          </ProtectedRoute>} />

        <Route path='/ordersList/' element={
          <ProtectedRoute>
            <OrdersList />
          </ProtectedRoute>} />


      </Routes>

{/* <Delivery/> */}
      {currentUser && currentUser.role === 1 && <ChatCopmonent />}
      <Footer />
    </>
  );
}

export default App;
