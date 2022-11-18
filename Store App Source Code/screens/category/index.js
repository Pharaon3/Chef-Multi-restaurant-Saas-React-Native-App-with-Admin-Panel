
import React, { Component } from "react";
import {
    Dimensions,
    StyleSheet,
    Platform,
    TouchableOpacity
} from "react-native";
import { Block, Text,  Input, Divider, Switch} from '../../components'
import { theme } from "../../constants";
import { ScrollView } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import {fetchCategories,fetchItems,updateCategory,createOrUpdateItem} from '../controller/actions/inventoryActions'
import { connect } from 'react-redux';
import { ActivityIndicator } from "react-native-paper";
const { width, height } = Dimensions.get('window')
class Inventory extends Component {
    state ={
        active: 'Category',
        editing_active_id:null,
        editing_name:null,
        filtered_items:null,
        filtered_categories:null,
        search_key:null,
        cat_key:null,
        categories_search_data:null,
        menu_status:false,
        switch_loading:null,
        Type:null
    }
    UNSAFE_componentWillMount(){
        const {authentication} = this.props;
        let data = {
            shopId:authentication.shopId
        }
        this.props.fetchCategories(data,authentication.token_type+" "+authentication.token)

    }
    componentWillReceiveProps(nextProps){
        if (nextProps.items || nextProps.categories) {
            if ((this.props.items != nextProps.items) || (this.props.categories != nextProps.categories)) {
                this.setState({ switch_loading: null })
            }
        }
        if ((nextProps.categories != this.props.categories) && (this.state.filtered_categories != null)&& (this.state.Type =="Category")) {
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
        if ((nextProps.items != this.props.items ) && (this.state.filtered_items != null)&& (this.state.Type =="Items")) {
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

         if ((nextProps.items != this.props.items) && (this.state.filtered_items != null)&& (this.state.Type =="ItemsByCategory")) {
            let key = this.state.search_key;
            if(this.props.items.length == undefined){
                return;
            }else{
                let filtered = nextProps.items.filter(item=>
                    item.item_category_id == key
                )
                this.setState({filtered_items:filtered})
                this.setState({ categories_search_data:this.state.cat_key})
                this.setState({menu_status:false})
            }
        }

    }
    _Filter = (Type,key,name_cat = null) =>{
        this.setState({Type:Type})
        this.setState({search_key:key})
        if(name_cat !=null){
            this.setState({cat_key:name_cat})
        }
        if(Type == 'Items'){
            if(this.props.items.length == undefined){
                return;
            }else{
                let filtered = this.props.items.filter(item=>
                    item.name.toLowerCase().indexOf(key.toLowerCase()) > -1
                )
                this.setState({filtered_items:filtered,
                })
                this.setState({ categories_search_data:name_cat})
            }
        }
        if(Type == 'Category'){

            if(this.props.categories.length == undefined){
                return;
            }else{
                let filtered = this.props.categories.filter(item=>
                item.name.toLowerCase().indexOf(key.toLowerCase()) > -1
                )
                this.setState({filtered_categories:filtered,
                })

            }
        }
        if(Type == 'ItemsByCategory'){
            if(this.props.items.length == undefined){
                return;
            }else{
                let filtered = this.props.items.filter(item=>
                    item.item_category_id == key
                )
                this.setState({filtered_items:filtered})
                this.setState({ categories_search_data:name_cat})
                this.setState({menu_status:false})
            }
        }
        if(Type == 'CLEAR'){
            this.setState({filtered_items:this.props.items,
                categories_search_data:null,
                filtered:null,
                filtered_items:null,
                filtered_categories:null,
                categories_search_data:null,
            })
        }
    }

    renderAddItem = ()=>{
        const {navigation} = this.props
        return(
            <TouchableOpacity
            onPress={()=>navigation.navigate('AddItem')}
            >
            <Block flex={false} row
                margin={[theme.sizes.base, theme.sizes.base]}
            >
                <Icon
                    name="plus-square"
                    color={theme.colors.white}
                    size={theme.sizes.base * 1.25}
                />
                <Text
                    style={{ marginLeft: theme.sizes.base }}
                    white>Add Items</Text>

            </Block>
            </TouchableOpacity>
            )
    }
    updateItem = (type,id,toggle_value = 0)=>{
        this.setState({switch_loading:id})
        const {authentication} = this.props;
        if(type == 'TOGGLE'){
            let data = {
                shopId:authentication.shopId,
                ItemId:id,
                is_active:toggle_value == 1 ?0:1
            }
            this.props.createOrUpdateItem(data,authentication.token_type+" "+authentication.token,'UPDATE')
        }
    }



    renderCategorySearch = ()=>{
        return(
        <Input
        onChangeText={(text)=>this._Filter('Category',text)}
        style={styles.searchInput}
        placeholder="Search"
        placeholderTextColor={theme.colors.gray}

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
    renderAddCategory = ()=>{
        const {navigation} = this.props
        return(
            <TouchableOpacity
            onPress={()=>this.props.navigation.navigate('AddCategory')}
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
                    black
                    style={{ marginLeft: theme.sizes.base }}
                    bold >Add Category</Text>

            </Block>
            </TouchableOpacity>
            )
    }


    updateCategory=(type,id,toggle_value = 0)=>{
        this.setState({switch_loading:id})
        const {authentication} = this.props;
        if(type == 'TEXT'){
        let data = {
            userId:authentication.userId,
            CatId:id,
            name:this.state.editing_name

        }
        this.props.updateCategory(data,authentication.token_type+" "+authentication.token)

        this.setState({editing_active_id:null})
        this.setState({editing_name:null})
        }
        else if(type == 'TOGGLE'){

            let data = {
                shopId:authentication.shopId,
                CategoryId:id,
                is_active:toggle_value == 1 ?0:1

            }
            this.props.updateCategory(data,authentication.token_type+" "+authentication.token)
        }
    }
    renderEditCategory = (name,id)=>{


        return(
                <Text black h4>{ ((name).length > 12) ?
                    (((name).substring(0,12-3)) + '...') :
                    name }
                </Text>
        )
    }
    renderCategory = () => {
        const {navigation} = this.props;
        const categories = this.state.filtered_categories == null  ? this.props.categories:this.state.filtered_categories
        const {editing_active_id} = this.state;
        return(
            <Block style={styles.categoryContainer} middle>
                {categories.length!=undefined ? categories.map(data=>(
                <Block row space="between" margin={[theme.sizes.base,0]} >
                    <Block row flex={false} center>
                        <Block flex={false} margin={[0, theme.sizes.base]}>
                            {this.renderEditCategory(data.name,data.id)}



                        </Block>
                    </Block>
                    <Block flex={false} >
                        <Block row center>
                        {editing_active_id !=data.id ?
                                    <TouchableOpacity
                                    onPress={()=>navigation.navigate('UpdateCategory',{CategoryId:data.id})}
                                    >
                                        <Block flex={false} row margin={[0, theme.sizes.base * 1.5]}>
                                            <Text black h4 bold style={{ marginRight: theme.sizes.base * 0.5 }}>Edit</Text>
                                            <Icon size={theme.sizes.base} name="edit" color={theme.colors.black} />

                                        </Block>

                                    </TouchableOpacity>
                                    :(
                                    <TouchableOpacity
                                    onPress={() => this.updateCategory('TEXT',data.id)}
                                    >
                                        <Block flex={false} row margin={[0, theme.sizes.base * 1.5]}>
                                            <Text white h4 bold style={{ marginRight: theme.sizes.base * 0.5 }}>SAVE</Text>
                                        </Block>
                                    </TouchableOpacity>

                                    )
                                    }
                            {this.state.switch_loading == data.id ?
                            <Block margin={[0,28]} middle>
                             <ActivityIndicator  size="small" color={theme.colors.black} />
                             </Block>
                             :
                            <Switch
                            thumbColor={theme.colors.white}
                            onValueChange={()=> this.updateCategory('TOGGLE',data.id,data.is_active)}
                             value={data.is_active == 1 ? true:false}
                             trackColor={{true: theme.colors.primary, false: theme.colors.gary2}}
                            style={styles.toggleStyle}
                            />
                        }

                        </Block>
                    </Block>
                </Block>
            )):null}
            </Block>

        )
    }


    render() {
        const { active } = this.state;
        return (

            <Block>

                <Block color={theme.colors.white} >
                    <Block flex={false} style={styles.header} row space="between">

                    </Block>
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        showsVerticalScrollIndicator={false}
                    >
                        <Block flex={false} color={theme.colors.white} style={styles.inventoryTopContainer}>
                        {this.renderCategorySearch()}
                        {this.renderAddCategory()}
                        </Block>
                        <Block style={styles.inventoryBottomContainer}>
                        <Block flex={false} margin={[theme.sizes.base, 0]} >
                            {active =="Items" && this.state.categories_search_data ==null  ?           <Text white bold h2>Items</Text>:null}
                           {active !="Items"  ?  <Text black bold h2>Catagories</Text>:null}
                           {this.state.categories_search_data !=null && active =="Items"?
                           <Block row center>
                            <Text white bold h2>Items by category :'{this.state.categories_search_data}'</Text>
                            <Block flex={false} center margin={[2,0,0,10]}>
                            <TouchableOpacity
                               hitSlop={{top: 20, bottom: 20, left: 50, right: 40}}
                               onPress={()=>this._Filter('CLEAR',null,null)}
                               >
                            <Icon name="times" size={20} color={theme.colors.accent} />
                            </TouchableOpacity>
                            </Block>
                            </Block>
                           :null}

                            <Divider margin={[theme.sizes.base * 0.5, 0]} />
                        </Block>
                        <Block flex={false}>


                           {
                            this.renderCategory()
                            }
                        </Block>
                        </Block>
                    </ScrollView>

                </Block>

            </Block>
        );
    }
}
const mapSateToProps = state => ({
    authentication:state.authentication.loginUser,
    store:state.more.store,
    flashMessageData:state.flashMessage.flashMessage,
    categories:state.inventoryData.categories,
    items:state.inventoryData.items,


})
export default connect(mapSateToProps,{fetchCategories,fetchItems,updateCategory,createOrUpdateItem})(Inventory)

const styles = StyleSheet.create({

    inventoryTopContainer: {
        marginVertical:theme.sizes.base,
        marginHorizontal:theme.sizes.base,
        backgroundColor: theme.colors.white,


    },
    inventoryBottomContainer: {
       paddingVertical:theme.sizes.base,
        paddingHorizontal:theme.sizes.base,
        backgroundColor: theme.colors.background,


    },
    searchInput: {
        fontSize: theme.sizes.base,
        color:theme.colors.black,
        backgroundColor: theme.colors.white,
        paddingLeft: theme.sizes.base / 1.333,
        paddingRight: theme.sizes.base * 1.5,
        borderRadius:4,
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
    categoryContainer:{
        paddingHorizontal:theme.sizes.base * 0.5,
        paddingBottom:theme.sizes.base *2,

    },
    toggleStyle:{

        transform: Platform.OS === 'ios' ?[{ scaleX: .7 }, { scaleY: .7 }]:[{ scaleX: 1 }, { scaleY: 1 }],


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
   editText:{
    width:width/5,
    color:theme.colors.white
   },
   outSideContainer:{

        height: height/1.7,
        alignItems: "center",
        justifyContent: "center"

   },
   insideSideContainer:{
    backgroundColor:theme.colors.black
   },
   ModelItems:{

   }


});