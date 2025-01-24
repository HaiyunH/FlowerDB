App({
  globalData: {
    apiBaseUrl: 'http://your-api-base-url.com', // Replace with your actual API base URL
    bouquets: [],
    currentFilters: {}
  },
  
  onLaunch() {
    // Initialize the app
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