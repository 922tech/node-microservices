export const settings = {
    JWT: {
        accessTokenLife: process.env.JWT_ACCESS_LIFE ? process.env.JWT_ACCESS_LIFE : '1d',
        refreshTokenLife: process.env.JWT_ACCESS_LIFE ? process.env.JWT_ACCESS_LIFE : '7d',
        secretKey: process.env.JWT_SECRET ? process.env.JWT_SECRET : '125412)(*)(835-wepok(*)(&$@)'
    },

    database: {
        MONGO_URI: process.env.MONGO_URI ? process.env.MONGO_URI : 'mongodb://localhost:27017/authDatabase'
    }
}
