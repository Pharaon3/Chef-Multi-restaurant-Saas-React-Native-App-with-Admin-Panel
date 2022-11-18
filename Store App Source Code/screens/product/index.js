
import React, { Component } from "react";
import {
    Dimensions,
    StyleSheet,
    Image,
    Platform,
    Modal,
    TouchableOpacity

} from "react-native";
import { Block, Text,  Button, Input, Divider, Switch } from '../../components'
import { theme } from "../../constants";
import { ScrollView } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { fetchCategories, fetchItems, updateCategory, createOrUpdateItem } from '../controller/actions/inventoryActions'
import { connect } from 'react-redux';
import { ActivityIndicator } from "react-native-paper";
import domain from "../../constants/api/domain";
const { width, height } = Dimensions.get('window')
class Inventory extends Component {
    state = {
        active: 'Items',
        editing_active_id: null,
        editing_name: null,
        filtered_items: null,
        filtered_categories: null,
        search_key: null,
        cat_key: null,
        categories_search_data: null,
        menu_status: false,
        switch_loading: null,
        Type: null
    }
    UNSAFE_componentWillMount() {
        const { authentication } = this.props;
        let data = {
            shopId: authentication.shopId
        }
        this.props.fetchCategories(data, authentication.token_type + " " + authentication.token)
        this.props.fetchItems({ shopId: authentication.shopId }, authentication.token_type + " " + authentication.token)

    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.items || nextProps.categories) {
            if ((this.props.items != nextProps.items) || (this.props.categories != nextProps.categories)) {
                this.setState({ switch_loading: null })
            }
        }
        if ((nextProps.categories != this.props.categories) && (this.state.filtered_categories != null) && (this.state.Type == "Category")) {
            let key = this.state.search_key;
            if (this.props.categories.length == undefined) {
                return;
            } else {
                let filtered = nextProps.categories.filter(item =>
                    item.name.toLowerCase().indexOf(key.toLowerCase()) > -1
                )
                this.setState({
                    filtered_categories: filtered,
                    categories_search_data: null,
                })
            }
        }
        if ((nextProps.items != this.props.items) && (this.state.filtered_items != null) && (this.state.Type == "Items")) {
            let key = this.state.search_key;
            if (this.props.items.length == undefined) {
                return;
            } else {
                let filtered = nextProps.items.filter(item =>
                    item.name.toLowerCase().indexOf(key.toLowerCase()) > -1
                )
                this.setState({
                    filtered_items: filtered,
                    categories_search_data: null,

                })

            }
        }

