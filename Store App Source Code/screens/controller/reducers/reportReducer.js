import {FETCH_LATEST_STATUS} from '../actions/types';

const initialState = {
    latest_status:{}
}
export default function (state = initialState,actions){
    switch(actions.type){
        case FETCH_LATEST_STATUS:
            return {
                ...state,
                latest_status:actions.payload
            }
        default : return state;
    }
}