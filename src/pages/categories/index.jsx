import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCategories } from '../../redux/slices/categoriesSlice'
import styles from './styles.module.css'

const Categories = () => {
  const dispatch = useDispatch()

  const { items, status, error } = useSelector(
    state => state.categories
  )

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories())
    }
  }, [dispatch, status])

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Categories</h1>

      <div className={styles.list}>
        {items.map(category => (
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
    </div>
  )
}

export default Categories
