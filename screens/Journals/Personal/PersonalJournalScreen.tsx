import { View, Image } from "react-native";
import BasicBackButtonLayout from "../../../components/Layout/BasicBackButtonLayout";
import AppText from "../../../components/Display/AppText";
import apptw from "../../../utils/lib/tailwind";
import SearchBar from "../../../components/Input/SearchBar";
import { FlatGrid } from "react-native-super-grid";
import BasicNoteDisplay from "../../../components/Display/Notes/BasicNoteDisplay";
import PressAppText from "../../../components/Display/PressAppText";

import { AntDesign } from '@expo/vector-icons';
import AppButtonWIcon from "../../../components/Display/AppButtonWIcon";
import useSWR from "swr";
import { BASE_URL } from "../../../utils/lib/envvar";
import { useSelector } from "react-redux";
import { authSelector } from "../../../state/userSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../allroutes";
import { useEffect, useState } from "react";
import { SecureStorage } from "../../../services/singleton/secureStorage";
import axios from "axios";



interface MyData {
    data: any
}


const fetcher = async (url: string): Promise<MyData> => {
    const response = await fetch(url);
    const data = await response.json();

    return data;
};


type PersonalJournalProps = NativeStackScreenProps<RootStackParamList, "PersonalJournalScreen">


export default function PersonalJournalScreen({ navigation }: PersonalJournalProps) {
    const { user } = useSelector(authSelector);

    const [userinfo, Setuser] = useState<any>([]);
    const [data, setData] = useState<any>([])




    const getuser = async () => {
        let userId = await SecureStorage.getInst().getValueFor("userId");


        const response = await axios.get(`${BASE_URL}/recipe/getAllPersonalRecipe/?userId=${userId}`).then((res) => {
            setData(res.data.data)
            console.log(res.data.data)
        })

        // console.log(data)

    }


    useEffect(() => {
        getuser()
    }, [])









    // const { data, error, isLoading } = useSWR<MyData>(
    //     `${BASE_URL}/recipe/getAllPersonalRecipe/?userId=${user._id}`,
    //     fetcher
    // );




    return (
        <BasicBackButtonLayout pageTitle="Personal Recipes">



            <View
                style={apptw`mb-100  mx-0 my-0`}
            >

                <View
                    style={apptw`flex-row justify-between`}
                >

                    <View>

                    </View>


                    <AppButtonWIcon
                        icon={<AntDesign
                            name="addfile"
                            size={20}
                            style={apptw`mx-auto`}
                            color="white"
                        />}
                        buttonStyle={apptw`w-[30] bg-primary mr-4 rounded-full`}
                        textStyle={apptw`text-[3] text-secondary  mx-auto`}
                        text="Add Recipie"
                        onPress={() => navigation.navigate("NewRecipeScreen")}
                    />
                </View>




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