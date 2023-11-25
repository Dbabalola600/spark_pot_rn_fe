import { View } from "react-native";
import LoggedInLayout from "../../components/Layout/LoggedLayout";
import AppText from "../../components/Display/AppText";
import SearchBar from "../../components/Input/SearchBar";



function MainCommunityScreen(){
    return(
        <LoggedInLayout pageTitle="">
            <View>
                


            <SearchBar />

            </View>
        </LoggedInLayout>
    )
}

export default MainCommunityScreen