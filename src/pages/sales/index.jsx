import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { addToCart } from '../../redux/slices/cartSlice'
import styles from './styles.module.css'

function Sale() {
  const dispatch = useDispatch()
  const [products, setProducts] = useState([])
  const [sort, setSort] = useState('default')

  useEffect(() => {
    axios
      .get('http://localhost:3333/products/all')
      .then(res => {
        const discounted = res.data.filter(p => p.discont_price)
        setProducts(discounted)
      })
      .catch(err => console.log(err))
  }, [])

  const sortedProducts = [...products].sort((a, b) => {
    const priceA = a.discont_price
    const priceB = b.discont_price

    if (sort === 'price-asc') return priceA - priceB
    if (sort === 'price-desc') return priceB - priceA
    if (sort === 'title') return a.title.localeCompare(b.title)
    return 0
  })

  return (
    <div className={styles.salePage}>

      {/* BREADCRUMBS */}
      <div className={styles.breadcrumbs}>
        <Link to="/">Main page</Link>
        <span> — </span>
        <span>All sales</span>
      </div>

      <h1>Discounted items</h1>

      {/* FILTERS */}
<div className={styles.filters}>

  <div className={styles.priceFilter}>
    <span>Price</span>
    <input type="number" placeholder="from" />
    <input type="number" placeholder="to" />
  </div>

  <div className={styles.sortFilter}>
    <span>Sorted</span>
    <select
      value={sort}
      onChange={e => setSort(e.target.value)}
    >
      <option value="default">by default</option>
      <option value="title">by title</option>
      <option value="price-asc">price: low to high</option>
      <option value="price-desc">price: high to low</option>
    </select>
  </div>

</div>


      {/* GRID */}
      <div className={styles.productsGrid}>
        {sortedProducts.map(product => (
          <div key={product.id} className={styles.productCard}>

            <div className={styles.imageWrap}>
              <Link to={`/products/${product.id}`}>
                <img
                  src={`http://localhost:3333${product.image}`}
                  alt={product.title}
                />
              </Link>

              <span className={styles.discount}>
                -{Math.round(
                  (1 - product.discont_price / product.price) * 100
                )}%
              </span>

              <button
                className={styles.addButton}
                onClick={() =>
                  dispatch(addToCart({ ...product, quantity: 1 }))
                }
              >
                Add to cart
              </button>
            </div>

            <p className={styles.title}>{product.title}</p>

            <div className={styles.prices}>
              <span className={styles.currentPrice}>
                ${product.discont_price}
              </span>
              <span className={styles.oldPrice}>
                ${product.price}
              </span>
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}

export default Sale
