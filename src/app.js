const express = require("express")
const app = express();
const PUERTO = 8080 
const exphbs = require("express-handlebars");//Importamos handlebars
const socket = require("socket.io");



//Importar rutas de la carpeta routes
const viewsRouter = require("./routes/views.router.js");


//Configuracion de Handlebars
app.engine("handlebars", exphbs.engine());//Le decimos al sistema que el motor de plantillas va a usar esa extension
app.set("view engine", "handlebars");//Configuramos a Handlebars
app.set("views","./src/views");//La ubicacion de los archivos de handlebars

//Middleware
app.use(express.static("./src/public")); //Establece que public sera un archivo estatico


//Rutas
app.use("/", viewsRouter);

//Levantamos el servidor y lo guardamos en una referenica
const httpServer = app.listen(PUERTO, ()=>{
    console.log(`Escuchando en el puerto ${PUERTO}`)
})

//Usamos la referencia del servidor para usarlo con Websocket
const io = new socket.Server(httpServer);

//Array vacio de mensajes
let messages = []

//Evento inicial para conectarnos al cliente (servidor-cliente)
io.on("connection", (socket)=>{//No debo de olvidarme de poner socket en el callback
    console.log("Un cliente conectado")

    //test
    socket.on("saludo", (data)=>{
        console.log(data)
    })

    socket.on("message", (data)=>{
        //Recibo la data del cliente y lo pusheo al array
        messages.push(data);
        //Devolvemos el array (Revisar por que lleva io)
        io.emit("messagesLog", messages);
    })
})

//Sumar esto al package.json, justo debajo de "scripts"
/*
  "engines":{
    "node":"14.x"
  },
*/ 
//Y sumar esto EN "scripts"
/*
"start": "node src/app.js"
 */