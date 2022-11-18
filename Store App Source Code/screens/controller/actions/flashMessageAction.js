import {NEW_FLASH_MESSAGE,CLEAR_FLASH_MESSAGE} from './types';

export const addNewMessage = (postData)=>dispatch=>{
    dispatch({
        type:NEW_FLASH_MESSAGE,
        payload:postData
    })
}
export const clearAllMessages = ()=>dispatch=>{
    dispatch({
        type:CLEAR_FLASH_MESSAGE,
        payload:{ message: null,
            type:null,
            status: null,
            data:[]}
    })
}