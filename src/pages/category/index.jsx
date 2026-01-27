import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { addToCart } from '../../redux/slices/cartSlice'
import styles from './styles.module.css'

function Category() {
  const { id } = useParams()
  const dispatch = useDispatch()

  const [products, setProducts] = useState([])
  const [categoryTitle, setCategoryTitle] = useState('')

  useEffect(() => {
    axios
      .get(`http://localhost:3333/categories/${id}`)
      .then(res => {
        setProducts(res.data)
        if (res.data.length > 0) {
          setCategoryTitle(res.data[0].category)
        }
      })
      .catch(err => console.log(err))
  }, [id])

  const handleAddToCart = product => {
    dispatch(addToCart(product))
  }

  return (
    <div className={styles.categoryPage}>

      {/* BREADCRUMBS */}
      <div className={styles.breadcrumbs}>
        <Link to="/">Main page</Link>
        <span> — </span>
        <Link to="/categories">Categories</Link>
        <span> — </span>
        <span>{categoryTitle}</span>
      </div>

      <h1>{categoryTitle}</h1>

      <div className={styles.productsGrid}>
        {products.map(product => (
          <div key={product.id} className={styles.productCard}>

            <Link to={`/products/${product.id}`}>
              <div className={styles.imageWrap}>
                <img
                  src={`http://localhost:3333${product.image}`}
                  alt={product.title}
                />

                {product.discont_price && (
                  <span className={styles.discount}>
                    -{Math.round(
                      (1 - product.discont_price / product.price) * 100
                    )}%
                  </span>
                )}
              </div>
            </Link>

            <Link to={`/products/${product.id}`} className={styles.title}>
              {product.title}
            </Link>

            <div className={styles.priceRow}>
              <div className={styles.prices}>
                <span className={styles.currentPrice}>
                  $
                  {product.discont_price
                    ? product.discont_price
                    : product.price}
                </span>

                {product.discont_price && (
                  <span className={styles.oldPrice}>
                    ${product.price}
                  </span>
                )}
              </div>

              <button
                className={styles.addButton}
                onClick={() => handleAddToCart(product)}
              >
                Add to cart
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}

export default Category
