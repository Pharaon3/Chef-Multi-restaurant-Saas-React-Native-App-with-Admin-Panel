
import React, { Component } from "react";
import {
    StyleSheet,
    Dimensions,
    Image,
    Linking
} from "react-native";
import { Block, Text, Card, Button } from '../../components'
import domain from '../../constants/api/domain';
import QRCode from 'react-native-qrcode-svg';
import { theme } from "../../constants";
import { userData } from '../controller/actions/authenticationAction'
import { fetchStore, updateStore } from '../controller/actions/moreAction'
import { addNewMessage, clearAllMessages } from '../controller/actions/flashMessageAction'
import {  NavigationEvents } from 'react-navigation';
import { fetchOrders } from '../controller/actions/orderAction'
import { connect } from 'react-redux';
const { width} = Dimensions.get('window')

class Home extends Component {

    state = {
        active_class: 1,
        orders: [],
        filtered: 'initial',
        refreshing: false
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.orders != this.props.orders) {

            if (nextProps.orders.length != undefined) {
                this.setState({ orders: nextProps.orders })
                this.setState({ refreshing: false })
            }
            else {

                this.setState({ refreshing: false })
            }


        }
        if(nextProps.notifications != this.props.notifications){
            this._onRefresh()
        }
    }
    _onRefresh = () => {
        this.setState({ refreshing: true })
        const UserData = this.props.authentication;
        let postData = {
            token: UserData.token_type+" "+UserData.token,
            shopId:UserData.shopId
        }
        this.props.fetchStore(postData);
    }


    componentWillMount() {
        const { authentication } = this.props;
        data = {
            shopId: authentication.shopId
        }
        this.props.fetchOrders(data, authentication.token_type + " " + authentication.token, 'UPDATE')
        const UserData = this.props.authentication;
        let postData = {
            token: UserData.token_type+" "+UserData.token,
            shopId:UserData.shopId
        }
        this.props.fetchStore(postData);
    }

    render() {
        const {authentication} = this.props
        const {store} = this.props;
        return (

            <Block>
                <NavigationEvents
                    onDidFocus={() => this._onRefresh()}
                />
                <Block style={styles.homeContainer} flex={false}>
                    <Block flex={false}>
                        <Block row flex={false} color={theme.colors.white}>
                            <Image source={{uri:`${domain.url.replace('api/','')}${store.logo_url}`}}
                                style={styles.ShopLogo}
                                resizeMethod="scale"
                            />
                            <Block margin={theme.sizes.base * 0.5}>
                            <Text bold h3>{store.name}</Text>
                                <Block margin={[4,0,0,0]} flex={false} >
                                    <Text color={theme.colors.gary1}>
                                        {store.description !=null ?store.description:"Description Not Available"}
                                        </Text>
                                </Block>
                            </Block>
                        </Block>
                    </Block>
                    <Card flex={false} style={styles.OverviewStyle} shadow margin={[29,0,0,0]} >
                        <Block row flex={false} margin={[theme.sizes.base * 0.5,0]} >
                            <Block center middle>
                            <Text h2>No Of </Text>
                            <Text h2>Products</Text>
                            </Block>
                            <Block flex={false} style={{borderWidth:StyleSheet.hairlineWidth,
                            borderColor:theme.colors.gray2
                            }}>
                            </Block>
                            <Block center middle>
                                <Text primary  h2 bold>{store.product_count}</Text>
                            </Block>
                        </Block>
                    </Card>
                </Block>
                <Block  style={styles.qrContainer}>
                    <Block row flex={false} space="between" middle center >
                        <Block  flex={false} style={[styles.QrStyle,{alignItems:"flex-end"}]}>
                            <QRCode
                        value={`${domain.store}${authentication.shopViewId}`}
                        />
                        </Block>
                        <Block  flex={false}

                        >
                            <Button
                             onPress={()=> Linking.openURL(`${domain.QR}${authentication.shopViewId}/print`)}
                             gradient style={{width:width/2}}>
                                <Text white bold center>Download qr-code</Text>
                            </Button>
                        </Block>
                    </Block>
                </Block>
            </Block>
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
export default connect(mapSateToProps, { userData, fetchStore, addNewMessage, updateStore, clearAllMessages, fetchOrders })(Home);

const styles = StyleSheet.create({

    homeContainer: {
        backgroundColor:theme.colors.white,
        paddingVertical:theme.sizes.base,
        paddingHorizontal:theme.sizes.base

    },
    qrContainer: {
        backgroundColor:theme.colors.background,
        paddingVertical:theme.sizes.base,
        paddingHorizontal:theme.sizes.base

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
    },
    ShopLogo:{
        width:137,
        height:73,
        resizeMode: 'contain'
    },
    OverviewStyle:{
        borderRadius:theme.sizes.base
    },
    QrStyle:{
       borderWidth:1,
       padding:theme.sizes.base * 1.3,
       borderRadius:theme.sizes.base * 1.6,
       borderStyle: 'dotted',
       borderWidth: 2,
       borderColor:theme.colors.gray2

    }
});