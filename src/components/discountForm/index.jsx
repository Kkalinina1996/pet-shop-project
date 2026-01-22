import styles from './styles.module.css'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import petsImage from '../../assets/images/discountPets.png'

const DiscountForm = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          5% off on the first order
        </h2>

        <div className={styles.content}>
          {/* Картинка с животными */}
          <img
            src={petsImage}
            alt="Pets"
            className={styles.image}
          />

          {/* Форма */}
          <form className={styles.form}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              InputLabelProps={{ style: { color: '#fff' } }}
              InputProps={{ style: { color: '#fff' } }}
            />

            <TextField
              label="Phone number"
              variant="outlined"
              fullWidth
              InputLabelProps={{ style: { color: '#fff' } }}
              InputProps={{ style: { color: '#fff' } }}
            />

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              InputLabelProps={{ style: { color: '#fff' } }}
              InputProps={{ style: { color: '#fff' } }}
            />

            <Button
              variant="contained"
              className={styles.button}
            >
              Get a discount
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default DiscountForm
