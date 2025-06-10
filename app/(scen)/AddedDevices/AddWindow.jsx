import { ScrollView, Text } from "react-native";
import { View, StyleSheet, Pressable, TouchableOpacity, TextInput, Switch } from "react-native"
import { Header } from "../../../components/DevelopComponents/Header";
import Back from "../../../components/DevelopComponents/PhotosComponents/Back"
import { useRouter } from "expo-router";
import { useContext, useState } from "react"
import WindowOpen from "../../../components/DevelopComponents/PhotosComponents/WindowOpen";
import WindowClose from "../../../components/DevelopComponents/PhotosComponents/WindowClose";
import { ScenariiContext } from "../ScenariiContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient"
import Slider from '@react-native-community/slider';

export default function AddWindow({ controller }) {
    const router = useRouter();
    const [on, setOn] = useState(true);
    const [off, setOff] = useState(!on);

    const { controllerState, setControllerState, setControllerStateScen } = useContext(ScenariiContext);
    const labels = {
        state: 'Состояние',
        angle: "Угол открытия окна",
        max_temp: 'Максимальная температура',
        min_temp: 'Минимальная температура',
        auto: 'Автоматический режим'
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

    const [sliderValue, setSliderValue] = useState(50);
    const [minTemp, setMinTemp] = useState('10');
    const [maxTemp, setMaxTemp] = useState('30');
    const [errors, setErrors] = useState({});
    const [auto, setAuto] = useState(false);

    // Более строгая проверка ввода
    const formatTemperature = (value) => {
        // Разрешаем только цифры, точку или запятую
        let formattedValue = value.replace(/[^0-9.,]/g, '');

        // Заменяем запятую на точку
        formattedValue = formattedValue.replace(',', '.');

        // Удаляем лишние точки
        const parts = formattedValue.split('.');
        if (parts.length > 2) {
            formattedValue = parts[0] + (parts[1] ? '.' + parts[1] : '');
        }

        // Ограничиваем одну цифру после точки
        if (parts.length === 2 && parts[1].length > 1) {
            formattedValue = parts[0] + '.' + parts[1].charAt(0);
        }

        // Удаляем ведущие нули (кроме случая "0.5")
        if (parts[0].length > 1 && parts[0][0] === '0' && parts[0][1] !== '.') {
            formattedValue = formattedValue.substring(1);
        }

        return formattedValue;
    };

    const validateInput = (name, value, checkEmpty = true) => {
        const newErrors = { ...errors };

        // Проверка на пустое значение
        if (checkEmpty && value.trim() === '') {
            newErrors[name] = 'Введите значение';
            setErrors(newErrors);
            return false;
        }

        // Проверка на корректное число
        const numValue = parseFloat(value.replace(',', '.'));
        if (isNaN(numValue)) {
            newErrors[name] = 'Введите корректное число';
            setErrors(newErrors);
            return false;
        }

        // Проверка диапазона
        if (numValue < 0 || numValue > 80) {
            newErrors[name] = 'Должно быть от 0 до 80';
            setErrors(newErrors);
            return false;
        }

        // Проверка на одну цифру после точки
        const decimalPart = value.split('.')[1];
        if (decimalPart && decimalPart.length > 1) {
            newErrors[name] = 'Не более одной цифры после точки';
            setErrors(newErrors);
            return false;
        }

        // Проверка соотношения min и max
        if (name === 'minTemp' && numValue >= parseFloat(maxTemp.replace(',', '.'))) {
            newErrors[name] = 'Должно быть меньше максимальной';
            setErrors(newErrors);
            return false;
        }

        if (name === 'maxTemp' && numValue <= parseFloat(minTemp.replace(',', '.'))) {
            newErrors[name] = 'Должно быть больше минимальной';
            setErrors(newErrors);
            return false;
        }

        // Если все проверки пройдены
        delete newErrors[name];
        setErrors(newErrors);
        return true;
    };

    const handleChange = (name, value) => {
        const formattedValue = formatTemperature(value);
        if (name === 'minTemp') setMinTemp(formattedValue);
        if (name === 'maxTemp') setMaxTemp(formattedValue);
        // При вводе проверяем только формат, без проверки на пустоту
        validateInput(name, formattedValue, false);
    };

    //   const handleSubmit = async () => {
    //     // Проверяем оба поля с проверкой на пустоту
    //     const isMinValid = validateInput('minTemp', minTemp, true);
    //     const isMaxValid = validateInput('maxTemp', maxTemp, true);

    //     if (!isMinValid || !isMaxValid) {
    //       Alert.alert('Ошибка', 'Для изменения параметров настройки заполните все поля!');
    //       return;
    //     }
    //     try {
    //       await socket.current.send(JSON.stringify({
    //         topic: data.topic,
    //         deviceType: data.payload.deviceType,
    //         command: 'set_params',
    //         params: {
    //           targetServoPos: sliderValue,
    //           mшx_temp: parseFloat(minTemp.replace(',', '.')),
    //           max_temp: parseFloat(maxTemp.replace(',', '.')),
    //         }
    //       }));

    //       setOn(true);
    //       setOff(false);
    //       Alert.alert('Успех', 'Параметры настройки успешно изменены!');
    //     } catch (error) {
    //       Alert.alert('Ошибка', 'Не удалось изменить настройки');
    //       console.error('Error sending settings:', error);
    //     }
    //   };

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
                        <Text style={styles.titleTextController}>Умное окно</Text>
                    </View>
                </View>
                <View style={styles.onOff}>
                    <View style={{ alignItems: 'center' }}>
                        <Pressable disabled={on} onPress={() => {
                            setOn(!on);
                            setOff(!off)
                        }}>
                            <WindowOpen color={on ? "#4C82FF" : "#8B8B8B"} />
                        </Pressable>
                        {on ? <Text style={{ color: '#4C82FF', marginTop: 5 }}>Открывать</Text> : <Text style={{ color: '#8B8B8B', marginTop: 5 }}>Открывать</Text>}


                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Pressable disabled={off} onPress={
                            () => {
                                setOn(!on);
                                setOff(!off)
                            }}>
                            <WindowClose color={off ? "#4C82FF" : "#8B8B8B"} />
                        </Pressable>
                        {off ? <Text style={{ color: '#4C82FF', marginTop: 5 }}>Закрывать</Text> : <Text style={{ color: '#8B8B8B', marginTop: 5 }}>Закрывать</Text>}
                    </View>
                </View>
                {on ?
                    <View>
                        <View style={styles.switchContainer}>
                            <Text style={styles.switchLabel}>
                                Автоматический режим
                            </Text>
                            <Switch
                                value={auto}
                                onValueChange={setAuto}
                                trackColor={{ false: '#E0E0E0', true: '#4C82FF' }}
                                thumbColor="#FFFFFF"
                                ios_backgroundColor="#E0E0E0"
                                style={styles.switchBlock}
                            />
                        </View>
                        <View style={styles.temperatureContainer}>
                            <Text style={styles.sectionTitle}>Настройки температуры</Text>

                            <View style={styles.temperatureInputContainer}>
                                <Text style={styles.temperatureLabel}>Минимальная температура (°C)</Text>
                                <TextInput
                                    style={[styles.temperatureInput, errors.minTemp && styles.errorInput]}
                                    keyboardType="decimal-pad"
                                    value={minTemp}
                                    onChangeText={(value) => handleChange('minTemp', value)}
                                    onBlur={() => validateInput('minTemp', minTemp, true)}
                                    placeholder="0-80"
                                />
                                {errors.minTemp && <Text style={styles.errorText}>{errors.minTemp}</Text>}
                            </View>

                            <View style={styles.temperatureInputContainer}>
                                <Text style={styles.temperatureLabel}>Максимальная температура (°C)</Text>
                                <TextInput
                                    style={[styles.temperatureInput, errors.maxTemp && styles.errorInput]}
                                    keyboardType="decimal-pad"
                                    value={maxTemp}
                                    onChangeText={(value) => handleChange('maxTemp', value)}
                                    onBlur={() => validateInput('maxTemp', maxTemp, true)}
                                    placeholder="0-80"
                                />
                                {errors.maxTemp && <Text style={styles.errorText}>{errors.maxTemp}</Text>}
                            </View>

                            {Object.keys(errors).length === 0 && (
                                <Text style={styles.temperatureSummary}>
                                    Диапазон: от {minTemp}°C до {maxTemp}°C
                                </Text>
                            )}
                        </View>
                        <View style={styles.sliderContainer}>
                            <Text style={styles.sliderText}>Угол открытия: {sliderValue}</Text>
                            <Slider
                                style={styles.slider}
                                minimumValue={1}
                                maximumValue={100}
                                step={1}
                                value={sliderValue}
                                onValueChange={(value) => setSliderValue(Math.round(value))}
                                minimumTrackTintColor="#4C82FF"
                                maximumTrackTintColor="#000000"
                                thumbTintColor="#4C82FF"
                            />
                        </View>
                    </View>

                    : null}

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
                                        title: "Умный выключатель",
                                        payload: {
                                            [labels.state]: (on ? "Включать" : "Выключать"),
                                            [labels.angle]: (on ? sliderValue : null),
                                            [labels.min_temp]: (on ? minTemp : null),
                                            [labels.max_temp]: (on ? maxTemp : null),
                                            [labels.auto]:(on?(auto?"вкл":"выкл"):null)
                                        }
                                    },
                                    on ?
                                        {
                                            type: "command",
                                            deviceId: controller.deviceId,
                                            deviceType: controller.deviceType,
                                            commandName: "set_pamars",
                                            params:
                                            {
                                                angle: on ? sliderValue : 0,
                                                minTemp: on ? minTemp : 20,
                                                maxTemp: on ? maxTemp : 30,
                                                auto: auto,
                                            }

                                        }
                                        :
                                        {
                                            type: "command",
                                            deviceId: controller.deviceId,
                                            deviceType: controller.deviceType,
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
        marginBottom: 130
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
    sliderContainer: {
        paddingHorizontal: 25,
        marginBottom: 25,
    },
    sliderText: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    slider: {
        width: '100%',
        height: 40,
    },
    temperatureContainer: {
        paddingHorizontal: 25,
        marginTop: 15,
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 20,
        color: '#333',
    },
    temperatureInputContainer: {
        marginBottom: 20,
    },
    temperatureLabel: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    temperatureInput: {
        height: 50,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#FAFAFA',
    },
    errorInput: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 5,
    },
    temperatureSummary: {
        fontSize: 16,
        color: '#4C82FF',
        marginTop: 10,
        fontWeight: '500',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
    },
    switchLabel: {
        fontSize: 18,
        fontWeight: '500',
    },
    switchBlock: {
        transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
    },
});
