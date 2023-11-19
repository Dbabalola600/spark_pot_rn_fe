import { View, StyleSheet, Text, ScrollView, FlatList } from "react-native"
import LoggedInLayout from "../../components/Layout/LoggedLayout"
import AppText from "../../components/Display/AppText"
import { useEffect, useRef, useState } from "react"
import apptw from "../../utils/lib/tailwind"
import SearchBar from "../../components/Input/SearchBar"
import BasicNoteDisplay from "../../components/Display/Notes/BasicNoteDisplay"

import tw from "twrnc"
import { FlatGrid } from 'react-native-super-grid';
import { useSelector } from "react-redux"
import { authSelector } from "../../state/userSlice"
import useSWR from "swr";
import recipeRequest from "../../utils/request/recipeRequests"
import { BASE_URL, REC_API_URL } from "../../utils/lib/envvar"
import AppButton from "../../components/Display/AppButton"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "../allroutes"



interface MyData {
    data: any
}


const fetcher = async (url: string): Promise<MyData> => {
    const response = await fetch(url);
    const data = await response.json();

    return data;
};




type DashBoardProps = NativeStackScreenProps<RootStackParamList, "DashBoardScreen">


function DashBoardScreen({ navigation }: DashBoardProps) {
    const [greeting, setGreeting] = useState("")
    const { user } = useSelector(authSelector);
    const [counter, setCounter] = useState(1)
    const scrollViewRef = useRef(null);
    const flatGridRef = useRef(null);


    useEffect(() => {
        const setGreetingBasedOnTime = () => {
            const currentHour = new Date().getHours();

            if (currentHour >= 5 && currentHour < 12) {
                setGreeting('Good morning!');
            } else if (currentHour >= 12 && currentHour < 18) {
                setGreeting('Good afternoon!');
            } else {
                setGreeting('Good evening!');
            }
        };
        // console.log(user)
        setGreetingBasedOnTime();
        // Showinfo()


    }, []);





    const { data, error, isLoading } = useSWR<MyData>(
        `${BASE_URL}/recipe/?search=rice&page=${counter}`,
        fetcher
    );

    // console.log(data?.data.results[0].image_path)



    const Increase = () => {

        setCounter(counter + 1)
        scrollToTop()
    }

    const Decrease = () => {

        if (counter > 1) {
            setCounter(counter - 1)
        }
        scrollToTop()

    }


    const scrollToTop = () => {
        if (flatGridRef.current) {
            (flatGridRef.current as any).scrollToOffset({ offset: 0, animated: true });
        }
    };



    const NavClick = (slug: any) => {
        navigation.navigate("DetailsFromApiScreen", { slug: slug })
    }
    return (
        <LoggedInLayout pageTitle="">
            <View
                style={apptw`px-4 mb-10`}>

                <AppText>
                    {greeting} {user.fName} {user.lName}
                </AppText>

                <SearchBar />






                <FlatGrid
                    data={data?.data.results}
                    ref={flatGridRef}

                    renderItem={({ item }) => (<BasicNoteDisplay
                        onPress={() => NavClick(item.slug)}
                        desciption={item.name}
                        image={`${REC_API_URL}${item.image_path}`} />)}
                />

                {/* <FlatList
                
                data={data?.data.results}
                    // ref={flatGridRef}

                    numColumns={2}
                    

                    renderItem={({ item }) => (<BasicNoteDisplay

                        desciption={item.name}
                        image={`${REC_API_URL}${item.image_path}`} />)}
                /> */}




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

                    <View>
                        <AppButton
                            buttonStyle={apptw`my-5`}

                            text="Next"
                            onPress={Increase}
                        />

                    </View>

                }


            </View>



        </LoggedInLayout>
    )
}






export default DashBoardScreen