import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../../redux/slices/productsSlice'
import styles from './styles.module.css'

const Products = () => {
  const dispatch = useDispatch()

  const { items = [], status, error } = useSelector(
    state => state.products || {}
  )

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [dispatch, status])

  if (status === 'loading') {
    return <p className={styles.loading}>Loading...</p>
  }

  if (status === 'failed') {
    return <p className={styles.error}>{error}</p>
  }

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>All products</h1>

      <div className={styles.grid}>
        {items.map(product => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className={styles.card}
          >
            <img
              src={`http://localhost:3333${product.image}`}
              alt={product.title}
              className={styles.image}
            />

            <p className={styles.name}>{product.title}</p>

            <div className={styles.prices}>
              {product.discont_price ? (
                <>
                  <span className={styles.newPrice}>
                    ${product.discont_price}
                  </span>
                  <span className={styles.oldPrice}>
                    ${product.price}
                  </span>
                </>
              ) : (
                <span className={styles.newPrice}>
                  ${product.price}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Products
