import tw from "twrnc"
import apptw from "../../utils/lib/tailwind"
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";


type BasicLayoutProp = {
    children: React.ReactNode;
};



const BasicLayout = ({children}: BasicLayoutProp)=>{
    const navigation = useNavigation();

    return(
        <SafeAreaView
        style={apptw`bg-secondary   flex-1 shadow-md`}
        >

            {children}
        </SafeAreaView>
    )
}

export default BasicLayout