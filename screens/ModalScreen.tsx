import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Switch } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import {Text, useThemeColor, View} from '../components/Themed';
import useColorScheme from "../hooks/useColorScheme";
import {useTheme} from "@react-navigation/native";


export default function ModalScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.header}>CricCounterV2 Development Client</Text>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 14,
    fontWeight: '400',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
