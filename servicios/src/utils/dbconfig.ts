import * as mysql from 'mysql2';
import 'dotenv/config';


const client = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});



export const ConexionBD = <T>(query:string, params:any[]) =>{
    
    return new Promise<T>((resolve,reject)=>{
        
        client.query(query,params, (err, resultados:any, arr)=>{
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
