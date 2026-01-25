import { useState } from 'react'
import api from '../../api/axios'
import styles from './styles.module.css'
import petsImage from '../../assets/images/discountPets.png'

const DiscountForm = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: ''
  })

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    await api.post('/sale/send', form)
    alert('Thank you!')
    setForm({ name: '', phone: '', email: '' })
  }

  return (
    <section className={styles.section}>
      <h2>5% off on the first order</h2>

      <div className={styles.content}>
        <img src={petsImage} alt="Pets" />

        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" onChange={handleChange} />
          <input name="phone" placeholder="Phone" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
          <button type="submit">Get a discount</button>
        </form>
      </div>
    </section>
  )
}

export default DiscountForm
