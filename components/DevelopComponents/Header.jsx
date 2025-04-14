import { View, Text, StyleSheet } from "react-native"
import LogoSmall from "./PhotosComponents/LogoSmallSvg"

export function Header() {
    return (
        <View style={styles.header}>
            <View>
                <LogoSmall />
            </View>
            <View>
                <Text style={styles.headerText} >Умный дом</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 25,
        marginBottom: 10,
    },
    headerText: {
        color: "#4C82FF",
        fontSize: 24,
        fontWeight: 700,
        fontFamily: "Roboto",
    }
});
