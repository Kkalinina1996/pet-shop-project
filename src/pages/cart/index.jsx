import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeFromCart } from '../../redux/slices/cartSlice'
import styles from './styles.module.css'

const Cart = () => {
  const dispatch = useDispatch()
  const items = useSelector(state => state.cart.items)

  const totalPrice = items.reduce(
    (sum, item) =>
      sum + (item.discont_price || item.price),
    0
  )

  if (items.length === 0) {
    return (
      <section className={styles.empty}>
        <h1>Cart is empty</h1>
        <Link to="/products">Back to products</Link>
      </section>
    )
  }

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Shopping cart</h1>

      <div className={styles.wrapper}>
        {/* PRODUCTS */}
        <div className={styles.list}>
          {items.map(item => (
            <div key={item.id} className={styles.card}>
              <img
                src={`http://localhost:3333${item.image}`}
                alt={item.title}
              />

              <div className={styles.info}>
                <p className={styles.name}>{item.title}</p>

                <div className={styles.prices}>
                  {item.discont_price ? (
                    <>
                      <span className={styles.newPrice}>
                        ${item.discont_price}
                      </span>
                      <span className={styles.oldPrice}>
                        ${item.price}
                      </span>
                    </>
                  ) : (
                    <span className={styles.newPrice}>
                      ${item.price}
                    </span>
                  )}
                </div>
              </div>

              <button
                className={styles.remove}
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div className={styles.summary}>
          <p>Total:</p>
          <h2>${totalPrice}</h2>

          <Link to="/checkout" className={styles.checkout}>
            Checkout
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Cart
