import { Routes, Route } from 'react-router-dom'

import Header from './components/header'
import Footer from './components/footer'
import CategoriesPage from './pages/categories'
import CategoryPage from './pages/category'
import ProductsPage from './pages/products'
import ProductPage from './pages/product'
import SalesPage from './pages/sales'
import CartPage from './pages/cart'

import NotFound from './pages/notFound'
import Hero from './components/hero'


function App() {
  return (
    <div className="app">
      <Header />

      
        <Routes>
          

<Route path="/" element={<Hero />} />

          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/:id" element={<CategoryPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/cart" element={<CartPage />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
     

      <Footer />
    </div>
  )
}

export default App
