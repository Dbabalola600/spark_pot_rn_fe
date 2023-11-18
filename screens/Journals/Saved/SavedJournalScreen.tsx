import { View } from "react-native";
import BasicBackButtonLayout from "../../../components/Layout/BasicBackButtonLayout";
import AppText from "../../../components/Display/AppText";





export default function SavedJournalScreen(){
    return(
        <BasicBackButtonLayout pageTitle="Saved Journal">

            <View>
                <AppText>
                SavedJournalScreen
                </AppText>
            </View>
        </BasicBackButtonLayout>
    )
}