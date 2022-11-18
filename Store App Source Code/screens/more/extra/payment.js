
import React, { Component } from "react";
import {
    StyleSheet,
    Dimensions
} from "react-native";
import { Block, Text,  Button, Input } from '../../../components'
import { theme } from "../../../constants";
import {  ScrollView } from "react-native-gesture-handler";

const { width} = Dimensions.get('window')
class PaymentMethod extends Component {
    renderUpdate=()=>{
        return (
            <Block style={styles.footer}>
                <Button color={theme.colors.black} style={{
                    width: width / 2,

                }}>
                    <Block center middle row>

                        <Text  white center>UPDATE</Text>
                    </Block>

                </Button>
            </Block>
        )
    }
    render() {
        return (
            <Block color={theme.colors.black}>
            <Block flex={false} style={[styles.header]} margin={[theme.sizes.base * 0.75, 0]} row space="between" />
            <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    style={styles.reportsContainer}
                >
                    <Block margin={[54,0]}>
                    <Input
                    style={styles.input}
                    label={<Text white>ENTER BACK ACCOUNT</Text>}
                    />
                    <Input
                    style={styles.input}
                    label={<Text white>IFSC CODE</Text>}
                    />
                    <Input
                    style={styles.input}
                    label={<Text white>ACCOUNT HOLDER'S NAME</Text>}
                    />
                    <Input
                    style={styles.input}
                    label={<Text white>UPI ID</Text>}
                    />
                    <Input
                    style={styles.input}
                    label={<Text white>MOBILE NUMBER</Text>}
                    />



                    </Block>
                    </ScrollView>
                    {this.renderUpdate()}
            </Block>

        );
    }
}
export default PaymentMethod;

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
});