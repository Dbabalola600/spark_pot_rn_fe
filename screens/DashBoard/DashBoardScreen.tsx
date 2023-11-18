import { View, StyleSheet, Text } from "react-native"
import LoggedInLayout from "../../components/Layout/LoggedLayout"
import AppText from "../../components/Display/AppText"
import { useEffect, useState } from "react"
import apptw from "../../utils/lib/tailwind"
import SearchBar from "../../components/Input/SearchBar"
import BasicNoteDisplay from "../../components/Display/Notes/BasicNoteDisplay"

import tw from "twrnc"
import { FlatGrid } from 'react-native-super-grid';
import { useSelector } from "react-redux"
import { authSelector } from "../../state/userSlice"

function DashBoardScreen() {
    const [greeting, setGreeting] = useState("")
    const { user } = useSelector(authSelector);
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
        console.log(user)
        setGreetingBasedOnTime();
    }, []);

    return (
        <LoggedInLayout pageTitle="">
            <View
                style={apptw`px-4 mb-10`}>

                <AppText>
                    {greeting} {user.fName} {user.lName}
                </AppText>

                <SearchBar />




                <FlatGrid
                    // itemDimension={150}
                    data={[1, 2, 3, 4, 5, 6, 7]}
                    renderItem={({ item }) => (<BasicNoteDisplay />)}
                />

            </View>
        </LoggedInLayout>
    )
}






export default DashBoardScreen