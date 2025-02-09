const db = wx.cloud.database()
const _ = db.command

/**
 * API utility for cloud database operations
 */
const api = {
  /**
   * Fetches bouquets with optional filtering parameters
   * @param {object} params - Query parameters (page, pageSize, filters)
   * @returns {Promise<Array>} Array of bouquet objects
   */
  getBouquets: async (params = {}) => {
    const { page = 1, pageSize = 10, inStockToday, minPrice, maxPrice, selectedTags = [] } = params
    const skip = (page - 1) * pageSize
    
    let query = db.collection('bouquets')
    let conditions = {}
    
    // 使用 stock_price_idx 索引的查询条件
    if (inStockToday || minPrice !== undefined || maxPrice !== undefined) {
      if (inStockToday) {
        conditions.inStockToday = true
      }
      
      if (minPrice !== undefined || maxPrice !== undefined) {
        conditions.price = {}
        if (minPrice !== undefined) {
          conditions.price = _.gte(minPrice)
        }
        if (maxPrice !== undefined) {
          conditions.price = _.lte(maxPrice)
        }
      }
    }

    // 使用 tags_idx 索引的查询条件
    if (selectedTags.length > 0) {
      conditions.tags = _.all(selectedTags)
    }

    // 应用查询条件
    if (Object.keys(conditions).length > 0) {
      query = query.where(conditions)
    }

    // 获取总数用于分页
    const countResult = await query.count()
    const total = countResult.total

    // 获取分页结果
    const bouquets = await query
      .skip(skip)
      .limit(pageSize)
      .get()
      .then(res => res.data)

    return {
      bouquets,
      total,
      hasMore: skip + bouquets.length < total
    }
  },

  /**
   * Fetches a random bouquet
   * @returns {Promise<Object>} A single random bouquet object
   */
  getRandomBouquet: async () => {
    // Get total count
    const countResult = await db.collection('bouquets').count()
    const total = countResult.total
    
    // Get random skip value
    const random = Math.floor(Math.random() * total)
    
    const result = await db.collection('bouquets')
      .skip(random)
      .limit(1)
      .get()

    return result.data[0]
  },

  /**
   * Uploads an image to cloud storage
   * @param {string} filePath - Local file path
   * @param {string} cloudPath - Cloud storage path
   * @returns {Promise<string>} Cloud file ID
   */
  uploadImage: async (filePath, cloudPath) => {
    const result = await wx.cloud.uploadFile({
      cloudPath,
      filePath,
    })
    return result.fileID
  },

  /**
   * Gets temporary URL for cloud file
   * @param {string} fileID - Cloud file ID
   * @returns {Promise<string>} Temporary accessible URL
   */
  getImageUrl: async (fileID) => {
    const result = await wx.cloud.getTempFileURL({
      fileList: [fileID]
    })
    return result.fileList[0].tempFileURL
  }
}

module.exports = api 