import React from 'react';
import {
    Dimensions,
    Image
} from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createAppContainer, ScrollView,StackActions, NavigationActions} from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import Screens from '../../screens'
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import {Text,Block} from '../../components'
const {height,width} = Dimensions.get('window')

import {theme} from '../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
const hideBottomNavigator = ['AccountSettings','ViewOrder','AddCategory','OutletInfo','AddItem']
const StackStyle = {
    headerStyle:{
        shadowColor: 'transparent',
        height:height/9,
        backgroundColor:theme.colors.white,
        elevation: 0
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

const Home = createStackNavigator ({
    Home:{
        screen:Screens.Home,
        navigationOptions:{
            headerRight:()=> (<Block row >
                <Image source={require('../../assets/logo.png')}
                          style={{width:180,height:40}}
                          resizeMethod="resize"
                          />
            </Block>),
            headerLeft:()=>(
            <Block>
            <Text black bold h1 center>Home</Text>
            </Block>
            )
        }
    },
},{
    defaultNavigationOptions:StackStyle,
});
const Orders = createStackNavigator ({
    Home:{
        screen:Screens.ORDERS,
        navigationOptions:{
            headerRight:()=> (<Block row >
                <Image source={require('../../assets/logo.png')}
                          style={{width:180,height:40}}
                          resizeMethod="resize"
                          />
            </Block>),
            headerLeft:()=>(
            <Block>
            <Text black bold h1 center>Orders</Text>
            </Block>
            )
        }
    },
    ViewOrder:{
        screen:Screens.VIEW_ORDER_DETAILS,
        navigationOptions:({navigation})=>{
         return{
            headerRight: ()=>(<Block style={{marginTop:theme.sizes.base,alignItems: "flex-end"}}>

                 <Text h3 >ORDER NO.</Text>
                 <Text  h3 >{navigation.getParam('data').unique_order_id}</Text>
                 </Block>
            ),
            headerLeft: () =>
        (<Block flex={1} center style={{marginTop:theme.sizes.base}} >
            <TouchableOpacity
                onPress={() => navigation.goBack()}>
                <Icon name="times" color={"black"} size={25} />
            </TouchableOpacity>

            </Block>
            ),
         }
        }
    },
},{
    defaultNavigationOptions:StackStyle,
});
const Category = createStackNavigator ({
    Category:{
        screen:Screens.CATEGORY,
        navigationOptions:{
            headerRight:()=> (<Block  >
                <Image source={require('../../assets/logo.png')}
                          style={{width:180,height:40}}
                          resizeMethod="resize"
                          />
            </Block>),
            headerLeft:()=>(
            <Block>
            <Text  black bold h1 center>Category</Text>
            </Block>
            )
        },

    },
    AddCategory:{
        screen:Screens.ADD_CATEGORY,
        navigationOptions:({navigation})=>{
            return{
            headerStyle:{
                shadowColor: 'transparent',
        height:height/8,
        backgroundColor:theme.colors.white,
        elevation: 0
            },
            headerRight: () =>
            (<Block flex={1} center style={{ alignItems: "flex-end", marginTop:0}} >
            <TouchableOpacity
                onPress={() => navigation.goBack()}>
                <Icon name="times" color={"black"} size={25} />
            </TouchableOpacity>
            </Block>
            ),
            headerLeft:()=>(
            <Block>
            <Text  black bold h1 center>Add Category</Text>
            </Block>
            )
            }
        },
    },
    UpdateCategory:{
        screen:Screens.UPDATE_CATEGORY,
        navigationOptions:({navigation})=>{
            return{
                headerStyle:{
                    shadowColor: 'transparent',
            height:height/8,
            backgroundColor:theme.colors.white,
            elevation: 0
                },
            headerRight: () =>
            (<Block flex={1} center style={{ alignItems: "flex-end", marginTop:0}} >
            <TouchableOpacity
                onPress={() => navigation.goBack()}>
                <Icon name="times" color={"black"} size={25} />
            </TouchableOpacity>
            </Block>
            ),
            headerLeft:()=>(
            <Block>
            <Text  black bold h1 center>Update Category</Text>
            </Block>
            )
            }
        },
    },

},{
    defaultNavigationOptions:StackStyle
});
const Product = createStackNavigator ({
    Product:{
        screen:Screens.PRODUCT,
        navigationOptions:{
            headerRight:()=> (<Block >
                <Image source={require('../../assets/logo.png')}
                          style={{width:180,height:40}}
                          resizeMethod="resize"
                          />
            </Block>),
            headerLeft:()=>(
            <Block>
            <Text black bold h1 center>Product</Text>
            </Block>
            )
        },


    },
    AddItem:{
        screen:Screens.ADD_ITEM,
        navigationOptions:({navigation})=>{
            return{
                headerStyle:{
                    shadowColor: 'transparent',
            height:height/8,
            backgroundColor:theme.colors.white,
            elevation: 0
                },
            headerRight: () =>
            (<Block flex={1} center style={{ alignItems: "flex-end", marginTop:0}} >
            <TouchableOpacity
                onPress={() => navigation.goBack()}>
                <Icon name="times" color={"black"} size={25} />
            </TouchableOpacity>
            </Block>
            ),
            headerLeft:()=>(
            <Block>
            <Text  black bold h1 center>Add Item</Text>
            </Block>
            )
            }
        },
    },

    UpdateItem:{
        screen:Screens.UPDATE_ITEM,
        navigationOptions:({navigation})=>{

            return{
                headerStyle:{
                    shadowColor: 'transparent',
            height:height/8,
            backgroundColor:theme.colors.white,
            elevation: 0
                },
            headerRight: () =>
            (<Block flex={1} center style={{ alignItems: "flex-end", marginTop:0}} >
            <TouchableOpacity
                onPress={() => navigation.goBack()}>
                <Icon name="times" color={"black"} size={25} />
            </TouchableOpacity>
            </Block>
            ),
            headerLeft:()=>(
            <Block>
            <Text  black bold h1 center>Update Item</Text>
            </Block>
            )
            }
        },
    },



},{
    defaultNavigationOptions:StackStyle
});



const More = createStackNavigator ({
    More:{
        screen:Screens.MORE,
        navigationOptions:{
            headerRight:()=> (<Block  >
                  <Image source={require('../../assets/logo.png')}
                          style={{width:180,height:40}}
                          resizeMethod="resize"
                          />
            </Block>),
            headerLeft:()=>(
            <Block>
            <Text  black bold h1 center>More</Text>
            </Block>
            )
        },
    },
    AccountSettings:{
        screen:Screens.ACCOUNT_SETTINGS,
        navigationOptions:({navigation})=>{
         return{
            headerLeft: ()=>(<Block >
                 <Text bold h1 white>Account</Text>
                 <Text bold h1 white>Settings</Text>
                 </Block>
            ),
            headerRight: () =>
            (<Block flex={1} center style={{ alignItems: "flex-end", marginTop:theme.sizes.base * .5}} >
            <TouchableOpacity

                onPress={() => navigation.goBack()}>
                <Icon name="times" color={"white"} size={25} />
            </TouchableOpacity>

            </Block>
            ),
         }
        }
    },


    OutletInfo:{
        screen:Screens.OUTLET_INFO,
        navigationOptions:({navigation})=>{
            return{
            headerStyle:{
            shadowColor: 'transparent',
            height:height/8,
            backgroundColor:theme.colors.white,
            elevation: 0
                },
            headerRight: () =>
            (<Block flex={1} center style={{ alignItems: "flex-end", marginTop:0}} >
            <TouchableOpacity

                onPress={() => navigation.goBack()}>
                <Icon name="times" color={"black"} size={25} />
            </TouchableOpacity>
            </Block>
            ),
            headerLeft:()=>(
            <Block>
            <Text  black bold h1 center>Outlet Info</Text>
            </Block>
            )
            }
        },

    },
    PaymentDetails:{
        screen:Screens.PAYMENT_DETAILS,
        navigationOptions:({navigation})=>{
         return{
            headerLeft: ()=>(<Block style={{marginTop:theme.sizes.base}}>

                 <Text bold h1 white>Payment</Text>
                 <Text bold h1 white>Method</Text>
                 </Block>

            ),
            headerRight: () =>
        (<Block flex={1} center style={{ alignItems: "flex-end" }} >
            <TouchableOpacity
                onPress={() => navigation.goBack()}>
                <Icon name="times" color={"white"} size={25} />
            </TouchableOpacity>
            <Image source={require('../../assets/logo.png')}
            style={{ width: theme.sizes.base * 7.5, height: theme.sizes.base * 7.5,}}
            resizeMode="center"
            />
            </Block>
            ),
         }
        }

    }



},{
    defaultNavigationOptions:StackStyle
});



const screens = createBottomTabNavigator({

    Home:{
        screen:Home,
        navigationOptions:{
            tabBarLabel:'Home',
            tabBarIcon:({tintColor})=>(
                <Icon name="home" color={tintColor} size={25}/>
            )
        }
    },
    Orders:{
        screen:Orders,
        navigationOptions:{
            tabBarLabel:'Orders',
            tabBarIcon:({tintColor})=>(
                <Icon name="receipt" color={tintColor} size={25}/>
            )
        }
    },
   Category:{
        screen:Category,
        navigationOptions:{
            tabBarLabel:'Category',
            tabBarIcon:({tintColor})=>(
                <Icon name="list" color={tintColor} size={25}/>
            )
        }
    },
    Product:{
        screen:Product,
        navigationOptions:{
            tabBarLabel:'Product',
            tabBarIcon:({tintColor})=>(
                <Icon name="utensils" color={tintColor} size={25}/>
            )
        },

    },
    More:{
        screen:More,
        navigationOptions:{
            tabBarLabel:'More',

            tabBarIcon:({tintColor})=>(
                <Icon name="user-circle" color={tintColor} size={25}/>
            )
        }
    }

},{
    defaultNavigationOptions:({navigation})=>{
        const currentRoute = navigation.state.routes[navigation.state.index];
        const { routeName } = currentRoute;
        let {visibility} = true
         visibility = hideBottomNavigator.includes(routeName)

        return{
        headerLeft:<Text bold h1 white></Text>,

        tabBarVisible :!visibility,
    }
    },

    tabBarOptions:{
        labeled: true,
        shifting: false,
        initialRouteName: 'Orders',
        activeTintColor: theme.colors.primary,
        inactiveTintColor: theme.colors.black,
            tabStyle: {
                paddingTop: 10,
              },
              style: {
                height: height/(theme.sizes.base * 0.7),
                backgroundColor: theme.colors.tab,

              },
              labelPosition: 'below-icon',
              labelStyle: {
                fontSize:theme.sizes.base,
                marginTop: 5,
                marginBottom: 4,
              },

    }



})
export default createAppContainer(screens);