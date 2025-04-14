import { ScrollView, Text } from "react-native";
import { View,StyleSheet,Pressable } from "react-native"
import { Header } from "../Header";
import Back from "../PhotosComponents/Back"

import { useRouter } from "expo-router";
import { useState } from "react";

import Shtora from "../PhotosComponents/Shtora";
import ShtoraOpen from "../PhotosComponents/ShtoraOpen";
import ShtoraClose from "../PhotosComponents/ShtoraClose";


export default function SmartShtora({data,socket}){
    const router=useRouter();
      const [on,setOn]=useState(data.state=="Открыта"?true:false);
      const [off,setOff]=useState(!on);
    return(
        <ScrollView style={styles.switch}>
            <Header/>
            <View style={styles.title}>
                <View style={{flexDirection:'row'}}>
                    <Shtora color={"#4C82FF"}/>
                    <View>
                        <Text style={styles.titleText}>Умная роль-штора</Text>
                    </View>
                </View>
                <Pressable onPress={() => router.back()}>
                    <Back/>
                </Pressable>
             </View>
              <View style={styles.info}>
                         <View style={styles.infoLine}>
                           <Text style={styles.infoLineText}>Подключение</Text>
                           <Text style={styles.status}>{data.isOnline?"В сети":"Не в сети"}</Text>
                         </View>
                         <View style={styles.infoLine}>
                           <Text style={styles.infoLineText}>Состояние</Text>
                           <Text style={styles.status}>{data.state}</Text>
                         </View>
            </View>
            <View style={styles.onOff}>
                <View style={{alignItems:'center'}}>
                    <Pressable onPress={async()=>{
                     await socket.current.send({type:"onSmartShtora"});
                     setOn(!on);
                     setOff(!off)
                     }}>
                    <ShtoraOpen color={on?"#4C82FF":"#8B8B8B"}/>
                    </Pressable>
                    {on?<Text style={{color:'#4C82FF'}}>Открыта</Text>:<Text style={{color:'#8B8B8B'}}>Открыта</Text>}

                </View>
                <View style={{alignItems:'center'}}>
                    <Pressable onPress={async()=>{
                     await socket.current.send({type:"offSmartShtora"});
                     setOn(!on);
                     setOff(!off)
                     }}>
                    <ShtoraClose color={off?"#4C82FF":"#8B8B8B"}/>
                    </Pressable>
                    {off?<Text style={{color:'#4C82FF'}}>Закрыта</Text>:<Text style={{color:'#8B8B8B'}}>Закрыта</Text>}
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    switch:{
        backgroundColor:"white",
        width:"100%",
        // height:"100%"
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
      },
      infoLineText:{
        fontSize:16,
      },
      status:{
        color:"#8B8B8B",
        fontSize:16
      },
      onOff:{
        marginTop:30,
        marginBottom:30,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:50
      }
});
