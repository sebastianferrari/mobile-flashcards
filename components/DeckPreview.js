import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { gray } from '../utils/colors'

export default function DeckPreview({ item }) {
  console.log({item})
  return (
    <View style={styles.item}>
      <Text style={{ fontSize: 20, height: 25, flexGrow: 1 }} >{item.title}</Text>
      <Text style={{ fontSize: 16, height: 25, color: gray }}>{item.questions.length} cards</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    padding: 50,
    height: 120,
    width: 380,
    borderBottomWidth: 1
  }
})