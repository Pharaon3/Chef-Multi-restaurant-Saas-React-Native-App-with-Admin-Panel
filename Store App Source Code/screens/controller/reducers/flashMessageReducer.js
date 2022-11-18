import {NEW_FLASH_MESSAGE,CLEAR_FLASH_MESSAGE} from '../actions/types';

const initialState = {
    flashMessage:{
    message: null,
    type:null,
    status: null,
    data:[]
    }
}


export default function (state = initialState,actions){
    switch(actions.type){
        case NEW_FLASH_MESSAGE:
            return {
                ...state,
                flashMessage:actions.payload
            }

        case CLEAR_FLASH_MESSAGE:
            return {
                    ...state,
                    flashMessage:actions.payload
            }
        default : return state;
    }
}