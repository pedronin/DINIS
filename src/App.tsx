import React, { Suspense } from 'react';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';

import MainLayout from './components/Layouts/MainLayout';
import NotFound from './pages/NotFound';
import Loader from './components/Loader';


// import Cart from './pages/Cart';
// import Wishlist from './pages/Wishlist';
// import { ProductCart } from './pages/ProductCart';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const Wishlist = React.lazy(() => import(/* webpackChunkName: "Wishlist" */ './pages/Wishlist'));
const ProductCart = React.lazy(() => import(/* webpackChunkName: "ProductCart" */ './pages/ProductCart'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="cart" element={
          <Suspense fallback={<Loader bgW={true} />}>
            <Cart />
          </Suspense>
        } />
        <Route path="wishlist" element={<Suspense fallback={<Loader bgW={true} />}>
            <Wishlist />
          </Suspense>} />
        <Route path="product/:id" element={
          <Suspense fallback={<Loader bgW={true} />}>
          <ProductCart />
        </Suspense>
        } />
      </Route>
    </Routes>
  );
}

export default App;
