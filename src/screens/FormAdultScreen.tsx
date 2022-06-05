import {Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {colors} from "../constants/Colors";
import {fontSize} from "../constants/FontSize";
import React, {useState} from "react";
import {Formik} from 'formik';
import DropdownInput from "../components/DropdownInput";
import {LookupModel} from "../models/LookupModel";
import {Ionicons} from '@expo/vector-icons';
import InputComponent from "../components/TextInputComponent";
import axios from "axios";
import ResultModal from "../components/ResultModal";

const FormAdultScreen = () => {
    const navigation = useNavigation()
    const [steps, setSteps] = useState(0)
    const onBack = () => {
        if (steps < 1) {
            navigation.goBack()
        } else setSteps(steps - 1)
    }
    const SubmitTest = async (data: any) => {
        axios.post('http://164.92.232.29:6969/api/asd_adult', data)
            .then(function (response) {
                console.log(response)
                if (response.status == 200) {
                    setResultModal({
                        result: Number(response.data.result),
                        percentage: Number(response.data.percentage),
                        clinic_phone_number: response.data.clinic_phone_number,
                        clinic_email: response.data.clinic_email,
                        clinic_name: response.data.clinic_name,
                        clinic_location: response.data.clinic_location
                    })
                } else Alert.alert(
                    "Fields are required",
                    "You are missing one or more field.",
                    [
                        {text: "OK", onPress: () => console.log("OK Pressed")}
                    ]
                );
            })
            .catch(function (error) {
                console.log(error.response.data)
            });
    };

    const [resultModal, setResultModal] = useState<ResultModel>();
    console.log('adult')

    return (

        <Formik
            initialValues={{
                A1: '',
                A2: '',
                A3: '',
                A4: '',
                A5: '',
                A6: '',
                A7: '',
                A8: '',
                A9: '',
                A10: '',
                age: '',
                gender: '',
                Ethnicity: '',
                Jaundice: '',
                Who_completed_the_test: '',
                Why_are_you_taken_the_screening: '',
                user: null,
                class_variable: " ",
                percentage: " "
            }}
            onSubmit={values => SubmitTest(values)}
        >
            {({handleChange, handleBlur, handleSubmit, values}) => (
                <View style={styles.container}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: 10
                    }}>
                        {/*@ts-ignore*/}
                        <Ionicons onPress={onBack} name="arrow-back" size={24} color="black"/>
                        <Text style={styles.descriptionText}>
                            {steps == 0 ? "General questions" : steps == 1 ? "Depth questions" : "Feedback questions"}
                        </Text>

                        <Text style={styles.descriptionText}>

                        </Text>
                    </View>
                    {
                        (resultModal?.result && resultModal?.percentage) &&
                        <ResultModal resultData={resultModal}/>}
                    {{
                        0: (
                            <View style={styles.formView}>
                                <InputComponent
                                    numberType={true}
                                    label={"Age"}
                                    value={values.age}
                                    onChange={handleChange('age')}
                                />
                                <DropdownInput label={"Gender"} value={values.gender}
                                               options={[{label: 'Female', value: '0'}, {
                                                   label: 'Male',
                                                   value: '1'
                                               }]}
                                               onChange={handleChange('gender')}/>
                                <DropdownInput label={"Ethnicity"} value={values.Ethnicity}
                                               options={Ethnicities}
                                               onChange={handleChange('Ethnicity')}/>
                                <DropdownInput label={"Jaundice"} value={values.Jaundice}
                                               options={[{label: 'Yes', value: 'yes'}, {label: 'No', value: 'no'}]}
                                               onChange={handleChange('Jaundice')}/>
                            </View>
                        ),
                        1: (<SafeAreaView style={styles.container}>
                                <ScrollView>
                                    <View style={styles.formView}>
                                        <DropdownInput
                                            label={"I often notice small sounds when others do not"}
                                            value={values.A1}
                                            options={options}
                                            onChange={handleChange('A1')}/>
                                        <DropdownInput
                                            label={"I usually concentrate more on the whole picture, rather than the small details"}
                                            value={values.A2}
                                            options={options}
                                            onChange={handleChange('A2')}/>
                                        <DropdownInput
                                            label={"I find it easy to do more than one thing at once"}
                                            value={values.A3}
                                            options={options}
                                            onChange={handleChange('A3')}/>
                                        <DropdownInput
                                            label={"If there is an interruption, I can switch back to what I was doing very quickly"}
                                            value={values.A4}
                                            options={options}
                                            onChange={handleChange('A4')}/>
                                        <DropdownInput
                                            label={"I find it easy to ‘read between the lines’ when someone is talking to me"}
                                            value={values.A5}
                                            options={options}
                                            onChange={handleChange('A5')}/>
                                        <DropdownInput
                                            label={"I know how to tell if someone listening to me is getting bored"}
                                            value={values.A6}
                                            options={options}
                                            onChange={handleChange('A6')}/>
                                        <DropdownInput
                                            label={"When I’m reading a story I find it difficult to work out the characters’ intentions"}
                                            value={values.A7}
                                            options={options}
                                            onChange={handleChange('A7')}/>
                                        <DropdownInput
                                            label={"I like to collect information about categories of things (e.g. types of car, types of bird, types of train, types of plant etc) "}
                                            value={values.A8}
                                            options={options}
                                            onChange={handleChange('A8')}/>
                                        <DropdownInput
                                            label={"I find it easy to work out what someone is thinking or feeling just by looking at their face"}
                                            value={values.A9}
                                            options={options}
                                            onChange={handleChange('A9')}/>
                                        <DropdownInput
                                            label={"I find it difficult to work out people’s intentions"}
                                            value={values.A10}
                                            options={options}
                                            onChange={handleChange('A10')}/>
                                    </View>
                                </ScrollView>
                            </SafeAreaView>
                        ),
                        2: (
                            <SafeAreaView style={styles.container}>
                                <ScrollView>
                                    <View style={[styles.formView, {marginTop: 50}]}>
                                        <InputComponent
                                            isMulti={true}
                                            label={"Who completed the test?"}
                                            value={values.Who_completed_the_test}
                                            onChange={handleChange('Who_completed_the_test')}
                                        />
                                        <View style={{height: 50}}/>
                                        <InputComponent
                                            isMulti={true}
                                            label={"Why are you taking the screening?"}
                                            value={values.Why_are_you_taken_the_screening}
                                            onChange={handleChange('Why_are_you_taken_the_screening')}
                                        />
                                    </View>
                                </ScrollView>
                            </SafeAreaView>
                        )
                    }[steps] || <></>}
                    {steps < 2 ? <TouchableOpacity onPress={(e: any) => setSteps(steps + 1)} style={styles.button}>
                            <Text style={styles.buttonText}>
                                Next
                            </Text>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={(e: any) => handleSubmit(e)}
                                          style={[styles.button, {minHeight: 50}]}>
                            <Text style={styles.buttonText}>
                                Finish
                            </Text>
                        </TouchableOpacity>}
                </View>
            )}
        </Formik>
    )
}
export default FormAdultScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.Purple,
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
    buttonText: {
        fontSize: fontSize.Medium,
        color: colors.White
    },
    descriptionText: {
        fontSize: fontSize.Large,
        color: colors.Grey,
        textAlign: "center",
        fontWeight: 'bold'

    },
    formView: {
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center'
    },
    inputView: {
        justifyContent: 'center',
        width: '100%',
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
        padding: 12
    }
});
const months: LookupModel[] = [
    {label: "1 Month", value: "1"},
    {label: "2 Months", value: "2"},
    {label: "3 Months", value: "3"},
    {label: "4 Months", value: "4"},
    {label: "5 Months", value: "5"},
    {label: "6 Months", value: "6"},
    {label: "7 Months", value: "7"},
    {label: "8 Months", value: "8"},
    {label: "9 Months", value: "9"},
    {label: "10 Months", value: "10"},
    {label: "11 Months", value: "11"},
    {label: "12 Months", value: "12"},
    {label: "13 Months", value: "13"},
    {label: "14 Months", value: "14"},
    {label: "15 Months", value: "15"},
    {label: "16 Months", value: "16"},
    {label: "17 Months", value: "17"},
    {label: "18 Months", value: "18"},
]
const Ethnicities: LookupModel[] = [
    {label: "Middle eastern", value: "0"},
    {label: "White European", value: "1"},
    {label: "Hispanic", value: "2"},
    {label: "Black", value: "3"},
    {label: "Asian", value: "4"},
    {label: "South asian", value: "5"},
    {label: "Native Indian", value: "6"},
    {label: "Others", value: "7"},
    {label: "Latino", value: "8"},
    {label: "Mixed", value: "9"},
    {label: "Pacifica", value: "10"},
]
const options: LookupModel[] = [
    {label: 'Definitely Agree', value: '1'},
    {label: 'Slightly Agree', value: '2'},
    {label: 'Slightly Disagree', value: '3'},
    {label: 'Definitely Disagree', value: '4'},
]
export type ResultModel = {
    result: number,
    percentage: number,
    clinic_email?: string,
    clinic_location?: string,
    clinic_name?: string,
    clinic_phone_number?: string
}
