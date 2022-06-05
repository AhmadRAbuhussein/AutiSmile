import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import images from "../res/images";
import {colors} from "../constants/Colors";
import {fontSize} from "../constants/FontSize";
import {useNavigation} from "@react-navigation/native";
import ScreenNames from "../constants/ScreenNames";


const AboutUsScreen = () => {

    const navigation=useNavigation()
    const onStart=()=>{
        // @ts-ignore
        navigation.navigate({name:ScreenNames.HomeScreen})
    }
    return (
        <View style={styles.container}>
            <Text style={[styles.descriptionText,{fontSize:fontSize.ExtraLarge,color:colors.Orange}]}>
                AutiSmile
            </Text>
            <Text style={styles.descriptionText}>
                The App contains Autism Spectrum Disorder (ASD) tests to enable parents, caregivers, and academic
                researchers access to them. Theses tests are not diagnostic tools rather they are behavioral tests that
                just pinpoint autistic traits.
            </Text>
            <TouchableOpacity style={styles.button} onPress={onStart}>
                <Text style={styles.buttonText}>
                    Start
                </Text>
            </TouchableOpacity>
        </View>
    )
}
export default AboutUsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor:colors.Purple
    },
    logo: {
        resizeMode: 'contain'
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
        fontWeight:'bold'
    },
    descriptionText:{
        fontSize: fontSize.Medium,
        color: colors.Grey,
        padding:10,
        textAlign:"center",
        fontWeight:'bold',

    }
});
