import { View } from "react-native";
import BasicBackButtonLayout from "../../components/Layout/BasicBackButtonLayout";
import AppTextField from "../../components/Input/AppTextField";
import { useForm } from "react-hook-form";
import apptw from "../../utils/lib/tailwind";
import AppButton from "../../components/Display/AppButton";







export default function UpdatePaswordScreen() {

    const { register, handleSubmit, watch, control, formState: { errors } } = useForm()
    return (
        <BasicBackButtonLayout pageTitle="Update Password">
            <View
                style={apptw`px-4`}
            >


                <AppTextField

                    title="Password"
                    control={control}

                    validationName="password"
                />


                <AppButton

                    text="Submit"
                />



            </View>

        </BasicBackButtonLayout>
    )
}