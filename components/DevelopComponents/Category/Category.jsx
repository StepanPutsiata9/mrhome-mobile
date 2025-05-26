import { View,StyleSheet,Text } from "react-native";
import ControllerItem from  "./ControllerItem"
export default function Category({titleOfCategory,data,socket}){

    return(
        <View style={styles.category}>
            <Text style={styles.categoryTitle}>{titleOfCategory}</Text>
            <View style={styles.controllersBlock}>
                
                {data.map((elData)=>{
                  return(
                    <ControllerItem data={elData.payload} key={elData.payload.id} socket={socket} />
                  )
                })}
            </View>
        </View>
    )
};

const styles = StyleSheet.create({

    category:{
        marginTop:10,
        fontSize:16,
        fontWeight:500,
        width:'100%',
      },
      categoryTitle:{
        marginLeft:20,
      },
      controllersBlock:{
        width:"90%",
        // paddingHorizontal:20,
        marginHorizontal:'auto',
        marginTop:10,
        // padding:0,
        // flex:1,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-between'
      }
});
