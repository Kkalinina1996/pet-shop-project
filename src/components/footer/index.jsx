import styles from './styles.module.css'

const Footer = () => {
  return (
    <section className={styles.contact}>
      <h2 className={styles.title}>Contact</h2>

      <div className={styles.info}>
        <div className={styles.card}>
          <span className={styles.label}>Phone</span>
          <p className={styles.value}>+49 30 915-88492</p>
        </div>

        <div className={styles.card}>
          <span className={styles.label}>Socials</span>
          <p className={styles.value}>Instagram · WhatsApp</p>
        </div>

        <div className={styles.card}>
          <span className={styles.label}>Address</span>
          <p className={styles.value}>
            Wallstraße 9-13, 10179 Berlin, Deutschland
          </p>
        </div>

        <div className={styles.card}>
          <span className={styles.label}>Working Hours</span>
          <p className={styles.value}>24 hours a day</p>
        </div>
      </div>

      <div className={styles.map}>
        <iframe
          title="map"
          src="https://maps.google.com/maps?q=Berlin%20Wallstraße%209-13&t=&z=13&ie=UTF8&iwloc=&output=embed"
          loading="lazy"
        />
      </div>
    </section>
  )
}

export default Footer
