import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ProductCard from '../../components/productCards'
import api from '../../api/axios'
import styles from './styles.module.css'

const Category = () => {
  const { id } = useParams()

  const [category, setCategory] = useState(null)
  const [products, setProducts] = useState([])
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [sort, setSort] = useState('default')

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await api.get(`/categories/${id}`)
      setCategory(res.data.category)
      setProducts(res.data.data)
    }

    fetchCategory()
  }, [id])

  const filteredProducts = [...products]
    .filter(p => {
      const price = p.discount_price ?? p.price
      if (minPrice && price < minPrice) return false
      if (maxPrice && price > maxPrice) return false
      return true
    })
    .sort((a, b) => {
      const priceA = a.discount_price ?? a.price
      const priceB = b.discount_price ?? b.price

      if (sort === 'low') return priceA - priceB
      if (sort === 'high') return priceB - priceA
      return 0
    })

  if (!category) return <p className={styles.loading}>Loading...</p>

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>{category.title}</h1>

      {/* FILTER BAR */}
      <div className={styles.filters}>
        <div className={styles.price}>
          <span>Price</span>
          <input
            type="number"
            placeholder="from"
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="to"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
          />
        </div>

        <div className={styles.sort}>
          <span>Sorted</span>
          <select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="default">by default</option>
            <option value="low">price: low-high</option>
            <option value="high">price: high-low</option>
          </select>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className={styles.grid}>
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default Category
