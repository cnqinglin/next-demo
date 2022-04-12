const withImages = require('next-images')
module.exports = withImages({
  // 如果本地图片是.jpeg 或jpg 的话，需要加上以下三行代码，再编译
  images: {
    disableStaticImages: true
  },
  webpack(config, options) {
    return config
  }
})