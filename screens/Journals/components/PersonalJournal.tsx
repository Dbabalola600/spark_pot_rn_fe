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
import { useEffect, useState } from "react";
import { SecureStorage } from "../../../services/singleton/secureStorage";
import axios from "axios";
import Loader from "../../../components/Display/Loader";
import { useSWRNativeRevalidate } from '@nandorojo/swr-react-native';

interface MyData {
    data: any
}

// type MyData = any[];



const fetcher = async (url: string): Promise<MyData> => {
    const response = await fetch(url);
    const data = await response.json();

    return data;
};

// const fetcher = (url: any) => fetch(url).then(res => res.json());


export default function PersonalJournal() {
    const [user, Setuser] = useState<any>([]);
    // const [data, setData] = useState<any>([])
    // const [isLoading, setLoading] = useState(false)
    const navigation = useNavigation();

    const [userId, setUserId] = useState<any>("")

    const navigatetoPersonalScreen = () => {
        navigation.navigate("PersonalJournalScreen")
    }


    const showinfo = async () => {

        // setLoading(true)
        const userId = await SecureStorage.getInst().getValueFor("userId");

        setUserId(userId)

        // const response = await axios.get(`${BASE_URL}/recipe/getAllPersonalRecipe/?userId=${userId}`).then((res) => {
        //     setData(res.data.data)
        //     // console.log(res.data.data)
        // })

        // setLoading(false)
    }


    useEffect(() => {
        showinfo()
    }, [])
    const { data, mutate, isLoading } = useSWR(`${BASE_URL}/recipe/getAllPersonalRecipe/?userId=${userId}`, fetcher)
    useSWRNativeRevalidate({ mutate });

    console.log("here", data?.data?.length)






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


            {isLoading ?
                <Loader /> :
                <>
                    {data?.data?.length < 1 ?


                        <View style={apptw`justify-items-center text-center`}>
                            <Image
                                source={require("../../../assets/images/empty1.png")}
                                style={apptw` w-70 h-70  mx-auto`}
                            />
                        </View> :
                        <View>

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
                </>

            }






        </View>
    )
}