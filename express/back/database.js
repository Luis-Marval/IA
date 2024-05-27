const sql = require("mysql")
const DBData = require("../DBdata")
class DBConect extends DBData{
  constructor(){
    super();
    this.conection = sql.createConnection({
      host : this.host,user : this.user,password :this.password,database : this.database
    })
  }

  async conector(consult,box){
    try{
      const result = await new Promise ((resolve, reject) => {
        this.conection.query(consult,box,(error, result) => {
          if (error) {
            reject(error);
          }
            resolve(result);
        })
      })
      return result
    }catch(Error){
      console.log(Error);
      process.exit(1)
    }
  }

  async readmany(table) {
    let consult = "SELECT * From ??";
    const box = [table]
    const result = await this.conector(consult,box)
    return result
  }
  async readsingle(table,where){
    const consult = "SELECT * From ?? where email = ?"
    const box = [table, where]
    const result = await this.conector(consult,box)
    return result
  }

  async findOut(table,data){
    const result = await this.readmany(table)
    try {
      for (const key of result) {
        if( key["email"] === data[0] ) throw new Error("Email ya existente")
        if( key["cedula"] === data[1] ) throw new Error("Cedula ya existente")
      }
      return false
    } catch (error) {
      console.log(error)
      process.exit(1)
    }
  }

  /*sanitize(array){
    for (const key in array) {
      try{
        /* if((key === 0 && typeof array[key] !== Number) || (key !== 0 && typeof array[key] === Number)) throw new Error('el parametro no es el correcto'); 
        if(typeof array[key] == "string"){
          array[key] = array[key].replace(/[\W\s]/g,'')
        }
      }catch(Error){
        console.log(Error);
        process.exit(1)
      }
    }
  }*/
  
  async insert(index,data,table) {
    let consult = "INSERT INTO ?? (??) VALUES (?)";
    const box = [table,index,data]
    const result = await this.conector(consult,box)
    console.log(result.affectedRows)
  }

  async update(table,index,data,Id){
    const consult = "Update ?? SET ?? = ? where Id = ?"
    const box = [table,index,data,Id]
    const result = await this.conector(consult,box)
    console.log(result.affectedRows)
  }

  async delete(table,where){
    if(where == null || where === "") throw new Error("No se permite realziar esta accion") 
    let consult="Delete from ?? where email = ?"
    const box = [table,where]
    const result = await this.conector(consult,box)
    console.log(result)
  }
}

module.exports = DBConect