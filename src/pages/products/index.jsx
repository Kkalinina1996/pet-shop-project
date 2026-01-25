import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../redux/slices/productsSlice'
import ProductCard from '../../components/productCards'
import styles from './styles.module.css'

const Products = () => {
  const dispatch = useDispatch()
  const { items, status } = useSelector(state => state.products)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [dispatch, status])

  if (status === 'loading') return <p>Loading...</p>

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>All products</h1>

      <div className={styles.grid}>
        {items.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default Products
