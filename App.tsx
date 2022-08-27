import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation, {MyDrawer} from './navigation';
import * as React from "react";
import {NavigationContainer} from "@react-navigation/native";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
          {/*<NavigationContainer>*/}
          {/*    <MyDrawer></MyDrawer>*/}
          {/*</NavigationContainer>*/}
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
