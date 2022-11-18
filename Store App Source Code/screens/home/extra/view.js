import React, { Component } from "react";
import {
    StyleSheet,
    Dimensions,
    Image,
    Alert,
    Linking
} from "react-native";
import Moment from 'moment';
import { Block, Text, Button, Divider } from '../../../components'
import { theme } from "../../../constants";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { userData } from '../../../screens/controller/actions/authenticationAction'
import { fetchStore, updateStore } from '../../../screens/controller/actions/moreAction'
import { addNewMessage, clearAllMessages } from '../../controller/actions/flashMessageAction'
import { fetchItems } from '../../controller/actions/inventoryActions'
import { fetchOrders, fetchOrdersDetails, updateOrdersStatus } from '../../controller/actions/orderAction'
import { connect } from 'react-redux';
const { width, height } = Dimensions.get('window')
class ViewOrder extends Component {
    state = {

        order_id: '',
        status: '',
        orderstatus_id: '',
        total: '',
        delivery_charge: '',
        time: ''


    }

    componentWillMount() {

        const { authentication } = this.props;
        let data = this.props.navigation.getParam('data');
        let filtered = this.props.orders.filter(oder =>
            oder.id == data.order_id
        )
        this.setState({
            order_id: data.order_id,
            status: data.status,
            comment: data.comment,
            orderstatus_id: data.status,
            total: filtered[0].total,
            delivery_charge: filtered[0].delivery_charge,
            time: new Date(filtered[0].created_at)
        })

        let postData = {
            order_id: data.order_id
        }
        this.props.fetchOrdersDetails(postData, authentication.token_type + " " + authentication.token)
        this.props.fetchItems({ shopId: authentication.shopId }, authentication.token_type + " " + authentication.token)
    }
    is_veg = (id) => {

        if ((id != null || id != undefined) && (this.props.items.length != undefined)) {

            let filtered = this.props.items.filter(data => (
                id == data.id
            ))
            return filtered[0].is_veg;
        }

    }
    renderItems = () => {
        let data = this.props.ordersItems



        return (
            <Block>
                {data != undefined ? data.map((data) => <Block flex={false} margin={[0, 0, 10, 0]} >
                    <Block color={theme.colors.gray2} >
                        <Block row margin={[20, 20, 0]} center>
                            <Block row center>
                                {this.is_veg(data.item_id) == 0 || this.is_veg(data.item_id) == null ?
                                    <Image style={{ height: theme.sizes.base, width: theme.sizes.base }} source={require('../../../assets/icons/dot-red.png')} />
                                    : <Image style={{ height: theme.sizes.base, width: theme.sizes.base }} source={require('../../../assets/icons/dot-green.png')} />
                                }
                                <Block row margin={[0, 10, 0, 10]}>
                                    <Text center white h3>{data.name}</Text>
                                </Block>

                            </Block>
                            <Text label white h3>₹ {data.price}</Text>
                        </Block>
                        <Block margin={[20, 55]} >
                            <Text white h3 center>Qty : {data.quantity}</Text>
                        </Block>
                    </Block>
                    <Block>
                    </Block>
                </Block>) : null}
            </Block>
        )
    }
    AcceptHandler = (key) => {
        Alert.alert(
            'Warning',
            'Are You Sure You Want To Continue ?',
            [
                { text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel' },
                { text: 'YES', onPress: () => this.AcceptRequest(key) },
            ]
        );
    }
    AcceptRequest = (key) => {
        const { authentication } = this.props;
        let data = {
            order_id: this.state.order_id,
            restaurant_id: authentication.shopId,
            orderstatus_id: key

        }
        this.props.updateOrdersStatus(data, authentication.token_type + " " + authentication.token)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.flashMessageData.status == "error") {
            Alert.alert(nextProps.flashMessageData.status, nextProps.flashMessageData.message)
            this.props.clearAllMessages()
        }
        else if (nextProps.flashMessageData.status == "success") {
            Alert.alert(nextProps.flashMessageData.status, nextProps.flashMessageData.message)
            this.props.navigation.navigate('Orders')
            this.props.clearAllMessages()
        }
    }
    render() {

        const { customer } = this.props
        return (
            <Block color={theme.colors.black}>
                <Block flex={false} style={[styles.header]} margin={[theme.sizes.base * 0.75, 0]} row space="between" />
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    style={styles.reportsContainer}
                >
                    <Block margin={[54, 0]} flex={false}>
                        <Block flex={false} style={{ marginBottom: theme.sizes.base }} row middle>
                            <Text center h1 white>Status : </Text>
                            <Text center h1
                                accent={this.state.orderstatus_id == 6}
                                primary={this.state.orderstatus_id != 6}>
                                {this.state.orderstatus_id == 1 ? "Pending" : null}
                                {this.state.orderstatus_id == 2 ? "Processing" : null}
                                {this.state.orderstatus_id == 3 ? "Delivery Assigned" : null}
                                {this.state.orderstatus_id == 4 ? "Picked Up" : null}
                                {this.state.orderstatus_id == 5 ? "Completed" : null}
                                {this.state.orderstatus_id == 6 ? "Canceled" : null}
                            </Text>
                        </Block>
                        <Text label white h4 style={{ marginBottom: 8 }}>Comment/Suggestions :</Text>
                        <Text label h4 primary style={{ marginBottom: 8 }}>
                            {this.state.comment}
                        </Text>

                        {this.renderItems()}
                        <Block flex={false} margin={[theme.sizes.base * 1.5, 0]}>
                            <Block row space="between">
                                <Text label white h3>Delivery charges</Text>
                                <Text label white h3>₹ {this.state.delivery_charge}</Text>

                            </Block>
                            <Divider margin={[theme.sizes.base, 0, theme.sizes.base, 0]} />
                            <Block row space="between">
                                <Text label white h2>Total amount</Text>
                                <Text label white h2>₹ {this.state.total}</Text>

                            </Block>
                            {this.state.status == 1 ?
                                <Block row space="between">

                                    <Button
                                        onPress={() => this.AcceptHandler(6)}
                                        style={styles.button} color={theme.colors.accent}>
                                        <Text center white h4>Reject</Text>
                                    </Button>
                                    <Button
                                        onPress={() => this.AcceptHandler(2)}
                                        style={styles.button} color={theme.colors.primary}>
                                        <Text center white h4>Accept</Text>
                                    </Button>
                                </Block>
                                : null}
                            <Divider margin={[theme.sizes.base, 0, theme.sizes.base, 0]} />

                            <Block >
                                <Block margin={[0, 0, theme.sizes.base]}>
                                    <Text label white h2>Customer Details</Text>
                                </Block>
                                <Block margin={[0, 0, theme.sizes.base * 0.5]}><Text white h3>Name : {customer.name}</Text></Block>
                                <Block margin={[0, 0, theme.sizes.base * 0.5]}><Text white h3>Email : {customer.email}</Text></Block>
                                <Block margin={[0, 0, theme.sizes.base * 0.5]}>
                                    <Block row center >
                                        <Text white h3>Contact Number :
                                    </Text>
                                        <TouchableOpacity
                                            onPress={() => Linking.openURL(`tel:${customer.phone}`)}
                                            hitSlop={{ top: 20, bottom: 20, left: 50, right: 40 }}
                                        >
                                            <Block style={styles.callNow} color={theme.colors.primary} flex={false}>
                                                <Text h3 > Call Now </Text>
                                            </Block>
                                        </TouchableOpacity>

                                    </Block>
                                </Block>
                                <Block margin={[0, 0, theme.sizes.base * 0.5]}><Text white h3>Order Time : {Moment.utc(this.state.time).format('MMM DD YYYY h:mm:ss a')}</Text></Block>
                            </Block>
                        </Block>

                    </Block>
                </ScrollView>
            </Block>

        );
    }
}
const mapSateToProps = state => ({
    authentication: state.authentication.loginUser,
    store: state.more.store,
    flashMessageData: state.flashMessage.flashMessage,
    orders: state.order.orders,
    ordersItems: state.order.orderItems,
    customer: state.order.customer,
    items: state.inventoryData.items,
})
export default connect(mapSateToProps, { userData, fetchStore, fetchItems, addNewMessage, updateStore, clearAllMessages, fetchOrders, fetchOrdersDetails, updateOrdersStatus })(ViewOrder);

const styles = StyleSheet.create({
    header: {

        paddingHorizontal: theme.sizes.base * 2,
        paddingVertical: theme.sizes.base,
        backgroundColor: theme.colors.black
    },
    reportsContainer: {
        borderTopRightRadius: theme.sizes.base * 2,
        borderTopLeftRadius: theme.sizes.base * 2,
        paddingHorizontal: theme.sizes.padding * 1.84,
        backgroundColor: theme.colors.gary1,


    },
    input: {
        fontSize: theme.sizes.base,
        color: theme.colors.white,
        paddingLeft: theme.sizes.base / 1.333,
        marginTop: 5,
        backgroundColor: "#707070",
        borderColor: "#707070",

    },
    button: {
        height: height / 20,
        width: width / 2.8,
        borderRadius: 1,
        marginTop: 20
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
    toggleStyle: {
        transform: [{ scaleX: .6 }, { scaleY: .6 }],

    },
    callNow: {
        borderWidth: 1,
        borderColor: theme.colors.white,
        borderRadius: theme.sizes.base,
        marginLeft: theme.sizes.base * 0.5
    }
});