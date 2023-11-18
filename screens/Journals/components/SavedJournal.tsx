import { View } from "react-native";
import AppText from "../../../components/Display/AppText";
import PressAppText from "../../../components/Display/PressAppText";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../allroutes";
import { useNavigation } from '@react-navigation/native';
import apptw from "../../../utils/lib/tailwind";
import { FlatGrid } from "react-native-super-grid";
import BasicNoteDisplay from "../../../components/Display/Notes/BasicNoteDisplay";

type SavedJournal = NativeStackScreenProps<
    RootStackParamList,
    "JournalScreen"
>


export default function SavedJournal() {
    const navigation = useNavigation();

    const navigatetoSavedScreen = () => {
        navigation.navigate("SavedJournalScreen")
    }


    return (
        <>

            <View
                style={apptw`justify-between flex-row`}
            >
                <AppText
                    style={apptw`underline text-primary`}
                >
                    Saved Journal
                </AppText>


                <PressAppText
                    onPress={navigatetoSavedScreen}
                    style={apptw`text-green-500`}
                >
                    View All
                </PressAppText>

            </View>

            <FlatGrid
                // itemDimension={150}
                data={[1, 2, 3,4]}
                renderItem={({ item }) => (<BasicNoteDisplay />)}
            />
        </>
    )
}