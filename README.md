# Encriptación de Datos Frontend y Backend utilizando node-forge y Cipher

---

Este mini proyecto implementa un sistema de encriptación de datos para garantizar la seguridad de la comunicación entre el frontend y el backend de una aplicación web. Se utilizan algoritmos de cifrado AES (Advanced Encryption Standard) para cifrar y descifrar los datos sensibles, asegurando así su confidencialidad durante la transmisión y almacenamiento.

---

## Métodos de Cifrado Utilizados
AES (Advanced Encryption Standard)
AES es un algoritmo de cifrado simétrico ampliamente utilizado que ofrece un alto nivel de seguridad. En este proyecto, se utiliza AES en modo CBC (Cipher Block Chaining) con PKCS5Padding para cifrar y descifrar los datos.

El modo CBC utiliza un vector de inicialización (IV) único para cada mensaje, lo que aumenta la seguridad del cifrado al introducir aleatoriedad en cada cifrado individual. El relleno PKCS5Padding se utiliza para asegurar que los datos a cifrar tengan una longitud compatible con el tamaño del bloque de cifrado.


### Frontend
En el frontend, se utiliza JavaScript para cifrar los datos antes de enviarlos al servidor y para descifrar los datos recibidos del servidor.
- Archivo AES.js en utils/security: Este archivo contiene las funciones encrypt y decrypt que implementan el cifrado y descifrado utilizando el algoritmo AES en modo CBC (Cipher Block Chaining). Se utiliza la biblioteca node-forge para manejar la criptografía en el navegador.
- Archivo HTTP-CLIENT.GATEWAY.js en config: Este archivo configura un interceptor para las solicitudes HTTP salientes y entrantes. En la solicitud saliente, se cifran los datos antes de enviarlos al servidor utilizando la función encrypt. En la respuesta entrante, se descifran los datos recibidos utilizando la función decrypt.

### Backend
En el backend, se utiliza Java para cifrar y descifrar los datos sensibles antes de almacenarlos en la base de datos y después de recibirlos del cliente.
- Archivo Encrypt.java en utils: Este archivo proporciona métodos para cifrar y descifrar datos utilizando el algoritmo AES en modo CBC. Se utiliza la clase Cipher de Java para manejar la criptografía en el servidor.
- Archivo UserService.java en service: Este servicio interactúa con la base de datos y cifra la contraseña del usuario antes de almacenarla utilizando la función encrypt del archivo Encrypt.java.

---

Para instalar la libreria de node-forge se emplea el siguiente comando (FRONTEND):
```
npm i node-forge
```

Para utilizar Cipher se emplea la siguiente importacion (BACKEND):
```
npm i node-forge
```

---

Se emplea el @Component para indicar que que esa clase debe ser escaneada y administrada por el contenedor de Spring. Esto significa que Spring creará una instancia de la clase y la mantendrá en el contexto de la aplicación, lo que permite la inyección de dependencias en otras partes de la aplicación.

---

Para que se pueda tener una clave secreta se necesita crear un archivo .env a nivel raiz del proyecto en frontend, en este se tendra la llave secreta para que esta se pueda comparar con la que hay en el backend, de igual manera en este se configuran las variables de entorno como:

## VITE_API_URL=http://localhost:8080/venta-ropa/api

---

En esta funcion empleada en el frontend:

```
export const encrypt = (data) => {
    const jsonString = JSON.stringify(data);

    const cipher = forge.cipher.createCipher("AES-CBC", key);

    const iv = forge.random.getBytesSync(16);
    cipher.start({ iv });

    cipher.update(forge.util.createBuffer(jsonString, "utf8"));
    cipher.finish();

    const encryptedData = forge.util.encode64(iv + cipher.output.getBytes());
    const encodedDataPost = encodeURIComponent(encryptedData);
    
    return encodedDataPost;
};

```

Creación de una cadena JSON: La función toma un objeto de datos y lo convierte en una cadena JSON utilizando JSON.stringify(data). Esto es necesario porque normalmente los datos cifrados se manejan como cadenas de texto.

Creación del cifrador AES-CBC: Utiliza la biblioteca Forge.js para crear un cifrador AES-CBC utilizando una clave (key). Es importante destacar que la variable key debe estar definida y ser accesible en el ámbito en el que se llama esta función, ya que se utiliza para cifrar los datos.

Generación de un vector de inicialización (IV): Se genera un vector de inicialización (IV) aleatorio de 16 bytes utilizando forge.random.getBytesSync(16). El IV es necesario para cifrar en modo CBC y es importante que sea único para cada mensaje cifrado.

Configuración del cifrador con el IV: Se inicia el cifrador con el IV generado usando cipher.start({ iv }).

Cifrado de los datos: Se cifra la cadena JSON utilizando el método update del cifrador, pasando la cadena de texto como un búfer UTF-8.

Finalización del cifrado: Se finaliza el proceso de cifrado utilizando el método finish del cifrador.

Codificación de los datos cifrados: Los datos cifrados junto con el IV se codifican en Base64 utilizando forge.util.encode64. El IV se concatena con los datos cifrados antes de codificarlos en Base64.

Codificación URI: Los datos cifrados en Base64 se codifican nuevamente utilizando encodeURIComponent para asegurarse de que sean seguros para ser enviados como parámetros en una URL.

Retorno del resultado: Finalmente, la función devuelve los datos cifrados y codificados URI.

---

Por el otro lado se emplea esta en el backend para descencriptar la informacion:

```
public static String decrypt(String value) throws Exception {
        String urlDecode = URLDecoder.decode(value.replaceAll("\\+","%2B"), "UTF-8");
        Key key = generateKey();
        Cipher cipher = Cipher.getInstance(TRANSFORMATION);
        byte[] decodedValue = Base64.getDecoder().decode(urlDecode);
        byte[] iv = new byte[16];
        System.arraycopy(decodedValue, 0, iv, 0, iv.length);
        IvParameterSpec ivParameterSpec = new IvParameterSpec(iv);
        cipher.init(Cipher.DECRYPT_MODE, key, ivParameterSpec);
        byte[] decryptedByteValue = cipher.doFinal(decodedValue, iv.length, decodedValue.length - iv.length);
        return new String(decryptedByteValue, "utf-8");
    }
```

Decodificación de la cadena de texto cifrada: La cadena de texto cifrada se decodifica primero utilizando URLDecoder.decode para decodificar los caracteres especiales de URL y luego se reemplazan los caracteres + con %2B para evitar errores de decodificación.

Generación de la clave: Llama a un método generateKey() para obtener la clave utilizada para el cifrado. Esta clave debe coincidir con la que se utilizó para cifrar los datos.

Creación del objeto Cipher: Utiliza Cipher.getInstance(TRANSFORMATION) para obtener una instancia de Cipher utilizando el mismo algoritmo de cifrado y modo de operación que se utilizó para cifrar los datos.

Decodificación de los datos cifrados: La cadena de texto descifrada se decodifica desde Base64 utilizando Base64.getDecoder().decode().

Obtención del IV: Se extrae el vector de inicialización (IV) de los datos decodificados. En este caso, el IV se coloca al principio de los datos cifrados.

Inicialización del cifrador con el IV: Se inicializa el cifrador en modo de descifrado (Cipher.DECRYPT_MODE) utilizando la clave y el IV obtenidos.

Descifrado de los datos: Se realiza el proceso de descifrado utilizando el método doFinal del cifrador, pasando los datos decodificados y especificando el rango de bytes a descifrar.

Retorno del resultado descifrado: Finalmente, se convierten los bytes descifrados en una cadena de texto utilizando la codificación UTF-8 y se devuelve como resultado.

---
