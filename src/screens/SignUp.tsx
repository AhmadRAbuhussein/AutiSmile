import {Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors} from "../constants/Colors";
import {fontSize} from "../constants/FontSize";
import React, {useState} from "react";
import InputComponent from "../components/TextInputComponent";
import ScreenNames from "../constants/ScreenNames";
import {LookupModel} from "../models/LookupModel";
import DropdownInput from "../components/DropdownInput";
import {useNavigation} from "@react-navigation/native";
import axios from "axios";

const SignUpScreen = () => {
    const [data, setData] = useState<SignUpModel>()
    const navigation = useNavigation()
    const onSubmit = () => {
        console.log(data, "data")
        axios.post('http://164.92.232.29:6969/api/users/', data)
            .then(function (response) {
                console.log(response, "11111111")
                if (response.status == 201) {
                    console.log(response)
                    // @ts-ignore
                    navigation.navigate({name: ScreenNames.LoginScreen})
                } else {
                    console.log(response)
                    Alert.alert(
                        "Invalid credentials",
                        "Incorrect Email or Password.",
                        [
                            {text: "OK", onPress: () => console.log("OK Pressed")}
                        ]
                    );
                }
            })
            .catch(function (error) {
                console.log(error.response.data)
                Alert.alert(
                    "Error",
                    "Missing fields or credentials are already exists",
                    [
                        {text: "OK", onPress: () => console.log("OK Pressed")}
                    ]
                );
            });
    }
    const Login = () => {
        // @ts-ignore
        navigation.navigate({name: ScreenNames.LoginScreen})
    }
    return (
        <View style={styles.container}>
            <Text style={styles.descriptionText}>Sign up</Text>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.formView}>
                        <InputComponent
                            label={"First name"}
                            value={data?.first_name || ''}
                            onChange={(e) => setData({...data, first_name: e})}
                        />
                        <View style={{height: 10}}/>
                        <InputComponent
                            label={"Last name"}
                            value={data?.last_name || ''}
                            onChange={(e) => setData({...data, last_name: e})}
                        />
                        <View style={{height: 10}}/>
                        <InputComponent
                            label={"User name"}
                            value={data?.username || ''}
                            onChange={(e) => setData({...data, username: e})}
                        />
                        <View style={{height: 10}}/>
                        <InputComponent
                            label={"Email"}
                            value={data?.email || ''}
                            onChange={(e) => setData({...data, email: e})}
                        />
                        <View style={{height: 10}}/>
                        <InputComponent
                            label={"phone number"}
                            value={data?.phonenumber || ''}
                            onChange={(e) => setData({...data, phonenumber: e})}
                        />
                        <View style={{height: 10}}/>
                        <DropdownInput
                            label={"What is your relative to the diagnosed?"}
                            value={data?.user_type || ''}
                            options={UserTypes}
                            onChange={(e) => setData({...data, user_type: e})}/>
                        <View style={{height: 10}}/>
                        <InputComponent
                            label={"Password"}
                            value={data?.password || ''}
                            onChange={(e) => setData({...data, password: e})}
                        />
                        <View style={{height: 10}}/>
                        <InputComponent
                            label={"Re Password"}
                            value={data?.re_password || ''}
                            onChange={(e) => setData({...data, re_password: e})}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
            <View style={{
                width: '75%',
                height: '8%',
                margin: 50
            }}>
                <TouchableOpacity onPress={onSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>
                        Sign up
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signUpButton} onPress={Login}>
                    <Text style={styles.signUpText}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default SignUpScreen

type SignUpModel = {
    username?: string
    phonenumber?: string
    first_name?: string
    last_name?: string
    user_type?: string
    is_superuser?: string
    email?: string
    password?: string
    re_password?: string
}
const UserTypes: LookupModel[] = [
    {label: 'Parent', value: '1'},
    {label: 'Professionals', value: '2'},
    {label: 'Person', value: '3'},
]


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
        paddingHorizontal: 10,
        paddingVertical: 2
    },
    button: {
        backgroundColor: colors.Orange,
        padding: 5,
        borderRadius: 50,
        width: '100%',
        height: '100%',
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
