import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function ChatList() {
    
    return (
        <View style={styles.container}>
            <Text>ChatList</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 4000   
    }
})