import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { ScrollView, View, Pressable, Image } from "react-native";
import AppButton from "../components/Display/AppButton";
import AppText from "../components/Display/AppText";
import PressAppText from "../components/Display/PressAppText";
import AppTextField from "../components/Input/AppTextField";
import BasicBackButtonLayout from "../components/Layout/BasicBackButtonLayout";
import apptw from "../utils/lib/tailwind";
import { RootStackParamList } from "./allroutes";
import tw from "twrnc"
import { Checkbox } from "expo-checkbox";

import { CreateYourAccountFormType, createYourAccountSchema } from "../services/validation/createAccountVal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import userRequest from "../utils/request/userRequests";

type SignUpScreen = NativeStackScreenProps<
    RootStackParamList,
    "SignUp"
>;

const SignUp = ({ navigation }: SignUpScreen) => {
    const [isButtonLoading, setButtonLoading] = useState(false)
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<CreateYourAccountFormType>({
        resolver: zodResolver(createYourAccountSchema)
    })

    // const dispatch = useDispatch<AppDispatch>();

   


    const onSubmit = handleSubmit(async (data) => {
        console.log(data)


        setButtonLoading(true)
        await userRequest.createAccount(data.userName,
            data.password, data.fName,
            data.lName, data.email).then(res => {
                if (res.status === 256) {
                    console.log("account exists")
                } if (res.status === 200) {
                    navigation.navigate("SignIn")
                    console.log("sucess")
                 
                } else {
                    console.log("unknown error")
                }
            })



        setButtonLoading(false)
    })



    const navigateToSignIn = () => {
        navigation.navigate("SignIn")
    }


    return (
        <BasicBackButtonLayout pageTitle="Register Account">
            <ScrollView
                style={tw`px-5 `}
                contentContainerStyle={tw.style(` justify-between`, {
                    flexGrow: 1,
                })}
            >
                <View
                    style={apptw``}
                >
                    <AppText
                        style={apptw`text-lg text-center  pb-5`}>
                        Fill your details or continue with
                        social media
                    </AppText>




                    <AppTextField
                        title="Firstname"
                        validationName="fName"
                        control={control}
                        errorMessage={errors.fName?.message}
                        placeholder="Firstname"
                    />

                    <AppTextField
                        title="Lastname"
                        validationName="lName"
                        control={control}
                        errorMessage={errors.lName?.message}
                        placeholder="Lastname"
                    />


                    <AppTextField
                        title="Username"
                        control={control}
                        errorMessage={errors.userName?.message}
                        validationName="userName"
                        // onChange={}
                        placeholder="username"
                    />


                    <AppTextField
                        title="Email"
                        validationName="email"
                        errorMessage={errors.email?.message}
                        control={control}
                        keyboardType="email-address"
                        placeholder="example@gmail.com"
                    />

                    <AppTextField
                        title="Password"
                        validationName="password"
                        control={control}
                        errorMessage={errors.password?.message}
                        placeholder="***********"
                        isPassword={true}
                    />




                </View>





                <View style={apptw`mb-19 px-5`}>

                    <AppButton
                        buttonStyle={apptw`  my-6`}
                        text={isButtonLoading ? "Loading..." : "Create Account"}
                        onPress={onSubmit}

                    // text="Create Account"
                    />

                    <AppText style={apptw`self-center text-zinc-400 text-[4]`}>
                        Already have an account?{' '}


                        <PressAppText
                            onPress={navigateToSignIn}
                            style={apptw`text-primary top-[1]  `}>
                            Sign In
                        </PressAppText>



                    </AppText>


                </View>
            </ScrollView>



        </BasicBackButtonLayout>
    )
}

export default SignUp