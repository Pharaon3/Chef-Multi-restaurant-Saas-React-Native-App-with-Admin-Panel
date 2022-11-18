import React, { Component } from "react";
import {
    StyleSheet,
    Dimensions,
    Image,
    Alert,

} from "react-native";
import { Block, Text, Card } from '../../components'
import { theme } from "../../constants";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { userData } from '../../screens/controller/actions/authenticationAction'
import { fetchStore, updateStore } from '../../screens/controller/actions/moreAction'
import { addNewMessage, clearAllMessages } from '../controller/actions/flashMessageAction'
import { connect } from 'react-redux';
import { NavigationActions, StackActions, NavigationEvents } from 'react-navigation';
import PushNotification from "react-native-push-notification";
import domain from "../../constants/api/domain";
const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Home' })],
});

class More extends Component {

    state = {
        accepting_order: null,
        loading: false,
    }
    LogoutHandle = () => {
        Alert.alert(
            'Log out',
            'You will be returned to the login screen.',
            [
                { text: 'Cancel', onPress: () => console.warn('NO Pressed'), style: 'cancel' },
                { text: 'Log out', onPress: () => this.logout() },
            ]
        );
    }

    logout = () => {
        const { navigation } = this.props;
        PushNotification.abandonPermissions();
        this.props.userData({ type: "DESTROY", key: "USER_DATA" })
        navigation.dispatch(resetAction)

    }
    fetchUpdate = () => {
        const { navigation } = this.props;
        const { authentication } = this.props
        let data = {
            shopName: authentication.shopName,
            shopLocation: authentication.shopLocation
        }
        navigation.setParams({ data })
        const UserData = this.props.authentication;
        let postData = {
            token: UserData.token_type + " " + UserData.token,
            shopId: UserData.shopId
        }
        this.props.fetchStore(postData);
    }
    handelOrderAcceptance = (value) => {
        this.setState({ loading: true })
        const UserData = this.props.authentication;
        this.setState({ accepting_order: value == true ? 1 : 0 })
        let data = {
            shopId: this.props.authentication.shopId,
            is_active: this.props.store.is_active == 1 ? 0 : 1
        }
        this.props.updateStore(data, UserData.token_type + " " + UserData.token)
    }
    componentWillReceiveProps(nextProps) {

        if (nextProps.flashMessageData.status == "error") {
            Alert.alert(nextProps.flashMessageData.status, nextProps.flashMessageData.message)
            this.props.clearAllMessages()
        }
        else if (nextProps.flashMessageData.status == "success") {


        }
        this.setState({ loading: false })
    }
    UNSAFE_componentWillMount() {
        const { store } = this.props;


        this.setState({
            accepting_order: store.is_active
        })
    }




    render() {
        const { navigation } = this.props;
        const { store } = this.props;
        return (
            <Block color={theme.colors.white}>
                <NavigationEvents
                    onDidFocus={() => this.fetchUpdate()}
                />
                <Block flex={false} style={[styles.header]} margin={[theme.sizes.base * 0.75, 0]} row space="between" />
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}

                >

                    <Block flex={false} style={styles.reportsContainer}>
                        <Block row flex={false} color={theme.colors.white}>
                            <Image source={{ uri: `${domain.url.replace('api/', '')}${store.logo_url}` }}
                                style={styles.ShopLogo}
                            />
                            <Block margin={theme.sizes.base * 0.5}>
                                <Text bold h3>{store.name}</Text>
                                <Block margin={[4, 0, 0, 0]} flex={false} >
                                    <Text color={theme.colors.gary1}>  {store.description != null ? store.description : "Description Not Available"}</Text>
                                </Block>
                            </Block>
                        </Block>
                    </Block>
                    <Block style={styles.CardContainer}  >
                        <Block flex={false}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate('OutletInfo')}
                            >
                                <Card style={styles.CardStyle}>
                                    <Block row center>
                                        <Block margin={[0, 12, 0, 0]} flex={false}>
                                            <Icon name="store" color={theme.colors.extra} size={20} />
                                        </Block>
                                        <Text h2 bold color={theme.colors.extra}>Outlet Info</Text>
                                    </Block>
                                </Card>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => Alert.alert('Message', 'Coming Soon!')}
                            >
                                <Card style={styles.CardStyle}>
                                    <Block row center>
                                        <Block margin={[0, 12, 0, 0]} flex={false}>
                                            <Icon name="credit-card" color={theme.colors.extra} size={20} />
                                        </Block>
                                        <Text h2 bold color={theme.colors.extra}>Subscription</Text>
                                    </Block>
                                </Card>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => this.LogoutHandle()}
                            >
                                <Card style={styles.CardStyle}>
                                    <Block row center>
                                        <Block margin={[0, 12, 0, 0]} flex={false}>
                                            <Icon name="sign-out-alt" color={theme.colors.extra} size={20} />
                                        </Block>
                                        <Text h2 bold color={theme.colors.extra}>Log Out</Text>
                                    </Block>
                                </Card>
                            </TouchableOpacity>
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
    flashMessageData: state.flashMessage.flashMessage

})
export default connect(mapSateToProps, { userData, fetchStore, addNewMessage, updateStore, clearAllMessages })(More);

const styles = StyleSheet.create({

    reportsContainer: {
        backgroundColor: theme.colors.white,
        paddingVertical: theme.sizes.base,
        paddingHorizontal: theme.sizes.base



    },
    CardContainer: {
        backgroundColor: theme.colors.background,
        paddingVertical: theme.sizes.base,
        paddingHorizontal: theme.sizes.base



    },

    toggleStyle: {
        transform: Platform.OS === 'ios' ? [{ scaleX: .7 }, { scaleY: .7 }] : [{ scaleX: 1 }, { scaleY: 1 }],

    },
    ShopLogo: {
        width: 137,
        height: 73,
        resizeMode: 'contain'
    },
    CardStyle: {
        borderRadius: 13
    }
});