import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    runOnJS,
} from "react-native-reanimated";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { useState } from "react";

export default function Chat() {
    const SNAP_POINTS = [200, -200]; // expanded, collapsed
    const translateY = useSharedValue(SNAP_POINTS[1]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    const SPRING_CONFIG = {
        damping: 16,
        stiffness: 150,
    };

    const onGesture = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.startY = translateY.value;
        },
        onActive: (event, ctx) => {
            // ✅ only allow pan when collapsed OR list is scrolled to top
            if (!isExpanded || scrollY <= 0) {
                translateY.value = ctx.startY + event.translationY;
            }
        },
        onEnd: (event) => {
            if (event.translationY > 50) {
                // expand
                translateY.value = withSpring(SNAP_POINTS[0], SPRING_CONFIG);
                runOnJS(setIsExpanded)(true);
            } else {
                // collapse
                translateY.value = withSpring(SNAP_POINTS[1], SPRING_CONFIG);
                runOnJS(setIsExpanded)(false);
            }
        },
    });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <PanGestureHandler onGestureEvent={onGesture}>
                <Animated.View style={[styles.sheet, animatedStyle]}>
                    <ScrollView
                        scrollEnabled={isExpanded}
                        onScroll={(e) => {
                            setScrollY(e.nativeEvent.contentOffset.y);
                        }}
                        scrollEventThrottle={16}
                    >
                        <View style={{ flexDirection: "column" }}>
                            {Array.from({ length: 15 }).map((_, i) => (
                                <View
                                    key={i}
                                    style={{
                                        width: "100%",
                                        height: 250,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Text style={{ fontSize: 20, color: "black" }}>
                                        Card {i + 1}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </Animated.View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    sheet: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        top: 200,
        height: 4000,
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
});
