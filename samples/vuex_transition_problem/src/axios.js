import axios from "axios";
import { baseUrl } from './../vue.config'

const client = axios.create({
  baseURL: `${baseUrl}api`
});

export default client;
