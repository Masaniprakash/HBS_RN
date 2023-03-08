// import client from './client'

// const endpoint='/listings'
// // const getListings=()=>{
// //     client.get(endpoint);
// // console.log(endpoint);
//  const getListings=()=>{return(client.get(endpoint))};
// // }

// export default {
//     getListings
// }

import apiClient from "./client";
import client from "./client";

// const endpoint = "/listings";

const getListings = (endpoint) => client.get(endpoint);

// console.log(getListings);
const addListing=(listing,onUploadProgress)=>{
    // console.log(listing);
    const data= new FormData()
        data.append('title',listing.title);
        data.append('price',listing.price);
        data.append('categoryId',listing.category.value);
        data.append('description',listing.description)

        listing.images.forEach((image,index)=>{
            data.append('images',{
                name:"image"+index,
                type:"image/jpeg",
                uri:image
            })
        });
        return (
        client.post(endpoint,data,{
            onUploadProgress:progress=>{onUploadProgress(progress.loaded/progress.total)}
            // progress.loaded/
        }) )
    }

// const get= apiClient.get;
// apiClient.get= async(url,params, axiosConfig)=>{
//     const response= await get(url,params,axiosConfig);
//     if(response.ok)
//     cache.store(url,response.data)
//     return response;
// }

export default { getListings, addListing}