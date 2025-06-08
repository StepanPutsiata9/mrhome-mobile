import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import AddCurtain from "./AddedDevices/AddCurtain"
import AddWindow from "./AddedDevices/AddWindow"
import AddLight from "./AddedDevices/AddLight"


export default function AddSpecificController() {
    const controller = useLocalSearchParams();
    switch (controller.deviceType) {
        case "shtora":
            return <AddCurtain controller={controller} />;
        case "window":
            return <AddWindow controller={controller} />;
        case "RGB_LED":
            return <AddLight controller={controller} />;
    }
}