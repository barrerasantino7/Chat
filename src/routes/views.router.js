const express = require("express");//Importamos express
const router = express.Router();//Importamos router

router.get("/", (req, res)=>{
    res.render("index");//Elegimos el archivo que deseamos renderizar

})//Creamos una ruta para un archivo

module.exports = router;//Exportamos el archivo