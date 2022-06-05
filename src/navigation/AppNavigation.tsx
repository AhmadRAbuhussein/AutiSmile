import React, {useEffect, useState} from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import AboutUsScreen from "../screens/AboutUsScreen";
import ScreenNames from "../constants/ScreenNames";
import HomeScreen from "../screens/HomeScreen";
import {colors} from "../constants/Colors";
import FormScreen from "../screens/FormScreen";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {fontSize} from "../constants/FontSize";
import LoginScreen from "../screens/LoginScreen";
import {useNavigation} from "@react-navigation/native";
import SignUpScreen from "../screens/SignUp";
import FormAdultScreen from "../screens/FormAdultScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AppNavigation = () => {
    const Stack = createStackNavigator();
    const navigation = useNavigation()

    return (
        <>
            {/*@ts-ignore*/}
            <Stack.Navigator screenOptions={{}}>
                <Stack.Screen
                    options={{
                        headerShown: false,
                    }}
                    component={AboutUsScreen}
                    name={ScreenNames.AboutUsScreen}
                />
                <Stack.Screen
                    options={{
                        headerStyle: {
                            backgroundColor: colors.Purple,
                            height: 100
                        },
                        headerTitle: '',
                        headerRight: () => (
                            <>
                                <TouchableOpacity
                                    /*@ts-ignore*/
                                    onPress={() => navigation.navigate({name: ScreenNames.LoginScreen})
                                    }>
                                    <Text style={styles.loginButton}>Login</Text>
                                </TouchableOpacity>
                            </>
                        ),
                    }}
                    component={HomeScreen}
                    name={ScreenNames.HomeScreen}
                />
                <Stack.Screen
                    options={{
                        headerStyle: {
                            backgroundColor: colors.Purple,
                            height: 75
                        },
                        headerTitle: '',
                        headerLeft: () => null,
                    }}

                    component={FormScreen}
                    name={ScreenNames.FormScreen}
                />
                <Stack.Screen
                    options={{
                        headerStyle: {
                            backgroundColor: colors.Purple,
                            height: 75
                        },
                        headerTitle: '',
                        headerLeft: () => null,
                    }}

                    component={FormAdultScreen}
                    name={ScreenNames.FormAdultScreen}
                />
                <Stack.Screen
                    options={{
                        headerStyle: {
                            backgroundColor: colors.Purple,
                            height: 100
                        },
                        headerTitle: '',
                    }}
                    component={LoginScreen}
                    name={ScreenNames.LoginScreen}
                />
                <Stack.Screen
                    options={{
                        headerStyle: {
                            backgroundColor: colors.Purple,
                            height: 100
                        },
                        headerTitle: '',
                    }}
                    component={SignUpScreen}
                    name={ScreenNames.SignUpScreen}
                />
            </Stack.Navigator>
        </>
    );
}
export default AppNavigation

const styles = StyleSheet.create({
    loginButton: {
        color: colors.Orange,
        fontWeight: 'bold',
        fontSize: fontSize.Medium,
        paddingHorizontal: 20,

    }
})
