import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions'

function decks(state = {}, action) {
  console.log({action})
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      }

    case ADD_CARD: {
      const { deckId, card} = action
      console.log('FROM REDUCER ===> deckId ---> ', deckId)
      console.log('FROM REDUCER ===> card ---> ', card)
      return {
        ...state,
        [deckId]: {
          ...state[deckId],
          questions: state[deckId].questions.concat([card])
        }
      }
    }
  
    default:
      return state
  }
}

export default decks