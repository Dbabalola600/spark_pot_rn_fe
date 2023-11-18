import { View } from "react-native";
import BasicBackButtonLayout from "../../components/Layout/BasicBackButtonLayout";
import LoggedInLayout from "../../components/Layout/LoggedLayout";
import AppText from "../../components/Display/AppText";
import SavedJournal from "./components/SavedJournal";
import PersonalJournal from "./components/PersonalJournal";
import apptw from "../../utils/lib/tailwind";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../allroutes";
import { useNavigation } from '@react-navigation/native';



type SavedJournal = NativeStackScreenProps<
    RootStackParamList,
    "JournalScreen"
>




function JournalScreen() {
    const navigation = useNavigation();

   


    return (
        <LoggedInLayout pageTitle="Journal">
            <View
            style={apptw`mb-10`}
            >

          


                <View style={apptw`justify-between px-2`}>
                    <SavedJournal />

                    <PersonalJournal />
                </View>

            </View>
        </LoggedInLayout>
    )
}


export default JournalScreen