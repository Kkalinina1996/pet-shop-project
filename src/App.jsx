import { Routes, Route } from 'react-router-dom'

import Header from './components/header'
import Footer from './components/footer'

import Home from './pages/home'
import Categories from './pages/categories'
import Products from './pages/products'
import Sales from './pages/sales'
import Product from './pages/product'
import Cart from './pages/cart'
import Checkout from './pages/checkout'
import Category from './pages/category'
//import NotFound from './pages/notFound'

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
         <Route path="/categories/:id" element={<Category />} />
        {/*<Route path="*" element={<NotFound />} /> */}
      </Routes>

      <Footer />
    </>
  )
}

export default App
