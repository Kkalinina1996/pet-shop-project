import { Link } from 'react-router-dom'
import styles from './styles.module.css'
import logo from '../../assets/icons/logo.png'
import cartIcon from '../../assets/icons/basketIcon.png'

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="Logo" />
      </Link>

      <nav className={styles.nav}>
        <Link to="/">Main page</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/products">All products</Link>
        <Link to="/sales">All sales</Link>
      </nav>

      <Link to="/cart" className={styles.cart}>
        <img src={cartIcon} alt="Cart" />
      </Link>
    </header>
  )
}

export default Header
