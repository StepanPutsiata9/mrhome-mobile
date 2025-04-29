

import { useState } from "react";
import Moon from "../PhotosComponents/Moon"
import SunRise from "../PhotosComponents/SunRise"
import {  StyleSheet ,Text,View,ScrollView,TouchableOpacity} from 'react-native';

export default function Scenarii({socket}) {
    const [morningActive,setMorningActive]=useState(false);
    const [nightActive,setNightActive]=useState(false);

    

  return (
    <ScrollView style={styles.scenarii}>

         <TouchableOpacity 
              onPress={async() => {
                await socket.current.send(
                    {
                        type:"morningScen",
                        payload:{
                            state:!morningActive,
                        }
                    });
                  setMorningActive(!morningActive);
                  setNightActive(false);
                }}
            >
      <View style={styles.scen}>
        <View style={styles.topInfo}>
            <View style={styles.title}>
                <View style={styles.logoView}>
                    <SunRise/>
                    <Text style={styles.titleText}>Утро</Text>
                </View>
             
                <View>
                <Text style={styles.active}>{morningActive?"Активно":"Не активно"}</Text>
                </View>
                
            </View>
        </View>
        <View style={styles.description}>
            <View style={styles.descTextView}>
                <Text style={styles.descTextView}>
                Этот сценраий позволит автоматизировать 
                вашу утреннюю рутину:
                </Text>
            </View>
            <View style={styles.func}>
                <View style={styles.oneFunc}>
                    <Text style={styles.oneFuncText}>Включение света</Text>
                </View>
                <View style={styles.oneFunc}>
                    <Text style={styles.oneFuncText}>Открытие штор</Text>
                </View>
            </View>
        </View>
      </View>
      </TouchableOpacity>
      <TouchableOpacity 
              onPress={async() => {
                await socket.current.send(
                    {
                        type:"nightScen",
                        payload:{
                            state:!nightActive,
                        }
                    });
                setNightActive(!nightActive)
                setMorningActive(false);
                }}
            >
      <View style={styles.scen}>
        <View style={styles.topInfo}>
            <View style={styles.title}>
                <View style={styles.logoView}>
                    <Moon/>
                    <Text style={styles.titleText}>Ночь</Text>
                </View>
             
                <View>
                <Text style={styles.active}>{nightActive?"Активно":"Не активно"}</Text>
                </View>
                
            </View>
        </View>
        <View style={styles.description}>
            <View style={styles.descTextView}>
                <Text style={styles.descTextView}>
                Этот сценраий позволит подготовиться ко сну:
                </Text>
            </View>
            <View style={styles.func}>
                <View style={styles.oneFunc}>
                    <Text style={styles.oneFuncText}>Выключение света</Text>
                </View>
                <View style={styles.oneFunc}>
                    <Text style={styles.oneFuncText}>Закрытие штор</Text>
                </View>
            </View>
        </View>
      </View>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
scenarii:{
    marginHorizontal:"auto",
},
scen:{
    backgroundColor:'white',
    width:328,
    height:'min-content',
    borderRadius:16,
    padding:16,
    marginTop:20
 },
 title:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginBottom:10

 },
 titleText:{
    fontSize:20,
    fontWeight:700,
    marginLeft:10
 },
 active:{
    fontSize:12,
    color:'#8b8b8b'
 },
 logoView:{
    flexDirection:'row',
    alignItems:'center'
 },
 descTextView:{
    fontSize:12,
    marginBottom:5
 },
 func:{
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between'
 },
 oneFunc:{
    marginVertical:5
 },
 oneFuncText:{
    fontSize:14,
    color:"#8b8b8b"
 }
});
