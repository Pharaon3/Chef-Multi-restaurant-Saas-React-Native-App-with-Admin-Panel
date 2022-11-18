/* Creator   : ABDUL BASITH A */
/* Email     : ambalavanbasith@gmail.com */
/* github    : abdulbasitha */
/* More Info : https://techzia.in */
import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Dimensions,
    Alert,
    RefreshControl
} from "react-native";
import Moment from 'moment';
import { Block, Text, Card, Button } from '../../components'
import { theme } from "../../constants";
// import * as mocks from '../../constants/mocks';
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { userData } from '../../screens/controller/actions/authenticationAction'
import { fetchStore, updateStore } from '../../screens/controller/actions/moreAction'
import { addNewMessage, clearAllMessages } from '../controller/actions/flashMessageAction'
import { NavigationActions, StackActions, NavigationEvents } from 'react-navigation';
import { fetchOrders } from '../controller/actions/orderAction'
import { connect } from 'react-redux';
import PushNotification from "react-native-push-notification";
const { width, height } = Dimensions.get('window')

class Orders extends Component {

    state = {
        active: 'Pending',
        active_class: 1,
        orders: [],
        filtered: 'initial',
        refreshing: false
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.orders != this.props.orders) {
            // console.log(nextProps.orders)
            if (nextProps.orders.length != undefined) {
                this.setState({ orders: nextProps.orders })
                this.setState({ refreshing: false })
            }
            else {
                // let temp = new Array()
                // temp.push(nextProps.orders)
                // this.setState({orders:nextProps.orders})
                // console.log(nextProps.orders)
                this.setState({ refreshing: false })
            }


        }
        if(nextProps.notifications != this.props.notifications){
            this._onRefresh()
        }
    }
    _onRefresh = () => {
        this.setState({ refreshing: true })
        const { authentication } = this.props;
        data = {
            shopId: authentication.shopId
        }


        this.props.fetchOrders(data, authentication.token_type + " " + authentication.token, 'UPDATE')

        if (this.state.active == 'Pending')
            this.setState({ filtered: 'initial' })
    }

    renderStyleCard = (id) => {
        // if ([2, 3, 4].includes(id)) {
        //     return styles.cardStyle;
        // }

            return [styles.cardStyle, { borderColor: theme.colors.primary,backgroundColor:"white"  }];


    }
    renderOrder = () => {
        let orders = []
        // console.log(this.state.orders)
        //  console.log(this.state.orders)
        // console.log(this.state.orders)
        if (this.state.active == 'Pending') {
            orders = this.state.orders.filter(order =>
                order.status == 1 ||
                order.status == 2 ||
                order.status == 5)
        }
        if (this.state.active == 'Completed') {
            orders = this.state.orders.filter(oder =>
                oder.status == 4
            )
        }
        if (this.state.active == 'Canceled') {
            orders = this.state.orders.filter(oder =>
                oder.status == 3
            )
        }





        //  console.log("sdsd",orders)
        return (
            <Block>
                {!orders.length != 0 ?
                    (<Block middle color={theme.colors.gary1} style={styles.oderContainer}>
                        <Text
                            center
                            spacing={6}
                            bold color={theme.colors.white}
                            style={{ opacity: 0.2 }}
                            size={theme.sizes.base * 4.5}> NO ORDERS</Text>
                    </Block>)
                    : (
                        <ScrollView
                            refreshControl={
                                <RefreshControl
                                    // color="#FFFF"
                                    tintColor='white'
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh}
                                />
                            }
                            contentContainerStyle={{ alignItems: 'center' }}
                            showsVerticalScrollIndicator={false}
                            style={styles.oderContainer}
                        >
                            <Block >
                                {orders.length != undefined ? orders.map((data) => (
                                    <Card key={`key-${data.id}`}  background="red" shadow margin={[theme.sizes.base * 2]} style={this.renderStyleCard(data.status)}
                                        center >
                                        <Block center middle >
                                            <Text h3  padding={[10]}>ORDER NO</Text>
                                            <Text center h1  style={{ marginTop: theme.sizes.base }}>{data.order_unique_id}</Text>
                                            <Text  h4 style={{ marginTop: theme.sizes.base }}> ORDER TIME</Text>

                                            <Text  h4>{Moment.utc(data.created_at).format('MMM DD YYYY h:mm:ss a')}</Text>
                                            <Text
                                                style={{ marginTop: theme.sizes.base }}
                                                 h4>Status :
                                                <Text
                                                    accent={data.status == 6}
                                                    primary={data.status != 6}>
                                                    {data.status == 1 ? "Pending" : null}
                                                    {data.status == 2 ? "Accepted" : null}
                                                    {data.status == 5 ? "Ready to Serve" : null}

                                                    {/* {data.status == 4 ? "Picked Up" : null} */}
                                                    {data.status == 4 ? "Completed" : null}
                                                    {data.status == 3 ? "Canceled" : null}
                                                </Text>

                                            </Text>

                                            <Button color={theme.colors.button}
                                                style={{ marginTop: theme.sizes.base }}
                                                onPress={() => this.viewOrderHandle(data.id, data.store_id, data.order_unique_id, data.status,data.comments,data.customer_name,data.customer_phone,data.table_no)}
                                            >
                                                <Block
                                                    style={styles.buttonStyle}
                                                    center middle row
                                                    color={theme.colors.primary}
                                                >
                                                    <Text center white>VIEW ORDER DETAILS</Text>
                                                    <Icon name="eye"
                                                        color={theme.colors.white}
                                                        size={theme.sizes.base}
                                                        style={{ paddingLeft: theme.sizes.base }}
                                                    />
                                                </Block>
                                            </Button>
                                            <Block flex={false} row space="between"
                                                style={{
                                                    width: width / 1.5,
                                                    paddingBottom: theme.sizes.base * 0.5
                                                }}
                                            >
                                                <Text >TOTAL AMOUNT</Text>
                                                <Text >Rs {data.total}</Text>
                                            </Block>
                                        </Block>
                                    </Card>
                                ))
                                    : null}
                            </Block>
                        </ScrollView>


                    )}
            </Block>

        )
    }
    viewOrderHandle = (id, userId, OrderUniqueId, status,comment,customer_name,customer_phone,table_no) => {
        // console.log("here")
        const { navigation } = this.props;
        let data = {
            order_id: id,
            user_id: userId,
            unique_order_id: OrderUniqueId,
            status: status,
            comment:comment,
            name:customer_name,
            phone:customer_phone,
            table_no:table_no

        }
        console.log("dfdfdfdf",data)

        navigation.navigate('ViewOrder', { data })
    }
    renderTabs = (tab) => {
        const { active } = this.state;
        const isActive = tab === active;
        return (
            <TouchableOpacity
                onPress={() => this.handleTab(tab)}
                key={`tabs-${tab}`}
            >
                <Text primary={isActive} style={{ paddingVertical: theme.sizes.base, }} gray2={!isActive} h2>{tab}</Text>
            </TouchableOpacity>
        )

    }
    handleTab = (tab) => {

        this.setState({ active: tab })

    }
    componentWillMount() {
        const { authentication } = this.props;
        data = {
            shopId: authentication.shopId
            // authentication.shopId
        }
        this.props.fetchOrders(data, authentication.token_type + " " + authentication.token, 'UPDATE')
        // console.log("ddd",this.state.orders)
        // this.handleTab("Pending")
        this.props.navigation.setParams({ title: 'test' });
    }
    componentWillUpdate() {
        // PushNotification.configure({
        //     onNotification: function (notification) {
        //       if(notification.userInteraction){
        //         console.log(notification)
        //       }
        //     },
        //     onAction: function (notification) {
        //     }
        //   })
    }
    render() {
        const tab = ["Pending", "Completed", "Canceled"]
        const { active } = this.state;
        return (
            // <SafeAreaView style={{flex:1,backgroundColor:theme.colors.black}}>
            <Block>
                <NavigationEvents
                    onDidFocus={() => this._onRefresh()}
                />
                <Block color={theme.colors.white} >
                    <Block flex={false} style={styles.header} row space="between">
                        {tab.map(tab => this.renderTabs(tab))}
                    </Block>
                    {this.renderOrder()}
                </Block>
            </Block>
            // </SafeAreaView>

        );
    }
}
const mapSateToProps = state => ({
    authentication: state.authentication.loginUser,
    notifications:state.authentication.notifications,
    store: state.more.store,
    flashMessageData: state.flashMessage.flashMessage,
    orders: state.order.orders,
    ordersItems: state.order.ordersItems

})
export default connect(mapSateToProps, { userData, fetchStore, addNewMessage, updateStore, clearAllMessages, fetchOrders })(Orders);

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: theme.sizes.base * 2,
        backgroundColor: theme.colors.white
    },
    oderContainer: {
        backgroundColor: theme.colors.white,
        borderTopRightRadius: theme.sizes.base * 2,
        borderTopLeftRadius: theme.sizes.base * 2,

    },
    cardStyle: {
        backgroundColor: theme.colors.gary1,
        width: width / 1.17,
        borderWidth: 1,
        borderColor: 'white'
    },
    buttonStyle: {
        borderWidth: 1,
        borderColor: "transparent",
        width: width / 1.5,


    }
});