import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "./CustomDrawer";
import Tabs from "./Tabs";
import Test from "../screens/Tests/Test";
import ContactSupportScreen from "../screens/Support/ContactSupportScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import NewRecipeScreen from "../screens/Recipes/New/NewRecipeScreen";


const Drawer = createDrawerNavigator();
const AppStack = () => {
    return (
        <Drawer.Navigator
            initialRouteName="DashBoard"

            screenOptions={{
                drawerLabelStyle: {
                    fontSize: 15,
                    color: "black"
                },
                drawerStyle: {
                    width: '70%',

                },
                drawerActiveTintColor: "white",
            }}
            drawerContent={props => <CustomDrawer{...props} />}
        >

            <Drawer.Screen
                name='DashBoard'
                component={Tabs}
                options={{

                    drawerType: 'front',
                    title: "DashBoard",
                    headerShown: false,
                }}
            />

            <Drawer.Screen
                name='Profile'
                component={ProfileScreen}
                options={{
                    drawerType: 'front',
                    title: "Profile",
                    headerShown: false,
                }}
            />

            <Drawer.Screen
                name="Support"
                component={ContactSupportScreen}
                options={{
                    drawerType: 'front',
                    title: "Support",
                    headerShown: false,

                }}
            />

            <Drawer.Screen
                name="NewRecipeScreen"
                component={NewRecipeScreen}
                options={{
                    drawerType: 'front',
                    title: "New Recipe",
                    headerShown: false,

                }}
            />



        </Drawer.Navigator>
    )
}

export default AppStack