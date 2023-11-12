import axios,{AxiosInstance} from 'axios';

const SERVER_URL = process.env.VUE_APP_PASS_BASE_URL

const instance : AxiosInstance = axios.create({
    baseURL: SERVER_URL,
    timeout: 30000
});

export default instance;