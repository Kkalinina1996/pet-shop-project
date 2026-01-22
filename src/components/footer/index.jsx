import styles from './styles.module.css'

import instagramIcon from '../../assets/icons/instagram.png'
import whatsappIcon from '../../assets/icons/whatsapp.png'

const Footer = () => {
  return (
    <section className={styles.contact}>
      <h2>Contact</h2>

      <div className={styles.grid}>
        <div className={styles.card}>
          <span className={styles.label}>Phone</span>
          <strong>+49 30 915-88492</strong>
        </div>

        <div className={styles.card}>
          <span className={styles.label}>Socials</span>

          <div className={styles.socials}>
            <img src={instagramIcon} alt="Instagram" />
            <img src={whatsappIcon} alt="WhatsApp" />
          </div>
        </div>

        <div className={styles.card}>
          <span className={styles.label}>Address</span>
          <strong>Wallstraße 9-13, 10179 Berlin, Deutschland</strong>
        </div>

        <div className={styles.card}>
          <span className={styles.label}>Working Hours</span>
          <strong>24 hours a day</strong>
        </div>
      </div>

      <div className={styles.map}>
        <iframe
          src="https://www.google.com/maps?q=Wallstraße+9-13+Berlin&output=embed"
          loading="lazy"
        />
      </div>
    </section>
  )
}

export default Footer
