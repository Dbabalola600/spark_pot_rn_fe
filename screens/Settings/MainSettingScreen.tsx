import { View } from "react-native";
import BasicBackButtonLayout from "../../components/Layout/BasicBackButtonLayout";
import AppText from "../../components/Display/AppText";
import AppButton from "../../components/Display/AppButton";
import apptw from "../../utils/lib/tailwind";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../allroutes";
import { SecureStorage } from "../../services/singleton/secureStorage";




type MainSettingsProps = NativeStackScreenProps<RootStackParamList, "MainSettingsScreen">

function MainSettingsScreen({ navigation }: MainSettingsProps) {






    const navigatetoProfile = () => {
        navigation.navigate("ProfileScreen")
    }


    const navigatetoSupport = () => {
        navigation.navigate("ContactSupportScreen")
    }


    const navigatetoUpdatePassword = () => {
        navigation.navigate("UpdatePaswordScreen")
    }


    const loggedOut = () => {
        SecureStorage.getInst().clearAll()
        navigation.navigate("Start")

    }
    return (
        <BasicBackButtonLayout pageTitle="Settings">

            <AppText
                style={apptw`text-center text-xl`}
            >
                Let's figure some things out
            </AppText>
            <View
                style={apptw`px-5 gap-y-10 mt-30`}
            >




                <AppButton
                    text="Profile"
                    onPress={navigatetoProfile}
                />

                <AppButton
                    text="Contact Support"
                    onPress={navigatetoSupport}
                />


                <AppButton
                    text="Update Password"
                    onPress={navigatetoUpdatePassword}
                />

                <AppButton
                    text="Log Out"
                    onPress={loggedOut}
                />



            </View>
        </BasicBackButtonLayout>
    )
}

export default MainSettingsScreen


