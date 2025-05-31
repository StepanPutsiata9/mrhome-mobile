import { View, StyleSheet, Text } from "react-native";
import ControllerItem from "./ControllerItem"
export default function Category({ titleOfCategory, data, socket }) {

  return (
    <View style={styles.category}>
      <Text style={styles.categoryTitle}>{titleOfCategory}</Text>
      <View style={styles.controllersBlock}>
        {data.length !== 0 ?
          data.map((elData) => {
            return (
              <ControllerItem data={elData.payload} key={elData.payload.id} socket={socket} />
            )
          }) :
          <Text style={styles.emptyList}>Нет добавленных контроллеров...</Text>
        }
      </View>
    </View>
  )
};

const styles = StyleSheet.create({

  category: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 500,
    width: '100%',
  },
  categoryTitle: {
    marginLeft: 20,
    fontSize: 20,
  },
  emptyList: {
    marginHorizontal: "auto",
    color:'#8b8b8b',
    fontSize:18,
    marginVertical:15,
  },
  controllersBlock: {
    width: "90%",
    marginHorizontal: 'auto',
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }
});
