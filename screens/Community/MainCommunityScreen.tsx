import { View } from "react-native";
import LoggedInLayout from "../../components/Layout/LoggedLayout";
import AppText from "../../components/Display/AppText";



function MainCommunityScreen(){
    return(
        <LoggedInLayout pageTitle="">
            <View>
                <AppText>

                MainCommunityScreen
                </AppText>
            </View>
        </LoggedInLayout>
    )
}

export default MainCommunityScreen