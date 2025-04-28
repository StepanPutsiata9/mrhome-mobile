import { StyleSheet,View,ImageBackground,ScrollView, Pressable,Text} from 'react-native';
import {Header} from "../../components/DevelopComponents/Header"

import Scenarii from "../../components/DevelopComponents/Scenarii/Scenarii"
import {useRouter } from 'expo-router';

import Plus from "../../components/DevelopComponents/PhotosComponents/Plus"
import { useContext } from 'react';
import { SocketContext } from '../_layout';
export default function TabTwoScreen() {

  const {socket,data}=useContext(SocketContext);
  const router=useRouter();
  return (
  <ImageBackground
        source={require('../../assets/images/Background.png')} 
              style={styles.background}
              resizeMode="cover"
        >
    <ScrollView>
      <Header/>
      <View style={styles.container}>
      <Text style={styles.scenText}>Сценарии</Text>
      <Scenarii socket={socket}/>   
      </View>
    </ScrollView >
    <Pressable onPress={()=>{
      router.push('/(scen)/newScenarii');
    }}>
      <View style={styles.plus}>
        <Plus/>
      </View>
    </Pressable>
    
  </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal:10
  },
  scenText:{
    fontSize:32,

  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    zIndex:0,
  },
  plus:{
      position:'absolute',
      
      right:20,
      bottom:20,
      zIndex:2,
      width:50,
      height:50,
      borderRadius:'50%',
      backgroundColor:'#4C82FF',
      alignItems:'center',
      justifyContent:'center'
  },
});
