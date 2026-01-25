import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../redux/slices/productsSlice'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'

const Sales = () => {
  const dispatch = useDispatch()
  const { items = [], status } = useSelector(state => state.products || {})

  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  
  const [sort, setSort] = useState('default')

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [dispatch, status])

  const discounted = items.filter(p => p.discont_price)

  let filtered = discounted.filter(p => {
    const price = p.discount_price
    if (minPrice && price < minPrice) return false
    if (maxPrice && price > maxPrice) return false
    return true
  })

  if (sort === 'price-asc') {
    filtered.sort((a, b) => a.discont_price - b.discont_price)
  }

  if (sort === 'price-desc') {
    filtered.sort((a, b) => b.discount_price - a.discont_price)
  }

  if (status === 'loading') return <p>Loading...</p>

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Discounted items</h1>

      {/* FILTER BAR */}
      <div className={styles.filters}>
        <input
          type="number"
          placeholder="Price from"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price to"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
        />

        

        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="default">Sorted by default</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
        </select>
      </div>

      {/* PRODUCTS */}
      <div className={styles.grid}>
        {filtered.map(product => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className={styles.card}
          >
            <img
              src={`http://localhost:3333${product.image}`}
              alt={product.title}
            />

            <p className={styles.name}>{product.title}</p>

            <div className={styles.prices}>
              <span className={styles.newPrice}>
                ${product.discont_price}
              </span>
              <span className={styles.oldPrice}>
                ${product.price}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Sales
