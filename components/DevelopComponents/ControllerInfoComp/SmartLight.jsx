import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity, ScrollView, Modal, Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import { ColorWheel } from 'react-native-color-wheel';
import Light from "../PhotosComponents/Light"
import { useRouter } from 'expo-router';
import Back from "../PhotosComponents/Back"
import LightOn from "../PhotosComponents/LightOn"
import LightOff from "../PhotosComponents/LightOff"
import { Header } from "../Header"
import ColorPicker from 'react-native-wheel-color-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

export const SmartLight = ({ data, socket }) => {
  console.log("data ",data)
  const items = ["Чтение", 'Ночь', 'Вечеринка', 'Джунгли', "Неон", "Свеча", "Цвет"];
  const effectArr = {
    reading: "Чтение",
    night: "Ночь",
    party: "Вечеринка",
    jungle: 'Джунгли',
    neon: "Неон",
    candle: "Свеча",
    color: "Цвет",
  };
  const modes = ["Безопасный", "Ручной", "Авто"];
  const modesArr = {
    AUTO: "Авто",
    MANUAL: "Ручной",
    SECURITY: "Безопасный"
  }
  const [color, setColor] = useState(data.payload.color);
  const [isOpen, setIsOpen] = useState(false);
  const startEffect = Object.keys(effectArr).find((key) => {
    if (key == data.payload.effect) {
      return key
    }
  })
  const startMode = Object.keys(modesArr).find((key) => {
    if (key == data.payload.mode) {

      return key
    }
  })
  const [selectedItem, setSelectedItem] = useState(effectArr[startEffect]);
  const [sliderValue, setSliderValue] = useState(Number(data.payload.brightness));
  const [on, setOn] = useState(data.payload.state);
  const [off, setOff] = useState(!on);
  const [selectedMode, setSelectedMode] = useState(modesArr[startMode]);

  const router = useRouter();
  const handleColorChange = (colorObj) => {
    if (typeof colorObj === 'string') {
      setColor(colorObj);
    } else {
      const hex = hsvToHex(colorObj);
      setColor(hex);
    }
  };
  return (
    <View style={{ backgroundColor: 'white', height: "100%" }}>
      <Header />
      <ScrollView style={{ backgroundColor: 'white' }}>
        {/* <SafeAreaView> */}
        <View style={styles.title}>
          <View style={{ flexDirection: 'row' }}>
            <Light color={"#4C82FF"} />
            <View>
              <Text style={styles.titleText}>Умная подсветка</Text>
            </View>
          </View>
          <Pressable onPress={() => {
            router.back()
          }
          }>
            <Back />
          </Pressable>
        </View>
        <View style={styles.info}>
          <View style={styles.infoLine}>
            <Text style={styles.infoText}>Выбирайте подходящее освещение для любого времени суток
              — от тёплого уютного до яркого рабочего. Управляйте настройками прямо в приложении.</Text>
          </View>
          <View style={styles.infoLine}>
            <Text style={styles.infoLineText}>Состояние</Text>
            <Text style={styles.status}>{data.payload.state ? "Включена" : "Выключена"}</Text>
          </View>
        </View>
        {/* <Text style={{ fontSize: 20, marginLeft: 20, marginTop: 15 }}>Состояние:</Text> */}
        <View style={styles.onOff}>
          <View style={{ alignItems: 'center' }}>
            <Pressable disabled={on} onPress={async () => {
              // await socket.current.send(JSON.stringify(
              //   {
              //     topic: data.topic,
              //     deviceType: data.payload.deviceType,
              //     command: 'turn_on'
              //   }
              // ));
              setOn(!on);
              setOff(!off);
            }}>
              <LightOn color={on ? "#4C82FF" : "#8B8B8B"} />
            </Pressable>
            {on ? <Text style={{ color: '#4C82FF', marginTop: 5 }}>Настроить работу</Text> : <Text style={{ color: '#8B8B8B', marginTop: 5 }}>Настроить работу</Text>}

          </View>
          <View style={{ alignItems: 'center' }}>
            <Pressable disabled={off} onPress={async () => {
              await socket.current.send(JSON.stringify(
                // {
                //   topic: data.topic,
                //   deviceType: data.payload.deviceType,
                //   command: 'turn_off'
                // }
                {
                  type: 'command',
                  deviceId: data.payload.id,
                  command: 'off',
                }
              ));
              setOn(!on);
              setOff(!off);
            }}>
              <LightOff color={off ? "#4C82FF" : "#8B8B8B"} />
            </Pressable>
            {off ? <Text style={{ color: '#4C82FF', marginTop: 5 }}>Выключить</Text> : <Text style={{ color: '#8B8B8B', marginTop: 5 }}>Выключить</Text>}

          </View>
        </View>
        {on ?
          <View>
            <Text style={styles.settingsText}>Параметры настройки</Text>

            <View style={styles.container}>
              <ColorPicker
                color={color}
                onColorChange={handleColorChange}
                thumbSize={20}
                sliderSize={20}
                noSnap={true}
                row={false}
                style={styles.wheel}
              />
              <Text style={styles.text}>Цвет: {color}</Text>
            </View>
            <View style={styles.containerMode}>
              <Text style={styles.titleOfTheme}>Выберите режим работы</Text>

              <SegmentedControl
                values={modes}
                selectedIndex={modes.indexOf(selectedMode)}
                onChange={(event) => {
                  const selectedIndex = event.nativeEvent.selectedSegmentIndex;
                  setSelectedMode(modes[selectedIndex]);
                }}
                tintColor="#4C82FF"
                backgroundColor="#FFFFFF"
                activeFontStyle={styles.activeText}
                fontStyle={styles.inactiveText}
                style={styles.segmentedControl}
              />

              <View style={styles.selectedContainer}>
                <Text style={styles.selectedText}>Выбран режим:
                  <Text style={styles.selectedMode}> {selectedMode}</Text>
                </Text>
              </View>
            </View>
            <View style={styles.container}>
              <Text style={styles.titleOfTheme}>Тип свечения</Text>
              <Pressable
                style={styles.dropdownButton}
                onPress={() => setIsOpen(!isOpen)}
              >
                <Text style={styles.selectedItem}>{selectedItem}</Text>
              </Pressable>

              <Modal visible={isOpen} transparent={true} animationType="fade">
                <Pressable style={styles.modalOverlay} onPress={() => setIsOpen(false)}>
                  <View style={styles.dropdownList}>
                    {items.map((item, index) => (
                      <Pressable
                        key={index}
                        style={styles.item}
                        onPress={() => {
                          setSelectedItem(item);
                          setIsOpen(false);
                        }}
                      >
                        <Text>{item}</Text>
                      </Pressable>
                    ))}
                  </View>
                </Pressable>
              </Modal>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
              <Text style={styles.sliderText}>Яркость: {sliderValue}</Text>
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
                        type: 'command',
                        deviceId: data.payload.id,
                        command: "set_params",
                        params: {
                          color: color,
                          brightness: sliderValue,
                          effect: Object.keys(effectArr).find(
                            key => effectArr[key] === selectedItem
                          ),
                          mode: Object.keys(modesArr).find(
                            key => modesArr[key] === selectedMode
                          ),
                        }
                      }
                    ));
                    setOn(true);
                    setOff(false);
                    Alert.alert('Успех', 'Параметры настройки успешно изменены!');
                  }
                  }
                >
                  <Text style={styles.btnText}>Изменить настройки</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
            {/* </SafeAreaView> */}
          </View>
          : null
        }

      </ScrollView>
    </View>

  );
};

