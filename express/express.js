const express = require("express")
const app = express()
const path = require("node:path")
const parser = require("body-parser")
const roun = require(".\\back\\user.js")
const { error } = require("node:console")

try{
  app.use(parser.urlencoded({extended:true}))

  app.disable("x-powered-by")
  app.use(express.static("front"))

  /* app.use("/registro",express.static("front")) */
  app.get("/",(req,res) =>{
    res.send("console")
  })

  app.use("/Usuario",roun)

  app.use((req,res)=>{
    res.status(404).send("<h1 style='font-weight:400'><strong>ERROR N-404</strong>:Pagina no Encontrada :(</h1>")
  })

}catch(err){
  console.log("Hubo un error: ",err);
  app.use((req,res) =>{
    res.status(505).send("Error 505: Error interno del Servidor")
  })
}
app.listen(3000,() => {
  console.log("http://localhost:3000")
})