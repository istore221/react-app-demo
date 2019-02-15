import {API_ENDPOINT} from '../constants/const';
import axios from 'axios';
import LocalService from '../agent/localservice';

const myAxios = () => axios.create({ baseURL: API_ENDPOINT,headers: {'Authorization': LocalService.getToken()}});
export default myAxios;
