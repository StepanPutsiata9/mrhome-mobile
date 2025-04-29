
import { StyleSheet, Text, View, TouchableOpacity, Modal, Pressable } from 'react-native';
import { useContext } from 'react';
import { ScenariiContext } from '@/app/(scen)/ScenariiContext';
import Close from "../PhotosComponents/Close"


const toggleModal = (id, data, callback) => {
    callback(data.map(scen =>
        scen.id === id
            ? { ...scen, modalVisible: !scen.modalVisible }
            : scen
    ));
};
export default function Scenarii({ item }) {
    const { scenariiState, setScenariiState } = useContext(ScenariiContext);

    return (
        <TouchableOpacity
            onPress={() => toggleModal(item.id, scenariiState, setScenariiState)}
        >
            <Modal visible={item.modalVisible} animationType="fade"
                transparent={true}>
                <ModalScen item={item} />
            </Modal>
            <View>
                <Text>{item.title}</Text>
                <View>{item.icon}</View>
                <View>
                    {scenariiState.length != 0 ? item.state.map((i, index) => {
                        return <Text style={{ color: '#8b8b8b', marginBottom: 5 }} key={index}>{i.title}</Text>
                    }) : null}
                </View>

            </View>
        </TouchableOpacity>
    );
}




export function ModalScen({ item }) {
    const { scenariiState, setScenariiState } = useContext(ScenariiContext);

    return (
        <TouchableOpacity style={styles.modalOverlay} onPress={() => toggleModal(item.id, scenariiState, setScenariiState)}>
            <View style={styles.modalContainer}>
                <View style={styles.titleBlock}>
                    <View style={styles.title}>
                        <View>
                            <Text style={{ fontSize: 24, color: '#4C82FF' }}>{item.title}</Text>
                        </View>
                        {/* <View>{item.icon}</View> */}
                    </View>
                    <Pressable onPress={() => toggleModal(item.id, scenariiState, setScenariiState)}>
                        <Close />
                    </Pressable>
                </View>
              

                <View>
                    {
                        item.state.map((st, key) => {
                            return (
                                <View style={styles.viewConroller} key={key}>
                                    <Text style={styles.titleController}>{st.title}</Text>
                                    <View style={styles.infoView}>
                                        <View style={styles.commandView}>
                                            {st.commands.map((i, index) => {
                                                if (i != null) return <Text style={{ marginBottom: 5 }} key={index}>{i}</Text>
                                            })}
                                        </View>
                                        <View style={styles.stateView}>
                                            {st.state.map((i, index) => {
                                                if (i != null) return <Text style={{ color: '#8b8b8b', textAlign: 'right', marginBottom: 5 }} key={index}>{i}</Text>
                                            })}
                                        </View>
                                    </View>
                                </View>
                            )
                        })}
                </View>

            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        width: '85%',
        height:"min-content",
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    viewConroller: {
        paddingHorizontal: 10,
        marginVertical: 5
    },
    titleController: {
        fontSize: 18
    },
    infoView: {
        marginLeft: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    commandView: {
        marginVertical: 10
    },
    titleBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        marginBottom:10,
    },
    title:{
        flexDirection:'row',
        alignItems:'center',
    }
});
