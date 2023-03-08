// import { create } from "apisauce";

// // const apiClient=create({
// //     baseURL:"http://2402:3a80:438:6057:6544:1c61:72f6:98fd/assets/"
// // })

// // apiClient.get('/listings')
// // .then((response)=>{
// //     if(!response.ok){
// //         response.problem
// //     };
// // })

// const apiClient=create({
//     baseURL:"http://192.168.101.8/api",
//     port:9000
// })

// export default apiClient

import { create } from "apisauce";
import cache from '../app/utility/cache.js'

const apiClient = create({
  baseURL: "http://192.168.43.241:4000/api",
});

const get= apiClient.get;
apiClient.get= async(url,params, axiosConfig)=>{
    const response= await get(url,params,axiosConfig);
    console.log(response);
    if(response.ok){
    // cache.store(url,response.data)
      return response;
    }

    // const data= await cache.get(url)
    // return data ? {ok:true,data} : response;
}


export default apiClient;