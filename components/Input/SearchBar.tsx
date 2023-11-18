import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Pressable } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';


const SearchBar = () => {
    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation();

    const search = () => {
        if (searchText !== "") {
            console.log("searched")
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search..."
                value={searchText}
                onChangeText={setSearchText}
            />

            <Pressable
                onPress={search}

            >
                <FontAwesome name="search" size={24} color="black" />
            </Pressable>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        width: "95%",
        padding: 10,
        borderRadius: 20, // Making the container rounded
        margin: 10,
        overflow: 'hidden', // Clip the content to the rounded borders
    },
    input: {
        flex: 1,
        paddingVertical: 5,
    },
});


export default SearchBar