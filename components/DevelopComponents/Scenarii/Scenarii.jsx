
import { StyleSheet, Text, View, TouchableOpacity, Modal, Pressable, Alert } from 'react-native';
import { useContext } from 'react';
import { ScenariiContext } from '@/app/(scen)/ScenariiContext';
import Close from "../PhotosComponents/Close"
import Points from "../PhotosComponents/Points"
import TrashBin from "../PhotosComponents/TrashBin"





const toggleModal = (id, data, callback) => {
    callback(data.map(scen =>
        scen.id === id
            ? { ...scen, modalVisible: !scen.modalVisible }
            : scen
    ));
};
const deleteScenario = (id, data, callback) => {
    callback(data.filter(scen => scen.id !== id));
};
export default function Scenarii({ item }) {
    const { scenariiState, setScenariiState } = useContext(ScenariiContext);
    return (
        <>
            <Modal visible={item.modalVisible} animationType="fade"
                transparent={true}>
                <ModalScen item={item} />
            </Modal>
            <View style={styles.scenView}>
                <View style={styles.infoTitle}>
                    <View style={styles.titleView}>
                        <View style={styles.icon}>{item.icon}</View>
                        <Text style={styles.titleName}>{item.title}</Text>
                    </View>
                    <View style={styles.points}>
                        <TouchableOpacity
                            onPress={() => toggleModal(item.id, scenariiState, setScenariiState)}
                        >
                            <Points />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.addedControllers}>
                    <Text style={styles.addedControllersText}>Добавленные элементы :</Text>
                </View>
                <View style={styles.controllerView}>
                    {scenariiState.length != 0 ? item.state.map((i, index) => {
                        return <Text style={styles.controllerName} key={index}>{i.title}</Text>
                    }) : null}
                </View>

            </View>
        </>

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
                            <Text style={{ fontSize: 22, color: '#4C82FF',maxWidth:300 }}>{item.title}</Text>
                        </View>
                        {/* <View>{item.icon}</View> */}
                    </View>
                    <View style={styles.iconsBlock}>

                        <Pressable onPress={() => toggleModal(item.id, scenariiState, setScenariiState)}>
                            <Close />
                        </Pressable>
                    </View>
                </View>
                <View>
                    {
                        item.state.map((st, key) => {
                            const keys = Object.keys(st.payload);
                            const values=Object.values(st.payload);
                            return (
                                <View style={styles.viewConroller} key={key}>
                                    <Text style={styles.titleController}>{st.title}</Text>
                                    <View style={styles.infoView}>
                                        <View style={styles.commandView}>
                                        
                                            {keys.map((i, index) => {
                                                if (i != null) return <Text style={{ marginBottom: 5 }} key={index}>{i}</Text>
                                            })}
                                        </View>
                                        <View style={styles.stateView}>
                                            {values.map((i, index) => {
                                                if (i != null) return <Text style={{ color: '#8b8b8b', textAlign: 'right', marginBottom: 5 }} key={index}>{i}</Text>
                                            })}
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
                <View style={styles.trashView}>
                    <Pressable
                        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                        onPress={() =>

                            Alert.alert(
                                'Удаление сценария',
                                'Вы точно хотите удалить этот сценарий?',
                                [
                                    {
                                        text: 'Отмена',
                                        style: 'cancel',
                                    },
                                    {
                                        text: 'Удалить',
                                        onPress: () => deleteScenario(item.id, scenariiState, setScenariiState),
                                        style: 'destructive',
                                    },
                                ]
                            )
                        }>
                        <TrashBin />
                    </Pressable>
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
        width: "100%",

    },
    modalContainer: {
        width: '85%',
        height: "min-content",
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
        paddingHorizontal: 16,
        marginVertical: 5
    },
    titleController: {
        fontSize: 18
    },
    infoView: {
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
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 16,
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    scenView: {
        margin: 'auto',
        marginTop: 20,
        width: 328,
        paddingHorizontal: 16,
        paddingVertical: 20,
        backgroundColor: '#fff',
        borderRadius: 16,
    },
    titleView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleName: {
        marginLeft: 10,
        fontSize: 22,
        fontWeight: 600,
    },
    controllerView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',

    },
    controllerName: {
        color: '#8b8b8b',
        marginBottom: 7,
        fontWeight: 300,
    },
    infoTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
    },
    addedControllers: {
        marginVertical: 10,

    },
    addedControllersText: {
        fontSize: 16,
    },
    iconsBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    trashView: {
        margin: 'auto',
        marginTop: 10,
        // paddingHorizontal:16
    }
});
