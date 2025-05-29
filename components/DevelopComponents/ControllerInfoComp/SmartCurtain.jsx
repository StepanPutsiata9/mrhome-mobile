import { ScrollView, Text } from "react-native";
import { View, StyleSheet, Pressable } from "react-native"
import { Header } from "../Header";
import Back from "../PhotosComponents/Back"
import { useRouter } from "expo-router";
import { useState } from "react";
import Shtora from "../PhotosComponents/Shtora";
import ShtoraOpen from "../PhotosComponents/ShtoraOpen";
import ShtoraClose from "../PhotosComponents/ShtoraClose";
import { SafeAreaView } from "react-native-safe-area-context";


export default function SmartCurtain({ data, socket }) {
  const router = useRouter();
  const [on, setOn] = useState(data.payload.state == "on" ? true : false);
  const [off, setOff] = useState(!on);
  return (
    <ScrollView style={styles.switch}>
      <SafeAreaView>
      <Header />
      <View style={styles.title}>
        <View style={{ flexDirection: 'row' }}>
          <Shtora color={"#4C82FF"} />
          <View>
            <Text style={styles.titleText}>Умная роль-штора</Text>
          </View>
        </View>
        <Pressable onPress={() => router.back()}>
          <Back />
        </Pressable>
      </View>
      <View style={styles.info}>
        <View style={styles.infoLine}>
          <Text style={styles.infoText}>Открывайте и закрывайте роль-шторы тогда,
            когда вам нужно — вручную через приложение или автоматически.</Text>
        </View>
        <View style={styles.infoLine}>
          <Text style={styles.infoLineText}>Состояние</Text>
          <Text style={styles.status}>{data.payload.state === "on" ? "Открыта" : "Закрыта"}</Text>
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
            <ShtoraOpen color={on ? "#4C82FF" : "#8B8B8B"} />
          </Pressable>
          {on ? <Text style={{ color: '#4C82FF' }}>Открыта</Text> : <Text style={{ color: '#8B8B8B' }}>Открыта</Text>}

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
            <ShtoraClose color={off ? "#4C82FF" : "#8B8B8B"} />
          </Pressable>
          {off ? <Text style={{ color: '#4C82FF' }}>Закрыта</Text> : <Text style={{ color: '#8B8B8B' }}>Закрыта</Text>}
        </View>
      </View>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  switch: {
    backgroundColor: "white",
    width: "100%",
    // paddingTop: 50,

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
