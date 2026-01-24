import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../redux/slices/productsSlice'
import styles from './styles.module.css'

const Sales = () => {
  const dispatch = useDispatch()
  const { items, status } = useSelector(state => state.products)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [dispatch, status])

  if (status === 'loading') {
    return <p className={styles.loading}>Loading...</p>
  }

  // 👉 ВСЕ товары со скидкой
  const saleItems = items.filter(
    product => product.discount_price !== null
  )

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>All sales</h1>

      <div className={styles.grid}>
        {saleItems.map(product => (
          <div key={product.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img
                src={`http://localhost:3333${product.image}`}
                alt={product.title}
              />

              <span className={styles.discountBadge}>
                -
                {Math.round(
                  100 -
                    (product.discount_price / product.price) * 100
                )}
                %
              </span>
            </div>

            <p className={styles.name}>{product.title}</p>

            <div className={styles.prices}>
              <span className={styles.newPrice}>
                ${product.discount_price}
              </span>
              <span className={styles.oldPrice}>
                ${product.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Sales
