import {FETCH_CATEGORIES,FETCH_ITEMS} from './types';
import { addNewMessage } from './flashMessageAction';
import api from '../../../constants/api'

export const fetchCategories = (postData,authorization) => dispatch => {
    fetch(api.inventory.viewCategories.path, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization":authorization
        },
        body: JSON.stringify(postData),
    }).then(response => response.json())
        .then(post => {
            // console.log(post)
            if (post.success == true) {
               dispatch({
                type: FETCH_CATEGORIES,
                payload: post.payload.data
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

export const updateCategory = (postData,authorization) => dispatch => {
    fetch(api.inventory.updateCategory.path, {
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
               dispatch({
                type: FETCH_CATEGORIES,
                payload: post.payload.data
                })
                dispatch(addNewMessage({
                    message: "Category update Successfully",
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

export const addNewCategory = (postData,authorization) => dispatch => {
//    console.log(api.inventory.addCategory.path)
    fetch(api.inventory.addCategory.path, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization":authorization
        },
        body: JSON.stringify(postData),
    }).then(response => response.json())
        .then(post => {
            if (post.success == true) {
               dispatch({
                type: FETCH_CATEGORIES,
                payload: post.payload.data
                })
                 dispatch(addNewMessage({
                    message: "New Category added Successfully",
                    status: post.status
                }))
            }
            else {
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



export const fetchItems = (postData,authorization) => dispatch => {
    fetch(api.inventory.viewItems.path, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization":authorization
        },
        body: JSON.stringify(postData),
    }).then(response => response.json())
        .then(post => {
            // console.log(post)
            if (post.success == true) {
               dispatch({
                type: FETCH_ITEMS,
                payload: post.payload.data
                })
            }
            else {
                // dispatch(addNewMessage({
                //     message: post.error.message,
                //     status: post.status
                // }))
            }
        }).catch((error) => {
            console.log(error)
            dispatch(addNewMessage({
                message: "Network error Please check your internet ",
                status: "error"
            }))
        });
}

export const createOrUpdateItem = (postData,authorization,type) => dispatch => {
    let API_PATH = type == 'UPDATE' ? api.inventory.updateItem.path : api.inventory.createItem.path
    fetch(API_PATH, {
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
               dispatch({
                type: type == 'UPDATE' ? FETCH_ITEMS:FETCH_ITEMS,
                payload: post.payload.data
                })

                dispatch(addNewMessage({
                    message: type == 'UPDATE'? "Item updated Successfully": "New Item added Successfully",
                    status: post.status
                }))
            }
            else {
                // dispatch(addNewMessage({
                //     message: post.error.message,
                //     status: post.status
                // }))
            }
        }).catch((error) => {
            console.log(error)
            dispatch(addNewMessage({
                message: "Network error Please check your internet ",
                status: "error"
            }))
        });
}

