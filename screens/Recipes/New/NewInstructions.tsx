import { TextInput, View } from "react-native"
import BasicBackButtonLayout from "../../../components/Layout/BasicBackButtonLayout"
import { RootStackParamList } from "../../allroutes"
import { RouteProp } from "@react-navigation/native"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import apptw from "../../../utils/lib/tailwind"
import AppButton from "../../../components/Display/AppButton"




type NewInstructionsScreenProps = RouteProp<RootStackParamList, "NewInstructions">

type Props = {
    route: NewInstructionsScreenProps
}
const NewInstructions: React.FC<Props> = ({ route }) => {
    const [counter, setCounter] = useState(1)
    const [instructions, setInstructions] = useState<string[]>(['']);
    const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm()



    const Increase = () => {
        setCounter(counter + 1)
        setInstructions([...instructions, '']);
    }

    const decreaseCounter = () => {
        if (counter > 1) {
            setCounter(counter - 1);
            setInstructions((prevInstructions) => {
                const newInstructions = [...prevInstructions];
                newInstructions.pop(); // Remove the last item
                return newInstructions;
            });
            setValue(`instructions[${counter - 1}]`, ''); // Clear the value of the previous TextInput
        }
    };



    const gotoInstructions = handleSubmit(async (data) => {



        const newInfo = route.params.reqData

        const oldInd = data.instructions
        const filteredInd = oldInd.filter((instruction: any) => instruction.trim() !== '');

        const instructions = {
            instructions: filteredInd
        }
        Object.assign(newInfo, instructions)

        console.log(newInfo)
    })

    return (
        <BasicBackButtonLayout pageTitle="Instructions">
            <View
                style={apptw`px-4`}
            >


                {instructions.map((instruction, index) => (
                    <Controller
                        key={index}
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                style={apptw`bg-textField h-18 rounded-md px-3 mt-3`}
                                onChangeText={(text) => {
                                    setValue(`instructions[${index}]`, text);
                                    field.onChange(text);
                                }}
                                value={field.value}
                            />
                        )}
                        name={`instructions[${index}]`}
                        defaultValue={instruction}
                    />
                ))}

                
                <View
                    style={apptw`flex-row justify-between w-1/2 gap-x-2`}
                >

                    <AppButton
                        buttonStyle={apptw`my-5 `}

                        text="Add"
                        onPress={Increase}
                    />

                    <AppButton
                        buttonStyle={apptw`my-5 `}
                        text="Remove"
                        onPress={decreaseCounter}
                    />
                </View>


                <AppButton
                    text="Next"
                    onPress={gotoInstructions}
                />


            </View>
        </BasicBackButtonLayout>
    )
}

export default NewInstructions