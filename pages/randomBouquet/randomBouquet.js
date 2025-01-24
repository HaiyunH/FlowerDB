const api = require('../../utils/api')

Page({
  /**
   * Page initial data
   * bouquet: Currently displayed random bouquet
   * loading: Loading state flag
   * error: Error message if any
   */
  data: {
    bouquet: null,
    loading: false,
    error: null
  },

  /**
   * Lifecycle function--Called when page loads
   * Loads initial random bouquet
   */
  onLoad() {
    this.loadRandomBouquet()
  },

  /**
   * Fetches a random bouquet from the API
   * Updates page state with the result
   */
  async loadRandomBouquet() {
    // Prevent multiple simultaneous loading requests
    if (this.data.loading) return

    try {
      this.setData({ loading: true, error: null })
      const bouquet = await api.getRandomBouquet()
      this.setData({ bouquet, loading: false })
    } catch (error) {
      this.setData({
        error: error.message,
        loading: false
      })
    }
  },

  /**
   * Handler for refresh button click
   * Loads a new random bouquet
   */
  onRefresh() {
    this.loadRandomBouquet()
  }
}) 