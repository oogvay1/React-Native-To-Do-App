import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient"
import { useTheme } from "@/theme/ThemeProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import CalendarCard from "@/components/CalendarCard";

export default function Home() {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, StyleSheet.absoluteFill]}>
            <ScrollView
                bounces={true}
                alwaysBounceVertical={true}
                overScrollMode="always"
            >

                <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
                    <CalendarCard />
                </SafeAreaView>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: -28,
        backgroundColor: "#000"
    },
    safeArea: {
        flex: 1,
    }
});