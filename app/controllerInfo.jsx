import { StyleSheet, Text, ImageBackground } from 'react-native';
import { useContext } from 'react';
import SmartSwitch from "../components/DevelopComponents/ControllerInfoComp/SmartSwitch";
import { SmartLight } from "../components/DevelopComponents/ControllerInfoComp/SmartLight";
import SmartCurtain from "../components/DevelopComponents/ControllerInfoComp/SmartCurtain";
import TempSensor from "../components/DevelopComponents/ControllerInfoComp/TempSensor";
import MoveSensor from "../components/DevelopComponents/ControllerInfoComp/MoveSensor";
import { SocketContext } from '../app/_layout'; 
import { useLocalSearchParams } from 'expo-router';

export default function ControllerInfo() {
  const { socket, data } = useContext(SocketContext);
  const { id } = useLocalSearchParams();

  function findDeviceById(data, targetId) {
    if (!data) return null;
    const allDevices = Object.values(data).flat();
    return allDevices.find(device => device.id == targetId);
  }

  const controllerData = findDeviceById(data, id);

  // console.log('====================================');
  // console.log("id ", id);
  // console.log("controllerData ", controllerData);
  // console.log('====================================');

  const renderComponent = () => {
    if (!controllerData) {
      return <Text style={styles.text}>Устройство не найдено</Text>;
    }

    switch(controllerData.title) {
      case "Умная подсветка":
        return <SmartLight data={controllerData} socket={socket} />;
      case "Умный выключатель":
        return <SmartSwitch data={controllerData} socket={socket} />;
      case "Умная роль-штора":
        return <SmartCurtain data={controllerData} socket={socket} />;
      case "Датчик температуры":
        return <TempSensor data={controllerData} socket={socket} />;
      case "Датчик движения":
        return <MoveSensor data={controllerData} socket={socket} />;
      default:
        return <Text style={styles.text}>Неизвестный тип устройства</Text>;
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/Background.png')} 
      style={styles.background}
      resizeMode="cover"
    >
      {renderComponent()}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: 18,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
});