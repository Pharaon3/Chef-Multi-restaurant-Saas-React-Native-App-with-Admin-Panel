import React, { Component } from "react";
import {
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    Alert,
    Platform
} from "react-native";
import { Block, Text, Button, Switch,  Input } from '../../../components'
import { theme } from "../../../constants";
import {  ScrollView } from "react-native-gesture-handler";
import { connect } from 'react-redux';
import {userData} from '../../controller/actions/authenticationAction'
import {fetchStore,updateStore} from '../../controller/actions/moreAction'
import {addNewCategory,createOrUpdateItem} from '../../controller/actions/inventoryActions'
import ImagePicker from 'react-native-image-picker';
import Crop from 'react-native-image-crop-picker';
import {addNewMessage,clearAllMessages} from '../../controller/actions/flashMessageAction'
import ModalSelector from 'react-native-modal-selector'
const { width, height } = Dimensions.get('window')
const options = {
    title: 'Select Photo',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
class addNewItem extends Component {
    state = {
        loading:false,
        errors:[''],
        is_active:1,
        name:'',
        price:'',
        description:'',
        item_category_id:'',
        item_category_name:'',
        cooking_time:'',
        image:null,
        image_extension:null,
        image_name:null,
        is_recommended:0,
        is_new:0,
        is_veg:0
    }

    submitHandler = () => {
        const errors = [];
        const UserData = this.props.authentication;

        this.state.name == ''? errors.push('name'):null
        this.state.price == ''? errors.push('price'):null

        this.state.item_category_id == ''? errors.push('item_category_id'):null
        this.state.description == ''? errors.push('description'):null
        this.state. cooking_time == ''? errors.push('cooking_time'):null

        this.setState({ errors})

        if(!errors.length){


            let data = {
                store_id:UserData.shopId,
                name:this.state.name,
                price:this.state.price,
                description:this.state.description,
                image:this.state.image,
                image_extension:this.state.image_extension,
                is_active:this.state.is_active,
                category_id:this.state.item_category_id,
                cooking_time:this.state.cooking_time,
                is_veg:this.state.is_veg,
                is_recommended:this.state.is_recommended
            }

            this.props.createOrUpdateItem(data,UserData.token_type+" "+UserData.token,'CREATE')
            this.setState({loading:true})
        }
    }
    componentWillReceiveProps(nextProps){

       if(nextProps.flashMessageData.status == "error"){
        Alert.alert(nextProps.flashMessageData.status,nextProps.flashMessageData.message)
        this.props.clearAllMessages()
        this.setState({loading:false})
       }
       else if(nextProps.flashMessageData.status == "success"){
            this.setState({

                errors:[''],
                is_active:1,
                name:'',
                price:'',
                item_category_id:'',
                item_category_name:'',
                image:null,
                image_extension:null,
                image_name:null,
                is_recommended:0,
                is_new:0,
                is_veg:0,
                cooking_time:'',
                description:'',
            })
           Alert.alert(nextProps.flashMessageData.status,nextProps.flashMessageData.message)
           this.props.clearAllMessages()

       }
       this.setState({loading:false})
    }
    imagePickerHandler=()=>{
        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
                Crop.openCropper({
                    path: response.uri,
                    includeBase64:true,
                    width: 800,
                    height: 340,
                    cropperStatusBarColor:theme.colors.gary1,
                    cropperActiveWidgetColor:theme.colors.primary,
                    cropperToolbarColor:theme.colors.black,
                    cropperToolbarWidgetColor:theme.colors.white
                  }).then(image => {

                    this.setState({
                        image: image.data,
                        image_extension:image.path.split('.')[image.path.split('.').length -1]
                      });
                  });

            }
          });
    }

    renderSubmit=()=>{
        const { loading} = this.state;
        return (
            <Block style={styles.footer}>
                <Button
                onPress={()=>this.submitHandler()}
               gradient style={{
                    width: width / 2
                }}>
                    <Block center middle row>
                    {loading ? <ActivityIndicator size="small" color="white" /> :
                                    <Text center white >Save</Text>}
                    </Block>
                </Button>
            </Block>
        )
    }
    setItem = (option)=>{
        console.log(option)
       this.setState({
        item_category_id:option.id,
        item_category_name:option.label

       })
    }
    render() {
        let finalData = new Array()
        let categories = this.props.categories;
        for(let i in categories){
            let temp = {
                key:i,
                id:categories[i].id,
                label : categories[i].name,
            }
            finalData.push(temp)
        }

        const data = finalData
        const { errors } = this.state;
        const hasErrors = key => errors.includes(key) ? styles.hasErrors : null
        return (

            <Block color={theme.colors.background}>
            <Block flex={false} style={[styles.header]} margin={[theme.sizes.base * 0.75, 0]} row space="between" />
            <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    style={styles.reportsContainer}
                >
                    <Block margin={[54,0]}>
                    <Block flex={false} margin={[theme.sizes.base, 0]}>
                            <Block row space="between" center>
                                <Text black label>IS ACTIVE</Text>
                                <Switch

                                    thumbColor={theme.colors.white}
                                    value={this.state.is_active == 1 ? true :false}
                                    onValueChange={(value) => this.setState({ is_active: value == true ?1:0 })}
                                    trackColor={{ true: theme.colors.primary, false: theme.colors.gary2 }}
                                    style={styles.toggleStyle}
                                />
                            </Block>

                        </Block>
                        <Block flex={false} margin={[theme.sizes.base, 0]}>
                            <Block row space="between" center>
                                <Text black label>IS RECOMMENDED </Text>
                                <Switch

                                    thumbColor={theme.colors.white}
                                    value={this.state.is_recommended == 1 ? true :false}
                                    onValueChange={(value) => this.setState({ is_recommended: value == true ?1:0 })}
                                    trackColor={{ true: theme.colors.primary, false: theme.colors.gary2 }}
                                    style={styles.toggleStyle}
                                />
                            </Block>

                     </Block>

                        <Block flex={false} margin={[theme.sizes.base, 0]}>
                            <Block row space="between" center>
                                <Text black label>IS VEG</Text>
                                <Switch
                                    thumbColor={theme.colors.white}
                                    value={this.state.is_veg == 1 ? true :false}
                                    onValueChange={(value) => this.setState({ is_veg: value == true ?1:0 })}
                                    trackColor={{ true: theme.colors.primary, false: theme.colors.gary2 }}
                                    style={styles.toggleStyle}
                                />
                            </Block>

                        </Block>
                    <Button
                    style={[styles.selectModel,{borderWidth:0.5},hasErrors('item_category_id')]}
                    >
                    <ModalSelector
                    animationType="fade"
                    data={data}
                    touchableActiveOpacity={0.8}
                    initValue={this.state.item_category_name == '' ? "Select Category": this.state.item_category_name}
                    selectStyle={{borderColor:"transparent"}}
                    initValueTextStyle={{color:theme.colors.black}}
                    overlayStyle={{padding:"10%"}}
                    optionContainerStyle={{backgroundColor:theme.colors.white,paddingVertical:12}}
                    selectedItemTextStyle={{color:theme.colors.primary}}
                    selectTextStyle={{color:theme.colors.white}}
                    optionTextStyle={{color:theme.colors.black}}
                    optionStyle={{paddingVertical:12}}
                    onChange={(option)=>this.setItem(option)}
                    cancelStyle={{backgroundColor:theme.colors.background,paddingVertical:15}}
                    cancelTextStyle={{color:theme.colors.black}}
                     />
                   </Button>
                   <Input
                      ref={(r) => this.name = r}
                     onChangeText={text => this.setState({ name:text })}
                     defaultValue={this.state.name}
                     style={[styles.input,hasErrors('name')]}
                     sectionTextStyle={{color:theme.colors.black}}
                     label={<Text black label>Name</Text>}

                    onSubmitEditing={() => this.price.getInnerRef().focus()}
                    />

                    <Input
                    number
                      ref={(r) => this.price = r}
                     onChangeText={text => this.setState({ price:text })}
                     defaultValue={this.state.price}
                     style={[styles.input,hasErrors('price')]}
                     sectionTextStyle={{color:theme.colors.white}}
                     label={<Text black label>Price</Text>}
                    onSubmitEditing={() => this.cooking_time.getInnerRef().focus()}
                    />
                    <Input
                    number
                      ref={(r) => this.cooking_time	 = r}
                     onChangeText={text => this.setState({ cooking_time:text })}
                     defaultValue={this.state.cooking_time	}
                     style={[styles.input,hasErrors('cooking_time')]}
                     sectionTextStyle={{color:theme.colors.white}}
                     label={<Text black label>Cooking Time (Minutes)</Text>}
                    onSubmitEditing={() => this.submitHandler()}
                    />
                    <Input

                      ref={(r) => this.description = r}
                     onChangeText={text => this.setState({ description:text })}
                     defaultValue={this.state.description}
                     style={[styles.input,hasErrors('description')]}
                     sectionTextStyle={{color:theme.colors.white}}
                     label={<Text black label>description</Text>}
                    />
                        <Block margin={[theme.sizes.base, 0]}>
                            <Text label black>PHOTO</Text>
                            <Button
                                onPress={() => this.imagePickerHandler()}

                                color={this.state.image == null ? theme.colors.black : "#8c8c8c"}
                                ref={(r) => this.photo = r}
                                style={[hasErrors('photo'), styles.select]}


                            >
                                <Text white center>{this.state.image == null ? "Choose File" : "Selected"}</Text>
                            </Button>
                        </Block>

                </Block>
                    </ScrollView>
                    {this.renderSubmit()}
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
export default connect(mapSateToProps,{userData,fetchStore,addNewMessage,updateStore,clearAllMessages,addNewCategory,createOrUpdateItem}) (addNewItem);

const styles = StyleSheet.create({

    reportsContainer: {
        paddingHorizontal: theme.sizes.padding * 1.84,
        backgroundColor: theme.colors.background,
    },
    selectModel:{
        fontSize: theme.sizes.base,
        color:theme.colors.white,

        marginTop:5,
        backgroundColor:theme.colors.white,
        borderColor:theme.colors.model,

    },
    input:{
        fontSize: theme.sizes.base,
        paddingLeft: theme.sizes.base / 1.333,
        marginTop: 5,
        backgroundColor: theme.colors.white,
        borderColor: "#9F8A99",

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
    select:{
        marginBottom:theme.sizes.base * 4,
        borderRadius:1,
        borderWidth:1,

    }
});