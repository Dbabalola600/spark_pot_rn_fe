import { ScrollView, Image, FlatList, View } from "react-native";
import BasicBackButtonLayout from "../../../components/Layout/BasicBackButtonLayout";
import useSWR from "swr";
import { BASE_URL, REC_API_URL } from "../../../utils/lib/envvar";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../allroutes";
import { useEffect, useState } from "react";
import AppText from "../../../components/Display/AppText";
import apptw from "../../../utils/lib/tailwind";
import AppButton from "../../../components/Display/AppButton";
import Toast from "react-native-toast-message";
import recipeRequest from "../../../utils/request/recipeRequests";
import { authSelector } from "../../../state/userSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { SecureStorage } from "../../../services/singleton/secureStorage";





interface MyData {
    data: any
}


const fetcher = async (url: string): Promise<MyData> => {
    const response = await fetch(url);
    const data = await response.json();

    return data;
};



type DetailsFromApiScreenProps = RouteProp<RootStackParamList, "DetailsFromApiScreen">



type Props = {
    route: DetailsFromApiScreenProps
}
const DetailsFromApiScreen: React.FC<Props> = ({ route }) => {
    const [newInfo, setInfo] = useState([])
    const slug = route.params?.slug
    const { user } = useSelector(authSelector);
    const navigation = useNavigation()

    const navigatetoDashBoard = () => {
        navigation.navigate("DashBoardScreen")
    }
    const { data, error, isLoading } = useSWR<MyData>(
        `${BASE_URL}/recipe/getDetailsAPI?slug=${slug}`,
        fetcher,


    );

    // setInfo(data?.data.results)






    const addNew = async () => {
        const userId = await SecureStorage.getInst().getValueFor("userId");
        console.log(data?.data?.results[0].slug)
        const response = await recipeRequest.addtoJournalfromAPI(
            userId,
            data?.data?.results[0].image_path,
            data?.data?.results[0].servings,
            data?.data?.results[0].ingredients,
            data?.data?.results[0].name,
            data?.data?.results[0].instructions,
            data?.data?.results[0].date_added,
            data?.data?.results[0].total_time_string,
            data?.data?.results[0].description,
            data?.data?.results[0].author,
            data?.data?.results[0].slug
        ).then(res => {
            // console.log(res);
            if (res.status === 200) {

                Toast.show({

                    type: 'success',
                    text1: 'Added to Journal',
                    // text2: 'iwoiovw'
                });
                navigatetoDashBoard()
            }
        })


    }

    if (data?.data?.results[0].slug === undefined) {
        return (
            <BasicBackButtonLayout pageTitle="">

                <View>
                    <Image
                        source={require("../../../assets/images/empty_search.png")}
                        style={apptw`rounded-sm w-full h-60  mx-auto `}
                    />

                </View>

            </BasicBackButtonLayout>
        )
    }
    else {
        return (
            <BasicBackButtonLayout pageTitle={""}>
                <ScrollView
                    style={apptw`mx-2 mb-15`}
                >

                    <View
                        style={apptw`pb-5 `}
                    >
                        <AppText style={apptw`text-center `}>
                            {data?.data.results[0].name}
                        </AppText>
                        <AppText style={apptw`text-center `}>
                            By: {data?.data.results[0].author}
                        </AppText>

                    </View>

                    <AppText style={apptw`text-sm `}>
                        Time: {data?.data.results[0].total_time_string}
                    </AppText>


                    <View
                        style={apptw`flex-row justify-between gap-x-4`}
                    >

                        <View>


                        </View>
                        <AppButton
                            text="Add to Journal"
                            textStyle={apptw`text-3`}
                            buttonStyle={apptw`w-[30] p-2 mt-2`}
                            onPress={addNew}
                        />


                    </View>

                    <View
                        style={apptw`pt-5`}
                    >
                        <Image
                            style={apptw`rounded-sm h-70 `}
                            source={{ uri: `${REC_API_URL}${data?.data.results[0].image_path}` }}
                        />

                    </View>


                    <AppText

                    >{data?.data.results[0].description}</AppText>

                    <AppText
                        style={apptw`py-5 font-bold underline text-primary text-3xl`}
                    >
                        Ingredients
                    </AppText>
                    <FlatList
                        data={data?.data.results[0].ingredients}
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
                        data={data?.data.results[0].instructions}
                        renderItem={({ item, index }) => (
                            <AppText style={apptw`px-2`}> {index + 1}. {item}</AppText>
                        )}
                    />



                </ScrollView>

            </BasicBackButtonLayout>
        )
    }








}

export default DetailsFromApiScreen;