/*
* Chat Api com NodeJs e Socket.io
* @author Miguel Carlos Honório
*/

'use strict';

const express = require("express");
const http = require('http');
const socketio = require('socket.io');

const socketEvents = require('./web/socket'); 
const routes = require('./web/routes'); 
const appConfig = require('./config/app-config'); 


class Server{

    constructor(){
        this.app = express();
        this.http = http.Server(this.app);
        this.socket = socketio(this.http);
    }

    appConfig(){        
        new appConfig(this.app).includeConfig();
    }

    /* Including app Routes starts*/
    includeRoutes(){
        new routes(this.app).routesConfig();
        new socketEvents(this.socket).socketConfig();
    }
    /* Including app Routes ends*/  

    appExecute(){
        this.appConfig();
        this.includeRoutes();

        const port =  process.env.PORT || 4000; // comum do Socket.io
        const host = process.env.HOST || `localhost`;      

        this.http.listen(port, host, () => {
            console.log(`Listening on http://${host}:${port}`);
        });
    }

}
    
const app = new Server();
app.appExecute();