import * as mysql from 'mysql2';
import 'dotenv/config';


const dbconfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
}


export const databaseConnection = <T>(query:string, params:any[]) =>{
    const connection = mysql.createConnection(dbconfig);
    
    return new Promise<T>((resolve,reject)=>{
        
        connection.query(query,params,(err,results:any,arr)=>{
            connection.destroy();
            if(err){
                reject(err);
            }else{
                if (results.insertId) {
                    resolve(results.insertId);
                } else {
                    resolve(results);
                }
            }
        });
    });
}

