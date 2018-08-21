import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { red, green, white } from '../utils/colors'

export default function Quiz() {
  return (
    <View style={styles.container}>
      <View style={styles.orderSection}>
        <Text style={{ fontSize: 20 }}>2 / 2</Text>
      </View>

      {/* <View style={styles.contentSection}>
        <Text style={{
          fontSize: 50,
          textAlign: 'center'
        }}>Does React Native work with Android?</Text>
        <TouchableOpacity
          style={{ marginTop: 10 }}
        >
          <Text style={{ fontSize: 18, color: red, fontWeight: 'bold' }}>Answer</Text>
        </TouchableOpacity>
      </View> */}

      <View style={styles.contentSection}>
        <Text style={{
          fontSize: 50,
          textAlign: 'center'
        }}>Yes!</Text>
        <TouchableOpacity
          style={{ marginTop: 10 }}
        >
          <Text style={{ fontSize: 18, color: red, fontWeight: 'bold' }}>Question</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonsSection}>
        <TouchableOpacity
          style={styles.correctBtn}
        >
          <Text style={{ color: white, fontSize: 18 }}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.incorrectBtn}
        >
          <Text style={{ color: white, fontSize: 18 }}>Incorrect</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  orderSection: {
    height: 30,
    marginTop: Platform.OS === 'ios' ? 40 : 10,
    alignSelf: 'flex-start',
    marginLeft: 10
  },
  contentSection: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  buttonsSection: {
    
  },
  correctBtn: {
    backgroundColor: green,
    width: 200,
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  incorrectBtn: {
    backgroundColor: red,
    width: 200,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  }
})