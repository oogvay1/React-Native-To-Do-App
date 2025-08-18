import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from "react-native-reanimated";
import {
    Image,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { useState } from "react";

export default function CalendarCard() {
    const month = new Date().getMonth() + 1;
    const [expanded, setExpanded] = useState(false);

    const headerH = useSharedValue(100);
    const bottomRadius = useSharedValue(50);

    const SPRING = {
        damping: 17,
        stiffness: 120,
        mass: 1,
    };

    const toggle = () => {
        setExpanded(true);
    };

    const toggleBack = () => {
        setExpanded(false);
    }

    if (expanded) {
        headerH.value = withSpring(expanded ? 666 : 120, SPRING);
        bottomRadius.value = withSpring(expanded ? 0 : 50, SPRING);
    } else {
        headerH.value = withSpring(!expanded ? 120 : 666, SPRING);
        bottomRadius.value = withSpring(!expanded ? 50 : 0, SPRING);
    }

    const cardAnimStyle = useAnimatedStyle(() => ({
        borderBottomLeftRadius: bottomRadius.value,
        borderBottomRightRadius: bottomRadius.value,
    }));

    const headerAnimStyle = useAnimatedStyle(() => ({
        height: headerH.value,
    }));

    const months = {
        1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr",
        5: "May", 6: "June", 7: "July", 8: "Aug",
        9: "Sept", 10: "Oct", 11: "Nov", 12: "Dec",
    };

    const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

    function getCurrentWeek() {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - ((dayOfWeek + 6) % 7));
        const week = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            week.push({
                dayNum: date.getDate(),
                isToday: date.toDateString() === today.toDateString(),
            });
        }
        return week;
    }
    const days = getCurrentWeek();

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={toggle}>
                <Animated.View style={[styles.cardContainer, cardAnimStyle]}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: -0.5 }}
                        colors={["#d1dbe3ff", "#52616B", "#202325ff"]}
                        style={styles.gradientContainer}
                    >
                        <Image
                            source={require("../assets/images/noise.png")}
                            style={[styles.noise, { opacity: expanded ? .2 : .3 }]}
                            resizeMode="repeat"
                        />

                        <Animated.View style={[styles.headerContainer, headerAnimStyle]}>
                            <View>
                                <TouchableWithoutFeedback onPress={toggle}>
                                    {expanded ? (
                                        <TouchableWithoutFeedback onPress={toggleBack}>
                                            <View style={styles.backContainer}>
                                                <Ionicons name="arrow-back-outline" size={20} color="#181818ff" />
                                                <Text style={styles.backText}>Back</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    ) : (
                                        <View style={styles.monthContainer}>
                                            <Text style={styles.monthText}>{months[month]}</Text>
                                            <Animated.View style={styles.monthIcon}>
                                                <Ionicons
                                                    name="chevron-down-outline"
                                                    size={30}
                                                    color="#e6e6e6ff"
                                                />
                                            </Animated.View>
                                        </View>
                                    )}
                                </TouchableWithoutFeedback>
                            </View>

                            <View style={styles.searchContainer}>
                                <TouchableWithoutFeedback>
                                    <Ionicons name="search-outline" size={35} color="white" />
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback>
                                    <Ionicons name="add-circle-outline" size={35} color="white" />
                                </TouchableWithoutFeedback>
                            </View>
                        </Animated.View>

                        <View>
                            <View style={styles.weekContainer}>
                                {weekDays.map((day, index) => (
                                    <View key={index} style={styles.weekDayContainer}>
                                        <Text style={[styles.weekDay, { color: new Date().getDay() - 1 == index ? "#ffffffff" : "#232323ff" }]}>{day}</Text>
                                    </View>
                                ))}
                            </View>

                            <View style={styles.dayContainer}>
                                {days.map((day, index) => (
                                    <View
                                        key={index}
                                        style={[
                                            styles.dayBox,
                                            day.isToday ? styles.todayBox : styles.dayOrdinary,
                                        ]}
                                    >
                                        <Text style={styles.day}>{day.dayNum}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        <Text>11</Text>
                    </LinearGradient>
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cardContainer: {
        width: "100%",
        overflow: "hidden"
    },
    gradientContainer: {
        flex: 1
    },
    noise: {
        width: 440,
        height: 1200,
        zIndex: 1,
        position: "absolute",
    },
    headerContainer: {
        flexDirection: "row",
        padding: 20,
        zIndex: 999,
        marginTop: 20,
        alignItems: "flex-start",
        justifyContent: "space-between",
    },
    monthText: {
        fontSize: 40,
        zIndex: 999,
        color: "#fff",
        fontWeight: "700"
    },
    monthContainer: {
        alignItems: "center",
        flexDirection: "row",
        height: 60,
        gap: 6,
    },
    monthIcon: { marginTop: 14 },
    searchContainer: {
        marginTop: 16,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    todayBox: {
        width: 50,
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 100,
    },
    dayContainer: {
        flexDirection: "row",
        justifyContent: "center",
        bottom: 20,
        zIndex: 9999,
    },
    dayBox: {
        justifyContent: "center",
        alignItems: "center"
    },
    day: {
        fontSize: 20
    },
    weekDayContainer: {
        width: 50,
        height: 50,
        bottom: 15,
        alignItems: "center",
        justifyContent: "center",
    },
    weekDay: {
        fontSize: 15,
        fontWeight: "400",
        color: "#232323ff"
    },
    weekContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    dayOrdinary: {
        width: 50,
        height: 50,
        borderRadius: 100
    },
    backText: {
        fontSize: 18,
        color: "#000"
    },
    backContainer: {
        flexDirection: "row",
        alignItems: "center",
        top: 18,
        textDecorationStyle: "solid"
    }
});
