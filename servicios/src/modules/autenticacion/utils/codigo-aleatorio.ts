export const codigoRandom = () =>{
    const caracteres = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    const longitudCodigo = 10;

    let codigo = '';

    for (let i=0; i < longitudCodigo; i++) {
        let indice = Math.floor(Math.random() * caracteres.length);
        codigo += caracteres.charAt(indice);
    }

    return codigo;
}