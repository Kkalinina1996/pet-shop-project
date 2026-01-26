import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  removeFromCart,
  updateQuantity,
  clearCart
} from '../../redux/slices/cartSlice'
import { useState } from 'react'
import axios from 'axios'
import styles from './styles.module.css'

function CartPage() {
  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cart.items)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: ''
  })

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = item.discont_price || item.price
    return sum + price * item.quantity
  }, 0)

  const handleOrderSubmit = async e => {
    e.preventDefault()

    try {
      await axios.post('http://localhost:3333/order/send', {
        name: form.name,
        phone: form.phone,
        email: form.email,
        products: cartItems
      })

      setIsModalOpen(true) // ❗ сначала показываем модалку
    } catch (error) {
      console.error('Order error:', error)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    dispatch(clearCart()) // ❗ очищаем корзину ТОЛЬКО после закрытия
  }

  return (
    <div className={styles.cartPage}>
      <div className={styles.breadcrumbs}>
        <Link to="/">Main page</Link>
        <span> - </span>
        <span>Shopping cart</span>
      </div>

      {cartItems.length === 0 && !isModalOpen && (
        <div className={styles.emptyCart}>
          <h1>Shopping cart</h1>
          <p>Looks like you have no items in your basket currently.</p>
          <Link to="/products" className={styles.continueButton}>
            Continue Shopping
          </Link>
        </div>
      )}

      {cartItems.length > 0 && (
        <>
          <div className={styles.header}>
            <h1>Shopping cart</h1>
            <button
              onClick={() => dispatch(clearCart())}
              className={styles.clearButton}
            >
              Clear cart
            </button>
          </div>

          <div className={styles.cartContainer}>
            <div className={styles.itemsList}>
              {cartItems.map(item => (
                <div key={item.id} className={styles.cartItem}>
                  <img
                    src={`http://localhost:3333${item.image}`}
                    alt={item.title}
                  />

                  <div className={styles.itemInfo}>
                    <h3>{item.title}</h3>

                    <div className={styles.itemControls}>
                      <div className={styles.quantityControl}>
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                quantity: item.quantity - 1
                              })
                            )
                          }
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                quantity: item.quantity + 1
                              })
                            )
                          }
                        >
                          +
                        </button>
                      </div>

                      <div className={styles.priceBlock}>
                        <span className={styles.currentPrice}>
                          $
                          {(item.discont_price || item.price) *
                            item.quantity}
                        </span>

                        {item.discont_price && (
                          <span className={styles.oldPrice}>
                            ${item.price * item.quantity}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() =>
                          dispatch(removeFromCart(item.id))
                        }
                        className={styles.removeButton}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.orderSummary}>
              <h2>Order details</h2>

              <div className={styles.summaryRow}>
                <span>Items ({cartItems.length})</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <div className={styles.totalRow}>
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <form
                className={styles.orderForm}
                onSubmit={handleOrderSubmit}
              >
                <input
                  type="text"
                  placeholder="Name"
                  value={form.name}
                  onChange={e =>
                    setForm({ ...form, name: e.target.value })
                  }
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={e =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={e =>
                    setForm({ ...form, email: e.target.value })
                  }
                  required
                />
                <button type="submit" className={styles.orderButton}>
                  Order
                </button>
              </form>
            </div>
          </div>
        </>
      )}

      {/* ===== MODAL ===== */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button
              className={styles.close}
              onClick={closeModal}
            >
              ✕
            </button>

            <h2>Congratulations!</h2>
            <p>
              Your order has been successfully placed on the website.
              A manager will contact you shortly to confirm your order.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage
