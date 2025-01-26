App({
  globalData: {
    bouquets: [],
    currentFilters: {}
  },
  
  onLaunch() {
    // Initialize cloud
    if (!wx.cloud) {
      console.error('Please use WeChat version 2.2.3 or above')
    } else {
      wx.cloud.init({
        env: 'flowerdb-8g0q6tv0bb7e5950', // Replace with your cloud environment ID
        traceUser: true
      })
    }
    
    this.checkSession()
  },

  checkSession() {
    wx.checkSession({
      fail: () => {
        // Session expired, handle reauthorization if needed
        console.log('Session expired')
      }
    })
  }
}) 