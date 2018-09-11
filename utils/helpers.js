import { AsyncStorage, Platform, Alert } from 'react-native'
import { Notifications, Permissions } from 'expo'

// constants for reminder time
const reminderHour = 18
const reminderMinutes = 0

const NOTIFICATIONS_KEY = 'FlashCards:Notifications'

export function* values(obj) {
  for (let prop of Object.keys(obj)) {
    yield obj[prop]
  }
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATIONS_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
  // create channel only for android.
  if (Platform.OS === 'android') {
    Notifications.createChannelAndroidAsync('flash-cards-reminder', {
      name: 'Flash Card Reminder',
      sound: true,
      priority: 'high',
      vibrate: true
    });
  }

  return {
    title: 'Achieve your goal!',
    body: "\u{1F44B} don't forget to practice today!",
    ios: {
      sound: true
    },
    android: {
      sticky: false,
      channelId: 'flash-cards-reminder'
    }
  }
}

export function setLocalNotification() {
  // line only for development tests
  // AsyncStorage.clear()

  AsyncStorage.getItem(NOTIFICATIONS_KEY)
    .then(JSON.parse)
    .then((data) => {
      // console.log({data})
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            // console.log({status})
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(reminderHour)
              tomorrow.setMinutes(reminderMinutes)

              // Two lines for testing
              // let tomorrow = Date.now()
              // tomorrow += 20000
              
              //console.log({tomorrow})

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day'
                }
              )

              AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(true))
            }
          })
      }
    })
}