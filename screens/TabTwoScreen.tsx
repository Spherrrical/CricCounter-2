import {Button, Linking, StyleSheet, Pressable, Share, Alert, TextInput} from 'react-native';
import React, { useCallback, useState } from "react";
import EditScreenInfo from '../components/EditScreenInfo';
import Modal from "react-native-modal";
import { Text, View } from '../components/Themed';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Haptics from "expo-haptics";
import {isUsingEmbeddedAssets} from "expo-updates";


export default function TabTwoScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Live Scoring</Text>
      {/*<View style={styles.separator}></View>*/}
      <Text style={styles.header}>Continue with Apple to start setup.</Text>
      <View style={styles.separator}></View>

      <SignApple></SignApple>
    </View>
  );
}

function SignApple() {
  return (
      <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
          cornerRadius={5}
          style={{ width: 190, height: 39 }}
          onPress={async () => {
            try {
              const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                  AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                  AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
              });
              // signed in
            } catch (e) {
              if (e.code === 'ERR_CANCELED') {
                // handle that the user canceled the sign-in flow
              } else {
                // handle other errors
              }
            }
          }}
      />
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
    fontSize: 29,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 7,
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
