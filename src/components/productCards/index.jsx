import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/slices/cartSlice'
import styles from './styles.module.css'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()

  const {
    title,
    image,
    price,
    discont_price,
    //description
  } = product

  const hasDiscount = discont_price !== null
  const discountPercent = hasDiscount
    ? Math.round(((price - discont_price) / price) * 100)
    : null

  return (
    <div className={styles.card}>
      {hasDiscount && (
        <span className={styles.badge}>
          -{discountPercent}%
        </span>
      )}

      <img
        src={`http://localhost:3333${image}`}
        alt={title}
      />

      <h3 className={styles.title}>{title}</h3>

      <div className={styles.prices}>
        <span className={styles.current}>
          ${hasDiscount ? discont_price : price}
        </span>

        {hasDiscount && (
          <span className={styles.old}>${price}</span>
        )}
      </div>

      <button
        className={styles.btn}
        onClick={() => dispatch(addToCart(product))}
      >
        Add to cart
      </button>
      {/*<div className={styles.description}>
        <h3>Description</h3>
        <p>{description}</p>*/}

      </div>
    //</div>

  )
}

export default ProductCard
