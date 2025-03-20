import './App.css';
import ProductsList from './pages/ProductsList';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navBar/Navbar';

import "./styles/general.css"
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { loginState } from './features/userSlice';
import OrdersList from './pages/OrdersList';
import { addArrProductToState } from './features/orderSlice';
import { saveCurrentPageOnSiteToState } from './features/productSlice';
import useLocalStorageToRedux from './hooks/useLocalStorageToRedux';
import ProtectedRoute from './components/ProtectedRoute';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import ProductDetails from './components/product/ProductDetails';
import ChatCopmonent from './components/ChatCopmonent';
import AddProductToSite from './pages/AddProductToSite';
import Home from './pages/Home';
import Footer from './components/layout/Footer';
import Delivery from './components/Delivey';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';



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
        <Route path='/checkout/' element={<Checkout />} />

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
