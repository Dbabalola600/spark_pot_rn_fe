import { MaterialCommunityIcons, AntDesign, MaterialIcons, Ionicons, Octicons, FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import apptw from "../utils/lib/tailwind";
import MyTabBar from "./CustomBottomNav";
import DashBoardScreen from "../screens/DashBoard/DashBoardScreen";
import Test from "../screens/Tests/Test";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import JournalScreen from "../screens/Journals/JournalsScreen";
import MainSearchScreen from "../screens/Search/MainSearchScreen";
import MainCommunityScreen from "../screens/Community/MainCommunityScreen";



const Tab = createBottomTabNavigator();

const Tabs = () => {

    return (
        <Tab.Navigator

            screenOptions={{
                
                tabBarStyle: { backgroundColor: "#BC4B52" },
                tabBarInactiveTintColor: "black",
                // tabBarShowLabel: false,
                headerShown: false,
            
                tabBarActiveTintColor: "#F6F8FA"
            }}
        // tabBar={props => <MyTabBar {...props} />}
        >

            <Tab.Screen
                name='DashBoard'
                component={DashBoardScreen}
                options={{

                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons
                            name="dashboard"
                            color={color}
                            size={26} />
                    ),
                }}
            />


            {/* < Tab.Screen
                name='Search'
                component={MainSearchScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="search"
                            color={color}
                            size={26} />
                    ),
                }}
            /> */}

            < Tab.Screen
                name='Journal'
                component={JournalScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="journal"
                            color={color}
                            size={26} />
                    ),
                }}
            />



            < Tab.Screen
                name='Community'
                component={MainCommunityScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="people"
                            color={color}
                            size={26} />
                    ),
                }}
            />







        </Tab.Navigator>
    )


}


export default Tabs