import { ScrollView, Text } from "react-native";
import { View,StyleSheet,Pressable,TouchableOpacity } from "react-native"
import { Header } from "../../../components/DevelopComponents/Header";
import Back from "../../../components/DevelopComponents/PhotosComponents/Back"
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import ShtoraOpen from "../../../components/DevelopComponents/PhotosComponents/ShtoraOpen";
import ShtoraClose from "../../../components/DevelopComponents/PhotosComponents/ShtoraClose";
import { ScenariiContext } from "../ScenariiContext";


export default function AddCurtain(){
    const router=useRouter();
      const [on,setOn]=useState(true);
      const [off,setOff]=useState(!on);
      const {controllerState,setControllerState}=useContext(ScenariiContext);
      const labels = {
        state: 'Состояние',
    };
      const addController = (newItem) => {
        setControllerState(prevItems => {
          const itemIndex = prevItems.findIndex(item => item.title === newItem.title);
          
          if (itemIndex >= 0) {
           
            const updatedItems = [...prevItems];
            updatedItems[itemIndex] = newItem;
            return updatedItems;
          } else {
       
            return [...prevItems, newItem];
          }
        });
      };
    return(
        <ScrollView style={styles.switch}>
            <Header/>
            <View style={styles.title}>
            <Text style={styles.titleText}>Новый сценарий</Text>
        <Pressable onPress={() => router.back()}>
          <Back />
        </Pressable>
      </View>
            <View style={styles.title}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <View>
                        <Text style={styles.titleTextController}>Умная роль-штора</Text>
                    </View>
                </View>
            
             </View>
            <View style={styles.onOff}>
                <View style={{alignItems:'center'}}>
                    <Pressable disabled={on} onPress={()=>{
                     setOn(!on);
                     setOff(!off)
                     }}>
                    <ShtoraOpen color={on?"#4C82FF":"#8B8B8B"}/>
                    </Pressable>
                    {on?<Text style={{color:'#4C82FF'}}>Открывать</Text>:<Text style={{color:'#8B8B8B'}}>Открывать</Text>}

                </View>
                <View style={{alignItems:'center'}}>
                    <Pressable disabled={off} onPress={
                    ()=>{
                     setOn(!on);
                     setOff(!off)
                     }}>
                    <ShtoraClose color={off?"#4C82FF":"#8B8B8B"}/>
                    </Pressable>
                    {off?<Text style={{color:'#4C82FF'}}>Закрывать</Text>:<Text style={{color:'#8B8B8B'}}>Закрывать</Text>}
                </View>
            </View>
              <View style={styles.btnBlock}>
                        <TouchableOpacity
                        style={styles.btn}
                        activeOpacity={0.7}
                        onPress={()=>{
                        addController({
                          title:"Умная роль-штора",
                          payload:{
                            [labels.state]:(on?"Включать":"Выключать")
                          }
                         
                        });
                          router.back();
                        }}>
                    <Text style={styles.btnText}>Добавить</Text>
                    </TouchableOpacity>
                  </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    switch:{
        backgroundColor:"white",
        width:"100%",
    },
    title:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:20,
        marginVertical:10
      },
      titleText:{
        fontSize:24,
        // marginLeft:10,
      },
      titleTextController:{
        fontSize:18
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
      btnBlock:{
        paddingHorizontal:20,
      },
      btn:{
        borderRadius:16,
        backgroundColor:'#4C82FF',
    
        paddingHorizontal:60,
        paddingVertical:12,
        marginVertical:10
      },
      btnText:{
        color:'white',
        fontSize:18,
        margin:'auto'
        
      },
    
});
