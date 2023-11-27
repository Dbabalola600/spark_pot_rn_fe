import { View } from "react-native";
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

                <SearchBar />


                <FlatGrid
                    data={data?.data.results}
                    // ref={flatGridRef}

                    renderItem={({ item }) => (<BasicNoteDisplay
                        onPress={() => NavClick(item.slug)}
                        desciption={item.name}
                        image={`${REC_API_URL}${item.image_path}`} />)}
                />


                {counter > 1 ?

                    <View
                        style={apptw`flex-row justify-between w-1/2 gap-x-3 py-5`}
                    >

                        <AppButton
                            buttonStyle={apptw`my-5`}
                            text="Previous"
                            onPress={Decrease}
                        />

                        <AppButton
                            buttonStyle={apptw`my-5`}

                            text="Next"
                            onPress={Increase}
                        />


                    </View>

                    :

                    <View
                        style={apptw` `}
                    >
                        <AppButton
                            buttonStyle={apptw`my-5 fixed`}

                            text="Next"
                            onPress={Increase}
                        />

                    </View>

                }



            </View>
        </LoggedInLayout>
    )
}

export default MainCommunityScreen