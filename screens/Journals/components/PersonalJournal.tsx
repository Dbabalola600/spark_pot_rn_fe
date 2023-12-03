import { View, Image } from "react-native";
import AppText from "../../../components/Display/AppText";
import { useNavigation } from "@react-navigation/native";
import apptw from "../../../utils/lib/tailwind";
import PressAppText from "../../../components/Display/PressAppText";
import BasicNoteDisplay from "../../../components/Display/Notes/BasicNoteDisplay";
import { FlatGrid } from "react-native-super-grid";
import { authSelector } from "../../../state/userSlice";
import useSWR from "swr";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../utils/lib/envvar";


interface MyData {
    data: any
}


const fetcher = async (url: string): Promise<MyData> => {
    const response = await fetch(url);
    const data = await response.json();

    return data;
};




export default function PersonalJournal() {

    const navigation = useNavigation();

    const navigatetoPersonalScreen = () => {
        navigation.navigate("PersonalJournalScreen")
    }


    const { user } = useSelector(authSelector);

    const { data, error, isLoading } = useSWR<MyData>(
        `${BASE_URL}/recipe/getAllPersonalRecipe/?userId=${user._id}`,
        fetcher
    );




    return (
        <View>



            <View
                style={apptw`justify-between flex-row`}
            >
                <AppText
                    style={apptw`underline text-primary`}
                >
                    Personal Recipes
                </AppText>


                <PressAppText
                    onPress={navigatetoPersonalScreen}
                    style={apptw`text-green-500`}
                >
                    View All
                </PressAppText>

            </View>


            {data?.data.length < 1 ?


                <View style={apptw`justify-items-center text-center`}>
                    <Image
                        source={require("../../../assets/images/empty1.png")}
                        style={apptw` w-70 h-70  mx-auto`}
                    />
                </View> :
                <View>
                    <AppText>
                        {data?.data._id}
                    </AppText>
                    <FlatGrid
                        // itemDimension={150}
                        data={data?.data?.slice(0, 4)}
                        renderItem={({ item }) => (<BasicNoteDisplay
                            onPress={() => navigation.navigate("DetailsFromDBScreen", { _id: item._id })}
                            image={item.image}
                            desciption={item.name}
                        />)}
                    />

                </View>
            }




        </View>
    )
}