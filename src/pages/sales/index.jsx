import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSaleProducts } from '../../redux/slices/saleSlice'
import ProductCard from '../../components/productCards'
import styles from './styles.module.css'

const Sales = () => {
  const dispatch = useDispatch()
  const { items = [], status } = useSelector(
    state => state.sales || {}
  )

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSaleProducts())
    }
  }, [dispatch, status])

  if (status === 'loading') return <p>Loading...</p>

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Discounted items</h1>

      <div className={styles.grid}>
        {items.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default Sales
