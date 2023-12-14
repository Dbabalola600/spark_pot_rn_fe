import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import apptw from './utils/lib/tailwind';
import { Provider } from 'react-redux';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootStackParamList } from './screens/allroutes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './screens/Welcome';
import { NavigationContainer } from '@react-navigation/native';
import Test from './screens/Tests/Test';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './Navigation/CustomDrawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DashBoardScreen from './screens/DashBoard/DashBoardScreen';
import Tabs from './Navigation/Tabs';
import AuthStack from './Navigation/AuthStack';
import AppStack from './Navigation/AppStack';
import store from './state/store';
import Toast, { BaseToast, BaseToastProps, ErrorToast } from 'react-native-toast-message';

import { SWRConfig } from 'swr'








const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#54AC52' }}

      contentContainerStyle={{ paddingHorizontal: 10, }}
      text1Style={{
        fontSize: 20,
        fontWeight: '400'
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  ),

};





export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();



  return (
    <Provider
      store={store}
    >
      <SWRConfig
        value={{
          revalidateOnFocus: true,
          revalidateOnReconnect: true,
          revalidateIfStale: true,
          focusThrottleInterval: 5000
        }}
      >

        <SafeAreaProvider>
          <StatusBar backgroundColor="#fff" />


          <NavigationContainer>
            {/* <AppStack/> */}
            <AuthStack />
          </NavigationContainer>



        </SafeAreaProvider>
        <Toast config={toastConfig} />
      </SWRConfig>

    </Provider>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
