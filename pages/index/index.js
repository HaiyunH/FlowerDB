Page({
  data: {
    // Page data if needed
  },

  navigateToBouquets(e) {
    const type = e.currentTarget.dataset.type
    const url = `/pages/bouquetList/bouquetList?type=${type}`
    wx.navigateTo({ url })
  },

  navigateToRandom() {
    wx.navigateTo({
      url: '/pages/randomBouquet/randomBouquet'
    })
  }
}) 