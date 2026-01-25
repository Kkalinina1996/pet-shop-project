import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/slices/cartSlice'
import styles from './styles.module.css'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()

  const { id, title, image, price, discount_price } = product

  const discount =
    discount_price
      ? Math.round(((price - discount_price) / price) * 100)
      : null

  const handleAdd = e => {
    e.preventDefault() // ❗ чтобы не переходило на страницу товара
    dispatch(addToCart(product))
  }

  return (
    <Link to={`/products/${id}`} className={styles.card}>
      {discount && (
        <div className={styles.discount}>-{discount}%</div>
      )}

      <div className={styles.imageWrapper}>
        <img
          className={styles.image}
          src={`http://localhost:3333${image}`}
          alt={title}
        />

        <button
          className={styles.addBtn}
          onClick={handleAdd}
        >
          Add to cart
        </button>
      </div>

      <p className={styles.title}>{title}</p>

      <div className={styles.prices}>
        <span className={styles.current}>
          ${discount_price ?? price}
        </span>

        {discount_price && (
          <span className={styles.old}>
            ${price}
          </span>
        )}
      </div>
    </Link>
  )
}

export default ProductCard
