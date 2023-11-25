import { TextInput, TextInputComponent, View } from "react-native"
import BasicBackButtonLayout from "../../../components/Layout/BasicBackButtonLayout"
import AppTextField from "../../../components/Input/AppTextField"
import { RouteProp, useNavigation } from "@react-navigation/native"
import { RootStackParamList } from "../../allroutes"
import { useState } from "react"
import AppButton from "../../../components/Display/AppButton"
import apptw from "../../../utils/lib/tailwind"
import { Controller, useForm } from "react-hook-form"




type NewIngredientsScreenProps = RouteProp<RootStackParamList, "NewIngredientsScreen">

type Props = {
    route: NewIngredientsScreenProps
}

const NewIngredientsScreen: React.FC<Props> = ({ route }) => {
    const [counter, setCounter] = useState(1)
    const [ingredients, setIngredients] = useState<string[]>(['']);
    const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm()

const navigation = useNavigation()

    const Increase = () => {
        setCounter(counter + 1)
        setIngredients([...ingredients, '']);
    }

    const decreaseCounter = () => {
        if (counter > 1) {
            setCounter(counter - 1);
            setIngredients((prevIngredients) => {
                const newIngredients = [...prevIngredients];
                newIngredients.pop(); // Remove the last item
                return newIngredients;
            });
            setValue(`ingredients[${counter - 1}]`, ''); // Clear the value of the previous TextInput
        }
    };


    // console.log(route.params)

    const gotoInstructions = handleSubmit(async (data) => {



        const newInfo = route.params.reqData

        const oldInd = data.ingredients
        const filteredInd = oldInd.filter((ingredient: any) => ingredient.trim() !== '');

        const ingredients = {
            ingredients: filteredInd
        }
        Object.assign(newInfo, ingredients)

        console.log(newInfo)

        navigation.navigate("NewInstructions", {reqData: newInfo})
    })


    return (
        <BasicBackButtonLayout pageTitle="Ingredients">
            <View
                style={apptw`px-4`}
            >

                {/* <AppTextField /> */}



                {ingredients.map((ingredient, index) => (
                    <Controller
                        key={index}
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                style={apptw`bg-textField h-18 rounded-md px-3 mt-3`}
                                onChangeText={(text) => {
                                    setValue(`ingredients[${index}]`, text);
                                    field.onChange(text);
                                }}
                                value={field.value}
                            />
                        )}
                        name={`ingredients[${index}]`}
                        defaultValue={ingredient}
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


export default NewIngredientsScreen