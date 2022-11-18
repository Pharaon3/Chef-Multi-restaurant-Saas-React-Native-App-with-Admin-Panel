import {FETCH_CATEGORIES,FETCH_ITEMS} from '../actions/types';

const initialState = {
    category:{},
    categories:[],
    Item:[],
    items:{}
    }
    export default function (state = initialState,actions){
        switch(actions.type){
            case FETCH_CATEGORIES:
                return {
                    ...state,
                    categories:actions.payload
                }
                case FETCH_ITEMS:
                    return {
                        ...state,
                        items:actions.payload
                    }
            default : return state;
        }
    }