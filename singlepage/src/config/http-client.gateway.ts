import { Axios, AxiosRequestConfig } from 'axios';
import AxiosClient from './axios';
import Vue from 'vue';


AxiosClient.interceptors.request.use(
    function (config) {
        const auth_token = localStorage.token;
        if (auth_token !== undefined) {
            if (!config.url!.includes("auth")) {
                config.headers!.Authorization = `Bearer ${auth_token}`;
            }
        }
        return config;
    },
    function (err) {
        return Promise.reject(err);
    }
);


AxiosClient.interceptors.response.use(
    (response) => {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },

    async (error) => {
        if (!error.response) {
            Vue.swal.fire({
                title: "El servidor no responde",
                text: "Sin respuesta del servidor, por favor inténtelo de nuevo",
                icon: "error",
                showConfirmButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
            });
            return Promise.reject(error);
        }

        if (error.response.status) {
            switch (error.response.status) {
                case 400: {
                    const { message } = error.response.data;
                    if (error.response.data.message) {
                        let messageAlert = "";
                        let titleAlert = "";
                        // Agregar swtich con los mensajes genéricos
                        switch (message) {
                            case "Usuario o contraseña incorrectos":
                                titleAlert= "Credenciales incorrectas";
                                messageAlert = "Usuario y/o contraseña erróneos";
                                break;
                            case "Código incorrecto":
                                titleAlert = "Código incorrecto";
                                messageAlert = "Código incorrecto";
                                break;
                            case "El usuario es requerido":
                                titleAlert = "El usuario es requerido";
                                messageAlert = "Usuario requerido";
                                break;
                            case "La contraseña es requerida":
                                titleAlert = "La contraseña es requerida";
                                messageAlert = "Contraseña requerida";
                                break;
                            case "Formato de contraseña incorrecto":
                                titleAlert = "Formato de contraseña incorrecto";
                                messageAlert = "El formato de la contraseña es incorrecto";
                                break;
                            case "El nombre es requerido":
                                titleAlert = "El nombre es requerido";
                                messageAlert = "No se ha ingresado el nombre";
                                break;
                            case "El nombre ya existe":
                                titleAlert = "El nombre ya existe";
                                messageAlert = "Ya existe un registro con ese nombre";
                                break;
                            case "El nombre no debe contener caracteres especiales":
                                titleAlert = "El nombre no debe contener caracteres especiales";
                                messageAlert = "El nombre no debe contener caracteres especiales";
                                break;
                            case "No se pudo modificar la entidad federativa":
                                titleAlert = "No se pudo modificar la entidad federativa";
                                messageAlert = "No se pudo modificar la entidad federativa";
                                break;
                            case "No se puede dejar una opinion vacia":
                                titleAlert = "campos incompletos";
                                messageAlert = "No se puede dejar una opinion vacia";
                                break;
                            case "No se pudo registrar la opinion":
                                titleAlert = "Vaya...";
                                messageAlert = "No se pudo registrar la opinion";
                                break;
                            case "Ya no puedes dar mas opiniones por el dia de hoy":
                                titleAlert = "Ya no puedes dar mas opiniones por el dia de hoy";
                                messageAlert = "haz alcanzado el limite de opiniones por dia";
                                break;
                        }                        
                        Vue.swal.fire({ text: messageAlert, title: titleAlert, icon: "warning", confirmButtonColor: "var(--color-primary)" });
                        break;
                    }
                    break;
                }
                case 401: {
                    Vue.swal.fire({
                        title: "No autorizado",
                        text: "La operación no está autorizada",
                        icon: "error",
                    });
                    break;
                }
                case 403: {
                    Vue.swal.fire({
                        title: "Prohibido",
                        text: "Está función no esta habilitada",
                        icon: "warning"
                    });
                    break;
                }
                case 404: {
                    const { message } = error.response.data;
                    if (error.response.data.message) {
                        let messageAlert = "";
                        let titleAlert = "";
                        // Agregar swtich con los mensajes genéricos
                        switch (message) {
                            case "Usuario no encontrado":
                                messageAlert = "";
                                titleAlert = "Usuario no encontrado";
                                break;
                            case "No match":
                                messageAlert = "No se encontraron coincidencias";
                                titleAlert = "Sin coincidencias";
                                break;
                            case "Teacher Not found":
                                messageAlert = "";
                                titleAlert = "Docente no encontrado";
                                break;
                            case "Training Not found":
                                messageAlert = "";
                                titleAlert = "Capacitación no encontrada";
                                break;
                        }
                        Vue.swal.fire({ text: messageAlert, title: titleAlert, icon: "warning", confirmButtonColor: "var(--color-primary)" });
                    }
                    break;
                }
                case 406: {
                    Vue.swal.fire({
                        title: "Recurso no Aceptado",
                        text: "El recurso ingresado no es aceptable",
                        icon: "warning"
                    });
                    break;
                }
                case 500: {
                    Vue.swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Error interno del servidor",
                    });
                    break;
                }
                case 501: {
                    Vue.swal.fire({
                        title: "Error interno",
                        text: "Se ha presentado un error en los servicios, vuelve a intentarlo",
                        icon: "warning"
                    });
                    break;
                }
            }
            return Promise.reject(error.response);
        }
        return Promise.reject(error);
    }
);



export default {
    doGet(endPoint: string, object?: object) {
        return AxiosClient.get(endPoint, object);
    },
    doPost(endPoint: string, object: object, config?: AxiosRequestConfig) {
        return AxiosClient.post(endPoint, object, config);
    },
    doPut(endPoint: string, object: object, config?: AxiosRequestConfig) {
        return AxiosClient.put(endPoint, object, config);
    },
    doPatch(endPoint: string, object: object, config?: AxiosRequestConfig) {
        return AxiosClient.patch(endPoint, object, config);
    },
    doDelete(endPoint: string, object: object) {
        return AxiosClient.delete(endPoint, object);
    }
}
