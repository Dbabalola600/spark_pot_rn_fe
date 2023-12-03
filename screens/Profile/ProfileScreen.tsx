import { SafeAreaView, View, Text, KeyboardAvoidingView, Platform, ScrollView, Image } from "react-native";
import tw from "twrnc";
import LoggedLayout from "../../components/Layout/LoggedLayout";
import BasicBackButtonLayout from "../../components/Layout/BasicBackButtonLayout";
import { Ionicons } from '@expo/vector-icons';
import apptw from "../../utils/lib/tailwind";
import { useSelector } from "react-redux";
import { authSelector } from "../../state/userSlice";
import AppText from "../../components/Display/AppText";
import PressAppText from "../../components/Display/PressAppText";
import { AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import * as Clipboard from 'expo-clipboard';
import { useState, useEffect } from "react";
import { SecureStorage } from "../../services/singleton/secureStorage";





export default function ProfileScreen() {
    // const { user } = useSelector(authSelector);
    // console.log(user.image)
    const [user, Setuser] = useState<any>([]);


    const showinfo = async () => {
        const userId = await SecureStorage.getInst().getValueFor("userId");
        const fName = await SecureStorage.getInst().getValueFor("fName");
        const lName = await SecureStorage.getInst().getValueFor("lName");
        const email = await SecureStorage.getInst().getValueFor("email");
        const userName = await SecureStorage.getInst().getValueFor("userName");
        const image = await SecureStorage.getInst().getValueFor("image");
       
        Setuser({
            userid: userId,
            userName: userName,
            fName: fName,
            lName: lName,
            email: email,
            image:image 
        });

        console.log(user)
    }


    useEffect(() => {
        showinfo()
    }, [])








    const ClipboardText = `https://mood-pop.vercel.app/Users/${user?.userName}`


    const copyBoard = () => {
        Clipboard.setStringAsync(ClipboardText);

        Toast.show({

            type: 'success',
            text1: 'Copied Sucessfully',
            // text2: 'iwoiovw'
        });

    }

    const navigatetoFirstnameEdit = () => {
        console.log("edit fname")
    }

    const navigatetoLastnameEdit = () => {
        console.log("edit lname")
    }

    const navigatetoEmailEdit = () => {
        console.log("edit email")
    }

    const navigatetoUsernameEdit = () => {
        console.log("edit username")
    }




    return (

        <BasicBackButtonLayout pageTitle="Profile Info">
            <ScrollView
                showsVerticalScrollIndicator={true}
                style={tw`px-6`}
                contentContainerStyle={tw.style(` `, {
                    flexGrow: 1
                })}>

                <View
                    style={apptw`bg-white mx-auto rounded-full p-5 `}
                >
                    {user?.image === "" ? (
                        <Ionicons
                            name="md-person-outline"
                            size={120}
                            color="#BC4B52"
                        />
                    ) : (
                        <Image
                            style={apptw`rounded-full w-50 h-50`}
                            // height={5}
                            source={{ uri: `${user?.image}` }}
                        />
                    )}
                </View>

                <View
                    style={apptw`text-center mb-4`}
                >


                    <AppText style={apptw`text-center`}>
                        Following:0

                        <AppText style={apptw`text-center`}>
                            {" "}Followers:0
                        </AppText>
                    </AppText>

                </View>




                <View
                    style={apptw`mb-5`}
                >
                    <View
                        style={apptw`justify-between flex-row`}
                    >

                        <AppText
                            style={apptw`font-bold`}
                        >
                            Username


                        </AppText>

                        {/* <PressAppText
                            style={apptw`font-bold`}
                            onPress={navigatetoUsernameEdit}
                        >

                            <AntDesign name="edit" size={24} color="black" />

                        </PressAppText> */}


                    </View>

                    <View
                        style={apptw`font-bold bg-gray-100 rounded-full px-5 py-2 mt-2`}
                    >
                        <AppText
                        >
                            {user?.userName}
                        </AppText>
                    </View>
                </View>




                <View
                    style={apptw`mb-5`}
                >
                    <View
                        style={apptw`justify-between flex-row`}
                    >

                        <AppText
                            style={apptw`font-bold`}
                        >
                            Firstname


                        </AppText>

                        {/* <PressAppText
                            style={apptw`font-bold`}

                            onPress={navigatetoFirstnameEdit}
                        >

                            <AntDesign name="edit" size={24} color="black" />

                        </PressAppText> */}


                    </View>
                    <View
                        style={apptw`font-bold bg-gray-100 rounded-full px-5 py-2 mt-2`}
                    >
                        <AppText
                        >
                            {user?.fName}
                        </AppText>
                    </View>
                </View>




                <View
                    style={apptw`mb-5`}
                >
                    <View
                        style={apptw`justify-between flex-row`}
                    >

                        <AppText
                            style={apptw`font-bold`}


                        >
                            Lastname


                        </AppText>

                        {/* <PressAppText
                            style={apptw`font-bold`}
                            onPress={navigatetoLastnameEdit}
                        >

                            <AntDesign name="edit" size={24} color="black" />

                        </PressAppText> */}


                    </View>
                    <View
                        style={apptw`font-bold bg-gray-100 rounded-full px-5 py-2 mt-2`}
                    >
                        <AppText
                        >
                            {user?.lName}
                        </AppText>
                    </View>
                </View>



                <View
                    style={apptw`mb-5`}
                >
                    <View
                        style={apptw`justify-between flex-row`}
                    >

                        <AppText
                            style={apptw`font-bold`}
                        >
                            Email


                        </AppText>

                        {/* <PressAppText
                            style={apptw`font-bold`}
                            onPress={navigatetoEmailEdit}
                        >

                            <AntDesign name="edit" size={24} color="black" />

                        </PressAppText> */}


                    </View>
                    <View
                        style={apptw`font-bold bg-gray-100 rounded-full px-5 py-2 mt-2`}
                    >
                        <AppText

                        >
                            {user?.email}
                        </AppText>
                    </View>
                </View>




                {/* <View
                    style={apptw`mb-5`}
                >
                    <AppText
                        style={apptw`font-bold`}
                    >
                        Link
                    </AppText>
                    <View
                        style={apptw`font-bold bg-white rounded-full px-5 py-2 mt-2`}
                    >
                        <PressAppText
                            onPress={copyBoard}
                        >
                            https://mood-pop.vercel.app/Users/{user?.userName}
                        </PressAppText>
                    </View>
                </View> */}


            </ScrollView>
        </BasicBackButtonLayout>

    )
}