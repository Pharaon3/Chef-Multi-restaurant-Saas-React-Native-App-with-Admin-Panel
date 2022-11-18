
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
import { ScrollView } from "react-native-gesture-handler";
import { connect } from 'react-redux';
import {userData} from '../../controller/actions/authenticationAction'
import ImagePicker from 'react-native-image-picker';
import Crop from 'react-native-image-crop-picker';
import {fetchStore,updateStore} from '../../controller/actions/moreAction'
import {addNewCategory,fetchCategories,updateCategory} from '../../controller/actions/inventoryActions'
import {addNewMessage,clearAllMessages} from '../../controller/actions/flashMessageAction'
const { width, height } = Dimensions.get('window')
const options = {
    title: 'Select Photo',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
class categoryUpdate extends Component {
    state = {
        loading:false,
        errors:[],
        is_enabled:1,
        name:'',
        image:null,
        image_extension:null,
        image_name:null,
        CategoryId:''
    }

    submitHandler = () => {
        const errors = [];
        const UserData = this.props.authentication;
        this.state.name == ''? errors.push('name'):null

        this.setState({ errors})
        if(!errors.length){
            this.setState({loading:true})
            let data = {
                CategoryId:this.state.CategoryId,
                name:this.state.name,
                image:this.state.image,
                image_extension:this.state.image_extension,
                is_active:this.state.is_enabled,
                shopId:UserData.shopId,
            }



            this.props.updateCategory(data,UserData.token_type+" "+UserData.token)
        }
    }
    componentWillReceiveProps(nextProps){
        const {addNewMessage} = this.props;

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
    componentWillMount(){

        let CategoryID = this.props.navigation.getParam('CategoryId');
        let filtered= this.props.categories.filter(item=>
            item.id == CategoryID
        )

        if(filtered.length){
            let category_name = this.props.categories.filter(category=>
                category.id == filtered[0].item_category_id
            )
            this.setState({
                CategoryId:CategoryID,
                is_active:filtered[0].is_active,
                name:filtered[0].name,
            })
        }
    }

    render() {
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
                    <Block flex={false}>
                            <Block row space="between" center>
                                <Text black label>IS ENABLED</Text>
                                <Switch
                                    thumbColor={theme.colors.white}
                                    value={this.state.is_enabled == 1 ? true :false}
                                    onValueChange={(value) => this.setState({ is_enabled: value == true ?1:0 })}
                                    trackColor={{ true: theme.colors.primary, false: theme.colors.gary2 }}
                                    style={styles.toggleStyle}
                                />
                            </Block>

                        </Block>
                    <Input
                     onChangeText={text => this.setState({ name:text })}
                     defaultValue={this.state.name}
                     style={[styles.input,hasErrors('name')]}
                    label={<Text black label>Category Name</Text>}


                    onSubmitEditing={() => this.submitHandler()}
                    />
                     <Block margin={[0, 0]} flex={false}>
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
})
export default connect(mapSateToProps,{fetchCategories,updateCategory,userData,fetchStore,addNewMessage,updateStore,clearAllMessages,addNewCategory}) (categoryUpdate);

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