import React, { Component } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
} from "react-native";
import {Block} from './components';
import Navigator from './navigation/rootNavigator'
import { theme } from "./constants";
import {Provider} from 'react-redux'
import store from './screens/controller/store';
import PushNotification from "react-native-push-notification";
import notifications from "./constants/notification";
const DarkStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
class ShopinnAdmin extends Component {
componentDidMount(){

  PushNotification.createChannel(
    {
      channelId: notifications.channel_id,
      channelName: "STORE FCM",
      channelDescription: "A custom channel to categorise your custom notifications",
      soundName: "default",
      importance:4,
      vibrate: true,
    },
  );
}

  render() {
    return (
      <Provider store={store}>
      <Block>

         <DarkStatusBar backgroundColor={theme.colors.background} barStyle="dark-content" />
         <Navigator/>
      </Block>
      </Provider>
    );
  }
}

export default ShopinnAdmin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});