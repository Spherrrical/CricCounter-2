import {Button, Linking, StyleSheet, Pressable, Share, Alert, TextInput} from 'react-native';
import React, { useCallback, useState } from "react";
import EditScreenInfo from '../components/EditScreenInfo';
import Modal from "react-native-modal";
import { Text, View } from '../components/Themed';

export default function Scores() {

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };


    const supportedURL = "https://google.com";
    const [name, setName] = useState("");
    const unsupportedURL = "slack://open?team=123456";
    // @ts-ignore
    const OpenURLButton = ({ url, children }) => {
        const handlePress = useCallback(async () => {
            // Checking if the link is supported for links with custom URL scheme.
            const supported = await Linking.canOpenURL(url);

            if (supported) {
                // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                // by some browser in the mobile
                await Linking.openURL(url);
            } else {
                Alert.alert(`Woah!\nThis button is not yet usable. Sorry!`);
            }
        }, [url]);

        return <Button title={children} onPress={handlePress} />;
    };

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: `CricCounter Score`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                    console.log("1")
                } else {
                    // shared
                    console.log("2")
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
                console.log("3")
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Scores</Text>
            <Text style={styles.header}>PBS allows team managers to score per player.</Text>
            <View style={styles.info}>
                <OpenURLButton url={unsupportedURL}>More Information</OpenURLButton>
            </View>
            <Button
                onPress={() => {
                    Alert.alert(`In development. Sorry!`)}} title="Begin Setup" color="#64d3ff"
            />
            {/*<TextInput*/}
            {/*    style={styles.input}*/}
            {/*    returnKeyType="go"*/}
            {/*    onSubmitEditing={(value) => setName(value.nativeEvent.text)}*/}
            {/*/>*/}
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        borderColor: "white",
        backgroundColor: "white",
        width: "30%",
        borderWidth: 1,
        borderRadius: 14,
        padding: 10,
        color: "black",
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    header: {
        fontSize: 15,
        fontWeight: '400',
        justifyContent: 'center',
        flexWrap: "wrap",
        marginHorizontal: 40,
    },
    info: {
        fontSize: 10,
        fontWeight: '500',
        marginTop: 10,
        justifyContent: 'center',
        flexWrap: "wrap",
        marginHorizontal: 40,
    },
    separator: {
        marginVertical: 14,
        height: 1,
        width: '80%',
    },
});
