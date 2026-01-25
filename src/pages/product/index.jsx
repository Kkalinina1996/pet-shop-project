import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchProductById,
  clearCurrentProduct
} from '../../redux/slices/productsSlice'
import { addToCart } from '../../redux/slices/cartSlice'
import styles from './styles.module.css'

const Product = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const product = useSelector(
    state => state.products.currentProduct
  )

  useEffect(() => {
    dispatch(fetchProductById(id))
    return () => dispatch(clearCurrentProduct())
  }, [dispatch, id])

  if (!product) return null

  const {
    title,
    image,
    price,
    discont_price,
    description
  } = product

  const hasDiscount = discont_price !== null
  const discountPercent = hasDiscount
    ? Math.round(((price - discont_price) / price) * 100)
    : null

  return (
    <section className={styles.page}>
      <div className={styles.content}>
        {/* LEFT */}
        <div className={styles.images}>
          <img
            src={`http://localhost:3333${image}`}
            alt={title}
          />
        </div>

        {/* RIGHT */}
        <div className={styles.info}>
          <h1>{title}</h1>

          <div className={styles.priceRow}>
            <span className={styles.price}>
              ${hasDiscount ? discont_price : price}
            </span>

            {hasDiscount && (
              <>
                <span className={styles.old}>${price}</span>
                <span className={styles.badge}>
                  -{discountPercent}%
                </span>
              </>
            )}
          </div>

          <div className={styles.actions}>
            <button
              onClick={() => dispatch(addToCart(product))}
            >
              Add to cart
            </button>
          </div>

          <div className={styles.description}>
            <h3>Description</h3>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Product
