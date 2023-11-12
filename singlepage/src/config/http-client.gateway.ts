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
                            case "Missing fields":
                                messageAlert = "Campos obligatorios";
                                titleAlert = "Faltan campos obligatorios por llenar";
                                break;
                            case "Incorrect credentials":
                                messageAlert = "Credenciales incorrectas";
                                titleAlert = "Usuario y/o contraseña erróneos";
                                break;
                            case "Already exists":
                                messageAlert = "El registro ya existe o cuenta con campos duplicados en otro registro";
                                titleAlert = "Registro ya existente";
                                break;
                            case "Invalid fields":
                                messageAlert = "Los campos ingresados son inválidos";
                                titleAlert = "Campos inválidos";
                                break;
                            case "User occupied":                                
                                messageAlert = "El usuario ingresado ya se encuentra ocupado";
                                titleAlert = "Usuario no disponible";
                                break;
                            case "Email occupied":
                                messageAlert = "El correo electrónico ingresado ya se encuentra ocupado";
                                titleAlert = "Correo electrónico no disponible";
                                break;
                            case 'cannot be deleted':                                
                                messageAlert = "Por motivos de integridad, la eliminación no es posible";
                                titleAlert = "Eliminación no permitida";
                                break;
                            case "Bad Request":
                                messageAlert = "El servidor no pudo dar respuesta a la solicitud.";
                                titleAlert = "Petición incorrecta";
                                break;
                            case "Invalid sort by fields":
                                messageAlert = "El ordenamiento por campo ingresado es inválido";
                                titleAlert = "Ordenamiento por campo inválido";
                                break;
                        }                        
                        Vue.swal.fire({ text: messageAlert, title: titleAlert, icon: "warning" });
                        break;
                    }
                    break;
                }
                case 401: {
                    Vue.swal.fire({
                        title: "Credenciales incorrectas",
                        text: "Usuario y/o contraseña incorrectos",
                        icon: "error",
                        confirmButtonColor: 'var(--color-secondary)',
                    });
                    // sessionStorage.removeItem("token");
                    // router.push('/');
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
                            case "Not found":
                                messageAlert = "El recurso solicitado no ha sido encontrado";
                                titleAlert = "Recurso no encontrado";
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
                        Vue.swal.fire({ text: messageAlert, title: titleAlert, icon: "warning" });
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
