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
import Slider from '@react-native-community/slider';
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import SegmentedControl from '@react-native-segmented-control/segmented-control';

export default function AddCurtain({ controller }) {
    const router = useRouter();
    const [isOpenGlow, setIsOpenGlow] = useState(false);
    const [isOpenCircle, setIsOpenCircle] = useState(false);
    const [isOpenState, setIsOpenState] = useState(false);
    const [isOpenSlider, setIsOpenSlider] = useState(false);
    const [isOpenMode, setIsOpenMode] = useState(false);
    const [state, setState] = useState("Выключить");
    const { controllerState, setControllerState, setControllerStateScen } = useContext(ScenariiContext);
    const [color, setColor] = useState("");
    console.log('====================================');
    console.log(controller);
    console.log('====================================');
    const items = ["Чтение", 'Ночь', 'Вечеринка', 'Джунгли', "Неон", "Свеча", "Цвет"];
    const effectArr = {
        reading: "Чтение",
        night: "Ночь",
        party: "Вечеринка",
        jungle: 'Джунгли',
        neon: "Неон",
        candle: "Свеча",
        color: "Цвет",
    };
    const modes = ["Безопасный", "Ручной", "Авто"];
    const modesArr = {
        AUTO: "Авто",
        MANUAL: "Ручной",
        SECURITY: "Безопасный"
    }
    const [sliderValue, setSliderValue] = useState();
    const [selectedGlow, setSelectedGlow] = useState("");
    const [selectedMode, setSelectedMode] = useState("");

    const labels = {
        state: 'Состояние',
        glowType: 'Тип свечения',
        color: 'Цвет подсветки',
        brightness: "Яркость",
        mode: "Режим работы",
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


    return (
        <View style={{ flex: '1', backgroundColor: 'white', height: '100%' }}>
            <Header />
            <ScrollView style={styles.switch}>
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
                    <View >
                        <Pressable style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => {
                            setIsOpenState(true)
                        }}>
                            <Text>Состояние</Text>
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
                                                setSliderValue("")
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
                    <View >
                        <Pressable style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => {
                            setIsOpenGlow(true)
                        }}>
                            <Text>Тип свечения</Text>
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
                    <View >
                        <Pressable style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => {
                            setIsOpenCircle(true)
                        }}>
                            <Text>Цвет подсветки</Text>

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
                <View style={styles.itemsBlock}>
                    <View >
                        <Pressable style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => {
                            setIsOpenMode(true)
                        }}>
                            <Text>Режим работы</Text>

                            <Modal visible={isOpenMode} transparent={true} animationType="fade">
                                <Pressable style={styles.modalOverlay} onPress={() => setIsOpenMode(false)}>
                                    <View style={styles.containerMode}>
                                        <Text style={styles.titleOfTheme}>Выберите режим работы</Text>
                                        <SegmentedControl
                                            values={modes}
                                            selectedIndex={modes.indexOf(selectedMode)}
                                            onChange={(event) => {
                                                const selectedIndex = event.nativeEvent.selectedSegmentIndex;
                                                setSelectedMode(modes[selectedIndex]);
                                            }}
                                            tintColor="#4C82FF"
                                            backgroundColor="#FFFFFF"
                                            activeFontStyle={styles.activeText}
                                            fontStyle={styles.inactiveText}
                                            style={styles.segmentedControl}
                                        />
                                        <View style={styles.selectedContainer}>
                                            <Text style={styles.selectedText}>Выбран режим:
                                                <Text style={styles.selectedMode}> {selectedMode}</Text>
                                            </Text>
                                        </View>
                                    </View>
                                </Pressable>
                            </Modal>
                            <ToArrow />
                        </Pressable>
                    </View>
                    <View>
                        <Text style={{ color: '#8B8B8B' }}>{selectedMode}</Text>
                    </View>
                </View>
                <View style={styles.itemsBlock}>
                    <Pressable style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => {
                        setIsOpenSlider(true)
                    }}>
                        <Text>Яркость</Text>
                        <Modal visible={isOpenSlider} transparent={true} animationType="fade">
                            <Pressable style={styles.modalOverlay} onPress={() => setIsOpenSlider(false)}>
                                <View style={styles.container}>
                                    <View style={styles.previewSlider}>
                                        <Slider
                                            minimumValue={1}
                                            maximumValue={100}
                                            step={1}
                                            value={sliderValue}
                                            onValueChange={(value) => {
                                                setState("Включить");
                                                setSliderValue(Math.round(value));
                                            }
                                            }
                                            minimumTrackTintColor="#4C82FF"
                                            maximumTrackTintColor="#000000"
                                            thumbTintColor="#4C82FF"
                                        />
                                        <Text style={styles.text}>Яркость: {sliderValue}</Text>
                                    </View>
                                </View>
                            </Pressable>
                        </Modal>
                        <ToArrow />
                    </Pressable>
                    <View>
                        <Text style={{ color: '#8B8B8B' }}>{sliderValue}</Text>
                    </View>
                </View>
                <View style={styles.btnBlock}>
                    <LinearGradient
                        colors={['#195dfc', '#4C82FF']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.gradientBtn}
                    >
                        <TouchableOpacity
                            style={styles.btn}
                            activeOpacity={0.7}
                            onPress={() => {
                                addController(
                                    {
                                        title: 'Умная подсветка',
                                        payload: {
                                            [labels.state]: state || null,
                                            [labels.glowType]: selectedGlow || null,
                                            [labels.color]: color || null,
                                            [labels.brightness]: sliderValue || null,
                                            [labels.mode]: selectedMode || null,
                                        }
                                    },
                                    state === "Включить" ?
                                        {
                                            type: "command",
                                            deviceId: controller.deviceId,
                                            commandName: "set_params",
                                            params:
                                            {
                                                state: state,
                                                effect: Object.keys(effectArr).find(
                                                    key => effectArr[key] === selectedGlow
                                                ),
                                                color: color,
                                                brightness: sliderValue,
                                                mode: Object.keys(modesArr).find(
                                                    key => modesArr[key] === selectedMode
                                                ),
                                            }
                                        } :
                                        {
                                            type: "command",
                                            deviceId: controller.deviceId,
                                            commandName: "off",
                                        }
                                );
                                router.back();
                            }}>
                            <Text style={styles.btnText}>Добавить</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </ScrollView>
        </View>
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
        // paddingTop:50,
    },
    gradientBtn: {
        borderRadius: 16,
        shadowColor: '#4C82FF',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
    },
    btn: {
        borderRadius: 16,
        paddingHorizontal: 60,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    btnText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '400',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
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
        zIndex: 2,
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
    previewSlider: {
        paddingVertical: 15,
        width: 300,
        height: 70,
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


    containerMode: {
        // flex: 1,
        padding: 24,
        width:350,
        height:220,
        borderRadius:16,
        backgroundColor:'white',
    },
    titleOfTheme: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 24,
        textAlign: 'center',
    },
    segmentedControl: {
        height: 44,
        borderRadius: 8,
        borderColor: '#4C82FF',
        marginBottom: 24,
    },
    activeText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    inactiveText: {
        color: '#4C82FF',
    },
    selectedContainer: {
        backgroundColor: '#E8F0FE',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    selectedText: {
        color: '#555',
        fontSize: 16,
    },
    selectedMode: {
        color: '#4C82FF',
        fontWeight: 'bold',
    },
});