        if ((nextProps.items != this.props.items) && (this.state.filtered_items != null) && (this.state.Type == "ItemsByCategory")) {
            let key = this.state.search_key;
            if (this.props.items.length == undefined) {
                return;
            } else {
                let filtered = nextProps.items.filter(item =>
                    item.category_id == key
                )
                this.setState({ filtered_items: filtered })
                this.setState({ categories_search_data: this.state.cat_key })
                this.setState({ menu_status: false })
            }
        }

    }
    _Filter = (Type, key, name_cat = null) => {
        this.setState({ Type: Type })
        this.setState({ search_key: key })
        if (name_cat != null) {
            this.setState({ cat_key: name_cat })
        }
        if (Type == 'Items') {
            if (this.props.items.length == undefined) {
                return;
            } else {
                let filtered = this.props.items.filter(item =>
                    item.name.toLowerCase().indexOf(key.toLowerCase()) > -1
                )
                this.setState({
                    filtered_items: filtered,
                })
                this.setState({ categories_search_data: name_cat })
            }
        }
        if (Type == 'Category') {

            if (this.props.categories.length == undefined) {
                return;
            } else {
                let filtered = this.props.categories.filter(item =>
                    item.name.toLowerCase().indexOf(key.toLowerCase()) > -1
                )
                this.setState({
                    filtered_categories: filtered,
                })

            }
        }
        if (Type == 'ItemsByCategory') {
            if (this.props.items.length == undefined) {
                return;
            } else {
                let filtered = this.props.items.filter(item =>
                    item.category_id == key
                )
                this.setState({ filtered_items: filtered })
                this.setState({ categories_search_data: name_cat })
                this.setState({ menu_status: false })
            }
        }
        if (Type == 'CLEAR') {
            this.setState({
                filtered_items: this.props.items,
                categories_search_data: null,
                filtered: null,
                filtered_items: null,
                filtered_categories: null,
                categories_search_data: null,
            })
        }
    }

    renderItemSearch = () => {
        return (
            <Input
                onChangeText={(text) => this._Filter('Items', text)}
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor={theme.colors.black}
                rightStyle={styles.searchRight}
                rightLabel={<Icon
                    name="search"
                    color={theme.colors.black}
                    size={theme.sizes.base}
                    style={styles.searchIcon}
                />}
            />
        )
    }
    renderAddItem = () => {
        const { navigation } = this.props
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('AddItem')}
            >
                <Block flex={false} row
                    margin={[theme.sizes.base, theme.sizes.base]}
                >
                    <Icon
                        name="plus-square"
                        color={theme.colors.black}
                        size={theme.sizes.base * 1.25}
                    />
                    <Text
                        style={{ marginLeft: theme.sizes.base }}
                        bold black>Add Items</Text>

                </Block>
            </TouchableOpacity>
        )
    }
    updateItem = (type, id, toggle_value = 0) => {
        this.setState({ switch_loading: id })
        const { authentication } = this.props;
        if (type == 'TOGGLE') {
            let data = {
                shopId: authentication.shopId,
                ItemId: id,
                is_active: toggle_value == 1 ? 0 : 1
            }
            this.props.createOrUpdateItem(data, authentication.token_type + " " + authentication.token, 'UPDATE')
        }
    }


    renderItems = () => {

        const items = this.state.filtered_items == null ? this.props.items : this.state.filtered_items

        const { navigation } = this.props;

        return (
            <Block style={styles.categoryContainer} middle>
                {items.length != undefined ? items.map(data => (
                    <Block row space="between" margin={[theme.sizes.base * 0.5, 0]} color={theme.colors.white}
                        style={{ borderRadius: 13 }}>
                        <Block row flex={false} center middle padding={[10, 0]}>
                            <Block flex={false} margin={[0, 0, 0, 10]}>
                                {data.image_url != null ?
                                    <Image style={{ height: theme.sizes.base * 3, width: theme.sizes.base * 3, resizeMode: "contain" }}
                                        source={{ uri: `${domain.url.replace('api/', '')}${data.image_url}` }}
                                    />
                                    :
                                    <Image style={{ height: theme.sizes.base * 3, width: theme.sizes.base * 3, }}
                                        source={require('../../assets/elements/product/404.jpg')}
                                    />
                                }

                            </Block>

                            <Block flex={false} margin={[0, theme.sizes.base]} style={{ width: width / 4 }}>
                                <Text black h4>{data.name}</Text>
                                <Text black h4>₹{data.price}</Text>
                            </Block>
                        </Block>
                        <Block flex={false} >
                            <Block row center>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('UpdateItem', { ItemId: data.id })}
                                >
                                    <Block flex={false} row margin={[0, theme.sizes.base * 1.5]}>
                                        <Text black h4 bold style={{ marginRight: theme.sizes.base * 0.5 }}>Edit</Text>
                                        <Icon size={theme.sizes.base} name="edit" color={theme.colors.black} />
                                    </Block>
                                </TouchableOpacity>
                                <Block flex={false}
                                >
                                    {this.state.switch_loading == data.id ?
                                        <Block margin={[0, 13.5]} middle flex={false}>
                                            <ActivityIndicator size="small" color="black" />
                                        </Block>
                                        :
                                        <Block flex={false} margin={[0, 16, 0, 0]}>
                                            <Switch
                                                thumbColor={theme.colors.white}
                                                onValueChange={() => this.updateItem('TOGGLE', data.id, data.is_active)}
                                                value={data.is_active == 1 ? true : false}
                                                trackColor={{ true: theme.colors.primary, false: theme.colors.gary2 }}
                                                style={styles.toggleStyle}
                                            />
                                        </Block>
                                    }
                                </Block>
                            </Block>
                        </Block>
                    </Block>
                )) : null}
            </Block>

        )
    }




    updateCategory = (type, id, toggle_value = 0) => {
        this.setState({ switch_loading: id })
        const { authentication } = this.props;
        if (type == 'TEXT') {
            let data = {
                userId: authentication.userId,
                CatId: id,
                name: this.state.editing_name

            }
            this.props.updateCategory(data, authentication.token_type + " " + authentication.token)

            this.setState({ editing_active_id: null })
            this.setState({ editing_name: null })
        }
        else if (type == 'TOGGLE') {

            let data = {
                userId: authentication.userId,
                CatId: id,
                is_enabled: toggle_value == 1 ? 0 : 1

            }
            this.props.updateCategory(data, authentication.token_type + " " + authentication.token)
        }
    }


    renderMenu = () => {
        if (this.state.active == 'Items') {
            return (
                <Block style={styles.footer}>
                    <Button
                        onPress={() => this.setState({ menu_status: !this.state.menu_status })}
                        color={theme.colors.primary} style={{
                            width: width / 4,
                            borderRadius: theme.sizes.base * 2,
                        }}>
                        <Block center middle row>
                            <Image source={require('../../assets/icons/food.png')}
                                style={{ width: theme.sizes.base, height: theme.sizes.base, marginRight: 10 }}
                            />
                            <Text bold white center>MENU</Text>
                        </Block>

                    </Button>
                </Block>
            )
        }
    }
    renderMenuPopup = () => {
        return (
            <Modal
                animated
                animationType=""
                transparent
                visible={this.state.menu_status}>
                <Block >


                    <TouchableOpacity
                        onPress={() => this.setState({ menu_status: false })}
                        style={styles.outSideContainer}
                    >

                    </TouchableOpacity>

                    <Block style={styles.insideSideContainer}>

                        <Block margin={[20, 0]}>
                            <Block middle center row space="between" style={{ marginHorizontal: theme.sizes.base }}>
                                <Text black h2 bold  >Select Category</Text>
                                <TouchableOpacity
                                    hitSlop={{ top: 20, bottom: 20, left: 50, right: 40 }}
                                    onPress={() => this.setState({ menu_status: false })}
                                >
                                    <Block flex={false}>
                                        <Icon name="times" size={20} color={theme.colors.black} />
                                    </Block>
                                </TouchableOpacity>
                            </Block>
                        </Block>

                        <Block flex={10} style={styles.ModelItems}>
                            <ScrollView
                            >

                                {this.props.categories.map((data, index) => (
                                    <TouchableOpacity
                                        onPress={() => this._Filter('ItemsByCategory', data.id, data.name)}
                                    >
                                        <Block middle color={theme.colors.white} style={{ borderBottomWidth: 1, borderColor: theme.colors.black }}>
                                            <Block row margin={[15, 0, 15, 20]}>
                                                <Block flex={false}>
                                                    <Text black h3>{++index}.</Text>
                                                </Block>
                                                <Block center middle margin={[0, 10, 0, 10]} flex={false}>
                                                    <Text black h3>{data.name} </Text>
                                                </Block>
                                            </Block>
                                        </Block>
                                    </TouchableOpacity>
                                ))
                                }

                            </ScrollView>
                        </Block>

                    </Block>

                </Block>

            </Modal>
        )
    }
    render() {
        const tab = ["Items", "Category"]
        const { active } = this.state;
        return (

            <Block>
                {this.renderMenuPopup()}
                <Block color={theme.colors.white} >

                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        showsVerticalScrollIndicator={false}
                        style={styles.inventoryContainer}
                    >
                        <Block flex={false} color={theme.colors.white} style={styles.inventoryTopContainer}>
                            {this.renderItemSearch()}
                            {this.renderAddItem()}
                        </Block>
                        <Block style={styles.inventoryBottomContainer}>
                            <Block flex={false} margin={[theme.sizes.base, 0]}>
                                {active == "Items" && this.state.categories_search_data == null ? <Text black bold h2>Items</Text> : null}
                                {active != "Items" ? <Text black bold h2>Catagories</Text> : null}
                                {this.state.categories_search_data != null && active == "Items" ?
                                    <Block row center>
                                        <Text black bold h2>Items by category :'{this.state.categories_search_data}'</Text>
                                        <Block flex={false} center margin={[2, 0, 0, 10]}>
                                            <TouchableOpacity
                                                hitSlop={{ top: 20, bottom: 20, left: 50, right: 40 }}
                                                onPress={() => this._Filter('CLEAR', null, null)}
                                            >
                                                <Icon name="times" size={20} color={theme.colors.accent} />
                                            </TouchableOpacity>
                                        </Block>
                                    </Block>
                                    : null}


                                <Divider margin={[theme.sizes.base * 0.5, 0]} />
                            </Block>
                            <Block flex={false}>

                                {active == 'Items' ?
                                    this.renderItems() :
                                    this.renderCategory()
                                }
                            </Block>
                        </Block>
                    </ScrollView>

                </Block>
                {this.renderMenu()}
            </Block>
        );
    }
}
const mapSateToProps = state => ({
    authentication: state.authentication.loginUser,
    store: state.more.store,
    flashMessageData: state.flashMessage.flashMessage,
    categories: state.inventoryData.categories,
    items: state.inventoryData.items,


})
export default connect(mapSateToProps, { fetchCategories, fetchItems, updateCategory, createOrUpdateItem })(Inventory)

