import {FETCH_LATEST_STATUS} from './types';
import { addNewMessage } from './flashMessageAction';
import api from '../../../constants/api'

export const fetchLatestReports = (postData,authorization) => dispatch => {
    console.log(api.reports.latest.path)
    fetch(api.reports.latest.path, {
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
                    type: FETCH_LATEST_STATUS,
                    payload: post.payload.data
                    })
            }
            
        }).catch((error) => {
            console.log(error)
            dispatch(addNewMessage({
                message: "Network error Please check your internet ",
                status: "error"
            }))
        });
}