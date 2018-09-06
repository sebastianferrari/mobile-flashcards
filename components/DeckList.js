import React, { Component } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList,
  TouchableOpacity
} from 'react-native'
import { gray } from '../utils/colors'
import DeckPreview from './DeckPreview'
import { connect } from 'react-redux'
import { fetchDummyDecks } from '../utils/api';
import { receiveDecks } from '../actions';
import { AppLoading } from 'expo'
import { values } from '../utils/helpers'

class DeckList extends Component {
  state = {
    // decks: [
    //   {
    //     key: '1',
    //     name: "udacicards",
    //     cards: [{ key: "card1" }, { key: "card2" }, { key: "card3" }]
    //   },
    //   {
    //     key: '2',
    //     name: "new deck",
    //     cards: []
    //   },
    //   {
    //     key: '3',
    //     name: "New Deck 2",
    //     cards: []
    //   }
    // ],
    ready: false
  }

  componentDidMount() {
    const { dispatch } = this.props

    fetchDummyDecks()
      .then((decks) => {
        //console.log('DECKS from componentDidMount', decks)
        dispatch(receiveDecks(decks))
      })
      .then(() => this.setState(() => ({
        ready: true
      })))
  }

  renderItem = ({ item }) => {
    // console.log('Render Item section', item)
    // console.log(item.cards.length)

    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate(
        'DeckDetail',
        { deckId: item.key }
      )}>
        <DeckPreview item={item} key={item.title}/>
      </TouchableOpacity>
    )
  }

  render() {
    const { decks } = this.props
    const { ready } = this.state

    if (ready === false) {
      return <AppLoading />
    }

    // console.log('---> ', Object.keys(decks))

    // console.log('DECKS', JSON.stringify(decks))
    let arr = Array.from(values(decks))
    // console.log({arr})
 
    return (
      <View style={styles.container}>
        <FlatList
          // data={this.state.decks}
          data={arr}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1
  }
})

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList)