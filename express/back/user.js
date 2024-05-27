const e = require("express")
const DBConect = require("./database")
const crypto = require('bcrypt')
//En la variable table se guarda el nombre de la tabla de usuarios
const table = process.env.TABLE_USERS
class User extends DBConect{
  #password
  constructor(email,password,cedula = null,name = null,lastname = null,status = false){
    super()
    this.cedula = cedula;
    this.email = email;
    this.name = name;
    this.lastname = lastname;
    this.#password= password;
    this.status = status;
  }
  async register(){
    const result = await super.findOut(table,[this.email,this.cedula])
    //passwordHash se almacena el resultado final de la funcion sethash
    const passwordHash = await this.sethash(this.password)
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
    super.insert(index,data,table)
  }
  async login(){
    try {
      let userData = await super.readsingle(table,this.email);
      const compare = await crypto.compare(this.password,userData[0]["password"])

      if(compare === false )throw new Error("Contraseña Incorrecta")

      this.status = true;
      this.name = userData[0]["name"]
      this.lastname = userData[0]["lastname"]
      this.cedula = userData[0]["cedula"]

    } catch (error) {
      console.log(error)
    }
  }
  async changeProf(index,data){
    try{
      if(!this.status) throw new Error("Debes iniciar sesion")
      const result = await super.readsingle(table,[this.email])
      for (const key in index) {
        super.update(table,index[key],data[key],result[0]["Id"])
      }
    } catch(error){
      console.log("type",error)
    }
  }

/*   async logout(){
  
  } */

  async sethash(password){
      const hash = await crypto.hash(password,8);
      return hash;
  }
}

(
  async () => {
    const usuario = new User("Luisw@gmail.com","wdawdaw");
    await usuario.login();
    await usuario.changeProf(["name","lastname"],["setata",".|."])
    console.log(usuario)
    delete usuario;
    console.log(usuario)
  }
)()
