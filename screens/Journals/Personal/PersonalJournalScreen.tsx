import { View } from "react-native";
import BasicBackButtonLayout from "../../../components/Layout/BasicBackButtonLayout";
import AppText from "../../../components/Display/AppText";
import apptw from "../../../utils/lib/tailwind";
import SearchBar from "../../../components/Input/SearchBar";
import { FlatGrid } from "react-native-super-grid";
import BasicNoteDisplay from "../../../components/Display/Notes/BasicNoteDisplay";
import PressAppText from "../../../components/Display/PressAppText";

import { AntDesign } from '@expo/vector-icons';
import AppButtonWIcon from "../../../components/Display/AppButtonWIcon";




export default function PersonalJournalScreen() {


    return (
        <BasicBackButtonLayout pageTitle="Personal Journal">



            <View
                style={apptw`mb-100 mx-2`}
            >

                <View
                    style={apptw`flex-row justify-between`}
                >

                    <View>

                    </View>


                    <AppButtonWIcon
                        icon={<AntDesign
                            name="addfile"
                            size={20}
                            style={apptw`mx-auto`}
                            color="black"
                        />}
                        buttonStyle={apptw`w-[30] bg-primary mr-4 rounded-full`}
                        textStyle={apptw`text-[3] text-black  mx-auto`}
                        text="Add Recipie"
                    />
                </View>




                <View>
                    <SearchBar />
                </View>


                <View>


                    <FlatGrid
                        // itemDimension={120}
                        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                        renderItem={({ item }) => (<BasicNoteDisplay />)}
                    />
                </View>

            </View>



        </BasicBackButtonLayout>
    )
}