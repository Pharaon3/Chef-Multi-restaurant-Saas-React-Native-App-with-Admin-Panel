import {LOGIN_USER,NOTIFICATION_ADD} from '../actions/types';

const initialState = {
    loginUser:{
        isLoggedIn: false,
        shopId:'',
        shopName:'',
        shopEmail:'',
        shopLogo:'',
        token: '',
        refreshToken: '',
        token_type: '',
        expiresOn: '',
        notification_token:'',
        data: '',
    },
    notifications:{}
}

export default function (state = initialState,actions){
    switch(actions.type){
        case LOGIN_USER:
            return {
                ...state,
                loginUser:actions.payload
            }
        case NOTIFICATION_ADD:
            return {
                ...state,
                notifications:actions.payload
            }
        default : return state;
    }
}