import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styles from './styles.module.css'
import logo from '../../assets/icons/logo.png'
import cartIcon from '../../assets/icons/basketIcon.png'

const Header = () => {
  // 🛒 берём товары из Redux
  const items = useSelector(state => state.cart.items)

  // считаем общее количество
  const totalCount = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  return (
    <header className={styles.header}>
      {/* LOGO */}
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="Logo" />
      </Link>

      {/* NAV */}
      <nav className={styles.nav}>
        <Link to="/">Main page</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/products">All products</Link>
        <Link to="/sales">All sales</Link>
      </nav>

      {/* CART */}
      <Link to="/cart" className={styles.cart}>
        <img src={cartIcon} alt="Cart" />

        {/* 🔵 BADGE */}
        {totalCount > 0 && (
          <span className={styles.badge}>
            {totalCount}
          </span>
        )}
      </Link>
    </header>
  )
}

export default Header
