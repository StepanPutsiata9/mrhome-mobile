import { StyleSheet,View,ImageBackground,ScrollView, Pressable,Text} from 'react-native';
import {Header} from "../../components/DevelopComponents/Header"

import Scenarii from "../../components/DevelopComponents/Scenarii/Scenarii"
import {useRouter } from 'expo-router';

import Plus from "../../components/DevelopComponents/PhotosComponents/Plus"
import { useContext } from 'react';
import { SocketContext } from '../_layout';
import { ScenariiContext } from '../(scen)/ScenariiContext';
import Back from "../../components/DevelopComponents/PhotosComponents/Back"

export default function TabTwoScreen() {

  const {socket,data}=useContext(SocketContext);
  const router=useRouter();
  const {setScenariiState,scenariiState}=useContext(ScenariiContext);
  // console.log(scenariiState[0]["state"]);
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
      {/* <Scenarii socket={socket}/>    */}
      <View>
        {scenariiState.map((item,index)=>{
          return(
            <View key={index}>
              <Text>{item.title}</Text>
              <View>{item.icon}</View>
              <View>
                    {scenariiState.length!=0?item.state.map((i,index)=>{
                    return <Text style={{color:'#8b8b8b',marginBottom:5}} key={index}>{i.title}</Text>
                      }):null}
                  </View>
            </View>
          )
        })}
      </View>
      </View>
    </ScrollView >
    <Pressable onPress={()=>{
      router.push('/(scen)/NewScenarii');
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
