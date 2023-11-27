import { useNavigation } from "@react-navigation/native";
import { Keyboard, Platform, Pressable, SafeAreaView, TouchableWithoutFeedback, View, Text, ScrollView } from "react-native";
import tw from "twrnc";
import { AntDesign, Feather, SimpleLineIcons } from "@expo/vector-icons"
import apptw from "../../utils/lib/tailwind";
import { RootStackParamList } from "../../screens/allroutes"
import AppText from "../Display/AppText";



type LoggedInLayoutProp = {
    children: React.ReactNode,
    pageTitle:string
};

  

const LoggedInLayout = ({ children,pageTitle }: LoggedInLayoutProp) => {
    const navigation = useNavigation();



    const navigatetoSettings = () => {
        navigation.navigate("MainSettingsScreen")
    }


    return (
        <TouchableWithoutFeedback
            onPress={() => (Platform.OS != "web" ? Keyboard.dismiss() : null)}
            // style={apptw`bg-white mb-5`}
        >

            <ScrollView
                style={apptw.style(`bg-white  flex-1 shadow-md py-6 pt-10 pb-5 `)}
                contentContainerStyle={apptw`flex-grow`}

            // edges={["top", "left", "right", "bottom"]}
            >

                <View style={tw`flex-row justify-between py-4 px-6`} >

                    {/* <Pressable onPress={() => navigation.toggleDrawer()} style={tw.style("",)}>
                        <SimpleLineIcons
                            name="menu"
                            size={20}
                            style={tw`bg-white`}
                            color="black"
                        />
                    </Pressable> */}

                    <View>
                        <AppText style={apptw`  text-2xl text-center`}>
                          {pageTitle}
                        </AppText>
                    </View>

                    <Pressable
                        onPress={navigatetoSettings}
                        style={tw.style("",)}>
                        <Feather
                            name="settings"
                            size={20}
                            style={tw`bg-white`}
                            color="black"
                        />
                    </Pressable>

                </View>


                {children}
            </ScrollView>
        </TouchableWithoutFeedback>
    )



}

export default LoggedInLayout;