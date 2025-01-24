const app = getApp()
const { mockBouquets, mockMaterials } = require('./mockData')

/**
 * Generic request function that handles API calls to the backend
 * Currently returns mock data for testing
 */
const request = (url, options = {}) => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      if (url === '/api/bouquets') {
        const { page = 1, pageSize = 10, inStockToday, minPrice, maxPrice } = options.data || {}
        let filteredBouquets = [...mockBouquets]
        
        // Apply inStockToday filter
        if (inStockToday) {
          filteredBouquets = filteredBouquets.filter(b => b.inStockToday)
        }

        // Apply price range filters
        if (minPrice !== undefined || maxPrice !== undefined) {
          filteredBouquets = filteredBouquets.filter(b => {
            if (minPrice !== undefined && b.price < minPrice) return false
            if (maxPrice !== undefined && b.price > maxPrice) return false
            return true
          })
        }

        // Apply pagination
        const start = (page - 1) * pageSize
        const end = start + pageSize
        resolve(filteredBouquets.slice(start, end))
      } 
      else if (url === '/api/randomBouquet') {
        const randomIndex = Math.floor(Math.random() * mockBouquets.length)
        resolve(mockBouquets[randomIndex])
      }
      else if (url === '/api/materials') {
        resolve(mockMaterials)
      }
    }, 500) // 500ms delay to simulate network
  })
}

const api = {
  /**
   * Fetches bouquets with optional filtering parameters
   * @param {object} params - Query parameters (page, pageSize, filters)
   * @returns {Promise<Array>} Array of bouquet objects
   */
  getBouquets: (params = {}) => {
    return request('/api/bouquets', { 
      method: 'GET',
      data: params
    })
  },

  /**
   * Fetches a random bouquet from the available bouquets
   * @returns {Promise<Object>} A single random bouquet object
   */
  getRandomBouquet: () => {
    return request('/api/randomBouquet', {
      method: 'GET'
    })
  },

  /**
   * Fetches all available flower materials
   * @returns {Promise<Array>} Array of material objects
   */
  getMaterials: () => {
    return request('/api/materials', {
      method: 'GET'
    })
  }
}

module.exports = api 