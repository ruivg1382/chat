import express from 'express';
import { get } from 'express/lib/response';
import http from 'http';
import socketio from 'socket.io'

const app=express()
const server=http.Server(app)
const io=socketio(server)


app.use(express.static(__dirname+'/public'))


app.get('/', (req,res)=>{

    res.render('index.html')
})



io.on('connect', (socket)=>{

    io.to(socket.id).emit({
        status:true,
        message:'Conexão estabelicida com servidor'
    });

    socket.on('/', (res)=>{
        console.log(res)
        console.log("Mensagem recebida",res)

        //io.to(socket.id).emit(res);
        socket.broadcast.emit('/',res)
    })
})



server.listen(3333,()=>{
    console.log("Servidor rodando")
})