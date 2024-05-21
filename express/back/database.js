const sql = require("mysql")
const DBData = require("../DBdata")
class DBConect extends DBData{
  constructor(){
    super();
    this.conection = sql.createConnection({
      host : this.host,user : this.user,password :this.password,database : this.database
    })
  }

  async readmany(table) {
    let consult = "SELECT * From ??";
    try{
      const result =await new promise(() => {
        this.conection.query(consult,table, (error, result) => {
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
  async readsingle(table,where){
    const consult= "SELECT * From ?? where cedula = ?"
    try {
      // se crea una promesa para realizar la consulta sql
      const result = await new Promise((resolve, reject) => {
        this.conection.query(consult, [table, where], (error, result) => {
          //si hay un error se realizada el reject,en caso comtrario el resolve
          if (error) {
            reject(error);
          }
            resolve(result);
        });
      });
      return result;
    } catch (error) {
      console.log(error);
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
  
  insert(index,data,table) {
    let consult = "INSERT INTO ?? (??) VALUES (?)";
    this.conection.query(consult,[table,index,data],function (error,result,fields) {
      console.log(error)
      console.log("insert "+ result.affectedRows +" rows")
    })
  }

  delete(table,where){
    let consult="Delete from ?? where Cedula = ?"
    try{
      if(where == null){ throw new Error("No se permite realziar esta accion") }
      this.conection.query(consult,[table,where],function (error,result,fields) {
        if(error) throw new Error(error) 
        console.log(result.affectedRows)
      })
    }catch(error){
        console.log(error);
        process.exit(1)
    }
  }
}

module.exports = DBConect