import ChatList from '@/components/ChatList';
import BottomSheet, {
    BottomSheetScrollView,
    useBottomSheetSpringConfigs,
} from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

type Offset = [number, number];
type GestureCfg = { activeOffsetY: number | Offset; failOffsetY: number | Offset };

export default function Chat() {
    const bottomSheetRef = useRef<BottomSheet>(null);

    const spring = useBottomSheetSpringConfigs({
        damping: 20,
        stiffness: 150,
        mass: 1,
        overshootClamping: false,
        restDisplacementThreshold: 0.1,
        restSpeedThreshold: 0.1,
    });

    const [gestureConfig, setGestureConfig] = useState<GestureCfg>({
        activeOffsetY: [-50, 50],
        failOffsetY: [-220, 220],
    });

    const snapPoints = useMemo(() => ['80%', '100%'], []);



    const handleAnimate = useCallback((fromIndex: number, toIndex: number) => {
        if (fromIndex === 0) {
            setGestureConfig({ activeOffsetY: [-120, 120], failOffsetY: [-300, 300] });
        } else {
            setGestureConfig({ activeOffsetY: [-30, 30], failOffsetY: [-150, 150] });
        }
    }, []);


    return (
        <GestureHandlerRootView style={styles.container}>
            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                enableOverDrag={true}
                enablePanDownToClose={false}
                onAnimate={handleAnimate}
                activeOffsetY={gestureConfig.activeOffsetY}
                failOffsetY={gestureConfig.failOffsetY}
                animationConfigs={spring}
            >
                <BottomSheetScrollView overScrollMode={'always'} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
                    <Text style={{ fontSize: 70 }}>
                        <ChatList />
                    </Text>
                </BottomSheetScrollView>
            </BottomSheet>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'black' },
    contentContainer: { padding: 36, alignItems: 'center' },
});
