import express from 'express';
import userRoutes from '../routes/usuario';
import cors from 'cors';
import db from '../db/connection';



class Server{

    private app: express.Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }


    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8080'
        
        this.dbConnection()
        // Middlewares
        this.middlewares();

        // Definir nuestras rutas
        this.routes();

    }

    async dbConnection(){
        try {
            await db.authenticate()
            console.log('Database on');
        
        } catch (e) {
            throw new Error(e as string)
        }
    }

    middlewares(){
        //Cors
        this.app.use(cors())

        // Lectura del body

        this.app.use( express.json() )

        // Directorio publico
        this.app.use(express.static('public'));

    }
    
    routes(){
        this.app.use(this.apiPaths.usuarios, userRoutes)
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor en el puerto ${this.port}`);
        })
    }


}

export default Server;