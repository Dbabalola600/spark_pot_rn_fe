import React from "react";
import { GestureResponderEvent, Pressable, View,Image } from "react-native";
import tw from "twrnc";
import apptw from "../../../utils/lib/tailwind";
import AppText from "../AppText";



type BasicNoteProps = {
    desciption: any
    image: any
    onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
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
                    } bg-textField w-full h-50  rounded-lg `,
                    // props?.buttonStyle
                )
            }

            onPress={props.onPress}
        >




                <Image
                   style={apptw`rounded-sm w-full h-25`}
                source={{ uri: `${props.image}`}}
                />
               
           



            <AppText style={apptw`text-center`}>
                {props.desciption}
            </AppText>

        </Pressable>
        // {/* </View> */}

    )
}

export default BasicNoteDisplay