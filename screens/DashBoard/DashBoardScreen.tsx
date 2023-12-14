import { View, StyleSheet, Text, ScrollView, FlatList, Image, ActivityIndicator } from "react-native"
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
import { userGetUserInfo } from "../../services/hooks/getUserInfo"
import { SecureStorage } from "../../services/singleton/secureStorage"
import Loader from "../../components/Display/Loader"
import { useSWRNativeRevalidate } from "@nandorojo/swr-react-native"



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
    // const { user } = useSelector(authSelector);
    const [counter, setCounter] = useState(1)
    const scrollViewRef = useRef(null);
    const flatGridRef = useRef(null);
    const [useSearch, SetSearch] = useState("")
    // const user = userGetUserInfo()
    const [user, Setuser] = useState<any>([]);




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





    }, []);






    const showinfo = async () => {
        let fName = await SecureStorage.getInst().getValueFor("fName");
        let lName = await SecureStorage.getInst().getValueFor("lName");


        // console.log(lName)

        Setuser({

            fName: fName,
            lName: lName,

        });

        // console.log(user)
    }


    useEffect(() => {
        showinfo()
    }, [])






    const { data, error, isLoading , mutate} = useSWR<MyData>(
        `${BASE_URL}/recipe/?search=${useSearch}&page=${counter}`,
        fetcher
    );
    useSWRNativeRevalidate({ mutate });

    console.log("load", isLoading)



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


    const search = (text: any) => {
        console.log(text)
        SetSearch(text)
    }

    // console.log(data?.data?.results?.length)
    return (
        <LoggedInLayout pageTitle="">
            <View
                style={apptw`px-4 mb-10 `}>

                <AppText>
                    {greeting} {user?.fName} {user?.lName}
                </AppText>


          
                {isLoading ?

                    <View
                    style={apptw`mx-auto py-10`}
                    >
                           <Loader/>
                    </View> :

                    <View>
                        <SearchBar
                            onPress={search}
                        />




                        {data?.data?.results?.length === undefined ?
                            <View>
                                <Image
                                    source={require("../../assets/images/empty_search.png")}
                                    style={apptw`rounded-sm w-full h-60  mx-auto `}


                                />

                            </View> :
                            <View>
                                <FlatGrid
                                    data={data?.data.results}
                                    ref={flatGridRef}

                                    renderItem={({ item }) => (<BasicNoteDisplay
                                        onPress={() => NavClick(item.slug)}
                                        desciption={item.name}
                                        image={`${REC_API_URL}${item.image_path}`} />)}
                                />

                            </View>

                        }









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
                }




            </View>



        </LoggedInLayout>
    )
}






export default DashBoardScreen