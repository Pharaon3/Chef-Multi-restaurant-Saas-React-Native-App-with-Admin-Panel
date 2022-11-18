
import React, { Component } from "react";
import {
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    Alert
} from "react-native";
import { Block, Text,Button, Switch, Input } from '../../../components'
import { theme } from "../../../constants";
import {  ScrollView } from "react-native-gesture-handler";
import { connect } from 'react-redux';
import {userData} from '../../../screens/controller/actions/authenticationAction'
import {fetchStore,updateStore} from '../../../screens/controller/actions/moreAction'
import {addNewMessage,clearAllMessages} from '../../controller/actions/flashMessageAction'
const { width, height } = Dimensions.get('window')
class AccountSettings extends Component {
    state = {
        loading:false,
        errors:[],
        is_pureveg:0,
        delivery_time:'',
        price_range:'',
        min_order_price:'',
        restaurant_charges:'',
    }

    updateHandler = () => {
        const errors = [];
        const UserData = this.props.authentication;
        this.state.delivery_time == ''? errors.push('delivery_time'):null
        this.state.price_range== ''? errors.push('price_range'):null
        this.state.min_order_price == ''? errors.push('min_order_price'):null
        this.state.restaurant_charges == ''? errors.push('restaurant_charges'):null
        this.setState({ errors})
        if(!errors.length){
            this.setState({loading:true})
            let data = {
                shopId:this.props.authentication.shopId,
                is_pureveg:this.state.is_pureveg,
                delivery_time:this.state.delivery_time,
                price_range:this.state.price_range,
                min_order_price:this.state.min_order_price,
                restaurant_charges:this.state.restaurant_charges,
            }

            this.props.updateStore(data,UserData.token_type+" "+UserData.token)
        }
    }
    componentWillReceiveProps(nextProps){

       if(nextProps.flashMessageData.status == "error"){
        Alert.alert(nextProps.flashMessageData.status,nextProps.flashMessageData.message)
        this.props.clearAllMessages()
       }
       else if(nextProps.flashMessageData.status == "success"){
           Alert.alert(nextProps.flashMessageData.status,nextProps.flashMessageData.message)
           this.props.clearAllMessages()

       }
       this.setState({loading:false})
    }

    renderUpdate=()=>{
        const { loading } = this.state;
        return (
            <Block style={styles.footer}>
                <Button
                onPress={()=>this.updateHandler()}
                color={theme.colors.black} style={{
                    width: width / 2
                }}>
                    <Block center middle row>
                    {loading ? <ActivityIndicator size="small" color="white" /> :
                                    <Text center white >Update</Text>}
                    </Block>
                </Button>
            </Block>
        )
    }

    UNSAFE_componentWillMount(){
        const {store} = this.props;
        this.setState({
            is_pureveg:store.is_pureveg,
            delivery_time:store.delivery_time,
            price_range:store.price_range,
            min_order_price:store.min_order_price,
            restaurant_charges:store.restaurant_charges,
        })
    }
    render() {
        const { loading, errors } = this.state;
        const hasErrors = key => errors.includes(key) ? styles.hasErrors : null
        return (

            <Block color={theme.colors.black}>
            <Block flex={false} style={[styles.header]} margin={[theme.sizes.base * 0.75, 0]} row space="between" />
            <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    style={styles.reportsContainer}
                >
                    <Block margin={[54,0]}>
                    <Block flex={false}>
                            <Block row space="between" center>
                                <Text white label>Veg ?</Text>
                                <Switch
                                    thumbColor={theme.colors.white}
                                    value={this.state.is_pureveg == 1 ? true :false}
                                    onValueChange={(value) => this.setState({ is_pureveg: value == true ?1:0 })}
                                    trackColor={{ true: theme.colors.primary, false: theme.colors.gary2 }}
                                    style={styles.toggleStyle}
                                />
                            </Block>

                        </Block>
                    <Input

                     onChangeText={text => this.setState({ delivery_time:text })}
                     defaultValue={this.state.delivery_time}
                     style={[styles.input,hasErrors('delivery_time')]}
                    label={<Text white label>Approx delivery time (minutes)</Text>}
                    returnKeyType="next"
                    blurOnSubmit={false}
                    onSubmitEditing={() => this.price_range.getInnerRef().focus()}
                    />
                    <Input
                    ref={(r) => this.price_range = r}
                     onChangeText={text => this.setState({ price_range:text })}
                     defaultValue={this.state.price_range}
                     style={[styles.input,hasErrors('price_range')]}
                    label={<Text white label>Approx price for two</Text>}
                    returnKeyType="next"
                    blurOnSubmit={false}
                    onSubmitEditing={() => this.min_order_price.getInnerRef().focus()}
                    />
                    <Input
                     ref={(r) => this.min_order_price = r}
                     onChangeText={text => this.setState({ min_order_price:text })}
                     defaultValue={this.state.min_order_price}
                     style={[styles.input,hasErrors('min_order_price')]}
                    label={<Text white label>min order price</Text>}
                    returnKeyType="next"
                    blurOnSubmit={false}
                    onSubmitEditing={() => this.restaurant_charges.getInnerRef().focus()}
                    />

                    <Input
                     ref={(r) => this.restaurant_charges = r}
                     onChangeText={text => this.setState({ restaurant_charges:text })}
                     style={[styles.input,hasErrors('restaurant_charges'),{marginBottom:theme.sizes.base}]}
                     defaultValue={this.state.restaurant_charges}
                    label={<Text white label>Store charge (Packing/Extra)</Text>}
                    onSubmitEditing={() => this.updateHandler()}
                    />


                    </Block>
                    </ScrollView>
                    {this.renderUpdate()}
            </Block>

        );
    }
}
const mapSateToProps = state => ({
    authentication:state.authentication.loginUser,
    store:state.more.store,
    flashMessageData:state.flashMessage.flashMessage

})
export default connect(mapSateToProps,{userData,fetchStore,addNewMessage,updateStore,clearAllMessages}) (AccountSettings);

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
    input:{
        fontSize: theme.sizes.base,
        color:theme.colors.white,
        paddingLeft: theme.sizes.base / 1.333,
        marginTop:5,
        backgroundColor:"#707070",
        borderColor:"#707070",

    },
    button:{
        height:height/20
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
        transform: Platform.OS === 'ios' ?[{ scaleX: .7 }, { scaleY: .7 }]:[{ scaleX: 1 }, { scaleY: 1 }],

    },
    hasErrors:{
        borderColor:theme.colors.accent
    },
});