import { SafeAreaView, View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { RootStackParamList } from "./allroutes";
import React from "react";
import AppButton from "../components/Display/AppButton";
import apptw from "../utils/lib/tailwind";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import BasicLayout from "../components/Layout/BasicLayout";
import AppText from "../components/Display/AppText";
import { authSelector } from "../state/userSlice";
import { useSelector } from "react-redux";
// import { ScrollView } from "react-native-gesture-handler";


type StartProps = NativeStackScreenProps<RootStackParamList, "Start">
const Start = ({ navigation }: StartProps) => {
    const navigatetoLogin = () => {
        navigation.navigate("SignIn")
    }

    const navigatetoSignUp = () => {
        navigation.navigate("SignUp")
    }




    const { user} = useSelector(authSelector);


    // console.log(user._id)


    if(user._id !== ""){
       navigation.navigate("DashBoardScreen")
    }else{
        return (
            <BasicLayout>
    
                <ScrollView style={apptw`px-5 py-50`}>
                    <View
                        style={apptw`bg-gray-400 my-20 rounded-full h-50 w-50 mx-auto py-4 `}
                    >
                        <Image
                            source={require("../assets/logo/logo_long.png")}
                            style={apptw`rounded-sm w-50 h-50 mx-auto  `}
                        />
                    </View>
    
    
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
    
}

export default Start 