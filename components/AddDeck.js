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
        Deck: {
            title: '',
            questions: [

            ]
          },
    }

    submetDeck = () => {
        const key = this.state.text
        const Deck = this.state.Deck
        Deck.title = key
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
            <Text>Write the Deck Title</Text>
            <TextInput
          style={{height: 40 , backgroundColor:'#fffa'}}
          placeholder="Type here ..."
          onChangeText={(text) => this.setState({text:text})}
          value={this.state.text}
        />
            <TouchableOpacity onPress={this.submetDeck} style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}>
                <Text style={styles.buttonText}>
                    Add Deck
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
    justifyContent: 'center',
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
  }
});
function mapStateToProps (state) {
  
    return {
        state
    }
  }

export default connect(
    mapStateToProps
  )(AddDeck)