import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { black, white } from '../utils/colors'
import { saveDeckTitle } from '../utils/api'
import { addDeck } from '../actions'
import { connect } from 'react-redux'

class NewDeck extends Component {
  state = {
    title: ''
  }

  saveDeck = () => {
    // console.log(`Saving the new deck with title: ${this.state.title}`)
    const key = this.state.title
    const deck = { title: key, questions: [] }

    this.props.dispatch(addDeck({ [key]: deck }))

    this.setState({ title: '' })

    this.props.navigation.navigate('DeckDetail', { deckId: key })

    saveDeckTitle({ key, deck })
  }

  render() {
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
          value={this.state.title}
          onChangeText={(title) => this.setState({title})}
        />

        <TouchableOpacity
          style={styles.submitBtn}
          // onPress={() => this.props.navigation.navigate(
          //   'Decks'
          // )}
          onPress={this.saveDeck}
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

export default connect()(NewDeck)