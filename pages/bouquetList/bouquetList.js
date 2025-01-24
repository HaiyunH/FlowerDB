const api = require('../../utils/api')
const { filterBouquets } = require('../../utils/filter')

Page({
  /**
   * Page initial data
   * bouquets: Array of bouquet objects
   * loading: Loading state flag
   * error: Error message if any
   * pageSize: Number of items per page
   * currentPage: Current page number
   * hasMore: Flag indicating if more items can be loaded
   * filters: Current active filters
   * defaultImage: Default image path
   */
  data: {
    bouquets: [],
    loading: false,
    error: null,
    pageSize: 10,
    currentPage: 1,
    hasMore: true,
    filters: {
      inStockToday: false,
      priceRange: null
    },
    defaultImage: '/images/default-bouquet.png'
  },

  /**
   * Lifecycle function--Called when page loads
   * Sets initial filters based on navigation parameters
   * @param {object} options - Page navigation parameters
   */
  onLoad(options) {
    // Set filter for today's bouquets if navigated from today's section
    if (options.type === 'today') {
      this.setData({
        filters: { inStockToday: true }
      })
    }
    
    this.loadBouquets()
  },

  /**
   * Loads bouquets from the API with pagination support
   * @param {boolean} loadMore - Whether to append results or replace existing ones
   */
  async loadBouquets(loadMore = false) {
    // Prevent multiple simultaneous loading requests
    if (this.data.loading) return

    try {
      this.setData({ loading: true, error: null })
      
      const params = {
        page: loadMore ? this.data.currentPage + 1 : 1,
        pageSize: this.data.pageSize,
        inStockToday: this.data.filters.inStockToday
      }

      // Add price range parameters
      if (this.data.filters.priceRange) {
        switch (this.data.filters.priceRange) {
          case 'under100':
            params.maxPrice = 100
            break
          case '100-200':
            params.minPrice = 100
            params.maxPrice = 200
            break
          case '200-300':
            params.minPrice = 200
            params.maxPrice = 300
            break
          case 'above300':
            params.minPrice = 300
            break
        }
      }

      const newBouquets = await api.getBouquets(params)
      console.log('Bouquet images:', newBouquets.map(b => b.image))
      
      // Update state with new bouquets
      this.setData({
        // Append or replace bouquets based on loadMore flag
        bouquets: loadMore ? [...this.data.bouquets, ...newBouquets] : newBouquets,
        currentPage: params.page,
        // Check if we've reached the last page
        hasMore: newBouquets.length === this.data.pageSize,
        loading: false
      })
    } catch (error) {
      this.setData({
        error: error.message,
        loading: false
      })
    }
  },

  /**
   * Called when user pulls down to refresh
   * Reloads the first page of bouquets
   */
  onPullDownRefresh() {
    this.loadBouquets().then(() => {
      wx.stopPullDownRefresh()
    })
  },

  /**
   * Called when user reaches bottom of the page
   * Loads next page if available
   */
  onReachBottom() {
    if (this.data.hasMore && !this.data.loading) {
      this.loadBouquets(true)
    }
  },

  // Add image error handler
  handleImageError(e) {
    const index = e.currentTarget.dataset.index
    const bouquets = this.data.bouquets
    bouquets[index].image = this.data.defaultImage
    this.setData({ bouquets })
  },

  /**
   * Toggles the inStockToday filter
   */
  toggleFilter(e) {
    const type = e.currentTarget.dataset.type
    const filters = this.data.filters
    filters[type] = !filters[type]
    this.setData({ filters }, () => {
      this.loadBouquets()
    })
  },

  /**
   * Handles price range filter selection
   */
  togglePriceFilter(e) {
    const range = e.currentTarget.dataset.range
    const filters = this.data.filters
    
    // Toggle off if already selected
    if (filters.priceRange === range) {
      filters.priceRange = null
    } else {
      filters.priceRange = range
    }
    
    this.setData({ filters }, () => {
      this.loadBouquets()
    })
  }
}) 