import React, {useState} from "react";
import {Alert, Linking, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {colors} from "../constants/Colors";
import {fontSize} from "../constants/FontSize";
import InputComponent from "./TextInputComponent";
import {useNavigation} from "@react-navigation/native";
import ScreenNames from "../constants/ScreenNames";
import axios from "axios";
import {AntDesign, Entypo} from '@expo/vector-icons';
import {ResultModel} from "../screens/FormAdultScreen";


interface IProps {
    resultData: ResultModel
}

const ResultModal = ({resultData}: IProps) => {
    const [feedback, setFeedBack] = useState<string>()
    const navigation = useNavigation()
    const [isSent, setIsSent] = useState(false)
    const reTest = () => {
        // @ts-ignore
        navigation.navigate({name: ScreenNames.HomeScreen})
    }
    const SendFeedBack = async () => {
        axios.post('http://164.92.232.29:6969/api/sendFeedBack', {feed: feedback})
            .then(function (response) {
                if (response.status == 200) {
                    setIsSent(true)
                } else Alert.alert(
                    "Fields are required",
                    "You are missing one or more field.",
                    [
                        {text: "OK", onPress: () => console.log("OK Pressed")}
                    ]
                );
            })
            .catch(function (error) {
                Alert.alert(
                    "Field is required",
                    "Please submit a feedback.",
                    [
                        {text: "OK", onPress: () => console.log("OK Pressed")}
                    ]
                );
            });
    };
    const openUrl = async (url: string | undefined) => {
        if (!url) {
            return;
        }
        try {
            await Linking.openURL(url!);
        } catch (e) {
        }
    };
    const callNumber = async (phone: string | undefined) => {
        if (!phone) {
            return;
        }
        let phoneNumber: string = `tel:${phone}`;

        try {
            await Linking.openURL(phoneNumber);
        } catch (e) {
        }
    };
    const resultResolver = () => {
        if (resultData.result == 1)
            return (
                <Text style={[styles.modalText, {
                    fontWeight: 'bold',
                    marginTop: 0
                }]}>{resultData.percentage * 100 + '% ' + ' Positive'}</Text>
            )
        else return (<Text style={[styles.modalText, {
            fontWeight: 'bold',
            marginTop: 0
        }]}>Negative</Text>)
    }
    const clinicResolver = () => {
        if (resultData.clinic_name) {
            return (
                <View style={styles.clinicView}>
                    <Text style={{color: colors.Orange, fontWeight: 'bold', fontSize: fontSize.labelText}}>We advice you
                        to the following clinic: </Text>
                    <Text style={[styles.clinicText, {marginTop: 20}]}>Clinic name: {resultData.clinic_name}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.clinicText}>Clinic number: </Text>
                        <Text onPress={() => callNumber(resultData.clinic_phone_number)}
                              style={[styles.clinicText, {color: colors.Success}]}>{resultData.clinic_phone_number}</Text>
                    </View>
                    <Text style={styles.clinicText}>Clinic email: {resultData.clinic_email}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.clinicText}>Clinic location: </Text>
                        {/*@ts-ignore*/}
                        <Entypo onPress={() => openUrl(resultData.clinic_location)} name="location" size={24}
                                color={colors.Success}/>
                    </View>
                </View>
            )

        } else {
            return (
                <Text style={[styles.modalText, {fontSize: fontSize.Medium}]}>The detection
                    showed
                    that most
                    likely the diagnosed person does not have
                    autism.</Text>
            )
        }
    }
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={true}
            >
                <SafeAreaView style={styles.container}>
                    <ScrollView>
                        <View style={styles.centeredView}>
                            {/*@ts-ignore*/}
                            {isSent ? <><AntDesign name="checkcircleo" size={250} color={colors.Success}/>
                                    <View style={{height: 50}}/>
                                    <Text style={[styles.modalText, {
                                        fontWeight: 'bold',
                                        marginBottom: 1,
                                        color: colors.Success
                                    }]}>Thank you</Text>
                                    <Text style={[styles.modalText, {
                                        fontWeight: 'bold',
                                        marginBottom: 1,
                                        color: colors.Success
                                    }]}>Your feedback has been sent.</Text>
                                    <Pressable
                                        onPress={reTest}
                                        style={[styles.button, {
                                            width: 100,
                                            backgroundColor: colors.Grey,
                                            marginTop: 200
                                        }]}
                                    >
                                        <Text style={styles.textStyle}>Re-Test</Text>
                                    </Pressable>
                                </> :
                                <View style={styles.modalView}>



                                            <View>
                                                <View>
                                                    <Text style={[styles.modalText, {fontWeight: 'bold', marginBottom: 1}]}>The
                                                        Autism
                                                        result is:</Text>
                                                    {resultResolver()}
                                                </View>
                                                {clinicResolver()}
                                            </View>






                                    <View style={styles.formView}>
                                        <InputComponent
                                            isFeedBack={true}
                                            isMulti={true}
                                            label={"Please submit your feedback"}
                                            value={feedback ?? ''}
                                            onChange={(e) => setFeedBack(e)}
                                        />

                                    </View>
                                    <View style={{marginTop: 50}}>
                                        <Pressable
                                            onPress={SendFeedBack}
                                            style={styles.feedBackButton}
                                        >
                                            <Text style={styles.textStyle}>Send feedback</Text>
                                        </Pressable>
                                        <View style={{height: 10}}/>
                                        <Pressable
                                            onPress={reTest}
                                            style={[styles.button, {
                                                width: 100,
                                                alignSelf: "center",
                                                backgroundColor: colors.Grey
                                            }]}
                                        >
                                            <Text style={styles.textStyle}>Re-Test</Text>
                                        </Pressable>
                                    </View>
                                </View>}
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        maxWidth: 400,
    },
    clinicView: {
        width: '100%',
    },
    feedBackButton: {
        backgroundColor: colors.Orange,
        padding: 5,
        borderRadius: 50,
        width: 250,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',

        fontWeight: 'bold',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,

    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: colors.Purple
    },
    clinicText: {
        color: colors.Grey,
        fontSize: fontSize.SubMedium,
        marginVertical: 5,
        fontWeight: 'bold'
    },
    modalView: {
        margin: 20,
        backgroundColor: colors.White,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        justifyContent: 'space-between',
        height: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: "#2196F3",
        width: 250
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },

    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        textAlign: "center",
        marginVertical: 25,
        fontSize: fontSize.Large,
        color: colors.Orange
    },
    formView: {
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center'
    }
});

export default ResultModal;
