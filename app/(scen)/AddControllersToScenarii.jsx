
import { StyleSheet,View,Pressable,ScrollView, Text} from 'react-native';
import {Header} from "../../components/DevelopComponents/Header"
import ToArrow from "../../components/DevelopComponents/PhotosComponents/toArrow"
import Back from "../../components/DevelopComponents/PhotosComponents/Back"

import { useRouter } from 'expo-router';
import { useContext } from 'react';
import { SocketContext } from '../_layout';
export default function AddControllersToScenarii(){
    const router=useRouter();
    const {data,socket}=useContext(SocketContext);
    function extractElectroDevices(data) {
        if (!data || !data.electro || !Array.isArray(data.electro)) {
          return [];
        }
        return data.electro.map(device => ({
          title: device.payload.title || 'Название не указано',
          deviceType: device.payload.deviceType || 'Тип не указан',
          deviceId:device.payload.deviceId,
        }));
      }
    const electroList=extractElectroDevices(data);
    return(
        <ScrollView style={{backgroundColor:'white',paddingTop:50,}}>
        <Header/>
         <View style={styles.container}>
        <View style={styles.title}>
              <Text style={styles.titleText}>Новый сценарий</Text>
          <Pressable onPress={() => router.back()}>
            <Back />
          </Pressable>
        </View>
        <View>
            {electroList.map((item,key)=>{
                return(
                    <View key={key} >
                        <Pressable style={{flexDirection:'row',justifyContent:'space-between',
                        marginBottom:20,
                    }} onPress={()=>{
                            router.push({
                                pathname:"/(scen)/AddSpecificController",
                                params:item,
                            })
                        }}>
                            <Text style={{}}>{item.title}</Text>
                            <ToArrow/>
                        </Pressable>
                    </View>
                )

                
            })}
        </View>
        </View> 
      </ScrollView>

    )
}


const styles = StyleSheet.create({
    container:{
      paddingHorizontal:20,
    },
    title: {
      flexDirection: 'row',
      justifyContent:'space-between',
      alignItems:'center',
      marginTop:5,
      marginBottom:20,
    },
    titleText:{
      fontSize:20,
    },
  
  
  });
  