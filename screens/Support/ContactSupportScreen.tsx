import { ScrollView, View } from "react-native";
import BasicBackButtonLayout from "../../components/Layout/BasicBackButtonLayout";
import AppText from "../../components/Display/AppText";
import apptw from "../../utils/lib/tailwind";
import AppTextField from "../../components/Input/AppTextField";
import LargeTextField from "../../components/Input/LargeTextField";
import AppButton from "../../components/Display/AppButton";




function ContactSupportScreen() {
    return (
        <BasicBackButtonLayout pageTitle="Contact support">

            {/* <AppText style={apptw`left-32 bottom-10 text-2xl`}>
                Contact support
            </AppText> */}


            <ScrollView
                style={apptw`flex-1`}
                contentContainerStyle={apptw`flex-grow`}
            >
                <AppText style={apptw`text-center mx-5 `}>
                    Leave us a message and we'll be sure to get back to you
                </AppText>


                <View style={apptw`px-2`}>

                    <AppTextField
                        title="Title"
                        placeholder="Give your message a title"
                    />

                    <LargeTextField
                        title="Content"
                        placeholder="Give more details"
                    />

                </View>


                <View style={apptw`mb-19 px-6`}>

                    <AppButton
                        text="Submit"
                    />
                </View>


            </ScrollView>
        </BasicBackButtonLayout>
    )
}

export default ContactSupportScreen