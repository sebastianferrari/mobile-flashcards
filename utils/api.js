import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY, loadDecks } from './_decks'

const prefix = '[[api.js]] === '

export function fetchDummyDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(loadDecks)
}

export function getDecks() {
  return decks
}

export function getDeck(id) {
  console.log(`${prefix}Getting deck id: ${id}`)
  return decks[id]
}

export function saveDeckTitle({ key, deck }) {
  console.log(`${prefix}Saving new deck with key/title: ${key}`)
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }))
}

export function addCardToDeck(title, card) {
  console.log(`${prefix}Adding card ${JSON.stringify(card)} to deck ${title}`)
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[title].questions.push(card)      
      // console.log('DATA ===> ', data)
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    })
}