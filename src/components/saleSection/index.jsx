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

  const saleItems = items
    .filter(p => p.discount_price !== null)
    .slice(0, 4)

  if (saleItems.length === 0) return null

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>Sale</h2>
        <Link to="/sales">All sales</Link>
      </div>

      <div className={styles.list}>
        {saleItems.map(product => (
          <div key={product.id} className={styles.card}>
            <img
              src={`http://localhost:3333${product.image}`}
              alt={product.title}
            />
            <p>{product.title}</p>
            <p>${product.discount_price}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SaleSection
