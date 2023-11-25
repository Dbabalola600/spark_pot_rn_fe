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
import DetailsFromApiScreen from "../screens/Recipes/Details/DetailsFromAPI";
import DetailsFromDBScreen from "../screens/Journals/Details/DetailsFromDB";
import NewRecipeScreen from "../screens/Recipes/New/NewRecipeScreen";
import NewIngredientsScreen from "../screens/Recipes/New/NewIngredientsScreen";
import NewInstructions from "../screens/Recipes/New/NewInstructions";
import UploadPictureScreen from "../screens/Recipes/New/UploadPictureScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();



const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='UploadPictureScreen'
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
            <Stack.Screen
                name="DetailsFromApiScreen"
                component={DetailsFromApiScreen}
            />

            <Stack.Screen
                name="DetailsFromDBScreen"
                component={DetailsFromDBScreen}
            />

            <Stack.Screen
                name="NewRecipeScreen"
                component={NewRecipeScreen}
            />

            <Stack.Screen
                name="NewIngredientsScreen"
                component={NewIngredientsScreen}
            />
              <Stack.Screen
                name="NewInstructions"
                component={NewInstructions}
            />
              <Stack.Screen
                name="UploadPictureScreen"
                component={UploadPictureScreen}
            />




        </Stack.Navigator>
    )
}

export default AuthStack