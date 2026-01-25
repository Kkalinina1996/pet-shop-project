import { useDispatch, useSelector } from 'react-redux'
import {
  addToCart,
  decreaseCount,
  removeFromCart
} from '../../redux/slices/cartSlice'
import styles from './styles.module.css'

const Cart = () => {
  const dispatch = useDispatch()
  const items = useSelector(state => state.cart.items)

  const total = items.reduce((sum, item) => {
    const price = item.discont_price ?? item.price
    return sum + price * item.count
  }, 0)

  if (items.length === 0) {
    return <h2 className={styles.empty}>Your cart is empty</h2>
  }

  return (
    <section className={styles.section}>
      <h1>Shopping cart</h1>

      <div className={styles.content}>
        <div className={styles.list}>
          {items.map(item => (
            <div key={item.id} className={styles.item}>
              <img
                src={`http://localhost:3333${item.image}`}
                alt={item.title}
              />

              <div>
                <p>{item.title}</p>

                <div className={styles.counter}>
                  <button
                    onClick={() =>
                      dispatch(decreaseCount(item.id))
                    }
                  >
                    −
                  </button>

                  <span>{item.count}</span>

                  <button
                    onClick={() =>
                      dispatch(addToCart(item))
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <div className={styles.price}>
                ${(item.discont_price ?? item.price) *
                  item.count}
              </div>

              <button
                onClick={() =>
                  dispatch(removeFromCart(item.id))
                }
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className={styles.summary}>
          <h3>Order details</h3>
          <p>Total: ${total.toFixed(2)}</p>
        </div>
      </div>
    </section>
  )
}

export default Cart
