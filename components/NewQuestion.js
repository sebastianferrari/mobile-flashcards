import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Platform, TouchableOpacity } from 'react-native'
import { gray, black, white, red } from '../utils/colors'
import { addCard } from '../actions'
import { connect } from 'react-redux'
import { addCardToDeck } from '../utils/api'

class NewQuestion extends Component {
  state = {
    deckId: '',
    question: '',
    answer: '',
    invalidQuestion: false,
    invalidAnswer: false
  }

  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params

    return {
      title: deckId
    }
  }

  componentDidMount() {
    const { deckId } = this.props

    this.setState({ deckId })
  }

  addQuestion = () => {
    // console.log('Adding question...')
    const { deckId, question, answer } = this.state

    // Validate first
    if (question === '' || answer === '') {
      if (question === '') {
        this.setState({ invalidQuestion: true })
      } else {
        this.setState({ invalidQuestion: false })
      }
      if (answer === '') {
        this.setState({ invalidAnswer: true })
      } else {
        this.setState({ invalidAnswer: false })
      }
      return
    }

    this.setState({
      invalidAnswer: false,
      invalidQuestion: false
    })

    const card = { question, answer }

    this.props.dispatch(addCard({ deckId, card }))

    this.setState({ question: '', answer: '' })

    this.props.navigation.goBack()

    const title = deckId
    addCardToDeck(title, card)
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={ [styles.textInput, this.state.invalidQuestion ? styles.invalidTextInput : '' ] }
          onChangeText={(question) => this.setState({ question })}
          value={this.state.question}
          placeholder='Question'
        />
        <TextInput
          style={ [styles.textInput, this.state.invalidAnswer ? styles.invalidTextInput : '' ]}
          onChangeText={(answer) => this.setState({ answer })}
          value={this.state.answer}
          placeholder='Answer'
        />

        <TouchableOpacity
          // onPress={() => this.props.navigation.navigate(
          //   'DeckDetail'
          // )}
          onPress={this.addQuestion}
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
  },
  invalidTextInput: {
    borderColor: red,
    borderWidth: 3
  }
})

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    deckId
  }
}

export default connect(mapStateToProps)(NewQuestion)