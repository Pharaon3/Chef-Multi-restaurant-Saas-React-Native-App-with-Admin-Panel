/* Creator   : ABDUL BASITH A */
/* Email     : ambalavanbasith@gmail.com */
/* github    : abdulbasitha */
/* More Info : https://techzia.in */
import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    Alert,
    Linking
} from "react-native";
import Moment from 'moment';
import { Block, Text, Card, Button, Switch, Divider, Input } from '../../../components'
import { theme } from "../../../constants";

import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import {userData} from '../../../screens/controller/actions/authenticationAction'
import {fetchStore,updateStore} from '../../../screens/controller/actions/moreAction'
import {addNewMessage,clearAllMessages} from '../../controller/actions/flashMessageAction'
// import {fetchItems} from '../../controller/actions/inventoryActions'
import {fetchOrders,fetchOrdersDetails,updateOrdersStatus} from '../../controller/actions/orderAction'
import { connect } from 'react-redux';
const { width, height } = Dimensions.get('window')
class ViewOrder extends Component {
    state = {

            order_id:'',
            status:'',
            orderstatus_id:'',
            total:'',
            delivery_charge:'',
            time:'',
            name:'',
            phone:'',
            table_no:''



    }

    componentWillMount(){

        const {authentication} = this.props;
        let data = this.props.navigation.getParam('data');
        let filtered = this.props.orders.filter(oder=>
            oder.id == data.order_id
        )
        this.setState({
            order_id:data.order_id,
            status:data.status,
            comment:data.comment,
            orderstatus_id:data.status,
            total:filtered[0].total,
            delivery_charge:filtered[0].delivery_charge,
            time:new Date(filtered[0].created_at),
            name:data.name,
            phone:data.phone,
            table_no:data.table_no
        })

        let postData = {
            order_id:data.order_id
        }
        // console.log(postData)
        this.props.fetchOrdersDetails(postData,authentication.token_type+" "+authentication.token)
        // this.props.fetchItems({shopId:authentication.shopId},authentication.token_type+" "+authentication.token)
    }
    is_veg = (id)=>{

    if((id != null || id !=undefined) && (this.props.items.length!=undefined) ){

        let filtered = this.props.items.filter(data=>(
            id == data.id
        ))
        return filtered[0].is_veg;
    }

    }
    renderItems=()=>{
        let data = this.props.ordersItems.order_details



        return(

            <Block>
           {data!=undefined? data.map((data)=><Block flex={false} margin={[0, 0, 10, 0]} >
                <Block color={theme.colors.white} >
                    <Block row margin={[20, 20, 0]} center>
                        <Block row center>
                       {/* { this.is_veg(data.item_id) == 0 || this.is_veg(data.item_id) == null ?
                        <Image style={{ height: theme.sizes.base, width: theme.sizes.base }} source={require('../../../assets/icons/dot-red.png')} />
                        :<Image style={{ height: theme.sizes.base, width: theme.sizes.base }} source={require('../../../assets/icons/dot-green.png')}  />
                        } */}

                            <Block row  margin={[0,10,0,10]}>
                                <Text center   h3>{data.name}</Text>
                            </Block>

                        </Block>
                        <Text label  h3>{data.price}</Text>
                    </Block>
                    <Block margin={[10, 55]} >
                        <Text  h3 center>Qty : {data.quantity}</Text>
                        {/* <Text white h3>Category Name</Text> */}
                    </Block>
                    {data.order_details_extra_addon.length ?
                    <Block margin={[10, 40]}>
                        <Text>Extra:</Text>
                        {data.order_details_extra_addon.map(data=>(
                                <Text>{data.addon_name} ({data.addon_price}) x {data.addon_count} = {data.addon_price*data.addon_count}</Text>
                        ))

                        }
                    </Block>
                :null}
                </Block>
                <Block>
                </Block>
            </Block>):null}
            </Block>
        )
    }
    AcceptHandler = (key)=>{
        let data;
        data = key == 3 ? 3:null
        data = key == 1 ? 2:null
        data = key == 2 ? 5:null
        data = key == 5 ? 4:null
        if(key == 3)
            data = 3
        else if (key == 1)
            data = 2
        else if (key == 2)
            data = 5
        else if (key == 5)
            data = 4
        else
            data = 3
        Alert.alert(
            'Warning',
            'Are You Sure You Want To Continue ?',
            [
              {text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel'},
              {text: 'YES', onPress: () => this.AcceptRequest(data)},
            ]
          );
    }
    AcceptRequest =(key) =>{
        const {authentication} = this.props;
       let data = {
        order_id:this.state.order_id,
        store_id:authentication.shopId,
        status:key

       }
       console.log("logiee",data)
       this.props.updateOrdersStatus(data,authentication.token_type+" "+authentication.token)
    }

    componentWillReceiveProps(nextProps){

        const {flashMessageData} = this.props;
        if(nextProps.flashMessageData.status == "error"){
         Alert.alert(nextProps.flashMessageData.status,nextProps.flashMessageData.message)
         this.props.clearAllMessages()
        }
        else if(nextProps.flashMessageData.status == "success"){
            Alert.alert(nextProps.flashMessageData.status,nextProps.flashMessageData.message)
            this.props.navigation.goBack(null)
            this.props.clearAllMessages()
        }
    }
    render() {
        // let date = this.state.time.toString()
        // console.log(date)
          /* 21 May 2020 at 2:58 PM (5 minutes ago) */
        // console.log(date.split(' ').slice(0,5))
        // console.log()
        const { customer} = this.props
         return (
            <Block color={theme.colors.white}>
            <Block flex={false} style={[styles.header]} margin={[theme.sizes.base * 0.75, 0]} row space="between" />
            <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    style={styles.reportsContainer}
                >
                    <Block margin={[54,0]} flex={false}>
                        <Block flex={false} style={{marginBottom:theme.sizes.base}} row middle>
                            <Text center h1 >Status : </Text>
                            <Text center h1
                                        accent={this.state.orderstatus_id==6}
                                        primary={this.state.orderstatus_id!=6}>
                                             {this.state.orderstatus_id == 1 ? "Pending":null}
                                             {this.state.orderstatus_id == 2 ? "Accepted":null}
                                             {this.state.orderstatus_id == 5 ? "Ready To Serve":null}
                                             {this.state.orderstatus_id == 3 ? "Rejected":null}
                                             {this.state.orderstatus_id == 4 ? "Competed":null}

                                             </Text>
                            </Block>
                    <Text label  h4 style={{marginBottom:8}}>Comment/Suggestions :</Text>
                    <Text label  h4 primary style={{marginBottom:8}}>
                    {this.state.comment}
                    </Text>

                    {this.renderItems()}
                        <Block flex={false} margin={[theme.sizes.base * 1.5, 0]}>
                            {/* <Block row space="between">
                                <Text label  h3>Delivery charges</Text>
                                <Text label  h3>₹ {this.state.delivery_charge}</Text>

                            </Block> */}
                            <Divider margin={[theme.sizes.base, 0, theme.sizes.base, 0]} />
                            <Block row space="between">
                                <Text label  h2>Total amount</Text>
                                <Text label h2>₹ {this.state.total}</Text>

                            </Block>
                            {this.state.status == 1  || this.state.status == 2 ||  this.state.status == 5?
                            <Block row space="between">

                                <Button
                                onPress={()=>this.AcceptHandler(3)}
                                style={styles.button} color={theme.colors.accent}>
                                    <Text center white h4>Reject</Text>
                                </Button>
                                <Button
                                 onPress={()=>this.AcceptHandler(this.state.orderstatus_id)}
                                style={styles.button} color={theme.colors.primary}>
                                    <Text center white h4>
                                            {this.state.orderstatus_id == 1 ? "Accept":null}
                                             {this.state.orderstatus_id == 2 ? "Ready To Serve":null}
                                             {this.state.orderstatus_id == 5 ? "Complete":null}

                                    </Text>
                                </Button>
                            </Block>
                                :null}
                            <Divider margin={[theme.sizes.base, 0, theme.sizes.base, 0]} />

                            <Block >
                            <Block margin={[0,0,theme.sizes.base]}>
                            <Text label  h2>Customer Details</Text>
                            </Block>
                            <Block margin={[0,0,theme.sizes.base * 0.5]}><Text  h3>Name : {this.state.name}</Text></Block>
                            {/* <Block margin={[0,0,theme.sizes.base * 0.5]}><Text  h3>Email : {this.state.phone}</Text></Block> */}
                            <Block margin={[0,0,theme.sizes.base * 0.5]}><Text  h3>Table No : {this.state.table_no}</Text></Block>
                            <Block margin={[0,0,theme.sizes.base * 0.5]}>
                                     <Block row center >
                                         <Text h3>Contact Number :
                                    </Text>
                                        <TouchableOpacity
                                        onPress={()=>Linking.openURL(`tel:${this.state.phone}`)}
                                        hitSlop={{top: 20, bottom: 20, left: 50, right: 40}}
                                        >
                                         <Block  style={styles.callNow} color={theme.colors.primary} flex={false}>
                                             <Text h3 > Call Now </Text>
                                         </Block>
                                         </TouchableOpacity>

                                     </Block>
                            </Block>
                            <Block margin={[0,0,theme.sizes.base * 0.5]}><Text  h3>Order Time : {Moment.utc(this.state.time).format('MMM DD YYYY h:mm:ss a')}</Text></Block>
                            {/* 21 May 2020 at 2:58 PM (5 minutes ago) */}
                            </Block>
                        </Block>

                    </Block>
                    </ScrollView>
                    {/* {this.renderUpdate()} */}
            </Block>

        );
    }
}
const mapSateToProps = state => ({
    authentication:state.authentication.loginUser,
    store:state.more.store,
    flashMessageData:state.flashMessage.flashMessage,
    orders:state.order.orders,
    ordersItems:state.order.orderItems,
    customer:state.order.customer,
    items:state.inventoryData.items,
})
export default connect(mapSateToProps,{userData,fetchStore,addNewMessage,updateStore,clearAllMessages,fetchOrders,fetchOrdersDetails,updateOrdersStatus}) (ViewOrder);

const styles = StyleSheet.create({
    header: {

        paddingHorizontal: theme.sizes.base * 2,
        paddingVertical: theme.sizes.base,
        backgroundColor: theme.colors.white
    },
    reportsContainer: {
        borderTopRightRadius: theme.sizes.base * 2,
        borderTopLeftRadius: theme.sizes.base * 2,
        paddingHorizontal: theme.sizes.padding * 1.84,
        //  paddingVertical:theme.sizes.base ,
        backgroundColor: theme.colors.tab,


    },
    input:{
        fontSize: theme.sizes.base,
        color:theme.colors.white,
        paddingLeft: theme.sizes.base / 1.333,
        marginTop:5,
        backgroundColor:"#707070",
        borderColor:"#707070",

    },
    button:{
        height:height/20,
        width:width/2.8,
        borderRadius:1,
        marginTop:20
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        overflow: 'visible',
        alignItems: 'center',
        justifyContent: 'center',
        width,
        paddingBottom: theme.sizes.base * 1.5
    },
    toggleStyle:{
        transform: [{ scaleX: .6 }, { scaleY: .6 }],

    },
    callNow:{
        borderWidth:1,
        borderColor:theme.colors.white,
        borderRadius:theme.sizes.base,
        marginLeft:theme.sizes.base * 0.5
    }
});