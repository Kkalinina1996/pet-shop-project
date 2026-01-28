import { Routes, Route } from 'react-router-dom'
import Header from './components/header'
import Footer from './components/Footer'

import Home from './pages/home'
import Categories from './pages/Categories'
import Category from './pages/Category'
import Products from './pages/Products'
import Sale from './pages/sales'
import Product from './pages/product'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:id" element={<Category />} />
        <Route path="/products" element={<Products />} />
        <Route path="/sales" element={<Sale />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
