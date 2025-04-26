require('dotenv').config();

module.exports = {
  development: {
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    timezone: '-03:00',  
    dialectOptions: {    
      useUTC: false,
      dateStrings: true,
      typeCast: true
    },
    logging: false 
  },
  production: {
    username: process.env.USER_NAME_PROD,
    password: process.env.PASSWORD_PROD,
    database: process.env.DATABASE_PROD,
    host: process.env.HOST_PROD,
    dialect: process.env.DIALECT_PROD,
    timezone: '-03:00',  
    dialectOptions: {    
      useUTC: false,
      dateStrings: true,
      typeCast: true
    },
    logging: false
  }
};
