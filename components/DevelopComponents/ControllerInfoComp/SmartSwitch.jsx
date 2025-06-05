import { ScrollView, Text } from "react-native";
import { View, StyleSheet, Pressable } from "react-native"
import { Header } from "../Header";
import Back from "../PhotosComponents/Back"
import SwitchOutline from "../PhotosComponents/SwitchOutline";
import { useRouter } from "expo-router";
import { useState } from "react";

import SwitchOn from "../PhotosComponents/SwitchOn"
import SwitchOff from "../PhotosComponents/SwitchOff"
import { SafeAreaView } from "react-native-safe-area-context";
export default function SmartSwitch({ data, socket }) {
  const router = useRouter();
  const [on, setOn] = useState(data.payload.state == "on" ? true : false);
  const [off, setOff] = useState(!on);
  return (
    <View style={{ backgroundColor: 'white',height:"100%" }}>
      <Header />
      <ScrollView style={styles.switch}>
        {/* <SafeAreaView> */}
        <View style={styles.title}>
          <View style={{ flexDirection: 'row' }}>
            <SwitchOutline color={"#4C82FF"} />
            <View>
              <Text style={styles.titleText}>Умное окно</Text>
            </View>
          </View>
          <Pressable onPress={() => router.back()}>
            <Back />
          </Pressable>
        </View>
        <View style={styles.info}>
          <View style={styles.infoLine}>
            <Text style={styles.infoText}>Настраивайте работку умного окна удалённо
              — через смартфон или с помощью голосового помощника.</Text>
          </View>
          <View style={styles.infoLine}>
            <Text style={styles.infoLineText}>Состояние</Text>
            <Text style={styles.status}>{data.payload.state === "on" ? "Включен" : "Выключен"}</Text>
          </View>
        </View>
        <View style={styles.onOff}>
          <View style={{ alignItems: 'center' }}>
            <Pressable disabled={on} onPress={async () => {
              await socket.current.send(JSON.stringify(
                {
                  topic: data.topic,
                  deviceType: data.payload.deviceType,
                  command: 'turn_on'
                }
              ));
              setOn(!on);
              setOff(!off)
            }}>
              <SwitchOn color={on ? "#4C82FF" : "#8B8B8B"} />
            </Pressable>
            {on ? <Text style={{ color: '#4C82FF' }}>Включен</Text> : <Text style={{ color: '#8B8B8B' }}>Включен</Text>}
          </View>
          <View style={{ alignItems: 'center' }}>
            <Pressable disabled={off} onPress={async () => {
              await socket.current.send(JSON.stringify(
                {
                  topic: data.topic,
                  deviceType: data.payload.deviceType,
                  command: 'turn_off'
                }
              ));
              setOn(!on);
              setOff(!off)
            }}>
              <SwitchOff color={off ? "#4C82FF" : "#8B8B8B"} />
            </Pressable>
            {off ? <Text style={{ color: '#4C82FF' }}>Выключен</Text> : <Text style={{ color: '#8B8B8B' }}>Выключен</Text>}
          </View>
        </View>
        {/* </SafeAreaView> */}
      </ScrollView>
    </View>

  )
}

const styles = StyleSheet.create({
  switch: {
    backgroundColor: "white",
    width: "100%",
    // paddingTop: 50,
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
    marginBottom: 20
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
  infoText: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#8B8B8B"
  },
});
