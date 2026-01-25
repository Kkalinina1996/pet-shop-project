import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../../redux/slices/cartSlice'
import styles from './styles.module.css'

const Checkout = () => {
  const dispatch = useDispatch()
  const items = useSelector(state => state.cart.items)

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: ''
  })

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (!form.name || !form.phone || !form.email) {
      alert('Please fill all fields')
      return
    }

    dispatch(clearCart())
    alert('Order placed successfully!')
  }

  if (items.length === 0) {
    return (
      <section className={styles.empty}>
        <h2>Your cart is empty</h2>
      </section>
    )
  }

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Checkout</h1>

      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone number"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <button type="submit">Order</button>
      </form>
    </section>
  )
}

export default Checkout
