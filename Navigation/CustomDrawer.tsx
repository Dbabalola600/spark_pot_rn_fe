import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { View, Text, ImageBackground, Image, Pressable } from "react-native";
import AppText from "../components/Display/AppText";
import apptw from "../utils/lib/tailwind";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { authSelector } from "../state/userSlice";

export default function CustomDrawer(props: any) {

    const navigation = useNavigation()
    const { user } = useSelector(authSelector);
    return (
        <DrawerContentScrollView
            contentContainerStyle={{
                // paddingBottom: 40,
                // paddingTop: 90,
                backgroundColor: "white",
                flex: 1,
                // justifyContent: "space-between"
            }}
            {...props}
        >


            <View
                style={apptw` mx-5 `}
            >
                <AppText
                    style={apptw`text-5 text- `}
                >
                    Welcome {user.userName}
                </AppText>
                {/* <AppText
                    style={apptw`text-3 text- `}
                >
                    What do you want today?
                </AppText> */}

                <View
                    style={apptw`bg-textField mx-auto rounded-full px-5 py-5 my-10`}
                >
                    {user?.image === "" ? (
                        <Ionicons
                            name="md-person-outline"
                            size={120}
                            color="#BC4B52"
                        />
                    ) : (
                        <Image
                            style={apptw`rounded-full w-50 h-50`}
                            // height={5}
                            source={{ uri: `${user?.image}` }}
                        />
                    )}
                </View>
            </View>





            <View
            >
                <DrawerItemList {...props} />
            </View>
            <View
            style={apptw`mt-20`}
            >

                <Pressable
                    onPress={() => navigation.navigate("SignIn")}
                    style={apptw`bg-transparent flex-row px-5 pt-5`}
                >
                    <SimpleLineIcons name="logout" size={24} color="black" />
                    <AppText
                        style={apptw`mx-10`}
                    >
                        Logout
                    </AppText>
                </Pressable>

            </View>



        </DrawerContentScrollView>
    )
}