import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchProducts } from '../../redux/slices/productsSlice'
import { addToCart } from '../../redux/slices/cartSlice'
import styles from './styles.module.css'

const ProductPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const { items = [], status } = useSelector(
    state => state.products || {}
  )

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [dispatch, status])

  const product = items.find(p => p.id === Number(id))

  if (status === 'loading') return <p className={styles.loading}>Loading...</p>
  if (!product) return <p className={styles.loading}>Product not found</p>

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <img
          src={`http://localhost:3333${product.image}`}
          alt={product.title}
          className={styles.image}
        />

        <div className={styles.info}>
          <h1 className={styles.title}>{product.title}</h1>

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

          <button
            className={styles.button}
            onClick={() => dispatch(addToCart(product))}
          >
            Add to cart
          </button>

          <p className={styles.description}>
            High quality product for your pet. Safe materials,
            modern design and long-lasting comfort.
          </p>
        </div>
      </div>
    </section>
  )
}

export default ProductPage
