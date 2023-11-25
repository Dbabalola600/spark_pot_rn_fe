import { View,Image } from "react-native";
import BasicBackButtonLayout from "../../../components/Layout/BasicBackButtonLayout";
import AppText from "../../../components/Display/AppText";
import { authSelector } from "../../../state/userSlice";
import useSWR from "swr";
import { BASE_URL } from "../../../utils/lib/envvar";
import { useSelector } from "react-redux";
import apptw from "../../../utils/lib/tailwind";
import SearchBar from "../../../components/Input/SearchBar";
import { FlatGrid } from "react-native-super-grid";
import BasicNoteDisplay from "../../../components/Display/Notes/BasicNoteDisplay";




interface MyData {
    data: any
}


const fetcher = async (url: string): Promise<MyData> => {
    const response = await fetch(url);
    const data = await response.json();

    return data;
};


export default function SavedJournalScreen() {

    const { user } = useSelector(authSelector);

    const { data, error, isLoading } = useSWR<MyData>(
        `${BASE_URL}/recipe/getAllSavedRecipe/?userId=${user._id}`,
        fetcher
    );


    return (
        <BasicBackButtonLayout pageTitle="Saved Journal">

            <View
                style={apptw`mb-100  mx-0 my-0`}
            >


                {data?.data.length < 1 ?

                    <View style={apptw`justify-items-center text-center`}>
                        <Image
                            source={require("../../../assets/images/empty1.png")}
                            style={apptw` w-70 h-70  mx-auto bg-black`}
                        />
                    </View> :

                    <View>

                        <View>
                            <SearchBar />
                        </View>


                        <View>


                            <FlatGrid

                                data={data?.data}
                                renderItem={({ item }) => (<BasicNoteDisplay
                                    onPress={() => { }}
                                    image={item.image}
                                    desciption={item.name}
                                />)}
                            />
                        </View>

                    </View>
                }

            </View>
        </BasicBackButtonLayout>
    )
}