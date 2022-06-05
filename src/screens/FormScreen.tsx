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
import {ResultModel} from "./FormAdultScreen";

const FormScreen = () => {
    const navigation = useNavigation()
    const [steps, setSteps] = useState(0)
    const onBack = () => {
        if (steps < 1) {
            navigation.goBack()
        } else setSteps(steps - 1)
    }
    const SubmitTest = async (data: any) => {
        axios.post('http://164.92.232.29:6969/api/asd_child', data)
            .then(function (response) {
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
                console.log(error)
            });
    };

    const [resultModal, setResultModal] = useState<ResultModel>();
    return (

        <Formik
            initialValues={{
                Age_mons: '', gender: '', Ethnicity: '', Jaundice: '', Family_mem_with_ASD: '',
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
                                <DropdownInput label={"Age in months"} value={values.Age_mons}
                                               options={months}
                                               onChange={handleChange('Age_mons')}/>
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
                                <DropdownInput label={"Family member with ASD"} value={values.Family_mem_with_ASD}
                                               options={[{label: 'Yes', value: '1'}, {label: 'No', value: '0'}]}
                                               onChange={handleChange('Family_mem_with_ASD')}/>
                            </View>
                        ),
                        1: (<SafeAreaView style={styles.container}>
                                <ScrollView>
                                    <View style={styles.formView}>
                                        <DropdownInput
                                            label={"Does your child look at you when you call his/her name?"}
                                            value={values.A1}
                                            options={firstOptions}
                                            onChange={handleChange('A1')}/>
                                        <DropdownInput
                                            label={"How easy is it for you to get eye contact with your child?"}
                                            value={values.A2}
                                            options={[{label: 'Very easy', value: '1'},
                                                {label: 'Quite easy', value: '2'},
                                                {label: 'Quite difficult', value: '3'},
                                                {label: 'Very difficult', value: '4'},
                                                {label: 'Impossible', value: '5'}]}
                                            onChange={handleChange('A2')}/>
                                        <DropdownInput
                                            label={"Does your child point to indicate that s/he wants something? (e.g. a toy that is out of reach)?"}
                                            value={values.A3}
                                            options={secondOptions}
                                            onChange={handleChange('A3')}/>
                                        <DropdownInput
                                            label={"Does your child point to share interest with you? (e.g. pointing at an interesting sight"}
                                            value={values.A4}
                                            options={secondOptions}
                                            onChange={handleChange('A4')}/>
                                        <DropdownInput
                                            label={"Does your child pretend? (e.g. care for dolls, talk on a toy phone"}
                                            value={values.A5}
                                            options={secondOptions}
                                            onChange={handleChange('A5')}/>
                                        <DropdownInput label={"Does your child follow where you’re looking?"}
                                                       value={values.A6}
                                                       options={secondOptions}
                                                       onChange={handleChange('A6')}/>
                                        <DropdownInput
                                            label={"If you or someone else in the family is visibly upset, does your child show signs of wanting to comfort them? (e.g. stroking hair, hugging them"}
                                            value={values.A7}
                                            options={firstOptions}
                                            onChange={handleChange('A7')}/>
                                        <DropdownInput label={"Would you describe your child’s first words as:"}
                                                       value={values.A8}
                                                       options={[{label: 'Very typical', value: '1'},
                                                           {label: 'Quite typical', value: '2'},
                                                           {label: 'Slightly unusual', value: '3'},
                                                           {label: 'Very unusual', value: '4'},
                                                           {label: 'Does not speak', value: '5'}
                                                       ]}
                                                       onChange={handleChange('A8')}/>
                                        <DropdownInput
                                            label={"Does your child use simple gestures? (e.g. wave goodbye)"}
                                            value={values.A9}
                                            options={secondOptions}
                                            onChange={handleChange('A9')}/>
                                        <DropdownInput
                                            label={"Does your child stare at nothing with no apparent purpose?"}
                                            value={values.A10}
                                            options={[{label: 'Always', value: '1'},
                                                {label: 'Usually', value: '2'},
                                                {label: 'Sometimes', value: '3'},
                                                {label: 'Rarely', value: '4'},
                                                {label: 'Never', value: '5'},]}
                                            onChange={handleChange('A10')}/>
                                    </View>
                                </ScrollView>
                            </SafeAreaView>
                        ),
                        2: (
                            <SafeAreaView style={styles.container}>
                                <ScrollView>
                                    <View style={[styles.formView,{marginTop:50}]}>
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
                        <TouchableOpacity onPress={(e: any) => handleSubmit(e)} style={[styles.button,{minHeight:50}]}>
                            <Text style={styles.buttonText}>
                                Finish
                            </Text>
                        </TouchableOpacity>}
                </View>
            )}
        </Formik>
    )
}
export default FormScreen


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
const firstOptions: LookupModel[] = [
    {label: 'Always', value: '1'},
    {label: 'Usually', value: '2'},
    {label: 'Sometimes', value: '3'},
    {label: 'Rarely', value: '4'},
    {label: 'Never', value: '5'},
]
const secondOptions: LookupModel[] = [
    {label: 'Many times a day', value: '1'},
    {label: 'A few times a day', value: '2'},
    {label: 'A few times a week', value: '3'},
    {label: 'Less than a once a week', value: '4'},
    {label: 'Never', value: '5'},
]
