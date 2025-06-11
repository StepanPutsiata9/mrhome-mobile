import { ScrollView, Text } from "react-native";
import { View, StyleSheet, Pressable, TouchableOpacity } from "react-native"
import { Header } from "../../../components/DevelopComponents/Header";
import Back from "../../../components/DevelopComponents/PhotosComponents/Back"
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import ShtoraOpen from "../../../components/DevelopComponents/PhotosComponents/ShtoraOpen";
import ShtoraClose from "../../../components/DevelopComponents/PhotosComponents/ShtoraClose";
import { ScenariiContext } from "../ScenariiContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient"
import Slider from '@react-native-community/slider';

export default function AddCurtain({ controller }) {

  const router = useRouter();
  const [on, setOn] = useState(true);
  const [off, setOff] = useState(!on);
  const { controllerState, setControllerState, setControllerStateScen } = useContext(ScenariiContext);
  const labels = {
    state: 'Состояние',
    targetServoPos: 'Уровень открытия шторы'

  };
  const [sliderValue, setSliderValue] = useState(50);

  const addController = (newItem, newItemScen) => {
    setControllerState(prevItems => {
      const itemIndex = prevItems.findIndex(item => item.title === newItem.title);

      if (itemIndex >= 0) {

        const updatedItems = [...prevItems];
        updatedItems[itemIndex] = newItem;
        return updatedItems;
      } else {

        return [...prevItems, newItem];
      }
    });
    setControllerStateScen(prevItems => {
      const itemIndex = prevItems.findIndex(item => item.deviceId === newItemScen.deviceId);

      if (itemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex] = newItemScen;
        return updatedItems;
      } else {

        return [...prevItems, newItemScen];
      }
    }

    )

  };
  return (
    <View style={{ flex: '1', backgroundColor: 'white', height: '100%' }}>
      <Header />
      <ScrollView style={styles.switch}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Новый сценарий</Text>
          <Pressable onPress={() => router.back()}>
            <Back />
          </Pressable>
        </View>
        <View style={styles.title}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View>
              <Text style={styles.titleTextController}>Умная роль-штора</Text>
            </View>
          </View>

        </View>
        <View style={styles.onOff}>
          <View style={{ alignItems: 'center' }}>
            <Pressable disabled={on} onPress={() => {
              setOn(!on);
              setOff(!off)
            }}>
              <ShtoraOpen color={on ? "#4C82FF" : "#8B8B8B"} />
            </Pressable>
            {on ? <Text style={{ color: '#4C82FF' }}>Открывать</Text> : <Text style={{ color: '#8B8B8B' }}>Открывать</Text>}

          </View>
          <View style={{ alignItems: 'center' }}>
            <Pressable disabled={off} onPress={
              () => {
                setOn(!on);
                setOff(!off)
              }}>
              <ShtoraClose color={off ? "#4C82FF" : "#8B8B8B"} />
            </Pressable>
            {off ? <Text style={{ color: '#4C82FF' }}>Закрывать</Text> : <Text style={{ color: '#8B8B8B' }}>Закрывать</Text>}
          </View>
        </View>
        {on ?
          <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
            <Text style={styles.sliderText}>Уровень открытия штор: {sliderValue}</Text>
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
          </View> :
          null
        }

        <View style={styles.btnBlock}>
          <LinearGradient
            colors={['#195dfc', '#4C82FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBtn}
          >
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.7}
              onPress={() => {
                addController(
                  {
                    title: "Умная роль-штора",
                    payload: {
                      [labels.state]: (on ? "Открывать" : "Закрывать"),
                      [labels.targetServoPos]: (on ? sliderValue : null),
                    }
                  },
                  on ?
                    {
                      type: "command",
                      deviceId: controller.deviceId,
                      commandName: "set_params",
                      params:
                      {
                        targetServoPos: sliderValue,
                        auto: false,
                      }

                    }
                    :
                    {
                      type: "command",
                      deviceId: controller.deviceId,
                      commandName: "off"
                    }
                );
                router.back();
              }}>
              <Text style={styles.btnText}>Добавить</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView >
    </View >
  )
}

const styles = StyleSheet.create({
  switch: {
    backgroundColor: "white",
    width: "100%",
    // paddingTop:50,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10
  },
  titleText: {
    fontSize: 24,
    // marginLeft:10,
  },
  titleTextController: {
    fontSize: 18
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
  btnBlock: {
    paddingHorizontal: 20,
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
  sliderText: {
    fontSize: 18,
    marginBottom: 3
  },
});
