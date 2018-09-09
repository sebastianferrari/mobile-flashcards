import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform, Animated } from 'react-native'
import { red, green, white } from '../utils/colors'

class Quiz extends Component {
  state = {
    questions: [],
    currentIndex: 0,
    showingQuestion: true
  }

  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params

    return {
      title: deck.title
    }
  }

  componentDidMount() {
    // get all the deck questions

  }

  componentWillMount() {
    const { questions } = this.props.navigation.state.params.deck

    this.setState({ questions })

    // flip animation stuff
    this.animatedValue = new Animated.Value(0)
    this.value = 0
    this.animatedValue.addListener(({ value }) => {
      this.value = value
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg']
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
    this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    })
    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    })
  }

  flipCard() {
    // console.log('flipCard pressed!')

    const { showingQuestion } = this.state
    this.setState({
      showingQuestion: !showingQuestion
    })

    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10
      }).start()
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10
      }).start()
    }
  }

  render() {
    // animation stuff
    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate }
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ]
    }

    const { questions, currentIndex } = this.state
    //console.log(questions)

    const { question, answer } = questions[currentIndex]
    // console.log(question)
    // console.log(answer)

    return (
      <View style={styles.container}>
        <View style={styles.orderSection}>
          <Text style={{ fontSize: 20 }}>{currentIndex} / {questions.length}</Text>
        </View>

        <View style={styles.contentSection}>
          <Animated.View 
            style={[
              styles.flipCard, 
              frontAnimatedStyle, 
              Platform.OS === 'ios' ? {} : { opacity: this.frontOpacity },
              this.state.showingQuestion ? { zIndex: 1 } : { zIndex: 0 }]}>

            <Text style={{
              fontSize: 50,
              textAlign: 'center'
            }}>
              {question}
            </Text>
            <TouchableOpacity
              style={{ marginTop: 10 }}
              onPress={() => this.flipCard()}
              disabled={!this.state.showingQuestion}
            >
              <Text style={{ fontSize: 18, color: red, fontWeight: 'bold' }}>Answer</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={[
            styles.flipCard, 
            styles.flipCardBack, 
            backAnimatedStyle, 
            Platform.OS === 'ios' ? {} : { opacity: this.backOpacity },
            !this.state.showingQuestion ? { zIndex: 1 } : { zIndex: 0 }]}>

            <Text style={{
              fontSize: 50,
              textAlign: 'center'
            }}>
              {answer}
            </Text>
            <TouchableOpacity
              style={{ marginTop: 10 }}
              onPress={() => this.flipCard()}
              disabled={this.state.showingQuestion}
            >
              <Text style={{ fontSize: 18, color: red, fontWeight: 'bold' }}>Question</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <View style={styles.buttonsSection}>
          <TouchableOpacity
            style={styles.correctBtn}
          >
            <Text style={{ color: white, fontSize: 18 }}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.incorrectBtn}
          >
            <Text style={{ color: white, fontSize: 18 }}>Incorrect</Text>
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
    alignItems: 'center'
  },
  orderSection: {
    height: 30,
    marginTop: Platform.OS === 'ios' ? 40 : 10,
    alignSelf: 'flex-start',
    marginLeft: 10
  },
  contentSection: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  flipCard: {
    backfaceVisibility: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  },
  flipCardBack: {
    position: 'absolute'
  },
  buttonsSection: {

  },
  questionText: {
    fontSize: 50,
    textAlign: 'center'
  },
  answerText: {
    fontSize: 50,
    textAlign: 'center'
  },
  correctBtn: {
    backgroundColor: green,
    width: 200,
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  incorrectBtn: {
    backgroundColor: red,
    width: 200,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  }
})



export default Quiz