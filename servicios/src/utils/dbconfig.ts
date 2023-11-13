import * as mysql from 'mysql2';
import 'dotenv/config';


const dbconfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
}


export const ConexionBD = <T>(query:string, params:any[]) =>{
    const conexion = mysql.createConnection(dbconfig);
    
    return new Promise<T>((resolve,reject)=>{
        
        conexion.query(query,params, (err, resultados:any, arr)=>{
            conexion.destroy();
            if(err){
                reject(err);
            }else{
                if (resultados.insertId) {
                    resolve(resultados.insertId);
                } else {
                    resolve(resultados);
                }
            }
        });
    });
}

