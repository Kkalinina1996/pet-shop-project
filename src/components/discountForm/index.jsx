import { useState } from 'react'
import api from '../../api/axios'
import styles from './styles.module.css'
import petsImage from '../../assets/images/discountPets.png'
const DiscountForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  })

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      await api.post('/sale/send', formData)
      alert('Discount request sent!')
      setFormData({ name: '', phone: '', email: '' })
    } catch (error) {
      console.error(error)
      alert('Something went wrong')
    }
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.left}>
        <h2>5% off on the first order</h2>
        <img src={petsImage} alt="Pets" />
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone number"
          value={formData.phone}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <button type="submit">Get a discount</button>
      </form>
    </section>
  )
}

export default DiscountForm
