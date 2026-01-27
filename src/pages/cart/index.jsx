import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
  removeFromCart,
  updateQuantity,
  clearCart
} from '../../redux/slices/cartSlice'
import styles from './styles.module.css'

function Cart() {
  const dispatch = useDispatch()
  const items = useSelector(state => state.cart.items)
  const [showModal, setShowModal] = useState(false)

  const totalPrice = items.reduce((sum, item) => {
    const price = item.discont_price || item.price
    return sum + price * item.quantity
  }, 0)

  const handleOrder = e => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)

    axios
      .post('http://localhost:3333/order/send', {
        ...data,
        products: items
      })
      .then(() => {
        setShowModal(true)
        dispatch(clearCart())
        e.target.reset()
      })
      .catch(err => console.log(err))
  }

  return (
    <div className={styles.cartPage}>

      {/* BREADCRUMBS */}
      <div className={styles.breadcrumbs}>
        <Link to="/">Main page</Link>
        <span> — </span>
        <span>Cart</span>
      </div>

      <h1>Shopping cart</h1>

      {items.length === 0 ? (
        <div className={styles.empty}>
          <p>Your cart is empty</p>
          <Link to="/products">Go shopping</Link>
        </div>
      ) : (
        <div className={styles.cartContent}>

          {/* ITEMS */}
          <div className={styles.items}>
            {items.map(item => (
              <div key={item.id} className={styles.cartItem}>

                <img
                  src={`http://localhost:3333${item.image}`}
                  alt={item.title}
                />

                <div className={styles.info}>
                  <Link to={`/products/${item.id}`}>
                    {item.title}
                  </Link>

                  <div className={styles.quantity}>
                    <button
                      onClick={() =>
                        dispatch(updateQuantity({
                          id: item.id,
                          quantity: Math.max(1, item.quantity - 1)
                        }))
                      }
                    >
                      –
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        dispatch(updateQuantity({
                          id: item.id,
                          quantity: item.quantity + 1
                        }))
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className={styles.price}>
                  ${(item.discont_price || item.price) * item.quantity}
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

          {/* ORDER */}
          <div className={styles.order}>
            <h2>Order details</h2>

            <p className={styles.total}>
              Total: <span>${totalPrice}</span>
            </p>

            <form onSubmit={handleOrder}>
              <input name="name" placeholder="Name" required />
              <input name="phone" placeholder="Phone number" required />
              <input name="email" placeholder="Email" required />
              <button type="submit">Order</button>
            </form>
          </div>

        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button
              className={styles.close}
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <h2>Congratulations!</h2>
            <p>Your order has been successfully placed on the website.
              A manager will contact you shortly to confirm your order.</p>
          </div>
        </div>
      )}

    </div>
  )
}

export default Cart
