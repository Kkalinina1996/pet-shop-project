import { Link } from 'react-router-dom'
import basketIcon from '../../assets/icons/basketIcon.png'
import Logo from '../../assets/icons/logo.png'
import styles from './styles.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
  <img src={Logo} alt="Logo" />
</Link>


    <nav className={styles.nav}>
        <Link to="/">Main page</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/products">All products</Link>
        <Link to="/sales">All sales</Link>
      </nav>

      <Link to="/cart" className={styles.cart}>
  <img src={basketIcon} alt="Cart" />
</Link>

    </header>
  )
}

export default Header
