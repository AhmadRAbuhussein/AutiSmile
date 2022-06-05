import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors} from "../constants/Colors";
import {fontSize} from "../constants/FontSize";
import React, {useEffect, useState} from "react";
import {Entypo} from '@expo/vector-icons';
import ScreenNames from "../constants/ScreenNames";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = () => {
    const [selectedAge, setSelectedAge] = useState<{ moreThanTwoYears: boolean, lessThanTwoYears: boolean }>()
    const navigation = useNavigation()
    const onStart = () => {
        if (selectedAge?.moreThanTwoYears && !selectedAge.lessThanTwoYears) {
            // @ts-ignore
            navigation.navigate({name: ScreenNames.FormAdultScreen})
        } else {
            // @ts-ignore
            navigation.navigate({name: ScreenNames.FormScreen})
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.descriptionText}>
                Choose the Age of the diagnosed.
            </Text>
            <View style={styles.cardsView}>
                <View onTouchStart={() => setSelectedAge({lessThanTwoYears: true, moreThanTwoYears: false})}
                      style={styles.card}>
                    <Text style={styles.cardText}>Baby</Text>
                    <Text style={[styles.cardText, {fontSize: fontSize.SubMedium}]}>Less than 2 years</Text>
                    {/* @ts-ignore*/}
                    {selectedAge?.lessThanTwoYears && <Entypo name="check" size={50} color={colors.Success}/>}
                </View>
                <View onTouchStart={() => setSelectedAge({lessThanTwoYears: false, moreThanTwoYears: true})}
                      style={styles.card}>
                    <Text style={styles.cardText}>Adults</Text>
                    <Text style={[styles.cardText, {fontSize: fontSize.SubMedium}]}>More than 17 years</Text>
                    {/* @ts-ignore*/}
                    {selectedAge?.moreThanTwoYears && <Entypo name="check" size={50} color={colors.Success}/>}
                </View>
            </View>
            <TouchableOpacity disabled={!selectedAge} onPress={onStart} style={styles.button}>
                <Text style={styles.buttonText}>
                    Next
                </Text>
            </TouchableOpacity>
        </View>
    )
}
export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: colors.Purple
    },
    button: {
        backgroundColor: colors.Orange,
        padding: 5,
        borderRadius: 50,
        width: '75%',
        height: '8%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
    buttonText: {
        fontSize: fontSize.Medium,
        color: colors.White,
        fontWeight: 'bold'
    },
    descriptionText: {
        fontSize: fontSize.Large,
        color: colors.Grey,
        textAlign: "center",
        fontWeight:'bold'
    },
    cardsView: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '75%',
        borderColor: colors.Purple,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,


    },
    card: {
        borderColor: colors.LightGrey,
        borderWidth: 2,
        width: '75%',
        height: '35%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.Yellow,
        borderRadius: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,
    },
    cardText: {
        fontSize: fontSize.Large,
        color: colors.White,
        fontWeight: "bold",
        padding: 2
    }
});
