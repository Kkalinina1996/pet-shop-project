export const calcDiscountPercent = (price, discountPrice) => {
  if (!discountPrice) return null
  return Math.round(((price - discountPrice) / price) * 100)
}
