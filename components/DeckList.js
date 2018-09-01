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

class DeckList extends Component {
  state = {
    decks: [
      {
        key: '1',
        name: "udacicards",
        cards: [{ key: "card1" }, { key: "card2" }, { key: "card3" }]
      },
      {
        key: '2',
        name: "new deck",
        cards: []
      },
      {
        key: '3',
        name: "New Deck 2",
        cards: []
      }
    ]
  }

  renderItem = ({ item }) => {
    console.log('Render Item section')
    console.log(item.cards.length)

    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate(
        'DeckDetail'
        // { deckId: item.key}
      )}>
        <DeckPreview item={item} />
      </TouchableOpacity>
    )
  }

  render() {
    console.log('rendering')
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.decks}
          renderItem={this.renderItem}
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

export default DeckList