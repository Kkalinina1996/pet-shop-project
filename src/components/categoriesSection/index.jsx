import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../../redux/slices/categoriesSlice'
import styles from './styles.module.css'

const CategoriesSection = () => {
  const dispatch = useDispatch()

  // Берём категории из Redux
  const { items, status } = useSelector(state => state.categories)

  // Загружаем категории с API
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories())
    }
  }, [dispatch, status])

  if (status === 'loading') {
    return <p>Загрузка...</p>
  }

  return (
    <section className={styles.section}>
      {/* Заголовок */}
      <div className={styles.header}>
        <h2>Categories</h2>
        <button className={styles.allBtn}>All categories</button>
      </div>

      {/* Список категорий */}
      <div className={styles.list}>
        {items.map(category => (
          <div key={category.id} className={styles.card}>
            <img
              src={`http://localhost:3333${category.image}`}
              alt={category.title}
            />
            <p>{category.title}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default CategoriesSection
