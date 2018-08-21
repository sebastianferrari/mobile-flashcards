import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { gray } from '../utils/colors';

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
      <View style={styles.item}>
        <Text style={{ fontSize: 20, height: 25, flexGrow: 1 }} >{item.name}</Text>
        <Text style={{ fontSize: 16, height: 25, color: gray }}>{item.cards.length} cards</Text>
      </View>
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
  },
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

export default DeckList