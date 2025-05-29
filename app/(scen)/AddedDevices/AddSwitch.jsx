import { ScrollView, Text } from "react-native";
import { View, StyleSheet, Pressable, TouchableOpacity } from "react-native"
import { Header } from "../../../components/DevelopComponents/Header";
import Back from "../../../components/DevelopComponents/PhotosComponents/Back"
import { useRouter } from "expo-router";
import { useContext, useState } from "react"
import SwitchOn from "../../../components/DevelopComponents/PhotosComponents/SwitchOn";
import SwitchOff from "../../../components/DevelopComponents/PhotosComponents/SwitchOff";
import { ScenariiContext } from "../ScenariiContext";
import { SafeAreaView } from "react-native-safe-area-context";
export default function AddSwitch({ controller }) {
    const router = useRouter();
    const [on, setOn] = useState(true);
    const [off, setOff] = useState(!on);
    const { controllerState, setControllerState, setControllerStateScen } = useContext(ScenariiContext);
    const labels = {
        state: 'Состояние',
    };
    const addController = (newItem, newItemScen) => {
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
        setControllerStateScen(prevItems => {
            const itemIndex = prevItems.findIndex(item => item.deviceId === newItemScen.deviceId);

            if (itemIndex >= 0) {
                const updatedItems = [...prevItems];
                updatedItems[itemIndex] = newItemScen;
                return updatedItems;
            } else {

                return [...prevItems, newItemScen];
            }
        }

        )

    };
    return (
        <SafeAreaView style={{ flex: '1', backgroundColor: 'white', height: '100%' }}>

            <ScrollView style={styles.switch}>
                <Header />
                <View style={styles.title}>
                    <Text style={styles.titleText}>Новый сценарий</Text>
                    <Pressable onPress={() => router.back()}>
                        <Back />
                    </Pressable>
                </View>
                <View style={styles.title}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.titleTextController}>Умный выключатель</Text>
                    </View>
                </View>
                <View style={styles.onOff}>
                    <View style={{ alignItems: 'center' }}>
                        <Pressable disabled={on} onPress={() => {
                            setOn(!on);
                            setOff(!off)
                        }}>
                            <SwitchOn color={on ? "#4C82FF" : "#8B8B8B"} />
                        </Pressable>
                        {on ? <Text style={{ color: '#4C82FF' }}>Включать</Text> : <Text style={{ color: '#8B8B8B' }}>Включать</Text>}

                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Pressable disabled={off} onPress={
                            () => {
                                setOn(!on);
                                setOff(!off)
                            }}>
                            <SwitchOff color={off ? "#4C82FF" : "#8B8B8B"} />
                        </Pressable>
                        {off ? <Text style={{ color: '#4C82FF' }}>Выключать</Text> : <Text style={{ color: '#8B8B8B' }}>Выключать</Text>}
                    </View>
                </View>
                <View style={styles.btnBlock}>
                    <TouchableOpacity
                        style={styles.btn}
                        activeOpacity={0.7}
                        onPress={() => {
                            addController(
                                {
                                    title: "Умный выключатель",
                                    payload: {
                                        [labels.state]: (on ? "Включать" : "Выключать")
                                    }
                                },
                                {
                                    type: "command",
                                    deviceId: controller.deviceId,
                                    deviceType: controller.deviceType,
                                    commandName: on ? "on" : "off",
                                }
                            );
                            router.back();
                        }}>
                        <Text style={styles.btnText}>Добавить</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            </SafeAreaView>
            )
}

            const styles = StyleSheet.create({
    switch: {
                backgroundColor: "white",
            width: "100%",
        // paddingTop: 50,
    },
            title: {
                flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            marginVertical: 10
    },
            titleText: {
                fontSize: 24,
        // marginLeft:10,
    },
            titleTextController: {
                fontSize: 18
    },
            infoLine: {
                flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 25,
            marginVertical: 5,
            marginBottom: 20
    },
            infoLineText: {
                fontSize: 16,
    },
            status: {
                color: "#8B8B8B",
            fontSize: 16
    },
            onOff: {
                marginTop: 30,
            marginBottom: 30,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 50
    },
            infoText: {
                fontFamily: "Roboto",
            fontSize: 16,
            color: "#8B8B8B"
    },
            btnBlock: {
                paddingHorizontal: 20,
    },
            btn: {
                borderRadius: 16,
            backgroundColor: '#4C82FF',

            paddingHorizontal: 60,
            paddingVertical: 12,
            marginVertical: 10
    },
            btnText: {
                color: 'white',
            fontSize: 18,
            margin: 'auto'

    },
});
