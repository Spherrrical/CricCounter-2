import { StatusBar } from 'expo-status-bar';
import {FlatList, Platform, StyleSheet, Switch} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import {Text, useThemeColor, View} from '../components/Themed';
import useColorScheme from "../hooks/useColorScheme";
import {useTheme} from "@react-navigation/native";
import * as Device from 'expo-device';



export default function ModalScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getCurrentBuildNum = async () => {
    try {
      const response = await fetch('https://api.flybywiresim.com/api/v1/git-versions/Spherrrical/CricketCounterV2/branches/master/');
      const json = await response.json();
        const js5 = (json.shortSha.shortSha);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCurrentBuildNum();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>CricCounterV2 Development Client</Text>
      <View style={styles.separator}></View>
      <Text style={styles.header}>You are on iOS {Device.osVersion} - Running Build Number {Device.osInternalBuildId}</Text>
      <View style={styles.separator}></View>
      <Text style={styles.header}>{Device.modelName}</Text>
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
