import React from 'react';
import {
    Image
} from 'react-native'
import {createAppContainer} from 'react-navigation';
import { createStackNavigator, HeaderTitle } from 'react-navigation-stack';
import Screens from '../../screens'
import {Text} from '../../components'
import BottomNavigator from '../dashboardNavigator'
import AuthNavigator from '../authNavigator'
import {theme} from '../../constants';


const screens = createStackNavigator({
    Home:{
        screen:AuthNavigator,
    },
    Dashboard:{screen:BottomNavigator},

},{

    headerMode: 'none',
})
export default createAppContainer(screens);