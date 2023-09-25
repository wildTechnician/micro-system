const config = {
  plugins: [
    require('autoprefixer')({
      grid: true,
    }),
    require('postcss-pxtorem')({
      // 针对桌面1920*1080设计稿
      rootValue: 16,
      propList: ['*'],
      minPixelValue: 12,
      selectorBlackList: ['noneTrans', 'el'],
      exclude: ['node_modules'],
    }),
  ],
};






module.exports = config