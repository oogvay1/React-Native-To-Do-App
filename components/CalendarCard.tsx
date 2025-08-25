import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

export default function CalendarCard() {
    const month = new Date().getMonth() + 1;
    const [expanded, setExpanded] = useState(false);

    const headerH = useSharedValue(100);
    const bottomRadius = useSharedValue(50);
    const opacityM = useSharedValue(1);
    const opacityC = useSharedValue(0);

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
        headerH.value = withSpring(787, SPRING);
        bottomRadius.value = withSpring(0, SPRING);
        opacityM.value = withSpring(0, SPRING);
        opacityC.value = withSpring(1, SPRING);
    } else {
        headerH.value = withSpring(240, SPRING);
        bottomRadius.value = withSpring(50, SPRING);
        opacityM.value = withSpring(1, SPRING);
        opacityC.value = withSpring(0, SPRING);
    }

    const bodyAnim = useAnimatedStyle(() => ({
        opacity: opacityM.value,
    }));


    const cardAnimStyle = useAnimatedStyle(() => ({
        borderBottomLeftRadius: bottomRadius.value,
        borderBottomRightRadius: bottomRadius.value,
        height: headerH.value,
    }));

    const calendarAnim = useAnimatedStyle(() => ({
        opacity: opacityC.value
    }));

    const months = {
        1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr",
        5: "May", 6: "June", 7: "July", 8: "Aug",
        9: "Sept", 10: "Oct", 11: "Nov", 12: "Dec",
    };

    const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

    const weekDays2 = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"
    ];

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

    function generateMonthGrid(year, month) {
        const days = [];

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        let startIndex = (firstDay.getDay() + 6) % 7;
        let totalDays = lastDay.getDate();

        for (let i = 0; i < startIndex; i++) {
            days.push(null);
        }


        for (let d = 1; d <= totalDays; d++) {
            days.push(new Date(year, month, d));
        }

        return days;
    }


    function getDayStyle(day, today) {
        console.log(day < today)
        if (day.toDateString() === today.toDateString()) {
            return { backgroundColor: "#ffbf00be", color: "white" };
        } else if (day < today) {
            return { backgroundColor: "#161616ff", color: "#fff" };
        } else {
            return { backgroundColor: "white", color: "#000" };
        }
    }

    function getWeekDatStyles(i) {
        if (i == new Date().getDay() - 1) {
            return { color: "#ffffffbe", fontWeight: "700" }
        } else {
            return { color: "balck" }
        }
    }

    const today = new Date();
    const dayss = generateMonthGrid(today.getFullYear(), today.getMonth());

    return (
        <TouchableWithoutFeedback onPress={toggle}>
            <Animated.View style={[cardAnimStyle, { overflow: "hidden", borderBottomRightRadius: 50, borderBottomLeftRadius: 50 }]}>
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

                    <View style={styles.headerContainer}>
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
                    </View>

                    <Animated.View style={[styles.bodyContainer, bodyAnim]}>
                        <View style={styles.weekContainer}>
                            {weekDays.map((day, index) => (
                                <View key={index} style={styles.weekDayContainer}>
                                    <Text style={[styles.weekDay, { color: new Date().getDay() - 1 == index ? "#ffffffff" : "#494949ff" }]}>{day}</Text>
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
                    </Animated.View>

                    <Animated.View style={[styles.calendarContainer, calendarAnim]}>
                        <View>
                            <View>
                                <Text>{new Date().getDate()}</Text>
                                <Text>{months[new Date().getMonth()]}</Text>
                                <Text>{new Date().getFullYear()}</Text>
                            </View>

                            <View>
                                <Text>{weekDays2[new Date().getDay() - 1]}</Text>
                            </View>
                        </View>

                        <View style={styles.weekRow}>
                            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                                <Text key={i} style={getWeekDatStyles(i)}>{d}</Text>
                            ))}
                        </View>

                        <View style={styles.daysContainer}>
                            {dayss.map((day, i) => (
                                day ? (
                                    <View key={i} style={[styles.dayCircle, getDayStyle(day, today)]}>
                                        <Text style={[styles.dayText, getDayStyle(day, today), { backgroundColor: "transparent" }]}>{day.getDate()}</Text>
                                    </View>
                                ) : (
                                    <View key={i} style={[styles.dayCircle, { backgroundColor: "#5f919aa4" }]} />
                                )
                            ))}
                        </View>

                    </Animated.View>

                </LinearGradient>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cardContainer: {
        width: "100%",
        overflow: "hidden",
    },
    gradientContainer: {
        flex: 1,
        overflow: "hidden"
    },
    noise: {
        width: 440,
        zIndex: 1,
        position: "absolute",
    },
    headerContainer: {
        flexDirection: "row",
        padding: 20,
        height: 100,
        zIndex: 999,
        marginTop: 20,
        overflow: "hidden",
        alignItems: "flex-start",
        justifyContent: "space-between",
    },
    bodyContainer: {
        padding: 10,
        flex: 1,
        marginTop: 30,
        zIndex: 9999
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
        bottom: -5,
        zIndex: 9999,
    },
    dayBox: {
        justifyContent: "center",
        alignItems: "center"
    },
    day: {
        fontSize: 20,
        fontWeight: "400",
        color: "#1b1b1bff"
    },
    weekDayContainer: {
        width: 50,
        height: 50,
        bottom: 15,
        alignItems: "center",
        justifyContent: "center",
    },
    weekDay: {
        fontSize: 13,
        fontWeight: "400",
        color: "#dededeff"
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
    },
    calendarContainer: {
        zIndex: 9999
    },
    weekRow: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginBottom: 10,
        gap: 40.9,
        marginLeft: 32
    },
    daysContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginLeft: 13.8,
        marginBottom: 100,
        justifyContent: "flex-start",
    },
    dayCircle: {
        width: 50.5,
        height: 50.5,
        margin: .8,
        borderRadius: 200,
        alignItems: "center",
        justifyContent: "center",
    },
    dayText: {
        fontWeight: "400",
        fontSize: 20,
        backgroundColor: "transparent"
    },

});
