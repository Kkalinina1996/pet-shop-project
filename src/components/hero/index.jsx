import { useNavigate } from 'react-router-dom'
import styles from './styles.module.css'
import Button from '@mui/material/Button'
import heroImage from '../../assets/images/heroImage.jpg'

const Hero = () => {
  const navigate = useNavigate()

  const handleCheckout = () => {
    navigate('/sales')
  }

  return (
    <section className={styles.hero}>
      <img src={heroImage} alt="Pets" className={styles.image} />
      <div className={styles.dark} />

      <div className={styles.overlay}>
        <h1>
          Amazing Discounts <br />
          on Pets Products!
        </h1>

        <Button
          variant="contained"
          className={styles.button}
          onClick={handleCheckout}
        >
          Check out
        </Button>
      </div>
    </section>
  )
}

export default Hero
