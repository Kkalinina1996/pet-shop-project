import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../../redux/slices/productsSlice'
import ProductCard from '../productCards'
import styles from './styles.module.css'

const SaleSection = () => {
  const dispatch = useDispatch()
  const { items, status } = useSelector(state => state.products)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [dispatch, status])

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  const saleProducts = items
    .filter(product => product.discont_price !== null)
    .slice(0, 4)

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>Sale</h2>
        <Link to="/sales" className={styles.all}>
          All sales
        </Link>
      </div>

      <div className={styles.grid}>
        {saleProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  )
}

export default SaleSection
