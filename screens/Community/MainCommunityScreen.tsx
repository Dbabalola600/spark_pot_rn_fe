import { View, Image } from "react-native";
import LoggedInLayout from "../../components/Layout/LoggedLayout";
import AppText from "../../components/Display/AppText";
import SearchBar from "../../components/Input/SearchBar";
import useSWR from "swr";
import { useState } from "react";
import { BASE_URL, REC_API_URL } from "../../utils/lib/envvar";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../allroutes";
import { FlatGrid } from "react-native-super-grid";
import BasicNoteDisplay from "../../components/Display/Notes/BasicNoteDisplay";
import apptw from "../../utils/lib/tailwind";
import AppButton from "../../components/Display/AppButton";




interface MyData {
    data: any
}


const fetcher = async (url: string): Promise<MyData> => {
    const response = await fetch(url);
    const data = await response.json();

    return data;
};


type MainCommunityProps = NativeStackScreenProps<RootStackParamList, "MainCommunityScreen">
function MainCommunityScreen({ navigation }: MainCommunityProps) {

    const [counter, setCounter] = useState(1)


    const { data, error, isLoading } = useSWR<MyData>(
        `${BASE_URL}/recipe/?search=rice&page=${counter}`,
        fetcher
    );

    const Increase = () => {

        setCounter(counter + 1)
        // scrollToTop()
    }

    const Decrease = () => {

        if (counter > 1) {
            setCounter(counter - 1)
        }
        // scrollToTop()

    }

    const NavClick = (slug: any) => {
        navigation.navigate("DetailsFromApiScreen", { slug: slug })
    }


    return (
        <LoggedInLayout pageTitle="">
            <View
                style={apptw`px-4 mb-10`}
            >

                <AppText>
                    Welcome to the Community
                </AppText>



                <Image
                    source={require("../../assets/images/coming_soon.png")}
                    style={apptw`rounded-sm w-full h-70  mx-auto `}


                />

                <AppText 
                style={apptw`text-primary text-center text-3xl font-bold py-10`}
                >
                    Under Construction
                </AppText>
                <AppText>
                    This will be the community section where users share and view recipes made by other users
                </AppText>





            </View>
        </LoggedInLayout>
    )
}

export default MainCommunityScreen