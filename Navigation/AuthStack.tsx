import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../screens/allroutes";
import Welcome from "../screens/Welcome";
import AppStack from "./AppStack";
import DashBoardScreen from "../screens/DashBoard/DashBoardScreen";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import Start from "../screens/Start";
import MainSettingsScreen from "../screens/Settings/MainSettingScreen";
import PersonalJournalScreen from "../screens/Journals/Personal/PersonalJournalScreen";
import SavedJournalScreen from "../screens/Journals/Saved/SavedJournalScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();



const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='Start'
        >
            <Stack.Screen
                name="Welcome"
                component={Welcome}
            />

            <Stack.Screen
                name="SignIn"
                component={SignIn}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUp}
            />
            <Stack.Screen
                name="Start"
                component={Start}
            />

            <Stack.Screen
                name="DashBoardScreen"
                component={AppStack}
            />

            <Stack.Screen
            name="MainSettingsScreen"
            component={MainSettingsScreen}
            />
            <Stack.Screen
            name="PersonalJournalScreen"
            component={PersonalJournalScreen}
            />

            <Stack.Screen
            name="SavedJournalScreen"
            component={SavedJournalScreen}
            />

            
        </Stack.Navigator>
    )
}

export default AuthStack