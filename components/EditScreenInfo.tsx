import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

export default function EditScreenInfo({ path }: { path: string }) {
  return (
      <View style={styles.getStartedContainer}>
        <View
          style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
          darkColor="rgba(255,255,255,0.05)"
          lightColor="rgba(0,0,0,0.05)">
          <MonoText>{path}</MonoText>
        </View>

      </View>
  );
}

function currentProject() {
  WebBrowser.openBrowserAsync(
    'https://expo.dev/@spherical/cricketcounter?serviceType=classic&distribution=expo-go'
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 0,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 11,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 0,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});
