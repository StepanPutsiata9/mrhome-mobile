import React, { useState } from 'react';
import { View, Text, StyleSheet,Pressable, TouchableOpacity,ScrollView,Modal } from 'react-native';
import Slider from '@react-native-community/slider';
import {ColorWheel} from 'react-native-color-wheel';
import Light from "../PhotosComponents/Light"
import { useRouter } from 'expo-router';
import Back from "../PhotosComponents/Back"
import LightOn from "../PhotosComponents/LightOn"
import LightOff from "../PhotosComponents/LightOff"
import {Header} from "../Header"


export const SmartLight = ({data,socket}) => {
  const [color, setColor] = useState(data.color);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(data.glow);
  const items = ['Свечение', 'Мерцание', 'Затухание', 'Сплошной цвет'];
  const [sliderValue, setSliderValue] = useState(Number(data.brightness));
  const [on,setOn]=useState(data.state=="Включена"?true:false);
  const [off,setOff]=useState(!on);
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
    <ScrollView style={{backgroundColor:'white'}}>
        <Header/>
        <View style={styles.title}>
          <View style={{flexDirection:'row'}}>
          <Light color={"#4C82FF"}/>
            <View>
              <Text style={styles.titleText}>Умная подсветка</Text>
            </View>
          </View>
          <Pressable onPress={() =>
          { router.back()
             console.log(color)
          }
             }>
            <Back/>
          </Pressable>
        </View>
        <View style={styles.info}>
            <View style={styles.infoLine}>
              <Text style={styles.infoText}>Выбирайте подходящее освещение для любого времени суток
                 — от тёплого уютного до яркого рабочего. Управляйте настройками прямо в приложении.</Text>
            </View>
            <View style={styles.infoLine}>
              <Text style={styles.infoLineText}>Состояние</Text>
              <Text style={styles.status}>{data.state}</Text>
            </View>
        </View>
    <View style={styles.container}>
      <ColorWheel
        initialColor="#FF0000"
        onColorChange={handleColorChange}
        style={styles.wheel}
        thumbSize={20}
      />
      <Text style={styles.text}>Цвет: {color}</Text>
      
    </View>

    <View style={styles.container}>
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
      <Text>Яркость: {sliderValue}</Text>
      <Slider
        minimumValue={1}
        maximumValue={100}
        step={1} // Шаг изменения (можно убрать для плавного изменения)
        value={sliderValue}
        onValueChange={(value) => setSliderValue(Math.round(value))} // Округляем значение
        minimumTrackTintColor="#4C82FF" // Цвет заполненной части
        maximumTrackTintColor="#000000" // Цвет незаполненной части
        thumbTintColor="#4C82FF" // Цвет ползунка
      />
    </View>
    <View style={{margin:"auto"}}>
    <TouchableOpacity
        style={styles.btn}
        activeOpacity={0.7}
        onPress={async()=>{
            await socket.current.send(JSON.stringify(
             {
        deviceId:data.deviceId,
        deviceType:data.deviceType,
        command:'set_params',
        params: {
            color:color,
            brightness:sliderValue,
            glow:selectedItem
        }
    }
      ));
            setOn(!on);
            setOff(!off)
        }}
  >
    <Text style={styles.btnText}>Изменить параметры</Text>
    </TouchableOpacity>
    </View>
    <Text style={{fontSize:20,marginLeft:20,marginTop:45}}>Состояние:</Text>
    <View style={styles.onOff}>
      <View style={{alignItems:'center'}}>
        <Pressable disabled={on} onPress={async()=>{
                     await socket.current.send(JSON.stringify(
                      {
                        deviceId:data.deviceId,
                        deviceType:data.deviceType,
                        command:'turn_on'
                    }
                     ));
                     setOn(!on);
                     setOff(!off)
                     }}>
          <LightOn color={on?"#4C82FF":"#8B8B8B"}/>
        </Pressable>
        {on?<Text style={{color:'#4C82FF'}}>Включена</Text>:<Text style={{color:'#8B8B8B'}}>Включена</Text>}

      </View>
      <View style={{alignItems:'center'}}>
        <Pressable  disabled={off} onPress={async()=>{
                     await socket.current.send(JSON.stringify(
                      {
                        deviceId:data.deviceId,
                        deviceType:data.deviceType,
                        command:'turn_off'
                    }
                     ));
                     setOn(!on);
                     setOff(!off)
                     }}>
          <LightOff color={off?"#4C82FF":"#8B8B8B"}/>
        </Pressable>
        {off?<Text style={{color:'#4C82FF'}}>Выключена</Text>:<Text style={{color:'#8B8B8B'}}>Выключена</Text>}
        
      </View>
    </View>
    </ScrollView>

  );
};

// Вспомогательная функция для конвертации HSV в HEX
const hsvToHex = (hsv) => {
  // Простая конвертация (можно использовать библиотеку 'tinycolor2')
  const { h, s, v } = hsv;
  const f = (n, k = (n + h / 60) % 6) => 
    v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  const r = Math.round(f(5) * 255);
  const g = Math.round(f(3) * 255);
  const b = Math.round(f(1) * 255);
  return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
};

const styles = StyleSheet.create({
  background:{
    flex: 1,
    width: '100%',
    height: '100%',
    zIndex:0,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:1,
    marginTop:20,
  },
  wheel: {
    width: 250,
    height: 250,
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
  title:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:25,
    marginVertical:15
  },
  titleText:{
    fontSize:20,
    marginLeft:10,
  },
  infoLine:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:25,
    marginVertical:5,
    marginBottom:20
  },
  infoLineText:{
    fontSize:16,
  },
  status:{
    color:"#8B8B8B",
    fontSize:16
  },
  btn:{
    borderRadius:16,
    backgroundColor:'#4C82FF',

    paddingHorizontal:60,
    paddingVertical:10,
    marginVertical:10
  },
  btnText:{
    color:'white',
    fontSize:16,
    paddingVertical:3
  },
  dropdownButton: {
    paddingHorizontal: 50,
    paddingVertical:10,
    borderWidth: 1,
    borderColor: '#4C82FF',
    backgroundColor:"white",
    borderRadius: 16,
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
  selectedItem:{
    color:'#4C82FF'
  },
  onOff:{
    marginTop:30,
    marginBottom:30,
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:50
  },
  infoText:{
    fontFamily:"Roboto",
    fontSize:16,
    color:"#8B8B8B"
  },

});
