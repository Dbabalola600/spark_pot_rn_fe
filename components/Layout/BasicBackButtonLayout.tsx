import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
    Keyboard,
    Platform,
    Pressable,
    ScrollView,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import apptw from "../../utils/lib/tailwind";
import AppText from "../Display/AppText";



type BasicBackButtonLayoutProp = {
    children: React.ReactNode;
    pageTitle:string
};

const BasicBackButtonLayout = ({ children, pageTitle }: BasicBackButtonLayoutProp) => {
    const navigation = useNavigation();

    return (
        <TouchableWithoutFeedback
            onPress={() => (Platform.OS != "web" ? Keyboard.dismiss() : null)}
        >
            <ScrollView
                style={apptw`bg-white   flex-1 shadow-md pt-10`}
                // edges={["top", "left", "right"]}
            >
                <Pressable onPress={() => navigation.goBack()} 
                style={apptw`px-2 py-2 `}
                >
                    <MaterialIcons
                        name="keyboard-arrow-left"
                        size={40}
                        style={tw`bg-`}
                        color="black"
                    />

                    <View>
                        <AppText style={apptw` bottom-10 text-2xl text-center`}>
                          {pageTitle}
                        </AppText>
                    </View>
                </Pressable>



                {children}
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

export default BasicBackButtonLayout;
