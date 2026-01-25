import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../redux/slices/productsSlice'
import ProductCard from '../../components/productCards'
import styles from './styles.module.css'

const Sales = () => {
  const dispatch = useDispatch()
  const { items, status } = useSelector(state => state.products)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [dispatch, status])

  const sales = items.filter(
    product => product.discont_price !== null
  )

  if (status === 'loading') {
    return <p className={styles.loading}>Loading...</p>
  }

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>All sales</h1>

      <div className={styles.grid}>
        {sales.map(product => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  )
}

export default Sales