const hsvToHex = (hsv) => {
  const { h, s, v } = hsv;
  const f = (n, k = (n + h / 60) % 6) =>
    v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  const r = Math.round(f(5) * 255);
  const g = Math.round(f(3) * 255);
  const b = Math.round(f(1) * 255);
  return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    zIndex: 0,
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    marginTop: 20,
  },
  wheel: {
    width: 250,
    height: 250,
    marginBottom: 20
  },
  preview: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
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
  dropdownButton: {
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#4C82FF',
    backgroundColor: "white",
    borderRadius: 16,
  },
  sliderText: {
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',

  },
  dropdownList: {
    backgroundColor: 'white',

    width: 200,
    borderRadius: 5,
    padding: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedItem: {
    color: '#4C82FF'
  },
  onOff: {
    marginTop: 30,
    marginBottom: 15,
    paddingBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#8b8b8b',
  },
  infoText: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#8B8B8B"
  },
  settingsText: {
    marginLeft: 20,
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: 600,

  },

  containerMode: {
    flex: 1,
    padding: 24,
  },
  titleOfTheme: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  segmentedControl: {
    height: 44,
    borderRadius: 8,
    borderColor: '#4C82FF',
    marginBottom: 24,
  },
  activeText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  inactiveText: {
    color: '#4C82FF',
  },
  selectedContainer: {
    backgroundColor: '#E8F0FE',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedText: {
    color: '#555',
    fontSize: 16,
  },
  selectedMode: {
    color: '#4C82FF',
    fontWeight: 'bold',
  },
});
