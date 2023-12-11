import app from "./config/express";
import * as fs from 'fs';

const main = () => {
    const directorioPARCI = 'C:/PARCI';
    if (!fs.existsSync(directorioPARCI)) {
        fs.mkdirSync(directorioPARCI);
        console.log(`Directorio PARCI creado en ${directorioPARCI}`);
    } else {
        console.log(`El directorio PARCI ya existe en ${directorioPARCI}`);
    }

    try {
        app.listen(app.get('port'), () => {
            console.log(`Server is running in http://localhost:${app.get('port')}`);
        });
    } catch (error) {
        console.log(error);
    }
}


main();

