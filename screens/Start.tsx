import { SafeAreaView, View, Text, StyleSheet, ScrollView } from "react-native";
import { RootStackParamList } from "./allroutes";
import React from "react";
import AppButton from "../components/Display/AppButton";
import apptw from "../utils/lib/tailwind";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import BasicLayout from "../components/Layout/BasicLayout";
import AppText from "../components/Display/AppText";
// import { ScrollView } from "react-native-gesture-handler";


type StartProps = NativeStackScreenProps<RootStackParamList, "Start">
const Start = ({ navigation }: StartProps) => {
    const navigatetoLogin = () => {
        navigation.navigate("SignIn")
    }

    const navigatetoSignUp = () => {
        navigation.navigate("SignUp")
    }
    return (
        <BasicLayout>
            <View
            style={apptw`py-30 px-3`}
            >
                <AppText
                
                >
                    h
                </AppText>
            </View>
            <ScrollView style={apptw`px-5`}>



                <AppButton
                    text="Sign In"
                    buttonStyle={apptw.style("  bg-primary mb-5")}
                    onPress={navigatetoLogin}

                />

                <AppButton
                    text="Sign Up"
                    buttonStyle={apptw.style("border border-black bg-transparent")}
                    onPress={navigatetoSignUp}
                    textStyle={apptw`text-black`}
                />
            </ScrollView>
        </BasicLayout>
    )
}

export default Start 