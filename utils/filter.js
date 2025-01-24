/**
 * Filters bouquets based on provided criteria
 * @param {Array} bouquets - Array of bouquet objects to filter
 * @param {Object} filters - Filter criteria
 * @param {boolean} filters.inStockToday - Filter for in-stock items
 * @param {number} filters.minPrice - Minimum price filter
 * @param {number} filters.maxPrice - Maximum price filter
 * @param {Array} filters.materials - Required materials filter
 * @returns {Array} Filtered array of bouquets
 */
const filterBouquets = (bouquets, filters) => {
  if (!filters || Object.keys(filters).length === 0) return bouquets
  
  return bouquets.filter(bouquet => {
    // Filter by inStock status
    if (filters.inStockToday && !bouquet.inStockToday) {
      return false
    }
    
    // Filter by price range
    if (filters.minPrice && bouquet.price < filters.minPrice) {
      return false
    }
    if (filters.maxPrice && bouquet.price > filters.maxPrice) {
      return false
    }
    
    // Filter by required materials
    if (filters.materials && filters.materials.length > 0) {
      const bouquetMaterials = bouquet.materials.map(m => m.name)
      return filters.materials.every(material => 
        bouquetMaterials.includes(material)
      )
    }
    
    return true
  })
}

module.exports = {
  filterBouquets
} 