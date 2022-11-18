import {ACCOUNT_SETTINGS} from '../actions/types';

const initialState = {
store:{
    name:'',
    address:'',
    is_accepted:'',
    description:'',
    pincode:'',
    is_pureveg:'',
    delivery_time:'',
    price_range:'',
    min_order_price:'',
    restaurant_charges:'',
    landmark:'',
    latitude:'',
    longitude:'',
    certificate:'',
    }
}
export default function (state = initialState,actions){
    switch(actions.type){
        case ACCOUNT_SETTINGS:
            return {
                ...state,
                store:actions.payload
            }
        default : return state;
    }
}