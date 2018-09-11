import React from 'react';
import { View, StatusBar, Platform, Alert } from 'react-native';
import NewQuestion from './components/NewQuestion'
import Deck from './components/Deck'
import DeckList from './components/DeckList'
import Quiz from './components/Quiz'
import NewDeck from './components/NewDeck'
import { Constants, Notifications } from 'expo'
import { textPrimaryColor, darkPrimaryColor } from './utils/colors'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import { setLocalNotification } from './utils/helpers'

function FlashCardsStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createBottomTabNavigator({
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  }
}, {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? darkPrimaryColor : textPrimaryColor,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? textPrimaryColor : darkPrimaryColor,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  })

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  DeckDetail: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: textPrimaryColor,
      headerStyle: {
        backgroundColor: darkPrimaryColor
      }
    }
  },
  NewCard: {
    screen: NewQuestion,
    navigationOptions: {
      headerTintColor: textPrimaryColor,
      headerStyle: {
        backgroundColor: darkPrimaryColor
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: textPrimaryColor,
      headerStyle: {
        backgroundColor: darkPrimaryColor
      }
    }
  }
})

export default class App extends React.Component {
  componentDidMount() {
    this.listenForNotifications()
    // console.log('componentDidMount')
    setLocalNotification()    
  }

  listenForNotifications = () => {
    Notifications.addListener(notification => {
      //console.log({notification})
      if (notification.origin === 'received' && Platform.OS === 'ios') {
        // Alert.alert(notification.title, notification.body);
        Alert.alert('Achieve your goal!', "\u{1F44B} don't forget to practice today!")
      }
    });
  };

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <FlashCardsStatusBar backgroundColor={darkPrimaryColor} barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
