const { makeCrcKey } = require('./helpers')

module.exports = {
  // 提取 locales，使用 i18next-scanner
  scan: {
    input: [
      './src/**/*.{js,ts,tsx,jsx}', // 会被扫描的文件，glob
      '!./src/locales', // 排除翻译文件夹
    ],
    output: './src/locales/raw', // 扫描文案输出
    // i18next-scanner 的配置经过拉平
    functions: ['\\\$t', '\\\$tt', '\\\$ttt'], // 翻译函数的名字
    extensions: ['.js', '.ts', '.jsx', '.tsx'], // 会被解析的文件扩展
    langs: ['en', 'zh-CN', 'zh-TW', 'jp', 'ko'], // 生成的多语言文件
    removeUnusedKeys: true, // 是否移除没有用的文本
    // 自定义参数
    generateKey: makeCrcKey, // 生成 key 的函数
  },

  // 将原始提取的 locales 转化成新的 locales
  transform: {
    input: './src/locales/raw',
    output: './src/locales',
    autoS2T: true, // 自动做繁体翻译简体
    defaultLang: 'zh-CN', // 默认语言，不会对该语言进行转化
    fallbackLang: 'en', // 缺省语言
    raw: {
      regex: /[\u4e00-\u9fa5]/,
      useFallback: true,   // 对于未翻译的语言文本，是否使用 缺省代替
      removeRawKeys: false, // 对于未翻译的语言文本，是否删除；如果设置了 缺省语言，则本条失效
    }
  },
  // 从 excel 中提取翻译文本到 locales 中
  translate: {
    input: './src/locales/translation',
    output: './src/locales/raw',
    langs: ['en', 'jp', 'ko'], // 待提取的文件
    generateKey: makeCrcKey, // 生成 key 的函数
  },

  // 生成未翻译的文件
  diff: {
    input: './src/locales/raw',
    output: './src/locales/diff',
    langs: ['en', 'jp', 'ko'],
    raw: {
      regex: /[\u4e00-\u9fa5]/,
    }
  }
}
