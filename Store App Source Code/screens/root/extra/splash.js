import React, { Component } from "react";
import {
    StyleSheet,

    Image
} from "react-native";

import { Block } from '../../../components'
import { theme } from "../../../constants";
class Splash extends Component {
    render() {
        return (
            <Block center middle color={theme.colors.background}>
                <Block center middle margin={[0, 0, 100, 0]}>
                    <Block row center middle>
                        <Image source={require('../../../assets/logo.png')}
                            style={{ width: 180, height: 40, resizeMode: "contain" }}
                        />
                    </Block>
                </Block>
            </Block>
        );
    }
}
export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoStyle: {
        fontSize: 50
    }
});