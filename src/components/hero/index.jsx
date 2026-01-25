import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import styles from './styles.module.css'
import heroImage from '../../assets/images/heroImage.jpg'

const Hero = () => {
  return (
    <section className={styles.hero}>
      <img
        src={heroImage}
        alt="Pets"
        className={styles.image}
      />

      <div className={styles.overlay} />

      <div className={styles.content}>
        <h1>
          Amazing Discounts <br />
          on Pets Products!
        </h1>

        <Link to="/sales">
          <Button
            variant="contained"
            className={styles.button}
          >
            Check out
          </Button>
        </Link>
      </div>
    </section>
  )
}

export default Hero
