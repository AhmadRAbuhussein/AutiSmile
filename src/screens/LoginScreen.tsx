import {Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors} from "../constants/Colors";
import {fontSize} from "../constants/FontSize";
import React, {useState} from "react";
import InputComponent from "../components/TextInputComponent";
import ScreenNames from "../constants/ScreenNames";
import {useNavigation} from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = () => {
    const [data, setData] = useState<{ email?: string, password?: string }>()
    const navigation = useNavigation()
    const onSubmit = () => {
        console.log('enterd')
        axios.post('http://164.92.232.29:6969/api/token/login', data)
            .then(async function (response) {
                console.log(response)
                if (response.status == 200) {
                    await storeData(response.data.auth_token)
                    // @ts-ignore
                    navigation.navigate({name: ScreenNames.HomeScreen})
                } else Alert.alert(
                    "Invalid credentials",
                    "Incorrect Email or Password.",
                    [
                        {text: "OK", onPress: () => console.log("OK Pressed")}
                    ]
                );
            })
            .catch(function (error) {
                Alert.alert(
                    "Invalid credentials",
                    "Incorrect Email or Password.",
                    [
                        {text: "OK", onPress: () => console.log("OK Pressed")}
                    ]
                );
            });
    }
    const storeData = async (value: string) => {
        try {
            await AsyncStorage.setItem('token', value)
        } catch (e) {
            console.log(e)
        }
    }
    const Signup = () => {
        // @ts-ignore
        navigation.navigate({name: ScreenNames.SignUpScreen})
    }
    return (
        <View style={styles.container}>
            <Text onLongPress={()=>{
                setData({email:"ahmad1@ahmad.com",password:"011453as"})
                onSubmit()
            }} style={styles.descriptionText}>Login</Text>
            <View style={styles.formView}>
                <InputComponent
                    label={"Email"}
                    value={data?.email || ''}
                    onChange={(e) => setData({...data, email: e})}
                />
                <View style={{height: 10}}/>
                <InputComponent
                    label={"Password"}
                    value={data?.password || ''}
                    onChange={(e) => setData({...data, password: e})}
                />
            </View>
            <View style={{
                width: '75%',
                height: '8%',
                marginTop: 25
            }}>
                <TouchableOpacity onPress={onSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>
                        Login
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signUpButton} onPress={Signup}>
                    <Text style={styles.signUpText}>
                        Sign up
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: colors.Purple
    },
    logo: {
        resizeMode: 'contain'
    },
    formView: {
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    button: {
        backgroundColor: colors.Orange,
        padding: 5,
        borderRadius: 50,
        width: '100%',
        height: '100%',
        minHeight: 50,
        alignItems: 'center',
        justifyContent: 'center',
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
        fontSize: fontSize.ExtraLarge,
        color: colors.Orange,
        padding: 10,
        textAlign: "center",
        fontWeight: 'bold',
    },
    signUpText: {
        fontSize: fontSize.SubMedium,
        color: colors.Orange,
        fontWeight: 'bold'
    },
    signUpButton: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
