import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { secondaryTextColor, textPrimaryColor, primaryTextColor } from '../utils/colors';
import { FontAwesome } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'

class Deck extends Component {
  state = {
    deck: {}
  }

  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params

    return {
      // title: `Deck - ${deckId}`
      title: 'Deck'
    }
  }

  componentDidMount() {
    // console.log('THIS PROPS ', this.props)
    const { deck } = this.props
    // console.log('DECK ======> ', deck)
    this.setState({
      deck
    })
  }

  shouldComponentUpdate(nextProps) {
    // console.log('PASSING THROUGH shoudlComponentUpdate')
    const { deck } = nextProps
    // console.log({deck})
    if (this.state.deck !== deck) {
      this.setState({ deck })
      return true
    }
    return false
  }

  render() {
    const { deck } = this.state
    // console.log('DECK =====> ', deck)
    if (Object.keys(deck).length === 0 && deck.constructor === Object) {
      return <AppLoading />
    }

    return (
      <View style={styles.container}>
        <View style={styles.deckSection}>
          <Text style={{ fontSize: 40 }}>{deck.title}</Text>
          <Text style={{ fontSize: 25, color: secondaryTextColor }}>{deck.questions.length} cards</Text>
        </View>
        <View style={styles.buttonsView}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate(
              'NewCard',
              { deckId: deck.title }
            )}
            style={styles.addCardBtn}
          >
            <Text style={{ fontSize: 18 }}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate(
              'Quiz',
              { deck }
            )}
            style={styles.startQuizBtn}
          >
            <Text style={{ color: textPrimaryColor, fontSize: 18 }}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
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
    backgroundColor: primaryTextColor,
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
    backgroundColor: textPrimaryColor,
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  startQuizBtn: {
    backgroundColor: primaryTextColor,
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  }
})

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params
  // console.log('mapStateToProps --> deckId --> ', deckId)
  return {
    deckId,
    deck: state[deckId]
  }
}

export default connect(mapStateToProps)(Deck)