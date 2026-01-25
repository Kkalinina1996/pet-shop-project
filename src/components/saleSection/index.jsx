import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../redux/slices/productsSlice'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'

const SaleSection = () => {
  const dispatch = useDispatch()
  const { items = [], status } = useSelector(
    state => state.products || {}
  )

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [dispatch, status])

  if (status === 'loading') return <p>Loading...</p>

  const saleProducts = items
    .filter(p => p.discont_price)
    .slice(0, 4)

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>Sale</h2>
        <Link to="/sales">All sales</Link>
      </div>

      <div className={styles.grid}>
        {saleProducts.map(product => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className={styles.card}
          >
            <img
              src={`http://localhost:3333${product.image}`}
              alt={product.title}
            />

            <p>{product.title}</p>

            <div className={styles.prices}>
              <span>${product.discont_price}</span>
              <span className={styles.old}>
                ${product.price}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default SaleSection
