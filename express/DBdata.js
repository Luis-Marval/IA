const env = require("dotenv")
env.config()
class DBData{
  #host
  #user
  #password
  #database
  constructor(){
    this.#host = process.env.DB_HOST
    this.#user = process.env.DB_USER
    this.#password = process.env.DB_PASSWORD
    this.#database = process.env.DATABASE
    console.log(this.#host)
  }
}
module.exports = DBData 