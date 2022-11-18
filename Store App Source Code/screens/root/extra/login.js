import React, { Component } from "react";
import {
    StyleSheet,
    Dimensions,
    Alert,
    ActivityIndicator,
    Image,
    BackHandler,
    ImageBackground
} from "react-native";

import { Block, Text,Button,Input } from '../../../components'
import { theme } from "../../../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from 'react-redux';
import { loginUser, savePushToken } from '../../controller/actions/authenticationAction'
import { addNewMessage, clearAllMessages } from '../../controller/actions/flashMessageAction'
import { NavigationActions, StackActions } from 'react-navigation';
const { width, height } = Dimensions.get('window')
const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Dashboard' })],
});

class AccountStatement extends Component {
    static navigationOptions = {
        gesturesEnabled: false,

    }

    onButtonPress = () => {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        navigate('NewScreen');
    }


    handleBackButton = () => {
        Alert.alert(
            'Exit App',
            'Exiting the application?', [{
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            }, {
                text: 'OK',
                onPress: () => BackHandler.exitApp()
            },], {
            cancelable: false
        }
        )
        return true;
    }

    constructor(props) {
        super(props)

    }

    state = {
        email: '',
        password: '',
        loading: false,
        errors: [],
    }
    inputs = {};
    loginHandler = () => {

        const { email, password } = this.state;
        const { loginUser } = this.props;
        const errors = [];
        if (email == '') {
            errors.push('email')

        }
        if (password == '') {
            errors.push('password')
        }
        this.setState({ errors })
        if (!errors.length) {
            let data = {
                email: email,
                password: password
            }
            this.setState({ loading: true })
            loginUser(data);
        }


    }
    componentDidMount() {
        this.setState({
            email:"demo@demo.com",
            password:"123456"
        })
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        const { navigation } = this.props;
        const { clearAllMessages } = this.props;
        if (nextProps.flashMessageData.status == "error") {
            Alert.alert("Message", nextProps.flashMessageData.message)
            clearAllMessages()

        }
        else if (nextProps.flashMessageData.status == "success") {
            navigation.dispatch(resetAction)
            clearAllMessages()

        }
        this.setState({ loading: false })

    }

    render() {
        const { loading, errors } = this.state;
        const hasErrors = key => errors.includes(key) ? styles.hasErrors : null
        return (
            <SafeAreaView
                style={{ flex: 1, backgroundColor: theme.colors.background }}
            >
                <KeyboardAwareScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    bounces={false}
                    keyboardShouldPersistTaps='handled'
                >
                    <Block
                        flex={false}
                        margin={[theme.sizes.base * 2]}
                    >
                        <Block row>
                        <Image source={require('../../../assets/logo.png')}
                          style={{width:180,height:40,resizeMode:"contain"}}

                          />
                        </Block>
                    </Block>
                    <Block color={theme.colors.background}>
                        <Block flex={false} style={[styles.header]} row space="between" />

                        <Block middle
                            style={styles.reportsContainer}
                        >

                            <Block flex={false} >

                                <Text h1 bold>Hello!</Text>
                                <Block margin={[theme.sizes.base * 2, 0, theme.sizes.base * 1.2, 0]}>
                                    <Text h3 >
                                        please enter your
                        </Text>
                                    <Text h3 style={{ marginTop: 10 }}>
                                        details to sign in
                        </Text>
                                </Block>
                            </Block>
                            <Input
                                onSubmitEditing={() => this.password.getInnerRef().focus()}
                                email
                                defaultValue={this.state.email}
                                onChangeText={text => this.setState({ email: text })}
                                style={[styles.input, hasErrors('email')]}
                                label={<Text text label email>Email or Username</Text>}
                                returnKeyType="next"
                                blurOnSubmit={false}
                                keyboardShouldPersistTaps
                            />
                            <Input
                                password
                                secure
                                ref={(r) => this.password = r}
                                defaultValue={this.state.password}
                                onChangeText={text => this.setState({ password: text })}
                                style={[styles.input, hasErrors('password')]}
                                returnKeyType="next"
                                label={<Text label>PASSWORD</Text>}
                                onSubmitEditing={() => this.loginHandler()}
                                keyboardShouldPersistTaps
                            />
                            <Block flex={false} margin={[-10, 0, theme.sizes.base, 0]}>
                                <Text tertiary right>forgot password?</Text>
                            </Block>

                            <Button gradient color={theme.colors.black}
                                onPress={() => this.loginHandler()}
                            >
                                {loading ? <ActivityIndicator size="small" color="white" /> :
                                    <Text h3 center white >Sign in</Text>}
                            </Button>
                            <Block flex={false} margin={[theme.sizes.base]}>
                                <Text center>crafted with 💙 by helpdev.in</Text>
                            </Block>


                        </Block>


                    </Block>
                    <Block flex={false} style={{ alignItems: "flex-end" }} margin={[-60, -40]}>
                        <ImageBackground source={require('../../../assets/elements/login/footer.png')}
                            style={styles.footerImage}
                            resizeMethod="resize"
                        />
                    </Block>
                </KeyboardAwareScrollView>

            </SafeAreaView>
        );
    }
}

const mapSateToProps = state => ({
    authentication: state.authentication.loginUser,
    flashMessageData: state.flashMessage.flashMessage
})
export default connect(mapSateToProps, { loginUser, addNewMessage, clearAllMessages, savePushToken })(AccountStatement);

const styles = StyleSheet.create({
    reportsContainer: {

        paddingHorizontal: theme.sizes.padding * 1.84,
        backgroundColor: theme.colors.background,


    },
    input: {
        fontSize: theme.sizes.base,
        paddingLeft: theme.sizes.base / 1.333,
        marginTop: 5,
        backgroundColor: theme.colors.white,
        borderColor: "#9F8A99",

    },
    hasErrors: {
        borderColor: theme.colors.accent
    },
    button: {
        height: height / 20
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
    select: {
        fontSize: theme.sizes.base,
        color: theme.colors.white,
        paddingTop: theme.sizes.base / 1.333,
        marginTop: 5,
        borderRadius: 0,
        borderWidth: 0,
        borderBottomColor: theme.colors.white,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    selectRight: {
        top: 0,
        marginVertical: 10,
        backgroundColor: "transparent"
    },
    selectIcon: {
        position: "absolute",
        right: theme.sizes.base / 1.333,
        top: theme.sizes.base * 1.5
    },
    searchRight: {
        top: 0,
        marginVertical: 0,
        backgroundColor: "transparent"
    },
    footerImage: {
        width: 220,
        height: 190,
        transform: [{ rotate: '310deg' }]
    },

});