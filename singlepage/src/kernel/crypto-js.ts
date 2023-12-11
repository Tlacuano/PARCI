import CryptoJS from "crypto-js";

const secreto = 'Tlaxcala';

export function encriptar(data: string): string {
    const encriptato =  CryptoJS.AES.encrypt(data, secreto).toString();
    return encriptato.toString().replaceAll('/', '-');
}

export function desencriptar(data: string): string {
    data = data.replaceAll('-', '/');
    return CryptoJS.AES.decrypt(data, secreto).toString(CryptoJS.enc.Utf8);
}