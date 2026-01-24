import { Routes, Route } from 'react-router-dom'

import Header from './components/header'
import Footer from './components/footer'

import Home from './pages/home'
import Categories from './pages/categories'
import Sales from './pages/sales'

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/sales" element={<Sales />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
