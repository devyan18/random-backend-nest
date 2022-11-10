export default {
  port: process.env.PORT || 3000,
  database: {
    mongo: process.env.MONGO_DB_URI || 'mongodb://localhost:27017/random-nest',
  },
  crypt: {
    saltRounds: 10,
    jwtSecret: process.env.JWT_SECRET || 'random-nest',
  },
};
