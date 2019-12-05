import React, { Component } from 'react'
import { StyleSheet,
        TouchableWithoutFeedback,
        Keyboard, 
        TouchableOpacity, 
        TextInput, 
        Text,
        Platform, 
        View } from 'react-native';
import { connect } from 'react-redux'
import {addDeck} from '../actions'


const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

class AddDeck extends Component  {
    state = {
        text:'',
        textB:'',
        question:'',
        answer:''
    }

    submetCard = () => {
        const key = this.props.entryId
        const Deck = this.props.deck
        const Card = {
            question: this.state.question,
            answer: this.state.answer
        }
        Deck.questions.push(Card)
        console.log(Deck)
        this.props.dispatch(addDeck({
            [key]: Deck
          }))
        this.setState({text:''})
        this.props.navigation.navigate('DeckDetail',{ entryId: key })
    }
    render() {
        return (
            <DismissKeyboard>
            <View style={styles.container}>
            <Text style={styles.qaText}>Write the Card question</Text>
            <TextInput
          style={{height: 40 , backgroundColor:'#fffa'}}
          placeholder="Type here ..."
          onChangeText={(text) => this.setState({question:text})}
          value={this.state.question}
        />
            <Text style={styles.qaText}>Write the Card answer</Text>
            <TextInput
          style={{height: 40 , backgroundColor:'#fffa'}}
          placeholder="Type here ..."
          onChangeText={(text) => this.setState({answer:text})}
          value={this.state.answer}
        />
            <TouchableOpacity onPress={this.submetCard} style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}>
                <Text style={styles.buttonText}>
                    Add Card
                </Text>
            </TouchableOpacity>
            </View>
            </DismissKeyboard>

        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop:40
  },    
  iosSubmitBtn: {
    backgroundColor: '#292477',
    padding: 10,
    borderRadius: 7,
    height: 45,
    width: 300,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
},
 AndroidSubmitBtn: {
    backgroundColor: '#292477',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white'
  },
  qaText: {
      fontSize: 18
  }
});
function mapStateToProps (state,{ navigation }) {
    const { entryId } = navigation.state.params
  
    return {
      entryId,
      deck: state[entryId],
        state
    }
  }

export default connect(
    mapStateToProps
  )(AddDeck)