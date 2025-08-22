import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'

export default function ChatList() {

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            overScrollMode
        >
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 4000
    }
})