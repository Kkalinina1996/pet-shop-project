import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { addToCart } from '../../redux/slices/cartSlice'
import styles from './styles.module.css'

function Product() {
  const { id } = useParams()
  const dispatch = useDispatch()

  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    axios
      .get(`http://localhost:3333/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err))
  }, [id])

  if (!product) {
    return <p style={{ padding: 40 }}>Loading...</p>
  }

  const finalPrice = product.discont_price || product.price

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }))
  }

  return (
    <div className={styles.productPage}>

      {/* BREADCRUMBS */}
      <div className={styles.breadcrumbs}>
        <Link to="/">Main page</Link>
        <span> — </span>
        <Link to="/products">All products</Link>
        <span> — </span>
        <span>{product.title}</span>
      </div>

      <div className={styles.productContent}>

        {/* IMAGE */}
        <div className={styles.imageWrap}>
          <img
            src={`http://localhost:3333${product.image}`}
            alt={product.title}
          />

          {product.discont_price && (
            <span className={styles.discount}>
              -{Math.round(
                (1 - product.discont_price / product.price) * 100
              )}%
            </span>
          )}
        </div>

        {/* INFO */}
        <div className={styles.info}>
          <h1>{product.title}</h1>

          <div className={styles.prices}>
            <span className={styles.currentPrice}>
              ${finalPrice}
            </span>

            {product.discont_price && (
              <span className={styles.oldPrice}>
                ${product.price}
              </span>
            )}
          </div>

          {/* QUANTITY */}
          <div className={styles.quantity}>
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
            >
              –
            </button>

            <span>{quantity}</span>

            <button onClick={() => setQuantity(q => q + 1)}>
              +
            </button>
          </div>

          <button
            className={styles.addButton}
            onClick={handleAddToCart}
          >
            Add to cart
          </button>

          <p className={styles.description}>
            {product.description}
          </p>
        </div>

      </div>

    </div>
  )
}

export default Product
