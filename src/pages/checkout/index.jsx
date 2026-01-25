import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../../redux/slices/cartSlice'
import api from '../../api/axios'
import styles from './styles.module.css'

const Checkout = () => {
  const dispatch = useDispatch()
  const items = useSelector(state => state.cart.items)

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: ''
  })

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const handleSubmit = async e => {
    e.preventDefault()

    await api.post('/sale/send', {
      ...form,
      items,
      total
    })

    alert('Order sent!')
    dispatch(clearCart())
  }

  return (
    <section className={styles.section}>
      <h1>Checkout</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          onChange={e =>
            setForm({ ...form, name: e.target.value })
          }
        />
        <input
          placeholder="Phone"
          onChange={e =>
            setForm({ ...form, phone: e.target.value })
          }
        />
        <input
          placeholder="Email"
          onChange={e =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <button type="submit">
          Place order (${total})
        </button>
      </form>
    </section>
  )
}

export default Checkout
