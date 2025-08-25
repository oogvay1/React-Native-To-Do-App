import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
export default function ChatList() {

    return (
        <ScrollView
            style={styles.container}
            overScrollMode="always"
            showsVerticalScrollIndicator={false}
        >
            <View>
                
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 4000
    }
})