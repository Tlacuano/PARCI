import bycript from 'bcryptjs';

export const encriptar = async (palabra : string)=>{
    const salt = await bycript.genSalt(12);
    const hasheado = await bycript.hash(palabra, salt);
    return hasheado;
}

export const compararEncriptado = async(palabra:string, hasheado:string)=>{
    return await bycript.compare(palabra,hasheado)
}