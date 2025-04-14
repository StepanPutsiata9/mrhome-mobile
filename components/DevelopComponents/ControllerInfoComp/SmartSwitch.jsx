import { ScrollView, Text } from "react-native";
import { View, StyleSheet, Pressable } from "react-native"
import { Header } from "../Header";
import Back from "../PhotosComponents/Back"
import SwitchOutline from "../PhotosComponents/SwitchOutline";
import { useRouter } from "expo-router";
import { useState } from "react";

import SwitchOn from "../PhotosComponents/SwitchOn"
import SwitchOff from "../PhotosComponents/SwitchOff"
export default function SmartSwitch({ data, socket }) {
  const router = useRouter();
  const [on, setOn] = useState(data.state == "Включен" ? true : false);
  const [off, setOff] = useState(!on);
  return (
    <ScrollView style={styles.switch}>
      <Header />
      <View style={styles.title}>
        <View style={{ flexDirection: 'row' }}>
          <SwitchOutline color={"#4C82FF"} />
          <View>
            <Text style={styles.titleText}>Умный выключатель</Text>
          </View>
        </View>
        <Pressable onPress={() => router.back()}>
          <Back />
        </Pressable>
      </View>
      <View style={styles.info}>
        <View style={styles.infoLine}>
          <Text style={styles.infoText}>Включайте и выключайте свет, розетки и другие устройства удалённо
             — через смартфон или с помощью голосового помощника.</Text>
        </View>
        <View style={styles.infoLine}>
          <Text style={styles.infoLineText}>Состояние</Text>
          <Text style={styles.status}>{data.state}</Text>
        </View>
      </View>
      <View style={styles.onOff}>
        <View style={{ alignItems: 'center' }}>
          <Pressable disabled={on} onPress={async () => {
            await socket.current.send(JSON.stringify({ type: "onSmartSwitch" }));
            setOn(!on);
            setOff(!off)
          }}>
            <SwitchOn color={on ? "#4C82FF" : "#8B8B8B"} />
          </Pressable>
          {on ? <Text style={{ color: '#4C82FF' }}>Включен</Text> : <Text style={{ color: '#8B8B8B' }}>Включен</Text>}

        </View>
        <View style={{ alignItems: 'center' }}>
          <Pressable disabled={off} onPress={async () => {
            await socket.current.send(JSON.stringify({ type: "offSmartSwitch" }));
            setOn(!on);
            setOff(!off)
          }}>
            <SwitchOff color={off ? "#4C82FF" : "#8B8B8B"} />
          </Pressable>
          {off ? <Text style={{ color: '#4C82FF' }}>Выключен</Text> : <Text style={{ color: '#8B8B8B' }}>Выключен</Text>}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  switch: {
    backgroundColor: "white",
    width: "100%",
    // height:"100%"
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginVertical: 15
  },
  titleText: {
    fontSize: 20,
    marginLeft: 10,
  },
  infoLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    marginVertical: 5,
    marginBottom:20
  },
  infoLineText: {
    fontSize: 16,
  },
  status: {
    color: "#8B8B8B",
    fontSize: 16
  },
  onOff: {
    marginTop: 30,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50
  },
  infoText:{
    fontFamily:"Roboto",
    fontSize:16,
    color:"#8B8B8B"
  },
});
