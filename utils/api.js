import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY, loadDecks } from './_decks'

export function fetchDummyDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(loadDecks)
}

export function getDecks() {
  return decks
}

export function getDeck(id) {
  return decks[id]
}

export function saveDeckTitle(title) {
  console.log(`Saving new deck ${title}`)
}

export function addCardToDeck(title, card) {
  console.log(`Adding card ${JSON.stringify(card)} to deck ${title}`)
}