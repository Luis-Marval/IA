const DBConect = require("./database")
const crypto = require('bcrypt')
//En la variable table se guarda el nombre de la tabla de usuarios
const table = process.env.TABLE_USERS
class User extends DBConect{
  constructor(cedula,email,password,name,lastname){
    super()
    this.cedula = cedula;
    this.email = email;
    this.name = name;
    this.lastname = lastname;
    this.password = password;
  }
  async create(){
    //passwordHash se almacena el resultado final de la funcion sethash
    const passwordHash = await this.sethash(this.password)
    console.log(passwordHash)
    //el index son los nombres de las tablas a crear
    let index = [
      "cedula","email","password","name","lastname"
    ]
    //data son los valores a guardas en los respectivos indices
    let data = [
      this.cedula,
      this.email,
      passwordHash,
      this.name,
      this.lastname,
    ] 
    console.log(`${data} + ${index}`)
    super.insert(index,data,table)
  }
  async login(){
    let userData = await super.readsingle(table,this.cedula);
    const compare = await crypto.compare(this.password,userData[0]["password"])
    console.log(compare)

  }
  async sethash(password){
      const hash = await crypto.hash(password,8);
      return hash;
  }
}
const usuario = new User(28723454,"paco@gmail.com","16789","Luis","Marval");
/* usuario.create(); */
usuario.login();