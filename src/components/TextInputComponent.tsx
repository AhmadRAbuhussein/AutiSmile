import {StyleSheet, Text, TextInput, View} from "react-native";
import React from "react";
import {colors} from "../constants/Colors";
import {fontSize} from "../constants/FontSize";


interface IProps {
    label: string
    value: string
    onChange: (e: any) => void
    isMulti?: boolean
    isFeedBack?: boolean
    numberType?:boolean
}


const InputComponent = (props: IProps) => {
    return (
        <View style={styles.inputView}>
            <Text style={styles.labelText}>{props.label}</Text>
            <View style={styles.input}>
                <TextInput
                    keyboardType={props.numberType?'numeric':'default'}
                    multiline={!!props.isMulti}
                    style={{padding: 10, backgroundColor: props.isFeedBack ? colors.Purple : colors.White,borderRadius:50}}
                    value={props.value}
                    onChangeText={(e) => props.onChange(e)}
                />
            </View>
        </View>
    )
}
export default InputComponent

const styles = StyleSheet.create({
    inputView: {
        justifyContent: 'center',
        width: '100%',
        marginVertical: 5,

    },

    input: {
        borderRadius: 25,
        minWidth: '95%',
        backgroundColor: colors.White,
        alignSelf: 'center',
        maxHeight: '50%',
    },
    labelText: {
        fontSize: fontSize.labelText,
        color: colors.Grey,
        padding: 12
    }
});
