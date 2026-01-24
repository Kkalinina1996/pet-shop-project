import { useState } from 'react'
import styles from './styles.module.css'
import petsImage from '../../assets/images/discountPets.png'

const DiscountForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  })

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()

    console.log('Discount form data:', formData)

    alert('Thank you! Your request has been sent.')

    setFormData({
      name: '',
      phone: '',
      email: ''
    })
  }

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>5% off on the first order</h2>

      <div className={styles.content}>
        <img src={petsImage} alt="Pets" className={styles.image} />

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <button type="submit">Get a discount</button>
        </form>
      </div>
    </section>
  )
}

export default DiscountForm