const styles = StyleSheet.create({

    inventoryTopContainer: {
        marginVertical: theme.sizes.base,
        marginHorizontal: theme.sizes.base,
        backgroundColor: theme.colors.white,


    },
    inventoryBottomContainer: {
        paddingVertical: theme.sizes.base,
        paddingHorizontal: theme.sizes.base,
        backgroundColor: theme.colors.background,


    },
    searchInput: {
        fontSize: theme.sizes.base,
        color: theme.colors.black,
        backgroundColor: theme.colors.white,
        paddingLeft: theme.sizes.base / 1.333,
        paddingRight: theme.sizes.base * 1.5,
        borderRadius: 4,
    },
    searchRight: {
        top: 0,
        marginVertical: 0,
        backgroundColor: "transparent"
    },
    searchIcon: {
        position: "absolute",
        right: theme.sizes.base / 1.333,
        top: theme.sizes.base
    },
    categoryContainer: {
        paddingHorizontal: theme.sizes.base * 0.5,
        paddingBottom: theme.sizes.base * 2,
    },
    toggleStyle: {

        transform: Platform.OS === 'ios' ? [{ scaleX: .7 }, { scaleY: .7 }] : [{ scaleX: 1 }, { scaleY: 1 }],


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
    editText: {
        width: width / 5,
        color: theme.colors.white
    },
    outSideContainer: {

        height: height / 1.7,
        alignItems: "center",
        justifyContent: "center"

    },
    insideSideContainer: {
        backgroundColor: theme.colors.background
    },
    ModelItems: {

    }


});