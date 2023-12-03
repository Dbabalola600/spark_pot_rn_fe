import { View,Image } from "react-native";
import BasicBackButtonLayout from "../../../components/Layout/BasicBackButtonLayout";
import AppText from "../../../components/Display/AppText";
import { authSelector } from "../../../state/userSlice";
import useSWR from "swr";
import { BASE_URL, REC_API_URL } from "../../../utils/lib/envvar";
import { useSelector } from "react-redux";
import apptw from "../../../utils/lib/tailwind";
import SearchBar from "../../../components/Input/SearchBar";
import { FlatGrid } from "react-native-super-grid";
import BasicNoteDisplay from "../../../components/Display/Notes/BasicNoteDisplay";
import { useEffect, useState } from "react";
import axios from "axios";
import { SecureStorage } from "../../../services/singleton/secureStorage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../allroutes";




interface MyData {
    data: any
}


const fetcher = async (url: string): Promise<MyData> => {
    const response = await fetch(url);
    const data = await response.json();

    return data;
};


type SavedJournal = NativeStackScreenProps<
    RootStackParamList,
    "SavedJournalScreen"
>


export default function SavedJournalScreen({navigation}:SavedJournal) {
    const [data, setData] = useState<any>([])
    // const { user } = useSelector(authSelector);

    // const { data, error, isLoading } = useSWR<MyData>(
    //     `${BASE_URL}/recipe/getAllSavedRecipe/?userId=${user._id}`,
    //     fetcher
    // );

    const getuser = async () => {
        let userId = await SecureStorage.getInst().getValueFor("userId");


        const response = await axios.get(`${BASE_URL}/recipe/getAllSavedRecipe/?userId=${userId}`).then((res) => {
            setData(res.data.data)
            console.log(res.data.data)
        })

        // console.log(data)

    }


    useEffect(() => {
        getuser()
    }, [])






    return (
        <BasicBackButtonLayout pageTitle="Saved Recipes">

            <View
                style={apptw`mb-100  mx-0 my-0`}
            >


                {data?.length < 1 ?

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

                                data={data}
                                renderItem={({ item }) => (<BasicNoteDisplay
                                    onPress={() => navigation.navigate("DetailsFromDBScreen", { _id: item._id })}
                                    image={`${REC_API_URL}${item.image}`} 
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