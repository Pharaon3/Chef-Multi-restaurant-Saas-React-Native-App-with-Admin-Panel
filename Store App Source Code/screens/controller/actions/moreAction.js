import {ACCOUNT_SETTINGS} from './types';
import { addNewMessage } from './flashMessageAction';
import api from '../../../constants/api'
export const fetchStore = (postData) => dispatch => {
    let body = {
        shopId:postData.shopId
    }
    fetch(api.more.viewStore.path, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization":postData.token
        },
        body: JSON.stringify(body),
    }).then(response => response.json())
        .then(post => {
            if (post.success == true) {
               let data= {
                name:post.payload.data.store_name,
                email:post.payload.data.email,
                logo_url:post.payload.data.logo_url,
                address:post.payload.data.address,
                description:post.payload.data.description,
                phone:post.payload.data.phone,
                subscription_end_date:post.payload.data.subscription_end_date,
                product_count:post.payload.data.product_count
               }
               dispatch({
                type: ACCOUNT_SETTINGS,
                payload: data
                })
            }
            else {
             
            }
        }).catch((error) => {
            console.log(error)
            dispatch(addNewMessage({
                message: "Network error Please check your internet ",
                status: "error"
            }))
        });
}


export const updateStore = (postData,authorization) => dispatch => {
    fetch(api.more.updateStore.path, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization":authorization
        },
        body: JSON.stringify(postData),
    }).then(response => response.json())
        .then(post => {
            console.log(post)
            if (post.success == true) {
               let data= {
                name:post.payload.data.store_name,
                email:post.payload.data.email,
                logo_url:post.payload.data.logo_url,
                address:post.payload.data.address,
                description:post.payload.data.description,
                phone:post.payload.data.phone,
                subscription_end_date:post.payload.data.subscription_end_date,
                product_count:post.payload.data.product_count
               }
               dispatch({
                type: ACCOUNT_SETTINGS,
                payload: data
                })
                dispatch(addNewMessage({
                    message: "Record Updated Successfully",
                    status: post.status
                }))
            }
                else if(post.success == false) {
                    dispatch(addNewMessage({
                        message: post.error.message,
                        status: post.status
                    }))
                }
        }).catch((error) => {
            console.log(error)
            dispatch(addNewMessage({
                message: "Network error Please check your internet ",
                status: "error"
            }))
        });
}