import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Platform, TouchableOpacity } from 'react-native'
import { gray, black, white } from '../utils/colors'

class NewQuestion extends Component {
  state = {
    question: '',
    answer: ''
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={ styles.textInput }
          onChangeText={(question) => this.setState({ question })}
          value={this.state.question}
          placeholder='Question'
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(answer) => this.setState({ answer })}
          value={this.state.answer}
          placeholder='Answer'
        />

        <TouchableOpacity
          onPress={() => console.log('Submit pressed!')}
          style={styles.submitBtn}
        >
          <Text style={{ color: white, fontSize: 18 }}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 30 : 2
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    alignSelf: 'stretch',
    borderRadius: 5,
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
    justifyContent: 'center',
    marginTop: 20
  }
})

export default NewQuestion