import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/slices/cartSlice'
import {
  fetchProductById,
  clearCurrentProduct
} from '../../redux/slices/productsSlice'
import styles from './styles.module.css'

const Product = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const { currentProduct, status } = useSelector(
    state => state.products
  )

  useEffect(() => {
    dispatch(fetchProductById(id))

    return () => {
      dispatch(clearCurrentProduct())
    }
  }, [id, dispatch])

  if (status === 'loading' || !currentProduct) {
    return <p>Loading...</p>
  }

  const {
    title,
    image,
    price,
    discont_price,
    description
  } = currentProduct

  const hasDiscount = discont_price !== null

  return (
    <section className={styles.page}>
      <div className={styles.left}>
        <img
          src={`http://localhost:3333${image}`}
          alt={title}
        />
      </div>

      <div className={styles.right}>
        <h1>{title}</h1>

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
          onClick={() => dispatch(addToCart(currentProduct))}
        >
          Add to cart
        </button>

        <div className={styles.description}>
          <h3>Description</h3>
          <p>{description}</p>
        </div>
      </div>
    </section>
  )
}

export default Product
