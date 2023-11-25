import { RouteProp } from "@react-navigation/native"
import { RootStackParamList } from "../../allroutes"
import BasicBackButtonLayout from "../../../components/Layout/BasicBackButtonLayout"
import { View, Image, FlatList } from "react-native"
import { useState } from "react"
import useSWR from "swr"
import { BASE_URL, REC_API_URL } from "../../../utils/lib/envvar"
import AppText from "../../../components/Display/AppText"
import apptw from "../../../utils/lib/tailwind"
import AppButton from "../../../components/Display/AppButton"






interface MyData {
    data: any
}


const fetcher = async (url: string): Promise<MyData> => {
    const response = await fetch(url);
    const data = await response.json();

    return data;
};


type DetailsFromDBScreenProps = RouteProp<RootStackParamList, "DetailsFromDBScreen">



type Props = {
    route: DetailsFromDBScreenProps
}

const DetailsFromDBScreen: React.FC<Props> = ({ route }) => {
    const [newInfo, setInfo] = useState([])
    const _id = route.params?._id


    const { data, error, isLoading } = useSWR<MyData>(
        `${BASE_URL}/recipe/getDetailsDB?_id=${_id}`,
        fetcher,
    );




    return (
        <BasicBackButtonLayout pageTitle="">
            <View
                style={apptw`mx-2 mb-15`}
            >

                <View
                    style={apptw`pb-5 `}
                >
                    <AppText style={apptw`text-center `}>
                        {data?.data.name}
                    </AppText>
                    <AppText style={apptw`text-center `}>
                        By: {data?.data.author}
                    </AppText>


                    <AppText style={apptw`text-sm `}>
                        Time: {data?.data.total_time}
                    </AppText>
                </View>





                {data?.data.userId ?


                    <View>
                        {data.data.public === true ?
                            <View
                                style={apptw`flex-row justify-between gap-x-4`}
                            >

                                <View>

                                    <AppButton
                                        text="Delete"
                                        textStyle={apptw`text-3 `}
                                        buttonStyle={apptw`w-[20] p-2 bg-red-500`}
                                        onPress={() => { }}
                                    />
                                </View>
                                <AppButton
                                    text="Make Private"
                                    textStyle={apptw`text-3 `}
                                    buttonStyle={apptw`w-[30] p-2 bg-gray-500`}
                                    onPress={() => { }}
                                />


                            </View> :

                            <View
                                style={apptw`flex-row justify-between gap-x-4`}
                            >

                                <View>
                                    <AppButton
                                        text="Delete"
                                        textStyle={apptw`text-3 `}
                                        buttonStyle={apptw`w-[20] p-2 bg-red-500`}
                                        onPress={() => { }}
                                    />

                                </View>
                                <AppButton
                                    text="Make Public"
                                    textStyle={apptw`text-3`}
                                    buttonStyle={apptw`w-[30] p-2`}
                                    onPress={() => { }}
                                />


                            </View>
                        }


                    </View> :

                    <View
                        style={apptw`flex-row justify-between gap-x-4`}
                    >

                        <View>

                            <AppButton
                                text="Delete"
                                textStyle={apptw`text-3 `}
                                buttonStyle={apptw`w-[20] p-2 bg-red-500`}
                                onPress={() => { }}
                            />
                        </View>



                    </View>

                }



                {/* image */}

                {
                    data?.data.image === "" || data?.data.image === null ?

                        <View>
                            <Image
                                source={require("../../../assets/images/breakfast.png")}
                                style={apptw`rounded-sm w-[60] h-[50] mx-auto`}
                            />

                        </View> :


                        <View>
                            {data?.data.slug ?
                                <View
                                    style={apptw`pt-5`}
                                >
                                    <Image
                                        style={apptw`rounded-sm h-70 `}
                                        source={{ uri: `${REC_API_URL}${data?.data.image}` }}
                                    />

                                </View>
                                :

                                <View
                                    style={apptw`pt-5`}
                                >
                                    <Image
                                        style={apptw`rounded-sm h-70 `}
                                        source={{ uri: `${data?.data.image}` }}
                                    />

                                </View>
                            }


                        </View>

                }


                {/* ingredients  */}


                <AppText
                    style={apptw`py-3 font-bold underline text-primary text-3xl`}
                >
                    Ingredients
                </AppText>
                <FlatList
                    data={data?.data.ingredients}
                    renderItem={({ item, index }) => (
                        <AppText style={apptw`px-2`}> {index + 1}. {item}</AppText>
                    )}
                />


                <AppText
                    style={apptw`py-3 font-bold underline text-primary text-3xl`}
                >
                    Instructions
                </AppText>
                <FlatList
                    data={data?.data.instructions}
                    style={apptw``}
                    renderItem={({ item, index }) => (
                        <AppText style={apptw`px-2 `}> {index + 1}. {item}</AppText>
                    )}
                />



            </View>
        </BasicBackButtonLayout>
    )
}



export default DetailsFromDBScreen;