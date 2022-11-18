import {FETCH_ORDERS,FETCH_ORDERS_DETAILS,FETCH_CUSTOMER_DETAILS} from '../actions/types';

const initialState = {
    order:{},
    orders:[],
    orderItems:[],
    customer:{}

    }
    export default function (state = initialState,actions){
        switch(actions.type){
            case FETCH_ORDERS:
                return {
                    ...state,
                    orders:actions.payload
                }
                case FETCH_ORDERS_DETAILS:
                    return {
                        ...state,
                        orderItems:actions.payload
                    }

                    case FETCH_CUSTOMER_DETAILS:
                        return {
                            ...state,
                            customer:actions.payload
                        }


            default : return state;
        }
    }
