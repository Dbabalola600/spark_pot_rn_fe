import { View, Image } from "react-native"
import BasicBackButtonLayout from "../../../components/Layout/BasicBackButtonLayout"
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useEffect, useState } from "react";
import AppButton from "../../../components/Display/AppButton";
import apptw from "../../../utils/lib/tailwind";
import { RootStackParamList } from "../../allroutes";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import * as ImageManipulator from 'expo-image-manipulator';

type UploadPictureScreenProps = RouteProp<RootStackParamList, "UploadPictureScreen">

type Props = {
    route: UploadPictureScreenProps
}
const UploadPictureScreen: React.FC<Props> = ({ route }) => {
    const [image, setImage] = useState<string | null>(null);
    const [base64Image, setBase64Image] = useState<string | null>(null);
    const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm()


    const navigation = useNavigation()

    useEffect(() => {
        (async () => {

            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission denied');
            }
        })();
    }, []);

    const pickImage = async () => {
        // Launch the image picker
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 10],
            quality: 0.1,
            base64: true
        });
        if (!result.canceled) {
            // Resize the image
            const resizedImage = await ImageManipulator.manipulateAsync(
                result.assets[0].uri,
                [{ resize: { width: 500 } }], // Resize to width of 1000 pixels. Adjust as needed.
                { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
            );

            setImage(resizedImage.uri)
            convertImageToBase64(resizedImage.uri)
        }
    };

    const convertImageToBase64 = async (uri: string) => {
        try {
            const base64 = await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64,
            });
            setBase64Image(`data:image/jpeg;base64,${base64}`);
        } catch (error) {
            console.error('Error converting image to base64:', error);
        }
    };



    const gotoReviewScreen = handleSubmit((data) => {
        const newInfo = route.params.reqData

        const image = {
            image: base64Image
        }

        Object.assign(newInfo, image)

        navigation.navigate("ReviewNewScreen", { reqData: newInfo })

    })

    return (
        <BasicBackButtonLayout pageTitle="Upload ">
            <View
                style={apptw`px-2`}
            >

                <View
                    style={apptw`mx-auto`}
                >

                    {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginBottom: 20 }} />} */}
                    {base64Image && (
                        <Image source={{ uri: base64Image }} style={{ width: 400, height: 200, marginBottom: 20 }} />
                    )}
                </View>


                <AppButton
                    onPress={pickImage}
                    text="Pick an image from camera roll "
                    buttonStyle={apptw`my-10`}
                />

                {
                    base64Image &&
                    <AppButton
                        onPress={gotoReviewScreen}
                        text="Next"

                    />
                }

            </View>
        </BasicBackButtonLayout>
    )
}


export default UploadPictureScreen

