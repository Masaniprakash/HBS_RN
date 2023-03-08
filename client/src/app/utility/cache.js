import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment, { now } from "moment";



const store=async(key,value)=>{
    try {
        const item={
            value
        } 
        await AsyncStorage.setItem(key,JSON.stringify(item))
    } catch (error) {
        console.log(error);
    }
}

const get=async(key)=>{
    try {
        const result= await AsyncStorage.getItem(key)
        const item=JSON.parse(result)
        console.log(item);
        if(!item) return null;
        return item.value;
    } catch (error) {
        console.log(error);
    }
}

export default{
    store,
    get
}