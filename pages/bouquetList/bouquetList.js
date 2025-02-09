const api = require('../../utils/api')
const { filterBouquets } = require('../../utils/filter')

Page({
  
  data: {
    bouquets: [],
    loading: false,
    error: null,
    pageSize: 10,
    currentPage: 1,
    hasMore: true,
    allTags: [], // Store all unique tags
    selectedTagsMap: {}, // 使用对象来跟踪选中状态
    filters: {
      inStockToday: false,
      priceRange: null,
      selectedTags: [] // Array to store selected tag filters
    },
    defaultImage: '/images/default-bouquet.png', // Add default image path
    tagStates: {} // 用于追踪标签选中状态
  },

  /**
   * Lifecycle function--Called when page loads
   * Sets initial filters based on navigation parameters
   * @param {object} options - Page navigation parameters
   */
  async onLoad(options) {
    // Set filter for today's bouquets if navigated from today's section
    if (options.type === 'today') {
      this.setData({
        'filters.inStockToday': true
      })
    }
    
    // Load all bouquets and extract unique tags
    await this.extractUniqueTags()
    this.loadBouquets()
  },

  /**
   * Extracts unique tags from all bouquets
   */
  async extractUniqueTags() {
    try {
      // Get all bouquets without pagination to extract tags
      const { bouquets } = await api.getBouquets({ pageSize: 999 })
      
      // Extract and flatten all tags, then remove duplicates
      const uniqueTags = [...new Set(
        bouquets
          .flatMap(bouquet => bouquet.tags || [])
          .filter(tag => tag) // Remove null/undefined
      )]

      this.setData({ allTags: uniqueTags })
    } catch (error) {
      console.error('Error extracting tags:', error)
    }
  },

  /**
   * Loads bouquets from the API with pagination support
   * @param {boolean} loadMore - Whether to append results or replace existing ones
   */
  async loadBouquets(loadMore = false) {
    if (this.data.loading) return

    try {
      this.setData({ loading: true, error: null })
      
      const params = {
        page: loadMore ? this.data.currentPage + 1 : 1,
        pageSize: this.data.pageSize,
        inStockToday: this.data.filters.inStockToday,
        selectedTags: this.data.filters.selectedTags // Pass selected tags to API
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

      const { bouquets, hasMore } = await api.getBouquets(params)
      // Get temperory URL
      const fileIDs = bouquets.map(item => item.fileID)
      const tempFileURLs = await this.getTempFileURLs(fileIDs)
      const updatedBouquets = bouquets.map((item, index) => ({
        ...item,
        imsrcage: tempFileURLs[index], // Add the temporary URL to each bouquet object
      }))

      // Update state with new bouquets
      this.setData({
        bouquets: loadMore ? [...this.data.bouquets, ...updatedBouquets] : updatedBouquets,
        currentPage: params.page,
        hasMore,
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
 * Fetches temporary URLs for a list of file IDs
 * @param {Array<string>} fileIDs - List of file IDs
 * @returns {Promise<Array<string>>} - List of temporary URLs
 */
async getTempFileURLs(fileIDs) {
  try {
    const res = await wx.cloud.getTempFileURL({
      fileList: fileIDs,
    });
    return res.fileList.map(file => file.tempFileURL); // Extract temporary URLs
  } catch (error) {
    console.error('Error fetching temporary URLs:', error);
    return fileIDs.map(() => '/images/default-image.png'); // Fallback to default image
  }
},


   
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
  },

  /**
   * Toggles a tag filter
   */
  toggleTagFilter(e) {
    const tag = e.currentTarget.dataset.tag
    let selectedTags = [...this.data.filters.selectedTags]
    let tagStates = { ...this.data.tagStates }
    
    const index = selectedTags.indexOf(tag)
    if (index === -1) {
      selectedTags.push(tag)
      tagStates[tag] = true
    } else {
      selectedTags.splice(index, 1)
      tagStates[tag] = false
    }
    
    this.setData({
      tagStates,
      filters: {
        ...this.data.filters,
        selectedTags
      }
    }, () => {
      this.loadBouquets()
    })
  }
}) 