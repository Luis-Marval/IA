const env = require("dotenv")
env.config()
class DBData{
  constructor(){
    this.host = process.env.DB_HOST
    this.user = process.env.DB_USER
    this.password = process.env.DB_PASSWORD
    this.database = process.env.DATABASE
  }
}
module.exports = DBData 