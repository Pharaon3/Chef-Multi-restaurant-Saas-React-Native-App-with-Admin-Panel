
import React, { Component } from "react";
import {userData} from '../controller/actions/authenticationAction'
import { connect } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';
import Splash from "./extra/splash";
import AsyncStorage from "@react-native-community/async-storage";
const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Dashboard' })],
});

class Home extends Component {
    constructor(props){
        super()
       props.userData({type:"FETCH",key:"USER_DATA"})
    }
    state = {
        loading:true
    }
    componentDidMount(){
        this.checkLoginStatus("USER_DATA")
    }
    async checkLoginStatus(key) {
        const {navigation} = this.props;
        try {
          let userData = await AsyncStorage.getItem(key);
          let data = JSON.parse(userData);
          setTimeout( () => {
            if(data == null){
                this.props.navigation.navigate('Login')
            }else{
                navigation.dispatch(resetAction)
            }
        },1000);
          console.log("check",data)
        } catch (error) {
          console.log("Something went wrong", error);
        }
      }


    render() {

        return (
            <Splash/>

        );
    }
}
const mapSateToProps = state => ({
    authentication:state.authentication.loginUser
})
export default connect(mapSateToProps,{userData}) (Home);

