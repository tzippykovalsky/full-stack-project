import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import ProductDetails from './product/ProductDetails';
import ChatCopmonent from './ChatCopmonent';
import Home from '../pages/Home';
import AddProductToSite from '../pages/AddProductToSite';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import ProductsList from '../pages/ProductsList';
import OrdersList from '../pages/OrdersList';

const Router = () => {
  return (
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
  );
}

export default Router;
