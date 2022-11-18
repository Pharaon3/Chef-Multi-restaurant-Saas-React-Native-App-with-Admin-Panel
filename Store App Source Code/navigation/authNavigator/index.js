import React from 'react';
import {
    Dimensions,
    Image
} from 'react-native'
import {createAppContainer} from 'react-navigation';
import { createStackNavigator, HeaderTitle } from 'react-navigation-stack';
import Screens from '../../screens'
import {Text,Block} from '../../components'
const {height,width} = Dimensions.get('window')

import {theme} from '../../constants';

const StackStyle = {

    headerStyle:{
        shadowColor: 'transparent',
        height:height/8,
        backgroundColor:theme.colors.black,
    },
    title: false,
    headerBackImage: () => null,
    headerBackTitle:() => null,
    headerRightContainerStyle :{
        alignItems:'center',
        marginTop:theme.sizes.base ,
        marginRight:theme.sizes.base * 1.25,

    },
    headerLeftContainerStyle :{
        marginTop:theme.sizes.base ,
        alignItems:'center',
        marginLeft:theme.sizes.base * 1.25,

    },
}
const screens = createStackNavigator({
    Home:{
        screen:Screens.ROOT,
        defaultNavigationOptions: {
            swipeEnabled: false
          }
    },
    Login:{
        screen:Screens.LOGIN,

        navigationOptions: {
            headerShown: false,
            gesturesEnabled: false,

        }
    },

},{

    initialRouteName: 'Login',
    headerMode: 'none',
    defaultNavigationOptions: {
      swipeEnabled: false
    }
})

export default createAppContainer(screens);