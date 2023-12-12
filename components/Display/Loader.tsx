import { View, StyleSheet, Animated, ActivityIndicator } from "react-native";
import AppText from "./AppText";




export default function Loader() {
    return (
        <View>
           <ActivityIndicator  color="red" size="large" />
        </View>
    )
}
