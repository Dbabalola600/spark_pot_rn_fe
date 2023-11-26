import { View, Image, FlatList } from "react-native"
import BasicBackButtonLayout from "../../../components/Layout/BasicBackButtonLayout"
import { RouteProp, useNavigation } from "@react-navigation/native"
import { RootStackParamList } from "../../allroutes"
import { useForm } from "react-hook-form"
import { authSelector } from "../../../state/userSlice"
import { useDispatch, useSelector } from "react-redux"
import AppButton from "../../../components/Display/AppButton"
import apptw from "../../../utils/lib/tailwind"
import AppText from "../../../components/Display/AppText"
import { AppDispatch } from "../../../state/store"
import recipeRequest from "../../../utils/request/recipeRequests"




type ReviewNewScreenProps = RouteProp<RootStackParamList, "ReviewNewScreen">

type Props = {
    route: ReviewNewScreenProps
}


const ReviewNewScreen: React.FC<Props> = ({ route }) => {
    const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm()
    const { user } = useSelector(authSelector);
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation()


    const navigatetoDashBoard = () => {
        navigation.navigate("DashBoardScreen")
    }

    const submitNewRec = async () => {
        const response = await recipeRequest.createNewRecipe(
            user._id,
            route.params.reqData.image,
            route.params.reqData.servings,
            route.params.reqData.ingredients,
            route.params.reqData.name,
            route.params.reqData.instructions,
            new Date(),
            route.params.reqData.total_time,
            route.params.reqData.description
        ).then(res => {
            console.log(res);
            if (res.status === 200) {
                navigatetoDashBoard()
            }
        });
    }




    return (
        <BasicBackButtonLayout pageTitle="Review">
            <View
                style={apptw`px-4 mb-10`}
            >
                <View
                    style={apptw`pb-5 `}
                >
                    <AppText style={apptw`text-center `}>
                        {route.params.reqData.name}
                    </AppText>
                    <AppText style={apptw`text-center `}>
                        By: {user.fName + " " + user.lName}
                    </AppText>

                </View>


                <AppText style={apptw`text-sm `}>
                    Time: {route.params.reqData.total_time}
                </AppText>



                <View
                    style={apptw`pt-5`}
                >
                    <Image
                        style={apptw`rounded-sm h-70 `}
                        source={{ uri: `${route.params.reqData.image}` }}
                    />

                </View>
                <AppText
                    style={apptw`py-5 font-bold underline text-primary text-3xl`}
                >
                    Ingredients
                </AppText>
                <FlatList
                    data={route.params.reqData.ingredients}
                    renderItem={({ item, index }) => (
                        <AppText style={apptw`px-2`}> {index + 1}. {item}</AppText>
                    )}
                />


                <AppText
                    style={apptw`py-5 font-bold underline text-primary text-3xl`}
                >
                    Instructions
                </AppText>
                <FlatList
                    data={route.params.reqData.instructions}
                    renderItem={({ item, index }) => (
                        <AppText style={apptw`px-2`}> {index + 1}. {item}</AppText>
                    )}
                />



                <AppButton
                    text="SUBMIT"
                    buttonStyle={apptw`my-10`}
                    onPress={submitNewRec}
                />
            </View>
        </BasicBackButtonLayout>
    )
}


export default ReviewNewScreen


