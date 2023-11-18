import React from "react";
import { GestureResponderEvent, Pressable, View } from "react-native";
import tw from "twrnc";
import apptw from "../../../utils/lib/tailwind";
import AppText from "../AppText";



type BasicNoteProps = {

}

const BasicNoteDisplay = (props: BasicNoteProps) => {

    const pressed = () => {
        console.log("pressed")
    }
    return (

        // <View
        //     style={apptw`mb-2`}
        // >
            <Pressable
                style={({ pressed }) =>
                    apptw.style(
                        `${pressed ? "bg-opacity-75" : "bg-opacity-100"
                        } bg-textField w-full h-50 py-4 rounded-lg `,
                        // props?.buttonStyle
                    )
                }

                onPress={pressed}
            >

                <AppText style={apptw`text-center`}>
                    HERE
                </AppText>

            </Pressable>
        // {/* </View> */}

    )
}

export default BasicNoteDisplay