const CONF = {
    port: '5757',
    rootPathname: '',

    // 微信小程序 App ID
    appId: 'wxf1583fc52009cf66',

    // 微信小程序 App Secret
    appSecret: '27aba81d91131f0d5ed6ae12df0d5a5a',
    // 910ab254673a9e72b47a97d89a330445旧
    // 27aba81d91131f0d5ed6ae12df0d5a5a

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: true,

    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        db: 'cAuth',
        pass: 'wxf1583fc52009cf66',
        char: 'utf8mb4'
    },

    cos: {
        /**
         * 区域
         * 华北：cn-north
         * 华东：cn-east
         * 华南：cn-south
         * 西南：cn-southwest
         * 新加坡：sg
         * @see https://www.qcloud.com/document/product/436/6224
         */
        region: 'cn-north',
        fileBucket: 'picture',
        uploadFolder: '',
    },

    // 微信登录态有效期
    wxLoginExpires: 7200
}

module.exports = process.env.NODE_ENV === 'local' ? Object.assign({}, CONF, require('./config.local')) : CONF;
