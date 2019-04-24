import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({});

instance.interceptors.response.use(function(response){

  if(response.status === 200 && response.data.code === -1){
    return response.data.data;
  }else{
    return Promise.reject(response.data);
  }

},function(error){
  return Promise.reject(error);
});
export default instance;
