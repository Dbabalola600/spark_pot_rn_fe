import { SafeAreaView, View, Text, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import tw from "twrnc";
import LoggedLayout from "../../components/Layout/LoggedLayout";


export default function Test() {
    return (
        <KeyboardAvoidingView
            style={tw` flex-1`}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <LoggedLayout pageTitle="testing ">
                <ScrollView
                    showsVerticalScrollIndicator={true}
                    style={tw`px-6`}
                    contentContainerStyle={tw.style(` `, {
                        flexGrow: 1
                    })}>

                    <View>
                        <Text>

                            drawer
                        </Text>
                    </View>

                </ScrollView>
            </LoggedLayout>
        </KeyboardAvoidingView>
    )
}