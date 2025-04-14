import {  StyleSheet ,Text,View,ImageBackground} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import SmartSwitch from "../components/DevelopComponents/ControllerInfoComp/SmartSwitch"
import {SmartLight} from "../components/DevelopComponents/ControllerInfoComp/SmartLight"
import SmartShtora from "../components/DevelopComponents/ControllerInfoComp/SmartShtora"
import TempSensor from "../components/DevelopComponents/ControllerInfoComp/TempSensor"
import MoveSensor from "../components/DevelopComponents/ControllerInfoComp/MoveSensor"
export default function ControllerInfo() {
  const {data,socket} = useLocalSearchParams();
  let comp=null;
  if(data.title=="Умная подсветка"){
    comp=<SmartLight data={data} socket={socket}/>
  }else if(data.title=="Умный выключатель"){
    comp=<SmartSwitch data={data} socket={socket}/>
  }else if(data.title=="Умная роль-штора"){
    comp=<SmartShtora data={data} socket={socket}/>
  }else if(data.title=="Датчик температуры"){
    comp=<TempSensor data={data} socket={socket}/>
  }else if(data.title=="Датчик движения"){
    comp=<MoveSensor data={data} socket={socket}/>
  }
  return (
    <ImageBackground
    source={require('../assets/images/Background.png')} 
          style={styles.background}
          resizeMode="cover"
    >
      
      {comp}

    </ImageBackground>
  
  );
}
const styles = StyleSheet.create({
  text:{
   flex:1,
   justifyContent:'center',
   alignItems:'center',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    zIndex:0,
  },
});
