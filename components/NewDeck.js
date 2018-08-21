import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { black, white } from '../utils/colors'

export default function NewDeck() {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 50,
          textAlign: 'center'
        }}
      >What is the title of your new deck?</Text>

      <TextInput
        style={styles.textInput}
        placeholder='Deck Title'
      />

      <TouchableOpacity
        style={styles.submitBtn}
      >
        <Text style={{ color: white, fontSize: 18 }}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    alignSelf: 'stretch',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 20
  },
  submitBtn: {
    backgroundColor: black,
    width: 150,
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  }
})