import { StyleSheet, View, Pressable, ScrollView, Text, TextInput, Modal, TouchableOpacity } from 'react-native';
import { Header } from "../../components/DevelopComponents/Header"
import { useRouter } from 'expo-router';
import SunRise from "../../components/DevelopComponents/PhotosComponents/SunRise"
import Moon from "../../components/DevelopComponents/PhotosComponents/Moon"
import Back from "../../components/DevelopComponents/PhotosComponents/Back"
import Lamp from "../../components/DevelopComponents/PhotosComponents/Lamp"
import Briefcase from "../../components/DevelopComponents/PhotosComponents/Briefcase"
import Balloon from "../../components/DevelopComponents/PhotosComponents/Balloon"
import Sun from "../../components/DevelopComponents/PhotosComponents/Sun"
import SunSet from "../../components/DevelopComponents/PhotosComponents/SunSet"
import Lightning from "../../components/DevelopComponents/PhotosComponents/Lightning"
import Egg from "../../components/DevelopComponents/PhotosComponents/Egg"
import Default from "../../components/DevelopComponents/PhotosComponents/Default"
import Cup from "../../components/DevelopComponents/PhotosComponents/Cup"
import CloudySun from "../../components/DevelopComponents/PhotosComponents/CloudySun"
import CloudyMoon from "../../components/DevelopComponents/PhotosComponents/CloudyMoon"
import CPU from "../../components/DevelopComponents/PhotosComponents/CPU"
import ToArrow from "../../components/DevelopComponents/PhotosComponents/toArrow"
import { useContext, useState } from 'react';
import { SocketContext } from '../_layout';
import { ScenariiContext } from './ScenariiContext';

export default function NewScen() {

  const { socket, data } = useContext(SocketContext);
  const { isListEmpty, setIsListEmpty, controllerState,
    setControllerState, scenariiState, setScenariiState, scenCount,
    setScenCount, controllerStateScen, setControllerStateScen
  } = useContext(ScenariiContext);

  const [title, setTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false)
  const icons = [
    <SunRise />, <Briefcase />, <Lamp />, <Balloon />, <Moon />, <Sun />,
    <SunSet />, <Lightning />, <Egg />, <Cup />, <CloudySun />, <CloudyMoon />, <CPU />
  ];
  const componentsIcon = {
    sunrise: <SunRise />,
    briefcase: <Briefcase />,
    lamp: <Lamp />,
    balloon: <Balloon />,
    moon: <Moon />,
    sun: <Sun />,
    sunset: <SunSet />,
    lightning: <Lightning />,
    egg: <Egg />,
    cup: <Cup />,
    cloudySun: <CloudySun />,
    cloudyMoon: <CloudyMoon />,
    cpu: <CPU />,
  };
  const [selectedItem, setSelectedItem] = useState("");
  const router = useRouter();
  return (
    <ScrollView>
      <Header />
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Новый сценарий</Text>
          <Pressable
            onPress={() => router.back()}>
            <Back />
          </Pressable>

        </View>
        <TextInput
          value={title}
          placeholder='Название сценария'
          style={styles.input}
          onChangeText={setTitle}
          autoCapitalize="none"
        />
        <View style={styles.iconBlock}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Pressable
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={() => {
                setIsOpen(true)
              }}>
              <Text>Иконка</Text>

              <Modal visible={isOpen} transparent={true} animationType="fade">
                <Pressable style={styles.modalOverlay} onPress={() => setIsOpen(false)}>
                  <View style={styles.dropdownList}>
                    {icons.map((item, index) => (
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
              <ToArrow />
            </Pressable>

          </View>
          <View>
            <Text>{selectedItem}</Text>
          </View>
        </View>
        <View style={styles.itemsState}>
          <Text style={styles.itemStateText}>Состояние элементов :</Text>
        </View>
        <View style={styles.controllersView}>
          {controllerState.length == 0 ?
            <Text style={styles.emptyList}>Добавленных элементов пока нет</Text>
            :
            controllerState.map((item, key) => {
              const keys = Object.keys(item.payload);
              const values = Object.values(item.payload);
              return (
                <View style={styles.viewConroller} key={key}>
                  <Text style={styles.titleController}>{item.title}</Text>
                  <View style={styles.infoView}>
                    <View style={styles.commandView}>
                      {keys.map((i, index) => {
                        if (i != null) return <Text style={{ marginBottom: 5 }} key={index}>{i}</Text>
                      })}
                    </View>
                    <View style={styles.stateView}>
                      {values.map((i, index) => {
                        if (i != null) return <Text style={{ color: '#8b8b8b', textAlign: 'right', marginBottom: 5 }} key={index}>{i}</Text>
                      })}
                    </View>
                  </View>
                </View>
              )
            })
          }
        </View>
        <View style={styles.addController}>
          <TouchableOpacity
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            onPress={() => {
              router.push('/(scen)/AddControllersToScenarii')
            }}>
            <Text style={styles.addControllerText}>Добавить элемент</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnBlock}>
          {!controllerState.length == 0 &&
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.7}

              onPress={() => {
                setScenariiState(prev => [
                  {
                    state: {
                      title: title || "Без названия",
                      icon: Object.keys(componentsIcon).find(
                        key => componentsIcon[key].type === selectedItem.type
                      ) || "default",
                      modalVisible: false,
                      controllerState: controllerState,
                    },
                    steps: controllerStateScen,
                    id: scenCount,
                  }
                  , ...prev
                ])
                setScenCount(scenCount + 1);

                setControllerState([]);
                setControllerStateScen([]);
                router.back();
              }}>
              <Text style={styles.btnText}>Добавить сценарий</Text>
            </TouchableOpacity>
          }
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  titleText: {
    fontSize: 20,
  },

  input: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#ECEEF4',
    color: '#8B8B8B',
  },
  iconBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  dropdownList: {
    backgroundColor: 'white',

    width: 320,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 5,
    padding: 10,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedItem: {
    color: '#4C82FF'
  },
  itemsState: {
    marginTop: 10,
  },
  itemStateText: {
    fontSize: 20,
    fontWeight: 500,
  },
  addController: {
    marginTop: 20,
  },
  addControllerText: {
    color: '#8B8B8B',
    textDecorationLine: "underline",
  },
  emptyList: {
    textAlign: 'center',
    marginTop: 20,
  },
  btnBlock: {
    marginTop: 20,
  },
  btn: {
    borderRadius: 16,
    backgroundColor: '#4C82FF',

    paddingHorizontal: 60,
    paddingVertical: 15,
    marginVertical: 10
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    margin: 'auto'

  },
  viewConroller: {
    paddingHorizontal: 10,
    marginVertical: 5
  },
  titleController: {
    fontSize: 18,
    fontWeight: 400,
  },
  infoView: {
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  commandView: {
    marginVertical: 10
  }
});


// {
//   "name": "test-scenario",
//   "description": "Включить свет → выключить через 3 секунды",
//   "steps": [
//     {
//       "type": "command",
//       "deviceTopic": "light_1",
//       "deviceType": "light",
//       "commandName": "on"
//     },
//     {
//       "type": "delay",
//       "delayMs": 3000
//     },
//     {
//       "type": "command",
//       "deviceTopic": "light_1",
//       "deviceType": "light",
//       "commandName": "off"
//     }
//   ]
// }
