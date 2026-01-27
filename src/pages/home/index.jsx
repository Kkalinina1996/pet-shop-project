import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styles from './styles.module.css'
import heroImage from '../../assets/images/heroImage.jpg'
import discountPets from '../../assets/images/discountPets.png'




function Home() {
  const [categories, setCategories] = useState([])
  const [saleProducts, setSaleProducts] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3333/categories/all')
      .then(res => setCategories(res.data.slice(0, 4)))

    axios.get('http://localhost:3333/products/all')
      .then(res => {
        const discounted = res.data.filter(p => p.discont_price)
        setSaleProducts(discounted.slice(0, 4))
      })
  }, [])

  return (
    <div className={styles.home}>

      {/* HERO */}
      <section
  className={styles.hero}
  style={{ backgroundImage: `url(${heroImage})` }}
>

        <div className={styles.heroContent}>
          <h1>Amazing Discounts<br />on Pets Products!</h1>
          <Link to="/sales" className={styles.heroBtn}>
            Check out
          </Link>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Categories</h2>
          <Link to="/categories">All categories</Link>
        </div>

        <div className={styles.categoriesGrid}>
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={`/categories/${cat.id}`}
              className={styles.categoryCard}
            >
              <img
                src={`http://localhost:3333${cat.image}`}
                alt={cat.title}
              />
              <p>{cat.title}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* DISCOUNT FORM */}
      <section className={styles.discount}>
        <div className={styles.discountContent}>
          <div className={styles.discountText}>
  <h2>5% off on the first order</h2>
  <img src={discountPets} alt="Pets discount" />
</div>

          <form className={styles.discountForm}>
            <input placeholder="Name" />
            <input placeholder="Phone number" />
            <input placeholder="Email" />
            <button>Get a discount</button>
          </form>
        </div>
      </section>

      {/* SALE */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Sale</h2>
          <Link to="/sales">All sales</Link>
        </div>

        <div className={styles.productsGrid}>
          {saleProducts.map(product => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className={styles.productCard}
            >
              <div className={styles.productImage}>
                <img
                  src={`http://localhost:3333${product.image}`}
                  alt={product.title}
                />
                <span className={styles.discountBadge}>
                  -{Math.round(
                    (1 - product.discont_price / product.price) * 100
                  )}%
                </span>
              </div>

              <h3>{product.title}</h3>

              <div className={styles.prices}>
                <span className={styles.newPrice}>
                  ${product.discont_price}
                </span>
                <span className={styles.oldPrice}>
                  ${product.price}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  )
}

export default Home
