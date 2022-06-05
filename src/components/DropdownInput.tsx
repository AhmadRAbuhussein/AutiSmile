import {StyleSheet, Text, View} from "react-native";
import {Picker} from "@react-native-picker/picker";
import React from "react";
import {colors} from "../constants/Colors";
import {fontSize} from "../constants/FontSize";
import {LookupModel} from "../models/LookupModel";


interface IProps {
    label: string
    value: string
    options: LookupModel[]
    onChange: (e: any) => void
}


const DropdownInput = (props: IProps) => {
    return (
        <View style={styles.inputView}>
            <Text style={styles.labelText}>{props.label}</Text>
            <View style={styles.input}>
                {/*@ts-ignore*/}
                <Picker
                    selectedValue={props.value}
                    onValueChange={(itemValue) => {
                        props.onChange(itemValue)
                    }}
                >
                    {/*@ts-ignore*/}
                    <Picker.Item color={colors.Grey} label={'Select'} value={''}/>
                    {props.options.map((x, i) => {
                        return (
                            // @ts-ignore
                            <Picker.Item key={i} label={x.label} value={x.value}/>
                        )
                    })}
                </Picker>
            </View>
        </View>
    )
}
export default DropdownInput

const styles = StyleSheet.create({
    inputView: {
        justifyContent: 'center',
        width: '100%',
        marginVertical: 5
    },

    input: {
        borderRadius: 25,
        width: '95%',
        backgroundColor: colors.White,
        alignSelf: 'center'
    },
    labelText: {
        fontSize: fontSize.labelText,
        color: colors.Grey,
        padding: 12,
    }
});
