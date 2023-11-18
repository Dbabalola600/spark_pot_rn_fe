import { View } from "react-native";
import LoggedInLayout from "../../components/Layout/LoggedLayout";
import AppText from "../../components/Display/AppText";




function MainSearchScreen(){
    return(
        <LoggedInLayout  pageTitle="" >
            <View>
                

                <AppText>
                    Main Search
                </AppText>
            </View>
        </LoggedInLayout>
    )
}


export default MainSearchScreen