import { ScrollView, Text } from "react-native";
import { View, StyleSheet, Pressable, TouchableOpacity, Modal } from "react-native"
import { Header } from "../../../components/DevelopComponents/Header";
import Back from "../../../components/DevelopComponents/PhotosComponents/Back"
import ToArrow from "../../../components/DevelopComponents/PhotosComponents/toArrow"

import { useRouter } from "expo-router";
import { useContext, useState } from "react"
import Close from "../../../components/DevelopComponents/PhotosComponents/Close";
import { ScenariiContext } from "../ScenariiContext";

import ColorPicker from 'react-native-wheel-color-picker';


export default function AddCurtain() {
    const router = useRouter();
    const [isOpenGlow, setIsOpenGlow] = useState(false);
    const [isOpenCircle, setIsOpenCircle] = useState(false);
    const [isOpenState, setIsOpenState] = useState(false);
    const [state, setState] = useState("Выключить");
    const { controllerState, setControllerState } = useContext(ScenariiContext);
    const [color, setColor] = useState("");
    const items = ['Свечение', 'Мерцание', 'Затухание', 'Сплошной цвет'];
    const [selectedGlow, setSelectedGlow] = useState("");

    const handleColorChange = (colorObj) => {
        if (typeof colorObj === 'string') {
            setColor(colorObj);
            setState("Включить");

        } else {
            const hex = hsvToHex(colorObj);
            setColor(hex);
            setState("Включить");

        }
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
    return (
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
                    <Text style={styles.titleTextController}>Умная подсветка</Text>
                </View>
            </View>

            <View style={styles.itemsBlock}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text>Состояние</Text>
                    <Pressable onPress={() => {
                        setIsOpenState(true)
                    }}>
                        <Modal visible={isOpenState} transparent={true} animationType="fade">
                            <Pressable style={styles.modalOverlay} onPress={() => setIsOpenState(false)}>
                                <View style={styles.dropdownList}>
                                    <Pressable
                                        style={styles.item}
                                        onPress={() => {
                                            setState("Включить");
                                            setIsOpenState(false);
                                        }}
                                    >
                                        <Text >Включить</Text>
                                    </Pressable>
                                    <Pressable
                                        style={styles.item}
                                        onPress={() => {
                                            setState("Выключить");
                                            setSelectedGlow("");
                                            setColor("");
                                            setIsOpenState(false);
                                        }}
                                    >
                                        <Text >Выключить</Text>
                                    </Pressable>
                                </View>
                            </Pressable>
                        </Modal>
                        <ToArrow />
                    </Pressable>

                </View>
                <View>
                    <Text style={{ color: '#8B8B8B' }}>{state}</Text>
                </View>
            </View>
            <View style={styles.itemsBlock}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text>Тип свечения</Text>
                    <Pressable onPress={() => {
                        setIsOpenGlow(true)
                    }}>
                        <Modal visible={isOpenGlow} transparent={true} animationType="fade">
                            <Pressable style={styles.modalOverlay} onPress={() => setIsOpenGlow(false)}>
                                <View style={styles.dropdownList}>
                                    {items.map((item, index) => (
                                        <Pressable
                                            key={index}
                                            style={styles.item}
                                            onPress={() => {
                                                setSelectedGlow(item);
                                                setState("Включить");
                                                setIsOpenGlow(false);
                                            }}
                                        >
                                            <Text >{item}</Text>
                                        </Pressable>
                                    ))}
                                </View>
                            </Pressable>
                        </Modal>
                        <ToArrow />
                    </Pressable>

                </View>
                <View>
                    <Text style={{ color: '#8B8B8B' }}>{selectedGlow}</Text>
                </View>
            </View>
            <View style={styles.itemsBlock}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text>Цвет подсветки</Text>
                    <Pressable onPress={() => {
                        setIsOpenCircle(true)
                    }}>
                        <Modal visible={isOpenCircle} transparent={true} animationType="fade">
                            <Pressable style={styles.modalOverlay} onPress={() => setIsOpenCircle(false)}>
                                <View style={styles.container}>
                                    <View style={styles.preview}>
                                        <View style={styles.close}>
                                            <Pressable onPress={() => setIsOpenCircle(false)} style={{ width: 30, height: 30 }} >
                                                <Close />
                                            </Pressable>
                                        </View>
                                        <View style={styles.container}>
                                            <ColorPicker
                                                color={color}
                                                onColorChange={handleColorChange}
                                                thumbSize={20}
                                                sliderSize={20}
                                                noSnap={true}
                                                row={false}
                                                style={styles.wheel}
                                            />
                                            {/* <ColorWheel
                                                    initialColor="#FF0000"
                                                    onColorChange={handleColorChange}
                                                    style={styles.wheel}
                                                    thumbSize={20}
                                                /> */}
                                            <Text style={styles.text}>Цвет: {color}</Text>

                                        </View>
                                    </View>
                                </View>
                            </Pressable>
                        </Modal>
                        <ToArrow />
                    </Pressable>

                </View>
                <View>
                    <Text style={{ color: '#8B8B8B' }}>{color}</Text>
                </View>
            </View>
            <View style={styles.btnBlock}>
                <TouchableOpacity
                    style={styles.btn}
                    activeOpacity={0.7}
                    onPress={() => {
                        addController(
                            {
                                title: 'Умная подсветка',
                                commands: [
                                    state ? "Состояние" : null,
                                    selectedGlow ? "Тип свечения" : null,
                                    color ? "Цвет подсветки" : null
                                ],
                                state: [
                                    state || null, selectedGlow || null, color || null
                                ]
                            });
                        router.back();
                    }}>
                    <Text style={styles.btnText}>Добавить</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

// Вспомогательная функция для конвертации HSV в HEX
const hsvToHex = (hsv) => {
    // Простая конвертация (можно использовать библиотеку 'tinycolor2')
    const { h, s, v } = hsv;
    const f = (n, k = (n + h / 60) % 6) =>
        v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
    const r = Math.round(f(5) * 255);
    const g = Math.round(f(3) * 255);
    const b = Math.round(f(1) * 255);
    return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
};


const styles = StyleSheet.create({
    switch: {
        backgroundColor: "white",
        width: "100%",
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
        marginTop: 20,
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
    itemsBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 35,
        marginTop: 10,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    selectedItem: {
        color: '#4C82FF'
    },
    itemsState: {
        marginTop: 10,
    },
    itemStateText: {
        fontSize: 18,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        marginTop: 20,

    },
    dropdownList: {
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderWidth: 2,
        borderColor: '#eee',
        backgroundColor: "white",
        borderRadius: 16,
    },
    wheel: {
        width: 250,
        height: 250,
        margin: 'auto',
        zIndex: 3
    },
    preview: {
        width: 300,
        height: 400,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#8b8b8b',
        backgroundColor: 'white',
        zIndex: -2,
    },
    text: {
        margin: 'auto',
        marginBottom: 10,
    },
    close: {
        // position:'absolute',
        left: 20,
        top: 20
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        marginTop: 20,
    },
    wheel: {
        width: 250,
        height: 250,
    },
});
