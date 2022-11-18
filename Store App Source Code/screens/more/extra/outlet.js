
import React, { Component } from "react";
import {
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    Alert,
} from "react-native";
import { Block, Text, Button, Input } from '../../../components'
import { theme } from "../../../constants";
import { connect } from 'react-redux';
import {userData} from '../../../screens/controller/actions/authenticationAction'
import {fetchStore,updateStore} from '../../../screens/controller/actions/moreAction'
import {addNewMessage,clearAllMessages} from '../../controller/actions/flashMessageAction'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const { width} = Dimensions.get('window')
class OutletInfo extends Component {
    state = {
        loading:false,
        errors:[],
        name:'',
        description:'',
        address1:'',
        address2:'',
        address3:'',
        phone:'',
        password:'',
    }
    renderUpdate=()=>{
        const { loading } = this.state;
        return (
            <Block style={styles.footer}>
                <Button
                gradient
                onPress={()=>this.updateHandler()}
                 style={{
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
    updateHandler=()=>{
        const errors = [];
        const {address1,address2,address3} = this.state
        const UserData = this.props.authentication;
        this.state.name == ''? errors.push('name'):null
        this.state.address1== ''? errors.push('address'):null
        this.setState({ errors})
        if(!errors.length){
            this.setState({loading:true})
            let data = {
                shopId:this.props.authentication.shopId,
                store_name:this.state.name,
                description:this.state.description,
                address:address1 +","+ address2+","+ address3,
                phone:this.state.phone,
                password:this.state.password
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
    UNSAFE_componentWillMount(){
        const {store} = this.props;
        let address1=null
        let address2=null
        let address3=null


        if(store.address.includes(',')){
            let data = store.address.split(',')
            address1=data[0] !=undefined ?data[0] :null
            address2 = data[1] !=undefined ? data[1]:null
            address3 = data[2] !=undefined ? data.slice(2,data.length).toString():null
        }
        else{
            address1=store.address
        }
        this.setState({
            name:store.name,
            description:store.description,
            address1:address1,
            address2:address2,
            address3:address3,
            phone:store.phone



        })
    }
    render() {
        const {  errors } = this.state;
        const hasErrors = key => errors.includes(key) ? styles.hasErrors : null
        return (
            <Block color={theme.colors.background}>
            <Block flex={false} style={[styles.header]} margin={[theme.sizes.base * 0.75, 0]} row space="between" />
            <KeyboardAwareScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    style={styles.reportsContainer}
                    bounces={false}
                >
                    <Block margin={[0,0]}>
                    <Input
                    onChangeText={text => this.setState({ name:text })}
                    defaultValue={this.state.name}
                    ref={(r) => this.price_range = r}
                    onSubmitEditing={() => this.description.getInnerRef().focus()}
                    returnKeyType="next"
                    blurOnSubmit={false}
                    style={[styles.input,hasErrors('name')]}
                    label={<Text color={theme.colors.text}>STORE NAME</Text>}
                    />
                    <Input
                    onChangeText={text => this.setState({ description:text })}
                    defaultValue={this.state.description}
                    ref={(r) => this.description = r}
                    blurOnSubmit={false}
                    onSubmitEditing={() => this.address1.getInnerRef().focus()}
                    returnKeyType="next"
                    style={styles.input}
                    label={<Text color={theme.colors.text}>DESCRIPTION</Text>}
                    />
                    <Input
                    onChangeText={text => this.setState({ address1:text })}
                    defaultValue={this.state.address1}
                    ref={(r) => this.address1 = r}
                    blurOnSubmit={false}
                    onSubmitEditing={() => this.address2.getInnerRef().focus()}
                    returnKeyType="next"
                    style={[styles.input,hasErrors('address')]}
                    placeholder="LINE 1"
                    blurOnSubmit={false}
                    placeholderTextColor={theme.colors.placeholder}
                    label={<Text color={theme.colors.text}>FULL ADDRESS</Text>}
                    />
                    <Input
                    onChangeText={text => this.setState({ address2:text })}
                    defaultValue={this.state.address2}
                    ref={(r) => this.address2 = r}
                    onSubmitEditing={() => this.address3.getInnerRef().focus()}
                    returnKeyType="next"
                    placeholder="LINE 2"
                    blurOnSubmit={false}
                    placeholderTextColor={theme.colors.placeholder}
                    style={styles.input}
                    />
                    <Input
                    onChangeText={text => this.setState({ address3:text })}
                    defaultValue={this.state.address3}
                    ref={(r) => this.address3 = r}
                    onSubmitEditing={() => this.landmark.getInnerRef().focus()}
                    returnKeyType="next"
                    placeholder="LINE 3"
                    blurOnSubmit={false}
                    placeholderTextColor={theme.colors.placeholder}
                    style={styles.input}
                    />
                     <Input
                    number
                    onChangeText={text => this.setState({  phone:text })}
                    defaultValue={this.state.phone}
                    ref={(r) => this.certificate = r}
                    style={[styles.input]}
                    label={<Text color={theme.colors.text} label>Phone Number</Text>}
                    />
                    <Input
                    secure

                    editable={false}
                    selectTextOnFocus={false}
                    
                    onChangeText={text => this.setState({  password:text })}
                    defaultValue={this.state.certificate}
                    ref={(r) => this.certificate = r}
                    style={[styles.input,{marginBottom:theme.sizes.base *5}]}
                    label={<Text color={theme.colors.text} label>password</Text>}
                    />
                    </Block>
                    </KeyboardAwareScrollView>
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
export default connect(mapSateToProps,{userData,fetchStore,addNewMessage,updateStore,clearAllMessages}) (OutletInfo);

const styles = StyleSheet.create({

    reportsContainer: {

        paddingHorizontal: theme.sizes.padding * 1.84,
        backgroundColor: theme.colors.background,


    },
    input:{
        fontSize: theme.sizes.base,
        paddingLeft: theme.sizes.base / 1.333,
        marginTop: 5,
        backgroundColor: theme.colors.white,
        borderColor: "#9F8A99",

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
    hasErrors:{
        borderColor:theme.colors.accent
    },
});