import { ScrollView, Text } from "react-native";
import { View, StyleSheet, Pressable,TouchableOpacity } from "react-native"
import { Header } from "../Header";
import Back from "../PhotosComponents/Back"
import SwitchOutline from "../PhotosComponents/SwitchOutline";
import { useRouter } from "expo-router";
import { useState } from "react";
import Slider from '@react-native-community/slider';
import SwitchOn from "../PhotosComponents/SwitchOn"
import SwitchOff from "../PhotosComponents/SwitchOff"
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
export default function SmartSwitch({ data, socket }) {
  const router = useRouter();
  const [on, setOn] = useState(data.payload.state);
  const [off, setOff] = useState(!on);
  const [sliderValue, setSliderValue] = useState(Number(data.payload.angle));

  return (
    <View style={{ backgroundColor: 'white', height: "100%" }}>
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
        <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
          <Text style={styles.sliderText}>Угол открытия: {sliderValue}</Text>
          <Slider
            minimumValue={1}
            maximumValue={100}
            step={1}
            value={sliderValue}
            onValueChange={(value) => setSliderValue(Math.round(value))}
            minimumTrackTintColor="#4C82FF"
            maximumTrackTintColor="#000000"
            thumbTintColor="#4C82FF"
          />
        </View>
        <View style={{ margin: "auto", marginBottom: 65 }}>
          <LinearGradient
            colors={['#195dfc', '#4C82FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBtn}
          >
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.7}
              onPress={async () => {
                await socket.current.send(JSON.stringify(
                  {
                    topic: data.topic,
                    deviceType: data.payload.deviceType,
                    command: 'set_params',
                    params: {
                      targetServoPos: sliderValue,
                    }
                  }
                ));
                setOn(true);
                setOff(false);
                Alert.alert('Параметры настройки успешно изменены!')
              }}
            >
              <Text style={styles.btnText}>Изменить настройки</Text>
            </TouchableOpacity>
          </LinearGradient>
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
  sliderText: {
    fontSize: 18,
    marginBottom: 3
  },
  gradientBtn: {
    borderRadius: 16,
    shadowColor: '#4C82FF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  btn: {
    borderRadius: 16,
    paddingHorizontal: 60,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '400',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
