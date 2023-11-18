import { View } from "react-native";
import AppText from "../../../components/Display/AppText";
import { useNavigation } from "@react-navigation/native";
import apptw from "../../../utils/lib/tailwind";
import PressAppText from "../../../components/Display/PressAppText";
import BasicNoteDisplay from "../../../components/Display/Notes/BasicNoteDisplay";
import { FlatGrid } from "react-native-super-grid";





export default function PersonalJournal() {

    const navigation = useNavigation();

    const navigatetoPersonalScreen = () => {
        navigation.navigate("PersonalJournalScreen")
    }
    return (
        <View>



            <View
                style={apptw`justify-between flex-row`}
            >
                <AppText
                    style={apptw`underline text-primary`}
                >
                    Personal Journal
                </AppText>


                <PressAppText
                    onPress={navigatetoPersonalScreen}
                    style={apptw`text-green-500`}
                >
                    View All
                </PressAppText>

            </View>
            

            <FlatGrid
                // itemDimension={150}
                data={[1, 2, 3,4]}
                renderItem={({ item }) => (<BasicNoteDisplay />   )}
            />
        </View>
    )
}