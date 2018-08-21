import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { gray, white, black } from '../utils/colors';
import { FontAwesome } from '@expo/vector-icons'

export default function Deck() {
  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <FontAwesome 
          name='arrow-left' 
          color={ white } 
          size={30} 
          style={{ marginLeft: 15, marginRight: 15 }} 
        />
        <Text style={{ color: white, fontSize: 20 }}>udacicards</Text>
      </View> */}
      <View style={styles.deckSection}>
        <Text style={{ fontSize: 40 }}>udacicards</Text>
        <Text style={{ fontSize: 25, color: gray }}>3 cards</Text>
      </View>
      <View style={styles.buttonsView}>
        <TouchableOpacity
          onPress={() => console.log('Add Card pressed!')}
          style={styles.addCardBtn}
        >
          <Text style={{ fontSize: 18 }}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log('Start Quiz pressed!')}
          style={styles.startQuizBtn}
        >
          <Text style={{ color: white, fontSize: 18 }}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#54aa87'
  },
  header: {
    flexDirection: 'row',
    backgroundColor: black,
    height: 50,
    marginTop: Platform.OS === 'ios' ? 30 : 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deckSection: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonsView: {
    bottom: 0
  },
  addCardBtn: {
    backgroundColor: white,
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  startQuizBtn: {
    backgroundColor: black,
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  }
})