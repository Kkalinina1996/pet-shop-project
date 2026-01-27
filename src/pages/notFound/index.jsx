import { Link } from 'react-router-dom'
import styles from './styles.module.css'
import dogImg from '../../assets/images/02_404.png'

function NotFound() {
  return (
    <div className={styles.wrapper}>

      <div className={styles.card}>

        <div className={styles.titleRow}>
          

          <img
            src={dogImg}
            alt="Not found"
            className={styles.image}
          />

          
        </div>

        <h2>Page Not Found</h2>

        <p>
          We’re sorry, the page you requested could not be found.  
          Please go back to the homepage.
        </p>

        <Link to="/" className={styles.button}>
          Go Home
        </Link>

      </div>

    </div>
  )
}

export default NotFound
