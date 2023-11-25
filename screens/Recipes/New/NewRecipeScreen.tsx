import { useForm } from "react-hook-form"
import BasicBackButtonLayout from "../../../components/Layout/BasicBackButtonLayout"
import AppText from "../../../components/Display/AppText"
import apptw from "../../../utils/lib/tailwind"
import AppTextField from "../../../components/Input/AppTextField"
import { View } from "react-native"
import AppButton from "../../../components/Display/AppButton"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../allroutes"





type NewRecipeProps = NativeStackScreenProps<RootStackParamList, "NewRecipeScreen">

const NewRecipeScreen = ({ navigation }: NewRecipeProps) => {

    const { register, handleSubmit, watch, control, formState: { errors } } = useForm()


    const gotoIngredients = handleSubmit((data) => {
       

        // const reqData ={
        //     reqData: data
        // }

        // console.log(reqData)
        navigation.navigate("NewIngredientsScreen",{reqData: data} )
    })


    return (
        <BasicBackButtonLayout pageTitle="New Recipe">
            <View
                style={apptw`px-2 justify-between`}
            >

                <AppText
                    style={apptw`text-center `}
                >
                    Let's Begin
                </AppText>

                <AppTextField
                    title="Name"
                    validationName="name"
                    control={control}
                    placeholder="name"
                />

                <AppTextField
                    title="Description"
                    validationName="description"
                    control={control}
                    placeholder="description"
                />

                 <AppTextField
                    title="Time needed to Prepare"
                    validationName="total_time"
                    control={control}
                    placeholder="30 minutes"
                />
                <AppTextField
                    title="how many people does this serve?"
                    validationName="servings"
                    control={control}
                    placeholder="Servings"
                />

                <AppButton
                    text="Next"
                    onPress={gotoIngredients}
                />

            </View>
        </BasicBackButtonLayout>
    )
}



export default NewRecipeScreen