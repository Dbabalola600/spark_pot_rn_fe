import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import AppButton from "../components/Display/AppButton";
import AppText from "../components/Display/AppText";
import AppTextField from "../components/Input/AppTextField";
import BasicBackButtonLayout from "../components/Layout/BasicBackButtonLayout";
import apptw from "../utils/lib/tailwind";
import { RootStackParamList } from "./allroutes";
import PressAppText from "../components/Display/PressAppText";
import { Controller, useForm } from "react-hook-form";
import { loginwithEmailFormType, loginwithEmailSchema } from "../services/validation/LoginVal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import userRequest from "../utils/request/userRequests";
import { authSelector, loginUser } from "../state/userSlice";
import { AppDispatch } from "../state/store";



type SignInScreen = NativeStackScreenProps<
    RootStackParamList,
    "SignIn"
>;

const SignIn = ({ navigation }: SignInScreen) => {
    const [isButtonLoading, setButtonLoading] = useState(false)
    const dispatch = useDispatch<AppDispatch>();
    const { user} = useSelector(authSelector);
    const { register, handleSubmit, watch, control, formState: { errors } } = useForm<loginwithEmailFormType>({
       
        resolver: zodResolver(loginwithEmailSchema),
    })


    const navigatetoDashBoard = () => {
        navigation.navigate("DashBoardScreen")
    }


    const navigateToSignUp = () => {
        navigation.navigate("SignUp")
    }

    useEffect(() => {
        if (user.isSuccess && !user.isLoading) {
            navigatetoDashBoard()
        }
        if (user.isError && !user.isLoading) {
            alert(user.loginErrorMessage);
        }

    }, [user.isError, user.isLoading, user.isSuccess,])

    const onSubmit = handleSubmit(async (data) => {
        // console.log(data.password)

        // const response = await userRequest.userLogin(data.userName, data.password)
        // console.log(response)


        // navigatetoDashBoard()
        setButtonLoading(true)

        const response = await dispatch(
            loginUser({ password: data.password, userName: data.userName })
        );

       
        setButtonLoading(false)
    })






    return (
        <BasicBackButtonLayout pageTitle="">
            <>
                <View>

                </View>
                <ScrollView
                    style={apptw`px-5 mt-5`}
                    contentContainerStyle={apptw.style(` justify-between`, {
                        flexGrow: 1,
                    })}
                >
                    <View>

                        <AppText
                            style={apptw`text-3xl text-center text-black`}>
                            Hello!
                        </AppText>
                        <AppText
                            style={apptw`text-lg text-center `}>
                            Please enter your information
                        </AppText>



                        <AppTextField
                            title="Username/Email"
                            control={control}
                            errorMessage={errors.userName?.message}
                            validationName="userName"
                            // onChange={}
                            placeholder="username/email"
                        />





                        <AppTextField
                            title="Password"
                            control={control}
                            validationName="password"
                            placeholder="***********"
                            isPassword={true}
                        />

                        <View>
                            <PressAppText
                                // onPress={navigatetoForgotPassword}
                                style={apptw`text-black `}
                            >
                                Forgot Password?
                            </PressAppText>
                        </View>

                        <AppButton
                            buttonStyle={apptw`  my-6`}
                            text={isButtonLoading ? "Loading..." : "Sign In"}
                            onPress={onSubmit}
                        // text="Sign In"

                        />


                    </View>
                    <View style={apptw`mb-19`}>




                        <AppText style={apptw`self-center text-zinc-400 text-[4]`}>
                            Don't have an account?{' '}


                            <PressAppText
                                onPress={navigateToSignUp}
                                style={apptw`text-primary top-[1]  `}>
                                Register
                            </PressAppText>



                        </AppText>


                    </View>
                </ScrollView>
            </>
        </BasicBackButtonLayout>
    )
}


export default SignIn;