import React, { useEffect, useRef, useState } from "react";
import { Tabs, useSegments } from "expo-router";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import {
    Animated,
    Image,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
} from "react-native";

const TAB_COUNT = 5;
const PILL_WIDTH = 68;
const PILL_HEIGHT = 68;

export default function TabLayout() {
    const segments = useSegments();
    // get last segment as the active route name
    const currentRoute = segments[segments.length - 1] || "home";
    const routeToIndex = {
        home: 0,
        folders: 1,
        add: 2,
        chat: 3,
        profile: 4,
    };
    const activeIndex = routeToIndex[currentRoute] ?? 0;

    const translateX = useRef(new Animated.Value(0)).current;
    const [barWidth, setBarWidth] = useState(0); // real measured width of tab bar

    // When barWidth or activeIndex changes, animate pill to the new center
    useEffect(() => {
        if (!barWidth) return; // wait until we know real bar width
        const slot = barWidth / TAB_COUNT;
        const target = activeIndex * slot + (slot - PILL_WIDTH) / 2;
        Animated.spring(translateX, {
            toValue: target,
            useNativeDriver: true,
            stiffness: 200,
            damping: 20,
        }).start();
    }, [activeIndex, barWidth, translateX]);

    // This component will be rendered inside the tabBar container and can measure its width exactly
    const TabBarBackground = () => (
        <View
            style={StyleSheet.absoluteFill}
            onLayout={(e) => setBarWidth(e.nativeEvent.layout.width)}
        >
            {/* Your background blur + noise */}
            <BlurView intensity={29} tint="dark" style={StyleSheet.absoluteFill} />
            <Image
                source={require("../../assets/images/noise.png")}
                style={styles.noise}
                resizeMode="repeat"
            />

            {/* The animated pill (positioned relative to the measured tab bar) */}
            {barWidth > 0 && (
                <Animated.View
                    style={[
                        styles.pill,
                        {
                            transform: [{ translateX }],
                        },
                    ]}
                >
                    <BlurView intensity={29} tint="dark" style={StyleSheet.absoluteFill} />
                </Animated.View>
            )}
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarItemStyle: {
                        width: PILL_WIDTH,
                        height: PILL_HEIGHT,
                        justifyContent: "center",
                        alignItems: "center",
                    },
                    tabBarButton: (props) => (
                        <TouchableWithoutFeedback
                            onPress={props.onPress}
                            accessibilityRole={props.accessibilityRole}
                            accessibilityState={props.accessibilityState}
                            accessibilityLabel={props.accessibilityLabel}
                            testID={props.testID}
                        >
                            <View style={props.style}>{props.children}</View>
                        </TouchableWithoutFeedback>
                    ),

                    tabBarStyle: {
                        position: "absolute",
                        bottom: 12,
                        width: "92%",
                        borderRadius: 40,
                        backgroundColor: "#46464685",
                        height: 75,
                        alignItems: "center",
                        justifyContent: "center",
                        marginInline: "auto",
                        paddingTop: 17,
                        marginLeft: 16,
                        elevation: 0,
                        borderColor: "#1f1f1f7c",
                        borderWidth: 1,
                        overflow: "hidden",
                    },
                    tabBarBackground: TabBarBackground,
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        tabBarActiveTintColor: "#fff",
                        tabBarIcon: ({ focused, color }) => (
                            <View>
                                <Ionicons name="home" size={30} color={color} />
                            </View>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="folders"
                    options={{
                        tabBarActiveTintColor: "#fff",
                        tabBarIcon: ({ color }) => (
                            <View>
                                <Ionicons name="folder-open-outline" size={30} color={color} />
                            </View>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="add"
                    options={{
                        tabBarActiveTintColor: "#fff",
                        tabBarIcon: ({ color }) => (
                            <View>
                                <Ionicons name="add" size={30} color={color} />
                            </View>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="chat"
                    options={{
                        tabBarActiveTintColor: "#fff",
                        tabBarIcon: ({ color }) => (
                            <View>
                                <Ionicons name="chatbox-outline" size={30} color={color} />
                            </View>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        tabBarActiveTintColor: "#fff",
                        tabBarIcon: ({ color }) => (
                            <View>
                                <Ionicons name="person-outline" size={30} color={color} />
                            </View>
                        ),
                    }}
                />
            </Tabs>
        </View>
    );
}

const styles = StyleSheet.create({
    noise: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.05,
    },
    pill: {
        position: "absolute",
        left: 0,
        bottom: 2.5,
        width: PILL_WIDTH,
        height: PILL_HEIGHT - 0,
        borderRadius: PILL_HEIGHT / 2,
        overflow: "hidden",
        backgroundColor: "#171717ff",
    },
});
