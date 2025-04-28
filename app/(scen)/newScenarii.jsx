import { StyleSheet,View,Pressable,ScrollView, Text,TextInput,Modal, TouchableOpacity} from 'react-native';
import {Header} from "../../components/DevelopComponents/Header"

import {useRouter } from 'expo-router';
import Back from "../../components/DevelopComponents/PhotosComponents/Back"
import EyeOpen from "../../components/DevelopComponents/PhotosComponents/EyeOpen"
import EyeClosed from "../../components/DevelopComponents/PhotosComponents/EyeClosed"


import ToArrow from "../../components/DevelopComponents/PhotosComponents/toArrow"
import { useContext, useState } from 'react';
import { SocketContext } from '../_layout';

export default function NewScen() {

  const {socket,data}=useContext(SocketContext);
  const [title,setTitle]=useState("");
  const [isOpen,setIsOpen]=useState(false)
  const icons=[
    <Back/>,
    <EyeOpen/>,
    <EyeClosed/>
  ];
  const [selectedItem, setSelectedItem] = useState(data.glow);
  const [isListEmpty,setIsListEmpty]=useState(false);
  const router=useRouter();
  return (
    <ScrollView>
      <Header/>
      <View style={styles.container}>

      
      <View style={styles.title}>
            <Text style={styles.titleText}>Новый сценарий</Text>
        <Pressable onPress={() => router.back()}>
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
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Text>Иконка</Text>
            <Pressable onPress={()=>{
                setIsOpen(true)
            }}>
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
              <ToArrow/>
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
            {isListEmpty?
            <Text style={styles.emptyList}>Добавленных элементов пока нет</Text>
            :
            <Text style={styles.emptyList}>Добавленные элементы есть</Text>
            }
        </View>
        <View style={styles.addController}>
          <Pressable onPress={()=>{
              router.push('/(scen)/AddControllersToScenarii')
          }}>
            <Text style={styles.addControllerText}>Добавить элемент</Text>
          </Pressable>
        </View>
        <View style={styles.btnBlock}>
          {!isListEmpty&&
            <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.7}
            onPress={()=>{
              router.back();
            }}>
        <Text style={styles.btnText}>Добавить сценраий</Text>
        </TouchableOpacity>
        }
      </View>
      </View>     
    </ScrollView>
    
  
    

  );
}

const styles = StyleSheet.create({
  container:{
    paddingHorizontal:20
  },
  title: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:5,
    marginBottom:10,
  },
  titleText:{
    fontSize:20,
  },

  input: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom:15,
    fontSize: 16,
    backgroundColor: '#ECEEF4',
    color:'#8B8B8B',
  },
  iconBlock:{
    flexDirection:'row',
    justifyContent:'space-between'
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
  itemsState:{
    marginTop:10,
  },
  itemStateText:{
    fontSize:18,
  },
  addController:{
    marginTop:20,
  },
  addControllerText:{
    color:'#8B8B8B',
    textDecorationLine:"underline",
  },

  emptyList:{
    textAlign:'center',
    marginTop:20,
  },
  btnBlock:{
    marginTop:20,
  },
  btn:{
    borderRadius:16,
    backgroundColor:'#4C82FF',

    paddingHorizontal:60,
    paddingVertical:15,
    marginVertical:10
  },
  btnText:{
    color:'white',
    fontSize:16,
    margin:'auto'
    
  },

});
