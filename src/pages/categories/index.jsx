import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styles from './styles.module.css'

function Categories() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3333/categories/all')
      .then(res => setCategories(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className={styles.categoriesPage}>

      {/* BREADCRUMBS */}
      <div className={styles.breadcrumbs}>
        <Link to="/">Main page</Link>
        <span> — </span>
        <span>Categories</span>
      </div>

      <h1>Categories</h1>

      <div className={styles.categoriesGrid}>
        {categories.map(category => (
          <Link
            key={category.id}
            to={`/categories/${category.id}`}
            className={styles.categoryCard}
          >
            <img
              src={`http://localhost:3333${category.image}`}
              alt={category.title}
            />
            <p>{category.title}</p>
          </Link>
        ))}
      </div>

    </div>
  )
}

export default Categories
