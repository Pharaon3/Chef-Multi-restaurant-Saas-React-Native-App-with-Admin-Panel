import {  LOGIN_USER,NOTIFICATION_ADD } from './types';
import AsyncStorage from '@react-native-community/async-storage';
import { addNewMessage } from './flashMessageAction';
import PushNotification from "react-native-push-notification";
import api from '../../../constants/api'
import notifications from '../../../constants/notification';
export const loginUser = (postData) => dispatch => {
    fetch(api.authentication.login.path, {

        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
    }).then(response => response.json())
        .then(post => {
            console.log(post)
            if (post.success == true) {
                let data = {
                    isLoggedIn: post.success,
                    shopId: post.payload.user.id,
                    shopViewId:post.payload.user.view_id,
                    token: post.payload.access_token,
                    token_type: post.payload.token_type,
                    refreshToken: '',
                    notification_token: '',
                    expiresOn: '',
                    data: '',
                }
                dispatch({
                    type: LOGIN_USER,
                    payload: data
                })
                dispatch(addNewMessage({
                    message: post.status,
                    status: post.status
                }))
                dispatch(userData({ type: "STORE", key: "USER_DATA", data: data }))
                dispatch(savePushToken({data: data}))
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
export const userData = (postData) => dispatch => {
    switch (postData.type) {
        case "STORE":
            Storage(JSON.stringify(postData.data), postData.key, postData.type)
            break;
        case "FETCH":
            const getUserData = async () => {
                let userData = '';
                try {
                    userData = await AsyncStorage.getItem('USER_DATA') || 'none';
                    userData != 'none' ? dispatch({
                        type: LOGIN_USER,
                        payload: JSON.parse(userData)
                    }) : dispatch({  type: LOGIN_USER,
                            payload:{
                                isLoggedIn: false,
                            }
                        })

                } catch (error) {
                    // Error retrieving data
                    console.log(error.message);
                }
                return userData;
            }
            getUserData()
        case "DESTROY":
            Storage(null,postData.key,postData.type)
            dispatch({  type: LOGIN_USER,
                payload:{
                    isLoggedIn: false,
                }
            })





    }
}

const Storage = async (data, key, type) => {
    try {
        if (type == "STORE")
            await AsyncStorage.setItem(key, data);
        else if(type == "DESTROY")
            await AsyncStorage.removeItem(key);

        await AsyncStorage.setItem(key, data);
    } catch (error) {
        console.log(error.message);
    }

}

export const savePushToken = (postData) => dispatch => {
    let self = this;
    PushNotification.configure({
      largeIcon: "ic_launcher",
      smallIcon: "ic_notification",
      onRegister: function (token) {
        let body = {
            store_id:postData.data.shopId,
            // user_id:postData.data.userId,
            token:token.token
        }
        console.log(token)
        fetch(api.authentication.save_push_token.path, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization":postData.data.token_type +" "+postData.data.token
            },
            body: JSON.stringify(body),
        }).then(response => response.json())
            .then(post => {
                console.table(postData.data.token_type +" "+postData.data.token,
                body
                )
                console.log("post response ........",post)
            }).catch((error) => {
                console.log(error)

            });
      },
      onNotification: function (notification) {
        if(!notification.userInteraction) {
        PushNotification.localNotification({
            id: 0,
            largeIcon: "ic_launcher",
            smallIcon: "ic_notification",
            color: "red",
            vibrate: true,
            vibration: 300,
            channelId: notifications.channel_id,
            onlyAlertOnce: false,
            invokeApp: true,
            title: notification.title,
            message: notification.message,
            playSound: true,
            soundName: "default",
            number: 10,
          });
        }

        dispatch({
            type: NOTIFICATION_ADD ,
            payload: notification
        })
      },
      senderID: notifications.channel_id,
      playSound: true,
      soundName: 'default',
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
      popInitialNotification: true,
      requestPermissions: true
    });



}