import { View, Image } from "react-native";
import AppText from "../../../components/Display/AppText";
import PressAppText from "../../../components/Display/PressAppText";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../allroutes";
import { useNavigation } from '@react-navigation/native';
import apptw from "../../../utils/lib/tailwind";
import { FlatGrid } from "react-native-super-grid";
import BasicNoteDisplay from "../../../components/Display/Notes/BasicNoteDisplay";
import { useSelector } from "react-redux";
import { authSelector } from "../../../state/userSlice";
import useSWR from "swr";
import { BASE_URL, REC_API_URL } from "../../../utils/lib/envvar";
import { SecureStorage } from "../../../services/singleton/secureStorage";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../../components/Display/Loader";

type SavedJournal = NativeStackScreenProps<
    RootStackParamList,
    "JournalScreen"
>




interface MyData {
    data: any
}


const fetcher = async (url: string): Promise<MyData> => {
    const response = await fetch(url);
    const data = await response.json();

    return data;
};


export default function SavedJournal() {
    const navigation = useNavigation();
    const [user, Setuser] = useState<any>([]);
    const [data, setData] = useState<any>([])
    const [isLoading, setLoading] = useState(false)

    const navigatetoSavedScreen = () => {
        navigation.navigate("SavedJournalScreen")
    }



    // const { user } = useSelector(authSelector);

    const showinfo = async () => {
        setLoading(true)
        let userId = await SecureStorage.getInst().getValueFor("userId");
        const response = await axios.get(`${BASE_URL}/recipe/getAllSavedRecipe/?userId=${userId}`).then((res) => {
            setData(res.data.data)
            // console.log(res.data.data)
        })
        setLoading(false)

    }


    useEffect(() => {
        showinfo()
    }, [])

    // const { data, error, isLoading } = useSWR<MyData>(
    //     `${BASE_URL}/recipe/getAllSavedRecipe/?userId=${user?.userId}`,
    //     fetcher
    // );




    //  useEffect(() => {
    //     Showinfo
    // }, [])



    // const Showinfo = () => {

    //     const response = axios.get(`${BASE_URL}/recipe/getDetailsAPI?slug=${slug}`)


    //     console.log(response)
    // }


    return (
        <>

            <View
                style={apptw`justify-between flex-row`}
            >
                <AppText
                    style={apptw`underline text-primary`}
                >
                    Saved Recipes
                </AppText>


                <PressAppText
                    onPress={navigatetoSavedScreen}
                    style={apptw`text-green-500`}
                >
                    View All
                </PressAppText>

            </View>

            {isLoading ?

                <>
                    <Loader />

                </> :
                <>
                    {data.length < 1 ?


                        <View style={apptw`justify-items-center text-center`}>
                            <Image
                                source={require("../../../assets/images/empty1.png")}
                                style={apptw` w-70 h-70  mx-auto`}
                            />
                        </View> :
                        <View>
                            <FlatGrid
                                // itemDimension={150}
                                data={data.slice(0, 4)}
                                renderItem={({ item }) => (<BasicNoteDisplay
                                    onPress={() => navigation.navigate("DetailsFromDBScreen", { _id: item._id })}
                                    image={`${REC_API_URL}${item.image}`}
                                    desciption={item.name}
                                />)}
                            />

                        </View>
                    }
                </>
            }




        </>
    )
}