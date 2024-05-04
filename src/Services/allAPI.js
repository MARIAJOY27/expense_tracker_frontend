
import { serverURL } from "./baseUrl"
import { commonAPI } from "./commonAPI"


//api for adding income
 export const uploadIncomeAPI = async(reqBody) =>{
     return await commonAPI('POST',`${serverURL}/incomes`,reqBody)   
}

//api to get uploaded incomes
 export const getIncomeAPI = async()=>{
     return await commonAPI('GET',`${serverURL}/incomes`,"")
 }

 // api to delete an income
 export const deleteAnIncomeAPI= async(id)=>{
    return await commonAPI('DELETE',`${serverURL}/incomes/${id}`,{})
}

//api for adding expense
export const uploadExpenseAPI = async(reqBody)=>{
    return await commonAPI('POST',`${serverURL}/expenses`,reqBody)
}

//api to get uploaded expense
export const getUploadExpenseAPI = async()=>{
    return await commonAPI('GET',`${serverURL}/expenses`,"")
}

//api to delete an expense
export const deleteAnExpenseAPI= async(id)=>{
    return await commonAPI('DELETE',`${serverURL}/expenses/${id}`,{})
}


//api to add users--Signup 
export const addUsers = async (reqBody) => {
    return await commonAPI('POST', `${serverURL}/users`, reqBody)
}

//api to search is user
export const getUsers = async () => {
    return await commonAPI('GET', `${serverURL}/users`, "")
}

//api to create session
export const loginSession = async (reqBody) => {
    return await commonAPI('POST', `${serverURL}/sessionCreate`, reqBody)
}
