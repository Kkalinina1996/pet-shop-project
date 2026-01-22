import { Link } from 'react-router-dom'
import logo from '../../assets/icons/logo.png'
import basketIcon from '../../assets/icons/basketIcon.png'
import styles from './styles.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={logo} alt="Logo" className={styles.logo} />
      </Link>

      <nav className={styles.nav}>
        <Link to="/">Main page</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/products">All products</Link>
        <Link to="/sales">All sales</Link>
      </nav>

      <Link to="/cart">
        <img src={basketIcon} alt="Cart" />
      </Link>
    </header>
  )
}

export default Header
