import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../../redux/slices/categoriesSlice'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'

const CategoriesSection = () => {
  const dispatch = useDispatch()
  const { items = [], status } = useSelector(
    state => state.categories || {}
  )

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories())
    }
  }, [dispatch, status])

  if (status === 'loading') return <p>Loading...</p>

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>Categories</h2>
        <Link to="/categories">All categories</Link>
      </div>

      <div className={styles.grid}>
        {items.slice(0, 4).map(category => (
          <Link
            key={category.id}
            to={`/categories/${category.id}`}
            className={styles.card}
          >
            <img
              src={`http://localhost:3333${category.image}`}
              alt={category.title}
            />
            <p>{category.title}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default CategoriesSection
