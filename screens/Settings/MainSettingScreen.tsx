import { View } from "react-native";
import BasicBackButtonLayout from "../../components/Layout/BasicBackButtonLayout";
import AppText from "../../components/Display/AppText";



function MainSettingsScreen(){
    return(
        <BasicBackButtonLayout pageTitle="Settings">
            <View>

                <AppText>
                    Settings
                </AppText>
            </View>
        </BasicBackButtonLayout>
    )
}

export default MainSettingsScreen


