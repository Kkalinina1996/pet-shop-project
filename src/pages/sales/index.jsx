import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { addToCart } from '../../redux/slices/cartSlice'
import styles from './styles.module.css'

function SalePage() {
  const dispatch = useDispatch()

  const [products, setProducts] = useState([])
  const [sortBy, setSortBy] = useState('default')

  useEffect(() => {
    axios
      .get('http://localhost:3333/products/all')
      .then(response => {
        const discountedProducts = response.data.filter(
          p => p.discont_price
        )
        setProducts(discountedProducts)
      })
      .catch(error => {
        console.log('Ошибка:', error)
      })
  }, [])

  const sortedProducts = [...products].sort((a, b) => {
    const priceA = a.discont_price
    const priceB = b.discont_price

    if (sortBy === 'price-asc') return priceA - priceB
    if (sortBy === 'price-desc') return priceB - priceA
    if (sortBy === 'title') return a.title.localeCompare(b.title)
    return 0
  })

  const handleAddToCart = product => {
    dispatch(addToCart(product))
  }

  return (
    <div className={styles.salePage}>
      <div className={styles.breadcrumbs}>
        <Link to="/">Main page</Link>
        <span> - </span>
        <span>All sales</span>
      </div>

      <h1>Discounted items</h1>

      {/* SORT */}
      <div className={styles.sortFilter}>
        <label>Sorted</label>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="default">by default</option>
          <option value="title">by title</option>
          <option value="price-asc">by price: low to high</option>
          <option value="price-desc">by price: high to low</option>
        </select>
      </div>

      <div className={styles.productsGrid}>
        {sortedProducts.map(product => (
          <div key={product.id} className={styles.productCard}>
            <Link to={`/products/${product.id}`}>
              <img
                src={`http://localhost:3333${product.image}`}
                alt={product.title}
              />
            </Link>

            <div className={styles.discount}>
              -
              {Math.round(
                (1 - product.discont_price / product.price) * 100
              )}
              %
            </div>

            <div className={styles.productInfo}>
              <Link to={`/products/${product.id}`}>
                <h3>{product.title}</h3>
              </Link>

              <div className={styles.priceRow}>
                <div className={styles.prices}>
                  <span className={styles.currentPrice}>
                    ${product.discont_price}
                  </span>
                  <span className={styles.oldPrice}>
                    ${product.price}
                  </span>
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  className={styles.addButton}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SalePage
