import {Share, StyleSheet, ActionSheetIOS, Button, Alert, SafeAreaView, TouchableOpacity, Pressable} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import { RootTabScreenProps } from '../types';
import useColorScheme from "../hooks/useColorScheme";
import Colors from '../constants/Colors';
import { Text, View } from '../components/Themed';
import { FontAwesome } from "@expo/vector-icons";

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [runs, setRuns] = useState(0);
  const [target, setTarget] = useState(0);
  const [wide, setWide] = useState(0);
  const [noball, setNoBall] = useState(0);
  const remain = (target - runs);
  const ONE_SECOND_IN_MS = 1000;
  const [overs, setOvers] = useState(0);
  const [balls, setBalls] = useState(0);
  const colorScheme = useColorScheme();



  const PATTERN = [
    1 * ONE_SECOND_IN_MS,
    2 * ONE_SECOND_IN_MS,
    3 * ONE_SECOND_IN_MS
  ];
  useEffect(() => {
    if (balls == 6) {
      setBalls(0);
      setOvers(overs + 1);
    }
  })

  const getCurrentDate=()=>{

    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    return month + '-' + date + '-' + year;//format: dd-mm-yyyy;
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `CricCounter Score - ${getCurrentDate()}:\n\nBalls: ${balls}\nRuns: ${runs}\nOvers: ${overs}`,
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

  const resetMenuAll = () =>
      ActionSheetIOS.showActionSheetWithOptions(
          {
            options: ["Cancel", "No Balls", "Overs", "Balls", "Wides", "Runs", "Reset All"],
            destructiveButtonIndex: 6,
            cancelButtonIndex: 0,
            userInterfaceStyle: "dark",
          },
          buttonIndex => {
            if (buttonIndex === 0) {
              // cancel action
            } else if (buttonIndex === 1) {
              setNoBall(0)
            } else if (buttonIndex === 2) {
              setOvers(0)
            } else if (buttonIndex == 3) {
              setBalls(0)
            } else if (buttonIndex == 4) {
              setWide(0)
            } else if (buttonIndex == 5) {
              setRuns(0)
            } else if (buttonIndex == 6) {
              setRuns(0)
              setWide(0)
              setBalls(0)
              setOvers(0)
              setNoBall(0)
            }

          }
      );

  return (
      <SafeAreaView>
        <View style={styles.runsContainer}>
          <Text style={styles.runsTitle} lightColor="#000" darkColor="#FFF">
            Runs: {runs}
          </Text>
          <Text style={styles.runsTarget}>Target: {target}</Text>
          <View style={styles.buttonseperate}/>
          <View style={styles.runsRow}>
            <Text style={styles.runsRow}>W: {wide} </Text>
            <Text style={styles.runsRow}>NB: {noball} </Text>
          </View>
          <View style={styles.buttonseperate}/>
          <View style={styles.buttonseperate}/>

          <View style={styles.buttonseperate}/>
          <View style={styles.runsFixRow}>
            <Button
                onPress={() => {setRuns(runs - 1),setWide(wide - 1)}}
                title="-1 W"
                color="#da8fff"
            />
            <Button
                onPress={() => {setRuns(runs + 1),setWide(wide + 1)}}
                title="+1 W"
                color="#da8fff"
            />
            <Button
                onPress={() => {setRuns(runs - 1),setNoBall(noball - 1)}}
                title="-1 NB"
                color="#da8fff"
            />
            <Button
                onPress={() => {setRuns(runs + 1),setNoBall(noball + 1)}}
                title="+1 NB"
                color="#da8fff"
            />

          </View>
          <View style={styles.buttonseperate}/>
          <View style={styles.runsFixRow2}>
            <Button
                onPress={() => {setRuns(runs + 4),setBalls(balls + 1)}}
                title="+4"
                color="#ffd426"
            />
            <Button
                onPress={() => {setRuns(runs - 1)}}
                title="-1"
            />
            <Button
                onPress={() => {setRuns(runs + 1)}}
                title="+1"
            />
            <Button
                onPress={() => {setRuns(runs + 6),setBalls(balls + 1)}}
                title="+6"
                color="#ffd426"
            />
          </View>
          <View style={styles.buttonseperate}/>
          {/*<Button onPress={onPress} title="Reset Menu" color="#ff453a"/>*/}
          <Button
              onPress={() => {setTarget(runs), setRuns(0),Alert.alert('Target set/reset. \nBe aware this also resets your runs.')}} title="Set/Reset Target" color="#64d3ff"
          />
          <View style={styles.buttonseperate}/>
          <Button
              onPress={() => {
                Alert.alert(`${target - runs} needed to win.`)}} title="Target Distance" color="#64d3ff"
          />
          <View style={styles.buttonseperate}/>
          <Button
              onPress={() => {onShare()}} title="Save Score" color="#008f11"
          />
          <View style={styles.buttonseperate}/>
          <Button onPress={resetMenuAll} title="Reset Menu" color="#ff453a"/>
          <View style={styles.buttonseperate}/>
        </View>
        <View style={styles.ballsContainer}>
          <Text style={styles.ballsTitle}>Balls: {balls} </Text>
          <View style={styles.ballsButtonseperate}/>
          <View style={styles.ballsButtonseperate}/>
          <View style={styles.ballsButtonseperate}/>
          <View style={styles.ballsFixRow}>
            <Button
                onPress={() => {setBalls(balls - 1)}}
                title="-1 Ball"
            />
            <View style={styles.ballsSeperate}/>
            <Button
                onPress={() => {setBalls(balls + 1)}}
                title="+1 Ball"
            />
          </View>
          <View style={styles.ballsButtonseperate}/>
        </View>
        <View style={styles.oversContainer}>
          <Text style={styles.oversTitle}>Overs: {overs} </Text>
          <View style={styles.buttonseperate}/>
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Balls
  ballsContainer:{
    marginTop: -120,
  },
  ballsTitle: {
    fontSize: 38,
    fontWeight: '700',
    marginVertical: 1,
    marginTop: 15,
    alignItems: 'flex-start',
    textAlign: 'center',
    justifyContent: 'center',
  },
  ballsMovement: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  ballsSeperate: {
    marginVertical: 13,
    height: 1,
    width: '1 %',
    color: '#FFF'
  },
  ballsButtonseperate: {
    marginVertical: 5,
    height: 1,
    width: '1 %',
    color: '#FFF'
  },
  ballsFixRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 80,
    marginHorizontal: 110,
    backgroundColor: "#1c1c1c",
    padding: 6,
    borderRadius: 29,
    paddingEnd: 12,
    paddingLeft: 12,
  },


  // Overs
  oversContainer:{
    marginBottom: -25,
  },
  oversTitle: {
    fontSize: 38,
    fontWeight: '700',
    marginBottom: -8,
    marginTop: -60,
    height: 240,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  oversMovement: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  oversSeperate: {
    marginVertical: 12,
    height: 1,
    width: '1%',
  },
  oversButtonseperate: {
    marginVertical: 9,
    height: 1,
    width: '1 %',
    color: '#FFF'
  },
  oversMoveButton: {
    marginTop: 9,
  },
  oversFixRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },



  // Runs
  runsContainer:{
    marginBottom: 110,
  },
  runsTitle: {
    fontSize: 38,
    fontWeight: '700',
    marginTop: 25,
    height: 50,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  runsButtonfontsize: {
    fontSize: 13,
  },
  runsTarget: {
    fontSize: 19,
    fontWeight: '600',
    color: '#64d3ff',
    marginTop: 9,
    height: 22,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  runsRow: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#da8fff',
    marginTop: 9,
    marginHorizontal: 50,
    height: 22,
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  runsMovement: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  runsSeperate: {
    marginVertical: 10,
    height: 1,
    width: '1%',
  },
  runsMoveButton: {
    marginTop: 1,
  },
  runsFixRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
    marginTop: 2,
    marginHorizontal: 47,
    backgroundColor: "#1c1c1c",
    padding: 6,
    borderRadius: 29,
    paddingEnd: 15,
    paddingLeft: 15,
  },
  runsFixRow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginTop: 13,
    marginHorizontal: 80,
    backgroundColor: "#1c1c1c",
    padding: 6,
    borderRadius: 29,
    paddingEnd: 15,
    paddingLeft: 15,
  },



  buttonseperate: {
    marginVertical: 3,
    height: 1,
    width: '1 %',
    color: '#FFF'
  },
});
